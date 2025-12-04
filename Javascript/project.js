document.addEventListener("DOMContentLoaded", () => {

    // 获取外层容器
    const shell = document.querySelector('.boxs');

    // 获取所有子元素
    const cells = shell.querySelectorAll('.box');

    // 获取容器宽度
    const cellWidth = shell.offsetWidth;

    // 获取容器高度（取第一个 box）
    const cellHeight = cells[0].offsetHeight;

    // 设置单元元素大小/半径高度
    const cellSize = cellHeight;

    // 子元素数量（4 个）
    const cellCount = 4;

    // 计算半径
    const radius = (cellSize * 1.0) / Math.tan(Math.PI / cellCount);

    // 计算每个元素的角度
    const theta = 360 / cellCount;

    // 当前选中的 box 索引
    let selectedIndex = 0;

    function rotateShell() {
        const angle = theta * selectedIndex * -1;

        shell.style.transform =
            'translateZ(' + -radius + 'px) rotateX(' + -angle + 'deg)';

        const cellIndex = ((selectedIndex % cellCount) + cellCount) % cellCount;

        cells.forEach((cell, index) => {
            cell.classList.toggle('selected', cellIndex === index);
        });
    }

    function selectPrev() {
        selectedIndex--;
        rotateShell();
    }

    function selectNext() {
        selectedIndex++;
        rotateShell();
    }

    // 修复：wheel 监听在 iframe 内部文档，而不是父窗口
    let scrollLock = false;
    document.addEventListener("wheel", (e) => {
        if (scrollLock) return;
        scrollLock = true;

        if (e.deltaY > 0) selectNext();
        else selectPrev();

        setTimeout(() => scrollLock = false, 250);
    });

    // 初始化
    function initShell() {
        cells.forEach((cell, i) => {
            const cellAngle = theta * i;
            cell.style.transform =
                'rotateX(' + -cellAngle + 'deg) translateZ(' + radius + 'px)';
        });

        rotateShell();
    }

    initShell();

});

// MOBILE: Smooth scroll buttons + active card detection
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".boxs");
    const cards = document.querySelectorAll(".box");

    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");

    if (!container) return; // safety

    // Smooth scroll amount
    const scrollAmount = window.innerWidth * 0.7;

    // Scroll left
    leftBtn.addEventListener("click", () => {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    // Scroll right
    rightBtn.addEventListener("click", () => {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Highlight centered card
    function updateActiveCard() {
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        let closestCard = null;
        let closestDistance = Infinity;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - cardCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestCard = card;
            }
        });

        // Apply active class
        cards.forEach(c => c.classList.remove("active-card"));
        if (closestCard) closestCard.classList.add("active-card");
    }

    // Update when scrolling
    container.addEventListener("scroll", () => {
        window.requestAnimationFrame(updateActiveCard);
    });

    // Initial call
    updateActiveCard();
});





