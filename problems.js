document.addEventListener("DOMContentLoaded", function () {
  // References to DOM elements
  const problemCards = document.querySelectorAll(".problem-card");
  const searchInput = document.getElementById("problem-search");
  const searchBtn = document.getElementById("search-btn");
  const difficultyFilter = document.getElementById("difficulty-filter");
  const topicFilter = document.getElementById("topic-filter");
  const statusFilter = document.getElementById("status-filter");
  const pageNumbers = document.querySelectorAll(".page-number");
  const prevButton = document.querySelector(".pagination-btn:first-child");
  const nextButton = document.querySelector(".pagination-btn:last-child");

  // Track current page
  let currentPage = 1;
  const totalPages = 10; // Assuming 10 pages total as per the pagination UI

  // Initialize problem cards with hover animations
  initializeCards();

  // Add event listeners for search and filters
  searchBtn.addEventListener("click", applyFilters);
  searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      applyFilters();
    }
  });

  // Add change listeners for dropdowns
  difficultyFilter.addEventListener("change", applyFilters);
  topicFilter.addEventListener("change", applyFilters);
  statusFilter.addEventListener("change", applyFilters);

  // Add click listeners for pagination
  pageNumbers.forEach((pageNumber) => {
    pageNumber.addEventListener("click", function () {
      if (this.textContent === "...") return;

      // Update current page
      currentPage = parseInt(this.textContent);
      updatePagination();

      // Apply a page change animation to the problem cards
      animatePageChange();

      // Update filter results (in a real app, this would fetch new data)
      applyFilters();
    });
  });

  // Pagination buttons
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
      animatePageChange();
      applyFilters();
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
      animatePageChange();
      applyFilters();
    }
  });

  // Add click listeners to problem cards to navigate to problem page
  problemCards.forEach((card) => {
    card.addEventListener("click", function () {
      const problemTitle = this.querySelector("h3").textContent;
      // Navigate to the problem page (would normally use the problem ID)
      // For demonstration, we'll just navigate to the daily problem
      window.location.href = "daily-problem.html";
    });
  });

  // Function to apply all filters
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDifficulty = difficultyFilter.value;
    const selectedTopic = topicFilter.value;
    const selectedStatus = statusFilter.value;

    // Loop through all problem cards and check if they match the filters
    problemCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.querySelector("p").textContent.toLowerCase();
      const cardDifficulty = card.getAttribute("data-difficulty");
      const cardTopic = card.getAttribute("data-topic");
      const cardStatus = card.getAttribute("data-status");

      // Check if the card matches all filters
      const matchesSearch =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        searchTerm === "";
      const matchesDifficulty =
        selectedDifficulty === "all" || cardDifficulty === selectedDifficulty;
      const matchesTopic =
        selectedTopic === "all" || cardTopic === selectedTopic;
      const matchesStatus =
        selectedStatus === "all" || cardStatus === selectedStatus;

      // Show or hide the card based on filters
      if (matchesSearch && matchesDifficulty && matchesTopic && matchesStatus) {
        card.style.display = "flex";

        // Animate the card appearing
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 500,
          easing: "easeOutCubic",
          delay: Array.from(problemCards).indexOf(card) * 50,
        });
      } else {
        card.style.display = "none";
      }
    });

    // Check if any cards are visible
    const visibleCards = Array.from(problemCards).filter(
      (card) => card.style.display !== "none"
    );

    // Show "No results found" message if no cards match
    let noResultsMessage = document.querySelector(".no-results-message");

    if (visibleCards.length === 0) {
      if (!noResultsMessage) {
        noResultsMessage = document.createElement("div");
        noResultsMessage.className = "no-results-message";
        noResultsMessage.innerHTML = `
            <div class="empty-state">
              <div class="empty-state-icon">🔍</div>
              <h3>No problems found</h3>
              <p>Try adjusting your filters or search term</p>
              <button class="reset-filters-btn">Reset Filters</button>
            </div>
          `;
        document.querySelector(".problems-list").appendChild(noResultsMessage);

        // Add click listener to reset button
        noResultsMessage
          .querySelector(".reset-filters-btn")
          .addEventListener("click", resetFilters);
      }
    } else if (noResultsMessage) {
      noResultsMessage.remove();
    }
  }

  // Function to reset all filters
  function resetFilters() {
    searchInput.value = "";
    difficultyFilter.value = "all";
    topicFilter.value = "all";
    statusFilter.value = "all";
    applyFilters();
  }

  // Function to update pagination display
  function updatePagination() {
    // Update active page
    pageNumbers.forEach((pageNumber) => {
      if (pageNumber.textContent === currentPage.toString()) {
        pageNumber.classList.add("active");
      } else {
        pageNumber.classList.remove("active");
      }
    });

    // Update disabled state for prev/next buttons
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  // Function to animate page change
  function animatePageChange() {
    anime({
      targets: ".problems-list",
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 400,
      easing: "easeOutCubic",
    });
  }

  // Function to initialize cards with hover effects
  function initializeCards() {
    problemCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        anime({
          targets: this,
          scale: 1.03,
          boxShadow: "0 8px 25px rgba(0, 45, 98, 0.15)",
          duration: 300,
          easing: "easeOutCubic",
        });
      });

      card.addEventListener("mouseleave", function () {
        anime({
          targets: this,
          scale: 1.0,
          boxShadow: "0 5px 15px rgba(0, 45, 98, 0.1)",
          duration: 300,
          easing: "easeOutCubic",
        });
      });
    });
  }

  // Add sort functionality
  const sortButton = document.createElement("button");
  sortButton.textContent = "Sort by Difficulty";
  sortButton.className = "sort-btn";
  document.querySelector(".filter-container").appendChild(sortButton);

  let sortDirection = "asc"; // 'asc' or 'desc'

  sortButton.addEventListener("click", function () {
    // Toggle sort direction
    sortDirection = sortDirection === "asc" ? "desc" : "asc";

    // Update button text
    this.textContent = `Sort by Difficulty (${
      sortDirection === "asc" ? "↑" : "↓"
    })`;

    // Get all visible problem cards
    const cardsArray = Array.from(problemCards).filter(
      (card) => card.style.display !== "none"
    );

    // Sort the cards
    cardsArray.sort((a, b) => {
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      const diffA = a.getAttribute("data-difficulty");
      const diffB = b.getAttribute("data-difficulty");

      if (sortDirection === "asc") {
        return difficultyOrder[diffA] - difficultyOrder[diffB];
      } else {
        return difficultyOrder[diffB] - difficultyOrder[diffA];
      }
    });

    // Rearrange DOM elements based on sort
    const problemsList = document.querySelector(".problems-list");
    cardsArray.forEach((card) => {
      problemsList.appendChild(card);

      // Animate the reordering
      anime({
        targets: card,
        translateX: [20, 0],
        opacity: [0, 1],
        duration: 300,
        easing: "easeOutQuad",
        delay: cardsArray.indexOf(card) * 50,
      });
    });
  });

  // Track and show progress (for demo purposes)
  const progressStats = {
    solved: document.querySelectorAll(".problem-status.solved").length,
    attempted: document.querySelectorAll(".problem-status.attempted").length,
    total: problemCards.length,
  };

  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";
  progressContainer.innerHTML = `
      <div class="progress-stats">
        <div class="progress-item">
          <span class="progress-label">Solved</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (progressStats.solved / progressStats.total) * 100
            }%"></div>
          </div>
          <span class="progress-value">${progressStats.solved}/${
    progressStats.total
  }</span>
        </div>
        <div class="progress-item">
          <span class="progress-label">In Progress</span>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (progressStats.attempted / progressStats.total) * 100
            }%"></div>
          </div>
          <span class="progress-value">${progressStats.attempted}/${
    progressStats.total
  }</span>
        </div>
      </div>
    `;

  // Insert progress container after the header
  document.querySelector(".problems-header").after(progressContainer);

  // Animate progress bars
  anime({
    targets: ".progress-fill",
    width: function (el) {
      return el.style.width;
    },
    duration: 1000,
    easing: "easeInOutQuart",
    delay: 300,
    direction: "normal",
    loop: false,
  });
});
