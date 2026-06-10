/* --------------------------------------------------------------------------
   FAIMLY-T WEB PAGE - INTERACTIONS & FORM SUBMISSION SCRIPT
   Handles the custom form submissions dynamically for a seamless user feel
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
