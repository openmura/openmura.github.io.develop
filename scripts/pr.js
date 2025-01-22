document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page, index) => {
        page.style.animationDelay = `${index * 0.5}s`;
    });
});