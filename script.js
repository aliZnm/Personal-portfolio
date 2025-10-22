document.addEventListener("DOMContentLoaded", () => {
  // Start at top instantly
  window.scrollTo(0, 0);

  // ---------------- Scroll Button ----------------
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

    // Animate arrow fade-out
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
        // Reset arrow
        arrow.style.transition = "none";
        arrow.style.transform = "translate(-50%, -50%) scale(1)";
        arrow.style.textShadow = "none";
        setTimeout(() => (arrow.style.opacity = "1"), 100);
      }
    };

    requestAnimationFrame(animateScroll);
  });

  // ---------------- Floating Stars ----------------
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const numStars = 120;
  const stars = [];

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

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let scrollOffset = 0;
  window.addEventListener("scroll", () => {
    scrollOffset = window.scrollY * 0.05;
  });

  function animateStars() {
    ctx.clearRect(0, 0, width, height);

    for (const s of stars) {
      s.y -= s.speed;
      s.x += Math.sin(Date.now() / 2000 + s.y / 50) * 0.05;

      if (s.y < -10) s.y = height + 10;
      if (s.x > width + 10) s.x = -10;
      if (s.x < -10) s.x = width + 10;

      const yOffset = s.y - scrollOffset;

      const gradient = ctx.createRadialGradient(s.x, yOffset, 0, s.x, yOffset, s.glow);
      gradient.addColorStop(0, `rgba(43, 255, 255, ${s.alpha})`);
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(s.x, yOffset, s.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(animateStars);
  }

  animateStars();

  // ---------------- Projects ----------------
  const projects = [
    {
      title: "Portfolio Website",
      description: "My personal portfolio built with HTML, CSS, JS.",
      languages: ["html.png", "css.png", "js.png"],
      link: "https://github.com/username/portfolio"
    },
    {
      title: "Weather App",
      description: "A weather app using OpenWeather API.",
      languages: ["html.png", "css.png", "js.png"],
      link: "https://github.com/username/weather-app"
    }
  ];

  const projectsContainer = document.querySelector(".projects-cards");

  projects.forEach(proj => {
    const a = document.createElement("a");
    a.href = proj.link;
    a.target = "_blank";
    a.style.textDecoration = "none";

    const card = document.createElement("div");
    card.classList.add("project-card");

    const title = document.createElement("h3");
    title.textContent = proj.title;

    const desc = document.createElement("p");
    desc.textContent = proj.description;

    const icons = document.createElement("div");
    icons.classList.add("project-icons");
    proj.languages.forEach(lang => {
      const img = document.createElement("img");
      img.src = `images/${lang}`;
      img.alt = lang.split(".")[0];
      icons.appendChild(img);
    });

    card.append(title, desc, icons);
    a.appendChild(card);
    projectsContainer.appendChild(a);
  });

  // ---------------- Contact Icons ----------------
  const contacts = [
    { name: "Email", link: "mailto:youremail@example.com", icon: "email.png" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/yourprofile", icon: "linkedin.png" },
    { name: "GitHub", link: "https://github.com/yourusername", icon: "github.png" },
    { name: "Discord", link: "https://discord.com/users/yourid", icon: "discord.png" }
  ];

  const contactContainer = document.querySelector(".contact-icons");
  contactContainer.innerHTML = ""; // clear if anything exists

  contacts.forEach(c => {
    const a = document.createElement("a");
    a.href = c.link;
    a.target = "_blank";
    a.title = c.name;

    const img = document.createElement("img");
    img.src = `images/${c.icon}`;
    img.alt = c.name;

    a.appendChild(img);
    contactContainer.appendChild(a);
  });
});
