const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const revealItems = document.querySelectorAll(".reveal");
const heroSlides = document.querySelectorAll("[data-hero-slide]");
const heroDots = document.querySelectorAll("[data-hero-dot]");
const heroPrev = document.querySelector("[data-hero-prev]");
const heroNext = document.querySelector("[data-hero-next]");

let heroIndex = 0;

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-selected", isActive ? "true" : "false");
        });

        tabPanels.forEach((panel) => {
            panel.classList.toggle("active", panel.dataset.panel === target);
        });
    });
});

const setHeroSlide = (index) => {
    if (!heroSlides.length) {
        return;
    }

    heroIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === heroIndex);
    });

    heroDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === heroIndex);
    });
};

heroDots.forEach((dot) => {
    dot.addEventListener("click", () => {
        setHeroSlide(Number(dot.dataset.heroDot));
    });
});

if (heroPrev) {
    heroPrev.addEventListener("click", () => {
        setHeroSlide(heroIndex - 1);
    });
}

if (heroNext) {
    heroNext.addEventListener("click", () => {
        setHeroSlide(heroIndex + 1);
    });
}

if (heroSlides.length > 1) {
    setHeroSlide(0);
    setInterval(() => {
        setHeroSlide(heroIndex + 1);
    }, 5000);
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.18,
        },
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}
