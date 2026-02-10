
// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Scroll Reveal Animation (Simple Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden'); // Add initial hidden state in CSS if needed, or JS handles it
    observer.observe(section);
});

// Add 'hidden' class and animation styles dynamically if not in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  section.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);
