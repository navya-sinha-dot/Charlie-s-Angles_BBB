// Wait for DOM to load completely
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  initializeAnimations();

  // Generate heatmap
  generateHeatmap();

  // Create contest achievement chart
  createContestChart();

  // Create accuracy chart
  createAccuracyChart();

  // Add badges with animations
  initializeBadges();
});

// Initialize animations for various elements
function initializeAnimations() {
  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });

  // Hover animations for cards
  const cards = document.querySelectorAll(".stats-card, .tracker-card, .badge");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      anime({
        targets: this,
        translateY: -10,
        boxShadow: "0 15px 30px rgba(0, 45, 98, 0.2)",
        duration: 300,
        easing: "easeOutQuad",
      });
    });

    card.addEventListener("mouseleave", function () {
      anime({
        targets: this,
        translateY: 0,
        boxShadow: "0 5px 20px rgba(0, 45, 98, 0.1)",
        duration: 300,
        easing: "easeOutQuad",
      });
    });
  });
}

// Generate colorful activity heatmap
function generateHeatmap() {
  const heatmapGrid = document.getElementById("heatmapGrid");
  const days = 7; // 7 days in a week
  const weeks = 26; // 26 weeks (half a year)
  const activityLevels = [0, 1, 2, 3, 4]; // Different activity levels

  // Clear existing content
  heatmapGrid.innerHTML = "";

  // Create cells for each day
  for (let i = 0; i < days; i++) {
    for (let j = 0; j < weeks; j++) {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";

      // Determine activity level with higher probability for active days on weekends and certain patterns
      let activityLevel;

      // Make a pattern (more activity on recent weeks and weekends)
      if (j > 20 || (i >= 5 && j > 15)) {
        // Recent weeks or weekends in somewhat recent weeks - higher activity
        activityLevel = activityLevels[Math.floor(Math.random() * 3) + 2];
      } else if ((i >= 5 && j > 10) || j > 15) {
        // Weekends or more recent weeks - medium activity
        activityLevel = activityLevels[Math.floor(Math.random() * 3) + 1];
      } else if (j < 5 && i < 3) {
        // Early weekdays in past weeks - lower activity
        activityLevel = activityLevels[Math.floor(Math.random() * 2)];
      } else {
        // Random for the rest
        activityLevel =
          activityLevels[Math.floor(Math.random() * activityLevels.length)];
      }

      cell.classList.add("level-" + activityLevel);

      // Add tooltip for the cell
      const date = new Date();
      date.setDate(date.getDate() - ((weeks - j - 1) * 7 + (days - i - 1)));
      const dateStr = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Create activity description based on level
      let activityDesc;
      switch (activityLevel) {
        case 0:
          activityDesc = "No activity";
          break;
        case 1:
          activityDesc = "Light coding (15 mins)";
          break;
        case 2:
          activityDesc = "Medium coding (30 mins)";
          break;
        case 3:
          activityDesc = "Strong coding (1 hour)";
          break;
        case 4:
          activityDesc = "Super coder (2+ hours)!";
          break;
      }

      cell.setAttribute("title", `${dateStr}: ${activityDesc}`);

      // Add hover effect
      cell.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.3)";
        this.style.zIndex = "10";

        // Show tooltip
        const tooltip = document.createElement("div");
        tooltip.className = "cell-tooltip";
        tooltip.textContent = this.getAttribute("title");
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "#333";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px 10px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.fontSize = "12px";
        tooltip.style.zIndex = "100";

        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left}px`;

        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
      });

      cell.addEventListener("mouseleave", function () {
        this.style.transform = "";
        this.style.zIndex = "";

        // Remove tooltip
        if (this.tooltip) {
          document.body.removeChild(this.tooltip);
          this.tooltip = null;
        }
      });

      heatmapGrid.appendChild(cell);
    }
  }
}

// Create contest achievements chart
function createContestChart() {
  const ctx = document.getElementById("contestChart").getContext("2d");

  // Kid-friendly pastel colors
  const colors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86, 0.7)",
    "rgba(75, 192, 192, 0.7)",
    "rgba(153, 102, 255, 0.7)",
  ];

  // Kid-friendly contest names and data
  const contestData = {
    labels: [
      "Coding Cubs",
      "Logic Masters",
      "Bug Hunters",
      "Algorithm Adventures",
      "Code Olympics",
    ],
    datasets: [
      {
        label: "Your Score",
        data: [85, 92, 78, 88, 95],
        backgroundColor: colors,
        borderColor: colors.map((color) => color.replace("0.7", "1")),
        borderWidth: 2,
        borderRadius: 10,
        maxBarThickness: 50,
      },
      {
        label: "Average Score",
        data: [70, 75, 65, 72, 80],
        backgroundColor: colors.map((color) => color.replace("0.7", "0.3")),
        borderColor: colors.map((color) => color.replace("0.7", "0.5")),
        borderWidth: 2,
        borderRadius: 10,
        maxBarThickness: 50,
      },
    ],
  };

  new Chart(ctx, {
    type: "bar",
    data: contestData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 14,
            },
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: {
            family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
            size: 14,
          },
          bodyFont: {
            family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
            size: 13,
          },
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw + " points";
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 12,
            },
          },
          grid: {
            display: true,
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          ticks: {
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      animation: {
        duration: 2000,
        easing: "easeOutBounce",
      },
    },
  });

  // Add accuracy chart to dedicated container
  const accuracyContainer = document.createElement("div");
  accuracyContainer.className = "accuracy-container";
  accuracyContainer.innerHTML = `
      <h3>Accuracy Trends</h3>
      <div class="accuracy-chart">
        <canvas id="accuracyChart"></canvas>
      </div>
    `;

  // Insert after achievements container
  const achievementsContainer = document.querySelector(
    ".achievements-container"
  );
  achievementsContainer.parentNode.insertBefore(
    accuracyContainer,
    achievementsContainer.nextSibling
  );

  // Add the container styles
  const style = document.createElement("style");
  style.textContent = `
      .accuracy-container {
        background-color: #fff;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 5px 20px rgba(0, 45, 98, 0.1);
        margin-bottom: 25px;
      }
      
      .accuracy-container h3 {
        color: #002d62;
        margin-bottom: 20px;
        font-size: 1.3rem;
        position: relative;
        padding-left: 15px;
      }
      
      .accuracy-container h3:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 25px;
        background-color: #005477;
        border-radius: 3px;
      }
      
      .accuracy-chart {
        height: 300px;
        width: 100%;
      }
      
      .cell-tooltip {
        position: absolute;
        z-index: 1000;
        pointer-events: none;
      }
      
      .badge-container {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
        margin-top: 15px;
      }
      
      .badge-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80px;
        transition: transform 0.3s;
      }
      
      .badge-item:hover {
        transform: scale(1.15);
      }
      
      .badge-icon {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        font-size: 24px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      
      .badge-name {
        font-size: 12px;
        text-align: center;
        color: #333;
        font-weight: 600;
      }
      
      .badge-locked {
        filter: grayscale(1);
        opacity: 0.5;
      }
      
      .badge-locked .badge-name:after {
        content: " 🔒";
        font-size: 10px;
      }
    `;
  document.head.appendChild(style);
}

// Create accuracy chart
function createAccuracyChart() {
  const ctx = document.getElementById("accuracyChart").getContext("2d");

  // Months data
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Line chart data with improvements over time
  const accuracyData = {
    labels: months,
    datasets: [
      {
        label: "Python Accuracy",
        data: [78, 82, 86, 83, 90, 92],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "JavaScript Accuracy",
        data: [65, 70, 68, 75, 81, 85],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(255, 159, 64)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: "Scratch Accuracy",
        data: [90, 88, 92, 94, 95, 96],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  new Chart(ctx, {
    type: "line",
    data: accuracyData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 14,
            },
            padding: 20,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: 12,
          titleFont: {
            family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
            size: 14,
          },
          bodyFont: {
            family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
            size: 13,
          },
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw + "%";
            },
          },
        },
      },
      scales: {
        y: {
          min: 50,
          max: 100,
          ticks: {
            stepSize: 10,
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 12,
            },
          },
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
        },
        x: {
          ticks: {
            font: {
              family: "'Comic Sans MS', 'Chalkboard SE', sans-serif",
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      animation: {
        duration: 2000,
      },
    },
  });
}

// Initialize badges system with animations
function initializeBadges() {
  // Create badges container in the main dashboard
  const badgesSection = document.createElement("div");
  badgesSection.className = "badges-section";
  badgesSection.innerHTML = `
      <h3>Your Coding Badges</h3>
      <div class="badge-container" id="badgeContainer"></div>
    `;

  // Add styles for badges section
  const style = document.createElement("style");
  style.textContent = `
      .badges-section {
        background-color: #fff;
        border-radius: 15px;
        padding: 25px;
        box-shadow: 0 5px 20px rgba(0, 45, 98, 0.1);
        margin-bottom: 25px;
      }
      
      .badges-section h3 {
        color: #002d62;
        margin-bottom: 20px;
        font-size: 1.3rem;
        position: relative;
        padding-left: 15px;
      }
      
      .badges-section h3:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 25px;
        background-color: #005477;
        border-radius: 3px;
      }
    `;
  document.head.appendChild(style);

  // Insert badges section after the accuracy chart
  const accuracyContainer = document.querySelector(".accuracy-container");
  accuracyContainer.parentNode.insertBefore(
    badgesSection,
    accuracyContainer.nextSibling
  );

  // Define badges with kid-friendly icons, names, and colors
  const badges = [
    { name: "Code Master", icon: "🏆", color: "#FFD700", unlocked: true },
    { name: "Bug Hunter", icon: "🔍", color: "#C0C0C0", unlocked: true },
    { name: "Quick Solver", icon: "🚀", color: "#CD7F32", unlocked: true },
    { name: "Python Wizard", icon: "🐍", color: "#4B8BBE", unlocked: true },
    { name: "JS Ninja", icon: "⚡", color: "#F0DB4F", unlocked: true },
    { name: "Loop Master", icon: "🔄", color: "#FF6B6B", unlocked: true },
    { name: "Function Pro", icon: "📊", color: "#6BCB77", unlocked: true },
    { name: "Array Ace", icon: "📚", color: "#4D96FF", unlocked: true },
    { name: "Game Creator", icon: "🎮", color: "#9C6ADE", unlocked: false },
    { name: "Web Builder", icon: "🌐", color: "#00D2D3", unlocked: false },
    { name: "AI Explorer", icon: "🤖", color: "#FF9A76", unlocked: false },
    { name: "Math Genius", icon: "🔢", color: "#AE5E99", unlocked: false },
  ];

  // Create badge elements
  const badgeContainer = document.getElementById("badgeContainer");

  badges.forEach((badge, index) => {
    const badgeElement = document.createElement("div");
    badgeElement.className = `badge-item ${
      badge.unlocked ? "" : "badge-locked"
    }`;

    // Create badge content
    badgeElement.innerHTML = `
        <div class="badge-icon" style="background: linear-gradient(135deg, ${
          badge.color
        }, ${adjustColor(badge.color, -30)}); color: white;">
          ${badge.icon}
        </div>
        <div class="badge-name">${badge.name}</div>
      `;

    // Add badge with animation delay based on index
    badgeElement.style.opacity = "0";
    badgeElement.style.transform = "translateY(20px)";

    badgeContainer.appendChild(badgeElement);

    // Animate badge entrance
    setTimeout(() => {
      badgeElement.style.transition = "all 0.5s ease";
      badgeElement.style.opacity = "1";
      badgeElement.style.transform = "translateY(0)";
    }, 100 + index * 100);

    // Add hover animation and tooltip
    badgeElement.addEventListener("mouseenter", function () {
      if (!badge.unlocked) {
        const tooltip = document.createElement("div");
        tooltip.className = "cell-tooltip";
        tooltip.textContent = `Complete 5 more ${
          badge.name.split(" ")[0]
        } challenges to unlock!`;
        tooltip.style.position = "absolute";
        tooltip.style.backgroundColor = "#333";
        tooltip.style.color = "white";
        tooltip.style.padding = "5px 10px";
        tooltip.style.borderRadius = "5px";
        tooltip.style.fontSize = "12px";
        tooltip.style.zIndex = "100";

        const rect = this.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 40}px`;
        tooltip.style.left = `${rect.left - 30}px`;

        document.body.appendChild(tooltip);
        this.tooltip = tooltip;
      }
    });

    badgeElement.addEventListener("mouseleave", function () {
      if (this.tooltip) {
        document.body.removeChild(this.tooltip);
        this.tooltip = null;
      }
    });
  });
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

// Menu toggle functionality for responsive design
document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
  this.classList.toggle("active");
});

// Add confetti animation for reaching goals
function celebrateAchievement() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ["#FFD700", "#FF6B6B", "#4D96FF", "#6BCB77", "#9C6ADE"];

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    // Create confetti
    confetti({
      particleCount,
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      origin: { y: 0.6 },
      colors: colors,
    });

    // Schedule next frame
    requestAnimationFrame(frame);
  })();
}

// Simulate confetti when loading page to celebrate progress
setTimeout(celebrateAchievement, 2000);
