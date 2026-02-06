document.addEventListener("DOMContentLoaded", () => {

    // Scroll Button
    const scrollBtn = document.getElementById("scroll-btn");
    const targetSection = document.querySelector("#projects");
    setTimeout(() => scrollBtn.classList.add("show"), 1800);

    scrollBtn.addEventListener("click", e => {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth" });
    });

    // Floating Stars
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const numStars = 120;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.2 + 0.05,
            glow: Math.random() * 15 + 10,
            alpha: Math.random() * 0.8 + 0.2
        });
    }

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let scrollOffset = 0;
    window.addEventListener("scroll", () => scrollOffset = window.scrollY * 0.05);
    document.querySelector('a[href="#home"]').addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    function animateStars() {
        ctx.clearRect(0, 0, width, height);
        for (const s of stars) {
            s.y -= s.speed;
            s.x += Math.sin(Date.now()/2000 + s.y/50)*0.05;
            if (s.y < -10) s.y = height+10;
            if (s.x > width+10) s.x = -10;
            if (s.x < -10) s.x = width+10;

            const yOffset = s.y - scrollOffset;
            const grad = ctx.createRadialGradient(s.x, yOffset, 0, s.x, yOffset, s.glow);
            grad.addColorStop(0, `rgba(43,255,255,${s.alpha})`);
            grad.addColorStop(1, "transparent");

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(s.x, yOffset, s.size, 0, Math.PI*2);
            ctx.fill();
        }
        requestAnimationFrame(animateStars);
    }
    animateStars();



    // Add projects here:
    const projects = [
        {title: "Receipt Tracker", description: "Receipt Tracker is a full-stack React web application that allows users to securely store and manage their receipts in one place. Users can authenticate with Firebase, upload receipt images, and create, edit, or delete receipt entries that are safely stored in Firestore and Firebase Storage.", languages: ["html.png", "css.png", "javascript.png", "react.png"], link: "https://github.com/aliZnm/receipt-tracker"},
        {title: "YourCart", description: "YourCart is a simple web app that helps users track product prices and stay on top of changes over time. The goal of this project is to make price monitoring easy, fast, and accessible from any device. It focuses on a clean UI, smooth user experience, and practical functionality for everyday use.", languages: ["html.png", "css.png", "javascript.png", "react.png"], link: "https://price-tracker-jgtg.vercel.app/"},
    ];






    const projectsContainer = document.querySelector(".projects-cards");
    projects.forEach(proj => {
        const a = document.createElement("a");
        a.href = proj.link; a.target="_blank";
        const card = document.createElement("div"); card.classList.add("project-card");
        const title = document.createElement("h3"); title.textContent = proj.title;
        const desc = document.createElement("p"); desc.textContent = proj.description;
        const icons = document.createElement("div"); icons.classList.add("project-icons");
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

    // Contact Icons
    const contacts = [
        {name:"Email", link:"mailto:abdul76985@gmail.com", icon:"email.png"},
        {name:"GitHub", link:"https://github.com/aliZnme", icon:"github.png"},
    ];
    const contactContainer = document.querySelector(".contact-icons");
    contacts.forEach(c => {
        const a = document.createElement("a");
        a.href = c.link; a.target="_blank"; a.title=c.name;
        const img = document.createElement("img");
        img.src = `images/${c.icon}`; img.alt=c.name;
        a.appendChild(img);
        contactContainer.appendChild(a);
    });

});
