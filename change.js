(function () {
    // 页面映射：导航项文字到 URL 的对应关系
    const pageMap = {
        "Mortgage": "mortgage.html",
        "Contact": "contact.html",
        "Floor Plan": "floorplan.html",
        "Concept": "concept.html",
        "Gallery": "gallery.html",
        "Home": "home.html"
    };

    // 动态确定当前页面
    function getCurrentPage() {
        const currentPath = window.location.pathname;
        const currentFileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || "home.html";

        for (const [pageName, url] of Object.entries(pageMap)) {
            if (url === currentFileName) {
                return pageName;
            }
        }
        return null;
    }

    // 获取当前页面
    const currentPage = getCurrentPage();

    // 获取所有导航链接和相关元素
    const navLinksAll = document.querySelectorAll('.nav-links a'); // 重命名为 navLinksAll
    const navLinksContainer = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');

    // 高亮当前页面并为每个链接添加点击事件
    navLinksAll.forEach(link => {
        const pageName = link.textContent.trim();
        if (pageName === currentPage) {
            link.classList.add('current');
        }

        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetPage = link.textContent.trim();
            
            if (targetPage === currentPage) {
                window.location.reload();
            } else {
                const targetUrl = pageMap[targetPage];
                if (targetUrl) {
                    window.location.href = targetUrl;
                } else {
                    console.error(`未找到页面 ${targetPage} 的 URL`);
                }
            }

            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
    });
})();