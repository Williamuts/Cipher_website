document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) {
        console.error('Hamburger or NavLinks element not found!');
        return;
    }

    console.log('Hamburger menu script loaded successfully.');

    function setupHamburgerMenu() {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked!');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    setupHamburgerMenu();
});