const fadeSlideElements = document.querySelectorAll('.fade-slide');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const animationType = entry.target.dataset.animate;

            if (animationType === 'js') {
                // JS 动画方式
                entry.target.animate([
                    { opacity: 0, transform: 'translateX(-50px)' },
                    { opacity: 1, transform: 'translateX(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                });
            } else {
                // 默认用 CSS class 动画方式
                entry.target.classList.remove('fade-slide');
                void entry.target.offsetWidth;
                entry.target.classList.add('fade-slide');
            }
        }
    });
}, {
    threshold: 0.1
});

fadeSlideElements.forEach(element => {
    observer.observe(element);
});


