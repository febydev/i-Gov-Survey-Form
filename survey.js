const agreeBox = document.getElementById("agree");
const continueBtn = document.getElementById("continue-btn");
const privacyScreen = document.getElementById("privacy-screen");
const formWrapper = document.getElementById("form-wrapper");
const form = document.getElementById("feedback-form");
const submitButton = document.getElementById("submit-button");
const thankYouScreen = document.getElementById("thank-you-screen");
const editResponseBtn = document.getElementById("edit-response-btn");
let formDataCache = null;

// Privacy notice logic
agreeBox.addEventListener("change", () => {
  continueBtn.disabled = !agreeBox.checked;
});

continueBtn.addEventListener("click", () => {
  privacyScreen.style.display = "none";
  formWrapper.style.display = "block";
});

// Form submission handler
form?.addEventListener("submit", function(e) {
  e.preventDefault();
  submitButton.value = "Submitting...";
  submitButton.disabled = true;

  // Cache the form data before submission
  formDataCache = new FormData(form);

  const scriptURL = "https://script.google.com/macros/s/AKfycbwfsDeWwibuh9Zb6ylf72IaBIvNSTeCTm7TSfBRCVk2ftO4gOpbkCbW8RKg3xT19lnZ/exec";

  fetch(scriptURL, { method: 'POST', body: formDataCache })
    .then(response => {
      formWrapper.style.display = "none";
      thankYouScreen.style.display = "flex";
      submitButton.value = "Submit Feedback";
      submitButton.disabled = false;
    })
    .catch(error => {
      alert("There was an error submitting your feedback. Please try again.");
      console.error("Error!", error.message);
      submitButton.value = "Submit Feedback";
      submitButton.disabled = false;
    });
});

// Edit response functionality
editResponseBtn?.addEventListener("click", function() {
  thankYouScreen.style.display = "none";
  formWrapper.style.display = "block";
  
  // Repopulate the form with cached data
  if (formDataCache) {
    for (const [name, value] of formDataCache.entries()) {
      const element = form.elements[name];
      if (!element) continue;
      
      if (element.type === "checkbox" || element.type === "radio") {
        // For checkboxes and radios
        const elements = form.querySelectorAll(`[name="${name}"]`);
        elements.forEach(el => {
          if (el.value === value) {
            el.checked = true;
          }
        });
      } else {
        // For other input types
        element.value = value;
      }
    }
  }
});