document.addEventListener("DOMContentLoaded", function () {
  // Check if anime.js is available, if not, load it from CDN
  if (typeof anime === "undefined") {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
    script.onload = function () {
      console.log("anime.js loaded successfully");
      initializeContests(); // Call initialization after anime.js is loaded
    };
    script.onerror = function () {
      console.error("Failed to load anime.js");
    };
    document.head.appendChild(script);
  } else {
    initializeContests(); // Call initialization if anime.js is already available
  }

  function initializeContests() {
    // Tab switching functionality
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));

        // Add active class to clicked tab
        tab.classList.add("active");

        // Show corresponding content
        const tabId = tab.getAttribute("data-tab");
        document.getElementById(`${tabId}-contests`).classList.add("active");

        // Add animation when switching tabs
        anime({
          targets: `#${tabId}-contests`,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutExpo",
          duration: 600,
        });
      });
    });

    // Countdown timer functionality
    const countdowns = document.querySelectorAll(".countdown");

    function updateCountdowns() {
      const now = new Date().getTime();

      countdowns.forEach((countdown) => {
        const targetTime = new Date(
          countdown.getAttribute("data-time")
        ).getTime();
        const timeRemaining = targetTime - now;

        if (timeRemaining > 0) {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

          countdown.querySelector(
            ".time-unit:nth-child(1) .time-value"
          ).textContent = days.toString().padStart(2, "0");
          countdown.querySelector(
            ".time-unit:nth-child(2) .time-value"
          ).textContent = hours.toString().padStart(2, "0");
          countdown.querySelector(
            ".time-unit:nth-child(3) .time-value"
          ).textContent = minutes.toString().padStart(2, "0");
          countdown.querySelector(
            ".time-unit:nth-child(4) .time-value"
          ).textContent = seconds.toString().padStart(2, "0");
        }
      });
    }

    // Update countdowns immediately and then every second
    updateCountdowns();
    setInterval(updateCountdowns, 1000);

    // Register button animation and functionality
    const registerButtons = document.querySelectorAll(".register-btn");

    registerButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();

        // Add pulse animation
        anime({
          targets: this,
          scale: [1, 1.1, 1],
          duration: 500,
          easing: "easeInOutQuad",
        });

        // Change text after animation
        setTimeout(() => {
          this.textContent = "Registered ✓";
          this.classList.add("registered");
          this.disabled = true;

          // Update participant count
          const infoItems =
            this.closest(".contest-details").querySelectorAll(".info-item");
          infoItems.forEach((item) => {
            if (
              item
                .querySelector(".info-value")
                .textContent.includes("Registered")
            ) {
              const currentCount = parseInt(
                item.querySelector(".info-value").textContent.match(/\d+/)[0]
              );
              item.querySelector(".info-value").textContent = `${
                currentCount + 1
              } Registered`;
            }
          });
        }, 500);
      });
    });

    // View results button functionality
    const viewResultsButtons = document.querySelectorAll(".view-results-btn");

    viewResultsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Add animation
        anime({
          targets: this.closest(".contest-card"),
          translateX: [0, 10, 0],
          duration: 300,
          easing: "easeInOutQuad",
        });

        // In a real app, this would navigate to results page
        alert("Navigating to contest results...");
      });
    });

    // Add hover effects for contest cards
    const contestCards = document.querySelectorAll(".contest-card");

    contestCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        if (!this.classList.contains("past")) {
          anime({
            targets: this.querySelector(".contest-banner img"),
            scale: 1.05,
            duration: 800,
            easing: "easeOutQuad",
          });
        }

        anime({
          targets: this,
          translateY: -10,
          boxShadow: "0 15px 30px rgba(0, 45, 98, 0.15)",
          duration: 400,
          easing: "easeOutQuad",
        });
      });

      card.addEventListener("mouseleave", function () {
        if (!this.classList.contains("past")) {
          anime({
            targets: this.querySelector(".contest-banner img"),
            scale: 1,
            duration: 800,
            easing: "easeOutQuad",
          });
        }

        anime({
          targets: this,
          translateY: 0,
          boxShadow: "0 5px 20px rgba(0, 45, 98, 0.1)",
          duration: 400,
          easing: "easeOutQuad",
        });
      });
    });

    // Add parallax effect to contest banners
    window.addEventListener("scroll", function () {
      const banners = document.querySelectorAll(
        ".contest-banner img:not(.greyscale)"
      );
      const scrollPosition = window.pageYOffset;

      banners.forEach((banner) => {
        const bannerPosition =
          banner.getBoundingClientRect().top + scrollPosition;
        const offset = (scrollPosition - bannerPosition) * 0.1;

        if (offset > -200 && offset < 200) {
          banner.style.transform = `translateY(${offset}px)`;
        }
      });
    });

    // Add responsive menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinks.classList.toggle("active");
      });
    }
  }
});
