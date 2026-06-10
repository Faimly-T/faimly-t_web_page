/* --------------------------------------------------------------------------
   FAIMLY-T WEB PAGE - INTERACTIONS & FORM SUBMISSION SCRIPT
   Handles mobile menu toggling, interactive FAQ accordions, and custom form submission
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const leadForm = document.getElementById("lead-form");
  const formFeedback = document.getElementById("form-feedback");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
      }
    });
  }

  // FAQ Accordion interaction
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const panel = item.querySelector(".faq-panel");

    if (trigger && panel) {
      trigger.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close all other panels to maintain single-open accordion behavior
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
            const otherPanel = otherItem.querySelector(".faq-panel");
            if (otherPanel) {
              otherPanel.style.maxHeight = "0px";
            }
          }
        });

        // Toggle the clicked panel
        if (isActive) {
          item.classList.remove("active");
          panel.style.maxHeight = "0px";
        } else {
          item.classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  });

  // Automatically expand the default active FAQ item on load
  const defaultActive = document.querySelector(".faq-item.active");
  if (defaultActive) {
    const panel = defaultActive.querySelector(".faq-panel");
    if (panel) {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }

  // Intercept the form submission to provide a beautiful custom success window
  if (leadForm) {
    leadForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop standard redirect page refresh
      
      const submitBtn = leadForm.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending details...";

      // Get values from form
      const formData = new FormData(leadForm);

      try {
        const response = await fetch(leadForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Fade out form and display success UI
          leadForm.style.transition = "opacity 0.4s ease";
          leadForm.style.opacity = "0";
          setTimeout(() => {
            leadForm.style.display = "none";
            formFeedback.style.display = "block";
            formFeedback.style.opacity = "0";
            formFeedback.style.transition = "opacity 0.4s ease";
            setTimeout(() => {
              formFeedback.style.opacity = "1";
            }, 50);
          }, 400);
        } else {
          alert("Submission could not be sent. Please email us directly at info@faimly-t.com.");
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      } catch (err) {
        console.error("Form error:", err);
        alert("An error occurred. Please contact info@faimly-t.com directly.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }
});
