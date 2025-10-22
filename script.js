document.addEventListener("DOMContentLoaded", () => {
  // Start at top instantly
  window.scrollTo(0, 0);

  const scrollBtn = document.getElementById("scroll-btn");
  const arrow = scrollBtn.querySelector(".arrow");
  const targetSection = document.querySelector("#projects");

  // Show button after intro
  setTimeout(() => scrollBtn.classList.add("show"), 1800);

  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const startScroll = window.scrollY;
    const targetScroll = targetSection.offsetTop;
    const totalDistance = targetScroll - startScroll;
    const duration = 1000;
    const startTime = performance.now();

    // Animate arrow fade-out immediately (no vertical travel)
    arrow.style.transition = "none";
    arrow.style.transform = "translate(-50%, -50%) scale(1.3)";
    arrow.style.textShadow = "0 0 15px rgb(43, 255, 255)";
    arrow.style.opacity = "1";

    requestAnimationFrame(() => {
      arrow.style.transition = "opacity 0.4s ease";
      arrow.style.opacity = "0";
    });

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startScroll + totalDistance * eased);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Instantly reset arrow (hidden, ready for next click)
        arrow.style.transition = "none";
        arrow.style.transform = "translate(-50%, -50%) scale(1)";
        arrow.style.textShadow = "none";
        setTimeout(() => (arrow.style.opacity = "1"), 100);
      }
    };

    requestAnimationFrame(animateScroll);
  });
});

//floating stars:
// Neon floating dots that react to scroll
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const numStars = 120; // number of dots
  const stars = [];

  const cyan = "rgb(43, 255, 255)";

  // Create stars
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.2 + 0.05,
      glow: Math.random() * 15 + 10,
      alpha: Math.random() * 0.8 + 0.2,
    });
  }

  // Handle resize
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Track scroll for slight movement effect
  let scrollOffset = 0;
  window.addEventListener("scroll", () => {
    scrollOffset = window.scrollY * 0.05; // sensitivity
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      // Move stars gently upward and sideways
      s.y -= s.speed;
      s.x += Math.sin(Date.now() / 2000 + s.y / 50) * 0.05;

      // Wrap around
      if (s.y < -10) s.y = height + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.x < -10) s.x = width + 10;

      // Apply scroll offset (gives parallax feel)
      const yOffset = s.y - scrollOffset;

      // Draw glowing dot
      const gradient = ctx.createRadialGradient(s.x, yOffset, 0, s.x, yOffset, s.glow);
      gradient.addColorStop(0, `rgba(43, 255, 255, ${s.alpha})`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(s.x, yOffset, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
});

//Project Cards
document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "Portfolio Website",
      description: "My personal portfolio built with HTML, CSS, and JS.",
      icons: ["icons/html.png", "icons/css.png", "icons/js.png"],
    },
    {
      title: "Weather App",
      description: "Shows real-time weather using OpenWeather API.",
      icons: ["icons/js.png", "icons/api.png"],
    },
    {
      title: "Task Manager",
      description: "A simple to-do list app with localStorage support.",
      icons: ["icons/js.png", "icons/html.png", "icons/css.png"],
    },
    // Add more projects here
  ];

  const container = document.getElementById("projects-cards");

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.textContent = project.description;

    // Create icon row
    const iconRow = document.createElement("div");
    iconRow.className = "project-icons";

    project.icons.forEach((iconPath) => {
      const img = document.createElement("img");
      img.src = iconPath;
      img.alt = "tech icon";
      iconRow.appendChild(img);
    });

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(iconRow);

    container.appendChild(card);
  });
});
