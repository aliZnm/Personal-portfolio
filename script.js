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

// Create floating cyan "stars"
document.addEventListener("DOMContentLoaded", () => {
  const starContainer = document.getElementById("starfield");
  const numStars = 80; // number of floating stars

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("span");
    star.classList.add("star");
    star.textContent = "*";

    // Random positions and animation speed
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";
    star.style.fontSize = Math.random() * 12 + 8 + "px";
    star.style.animationDuration = 10 + Math.random() * 15 + "s";
    star.style.animationDelay = Math.random() * 5 + "s";
    starContainer.appendChild(star);
  }
});
