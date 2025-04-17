const images = [
    "static/image/gallery1.jpg",
    "static/image/gallery2.jpg",
    "static/image/gallery3.jpg",
    "static/image/gallery4.jpg",
    "static/image/gallery5.jpg",
    "static/image/gallery6.jpg",
    "static/image/gallery7.jpg"
];

let currentIndex = 1;
const carousel = document.querySelector('.carousel');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function initCarousel() {
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.dataset.index = index;
        carousel.appendChild(img);
    });
    updateCarouselPositions();
    setupSwipeListeners();
}

function updateCarouselPositions() {
    const imgs = carousel.querySelectorAll('img');
    const totalImages = images.length;

    imgs.forEach((img) => {
        const imgIndex = parseInt(img.dataset.index);
        const offset = (imgIndex - currentIndex + totalImages) % totalImages;
        let positionClass;

        if (offset === 0) {
            positionClass = 'center';
        } else if (offset === totalImages - 1) {
            positionClass = 'left';
        } else if (offset === 1) {
            positionClass = 'right';
        } else if (offset > 1) {
            positionClass = 'hidden-right';
        } else {
            positionClass = 'hidden-left';
        }

        img.className = positionClass;
        img.style.transform = ''; // 重置 transform，防止拖动效果残留
        img.style.transition = 'all 0.5s ease-in-out'; // 确保动画生效

        img.onclick = null;

        if (positionClass === 'left') {
            img.onclick = () => {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
                updateCarouselPositions();
            };
        } else if (positionClass === 'right') {
            img.onclick = () => {
                currentIndex = (currentIndex + 1) % totalImages;
                updateCarouselPositions();
            };
        } else if (positionClass === 'center') {
            img.onclick = () => zoomImage(img);
        }
    });
}

function zoomImage(img) {
    const overlay = document.createElement('div');
    overlay.className = 'zoomed-overlay';

    const zoomedImg = document.createElement('img');
    zoomedImg.src = img.src;
    zoomedImg.className = 'zoomed';

    overlay.appendChild(zoomedImg);
    document.body.appendChild(overlay);

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    };
}

function setupSwipeListeners() {
    let touchStartX = 0;
    let touchCurrentX = 0;
    const swipeThreshold = 30; // 降低阈值，使滑动更灵敏
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchCurrentX = touchStartX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', (e) => {
        e.preventDefault(); // 防止页面滚动
        if (!isDragging) return;
        touchCurrentX = e.changedTouches[0].screenX;
        const swipeDistance = touchCurrentX - touchStartX;

        // 动态更新图片位置，模拟拖动效果
        const imgs = carousel.querySelectorAll('img');
        imgs.forEach((img) => {
            const positionClass = img.className;
            let baseTranslateX = 0;

            if (positionClass === 'center') {
                baseTranslateX = 0;
            } else if (positionClass === 'left') {
                baseTranslateX = -80; // 与 CSS 的 translateX(-80%) 匹配
            } else if (positionClass === 'right') {
                baseTranslateX = 80;  // 与 CSS 的 translateX(80%) 匹配
            } else if (positionClass === 'hidden-left') {
                baseTranslateX = -120;
            } else if (positionClass === 'hidden-right') {
                baseTranslateX = 120;
            }

            const percentage = swipeDistance / window.innerWidth * 100; // 转换为百分比
            img.style.transition = 'none'; // 拖动时禁用过渡动画
            img.style.transform = `translateX(${baseTranslateX + percentage}%)`;
        });
    });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const touchEndX = e.changedTouches[0].screenX;
        handleSwipe(touchStartX, touchEndX);
    });

    function handleSwipe(startX, endX) {
        const totalImages = images.length;
        const swipeDistance = endX - startX;

        if (swipeDistance > swipeThreshold) {
            // 向右滑动，显示上一张
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        } else if (swipeDistance < -swipeThreshold) {
            // 向左滑动，显示下一张
            currentIndex = (currentIndex + 1) % totalImages;
        }

        updateCarouselPositions(); // 滑动结束时更新位置，触发过渡动画
    }
}

function setupHamburgerMenu() {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}
preloadImages(images);

initCarousel();
setupHamburgerMenu();