import anime from "animejs/lib/anime.es.js";

document.addEventListener("DOMContentLoaded", function () {
  // Login form validation
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (!username || !password) {
        showError("Please fill in all fields");
        return;
      }

      // Simulate login success
      showSuccess("Login successful!");

      // Redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    });
  }

  // Signup form validation
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullname = document.getElementById("fullname").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const age = document.getElementById("age").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const terms = document.querySelector('input[name="terms"]').checked;

      if (
        !fullname ||
        !email ||
        !username ||
        !age ||
        !password ||
        !confirmPassword
      ) {
        showError("Please fill in all fields");
        return;
      }

      if (!validateEmail(email)) {
        showError("Please enter a valid email address");
        return;
      }

      if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      if (!terms) {
        showError("Please accept the Terms and Conditions");
        return;
      }

      // Simulate signup success
      showSuccess("Account created successfully!");

      // Redirect to dashboard after delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    });
  }

  // Email validation function
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Show error message
  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.backgroundColor = "#f8d7da";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.padding = "10px";
    errorDiv.style.borderRadius = "5px";
    errorDiv.style.marginBottom = "15px";
    errorDiv.style.textAlign = "center";
    errorDiv.textContent = message;

    const form = document.querySelector("form");
    const formHeader = document.querySelector(".auth-header");

    form.insertBefore(errorDiv, form.firstChild);

    // Remove error message after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }

  // Show success message
  function showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-message";
    successDiv.style.backgroundColor = "#d4edda";
    successDiv.style.color = "#28a745";
    successDiv.style.padding = "10px";
    successDiv.style.borderRadius = "5px";
    successDiv.style.marginBottom = "15px";
    successDiv.style.textAlign = "center";
    successDiv.textContent = message;

    const form = document.querySelector("form");
    form.insertBefore(successDiv, form.firstChild);

    // Trigger fireworks animation
    triggerFireworks();
  }

  function triggerFireworks() {
    // Placeholder for fireworks animation logic
    console.log("Fireworks triggered!");
  }

  // Animate form elements on load
  anime({
    targets: ".form-group",
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    easing: "easeOutQuad",
  });

  // Animate rocket or robot
  if (document.querySelector(".rocket")) {
    anime({
      targets: ".rocket",
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });
  }

  if (document.querySelector(".robot")) {
    anime({
      targets: ".robot",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });
  }

  // Input focus effects
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#005477";
      this.style.boxShadow = "0 0 0 3px rgba(0, 84, 119, 0.2)";
    });

    input.addEventListener("blur", function () {
      this.style.borderColor = "#ced4da";
      this.style.boxShadow = "none";
    });
  });
});
