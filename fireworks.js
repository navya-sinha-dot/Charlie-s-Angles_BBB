document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector(".fireworks");
  const ctx = canvas.getContext("2d");
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  let particles = [];
  let rockets = [];
  let MAX_PARTICLES = 100;
  let rocketTimer = 0;
  let isFireworksActive = false;

  // Resize canvas
  function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Particle class
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color || `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.velocity = {
        x: Math.random() * 6 - 3,
        y: Math.random() * 6 - 3,
      };
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;
      this.size = Math.random() * 3 + 1;
    }

    update() {
      this.velocity.y += 0.05;
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= this.decay;
      return this.alpha <= 0;
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Rocket class
  class Rocket {
    constructor() {
      this.x = Math.random() * canvasWidth;
      this.y = canvasHeight;
      this.targetY = Math.random() * (canvasHeight * 0.5) + 50;
      this.velocity = {
        x: Math.random() * 2 - 1,
        y: -Math.random() * 7 - 3,
      };
      this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      this.size = 2;
      this.trail = [];
    }

    update() {
      this.y += this.velocity.y;
      this.x += this.velocity.x;

      // Add trail effect
      this.trail.push({
        x: this.x,
        y: this.y,
        alpha: 1,
      });

      // Limit trail length
      if (this.trail.length > 20) {
        this.trail.shift();
      }

      // Reduce trail alpha
      this.trail.forEach((point) => {
        point.alpha -= 0.05;
      });

      // Remove invisible trail points
      this.trail = this.trail.filter((point) => point.alpha > 0);

      // Check if rocket reached target height
      return this.y <= this.targetY;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Draw trail
      this.trail.forEach((point) => {
        ctx.globalAlpha = point.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(point.x, point.y, this.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    }

    explode() {
      const particleCount = Math.floor(Math.random() * 50) + 30;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }
    }
  }

  // Animation loop
  function animate() {
    if (!isFireworksActive) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      requestAnimationFrame(animate);
      return;
    }

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Update and draw particles
    particles = particles.filter((particle) => {
      particle.draw();
      return !particle.update();
    });

    // Update and draw rockets
    rockets = rockets.filter((rocket) => {
      rocket.draw();
      const exploded = rocket.update();
      if (exploded) {
        rocket.explode();
      }
      return !exploded;
    });

    // Add new rockets
    if (isFireworksActive && rockets.length < 3 && Math.random() < 0.05) {
      rockets.push(new Rocket());
    }

    requestAnimationFrame(animate);
  }

  // Start animation
  animate();

  // Function to trigger fireworks
  window.triggerFireworks = function () {
    isFireworksActive = true;

    // Add initial rockets
    for (let i = 0; i < 3; i++) {
      rockets.push(new Rocket());
    }

    // Stop fireworks after 3 seconds
    setTimeout(() => {
      isFireworksActive = false;
    }, 3000);
  };

  // Trigger fireworks on button clicks
  document.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      window.triggerFireworks();
    }
  });
});
