/* Faimly-T — site interactions (vanilla, no dependencies) */
(function () {
  'use strict';

  /* --- FAQ accordion (single-open) --- */
  var items = document.querySelectorAll('.faq-item');
  function setPanel(item, open) {
    var panel = item.querySelector('.faq-panel');
    if (open) {
      item.classList.add('active');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      item.classList.remove('active');
      panel.style.maxHeight = null;
    }
  }
  items.forEach(function (item) {
    var trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');
      items.forEach(function (other) { if (other !== item) setPanel(other, false); });
      setPanel(item, !isOpen);
    });
    // open the one pre-marked active
    if (item.classList.contains('active')) {
      requestAnimationFrame(function () { setPanel(item, true); });
    }
  });
  // keep open panel sized correctly on resize
  window.addEventListener('resize', function () {
    var active = document.querySelector('.faq-item.active .faq-panel');
    if (active) active.style.maxHeight = active.scrollHeight + 'px';
  });

  /* --- Smooth anchor scroll with fixed-nav offset --- */
  var NAV_H = 76;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var y = id === '#top' ? 0 : el.getBoundingClientRect().top + window.pageYOffset - NAV_H;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* --- Contact form (Web3Forms AJAX submit) --- */
  var form = document.getElementById('contactForm');
  var container = document.getElementById('formContainer');
  if (form) {
    form.addEventListener('submit', function (e) {
      var key = form.querySelector('[name="access_key"]').value;
      // If no real key is configured yet, just show the success state (demo mode).
      if (!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        e.preventDefault();
        container.classList.add('form-sent');
        return;
      }
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function () { container.classList.add('form-sent'); })
        .catch(function () {
          btn.textContent = original;
          btn.disabled = false;
          alert('Something went wrong. Please email info@faimly-t.com directly.');
        });
    });
  }
})();
