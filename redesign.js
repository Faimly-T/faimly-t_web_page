// Faimly-T redesign — shared behavior: scroll reveal and coming soon popups.
(function () {
  // 1. Scroll Reveal
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // 2. Coming Soon Popup
  var popupTimeout = null;

  function showComingSoon(projectName) {
    var lang = document.body.getAttribute('data-lang') || localStorage.getItem('ft-portal-lang') || 'en';
    
    // Create popup elements if they don't exist
    var overlay = document.getElementById('comingSoonOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'comingSoonOverlay';
      overlay.className = 'coming-soon-overlay';
      overlay.innerHTML = 
        '<div class="coming-soon-modal">' +
          '<button class="coming-soon-close" id="comingSoonClose"><i class="fa-solid fa-xmark"></i></button>' +
          '<div class="coming-soon-icon"><i class="fa-solid fa-hourglass-half"></i></div>' +
          '<h3 id="comingSoonTitle"></h3>' +
          '<p id="comingSoonDesc"></p>' +
          '<div class="coming-soon-progress-container">' +
            '<div class="coming-soon-progress-bar" id="comingSoonProgressBar"></div>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
      
      document.getElementById('comingSoonClose').addEventListener('click', closeComingSoon);
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeComingSoon();
      });
    }

    var titleEl = document.getElementById('comingSoonTitle');
    var descEl = document.getElementById('comingSoonDesc');
    var barEl = document.getElementById('comingSoonProgressBar');

    // Data texts
    var texts = {
      Clara: {
        en: {
          title: "Clara: Coming Soon",
          desc: "We are currently building this platform to revolutionize hiring for the AI era. Development is in progress!"
        },
        es: {
          title: "Clara: Próximamente",
          desc: "Actualmente estamos construyendo esta plataforma para revolucionar la contratación en la era de la IA. ¡El desarrollo está en progreso!"
        }
      },
      Catch: {
        en: {
          title: "Catch: Coming Soon",
          desc: "We are building Catch to help students in Latin America find and win US scholarships. The project is actively in progress!"
        },
        es: {
          title: "Catch: Próximamente",
          desc: "Estamos construyendo Catch para ayudar a los estudiantes de América Latina a encontrar y ganar becas en EE. UU. ¡El proyecto está activamente en progreso!"
        }
      }
    };

    var content = texts[projectName] ? texts[projectName][lang] : null;
    if (!content) {
      content = {
        en: { title: "In Progress", desc: "Coming soon!" },
        es: { title: "En Progreso", desc: "¡Próximamente!" }
      }[lang];
    }

    titleEl.textContent = content.title;
    descEl.textContent = content.desc;

    // Reset progress bar animation
    barEl.style.animation = 'none';
    // Trigger reflow
    void barEl.offsetWidth;
    barEl.style.animation = 'countdown-progress 5s linear forwards';

    // Show popup
    overlay.classList.add('active');

    // Auto close in 5 seconds
    if (popupTimeout) clearTimeout(popupTimeout);
    popupTimeout = setTimeout(closeComingSoon, 5000);
  }

  function closeComingSoon() {
    var overlay = document.getElementById('comingSoonOverlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    if (popupTimeout) clearTimeout(popupTimeout);
  }

  function initComingSoonLinks() {
    document.querySelectorAll('[data-coming-soon]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var proj = el.getAttribute('data-coming-soon');
        showComingSoon(proj);
      });
    });
  }

  // Initialization
  function init() {
    initReveal();
    initComingSoonLinks();
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
