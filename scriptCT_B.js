const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function setupHamburgerMenu() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

function submitForm() {
    // 这里可以添加表单提交逻辑，例如通过 fetch 发送数据到服务器
    console.log('Form submitted');
    alert('Thank you for your submission! We will contact you within 30 minutes.');
}

setupHamburgerMenu();