document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");

      // Add animation to menu items when opened
      if (navLinks.classList.contains("active")) {
        const links = navLinks.querySelectorAll("a");
        links.forEach((link, index) => {
          link.style.opacity = "0";
          link.style.transform = "translateY(20px)";

          setTimeout(() => {
            link.style.transition = "opacity 0.3s ease, transform 0.3s ease";
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
          }, 100 * index);
        });
      }
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  // Add scroll effect to navbar
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.padding = "10px 30px";
      navbar.style.boxShadow = "0 5px 20px rgba(0, 45, 98, 0.15)";
    } else {
      navbar.style.padding = "15px 30px";
      navbar.style.boxShadow = "0 2px 15px rgba(0, 45, 98, 0.1)";
    }
  });

  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks2 = document.querySelectorAll(".nav-links a");

  navLinks2.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});
