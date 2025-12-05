document.addEventListener("DOMContentLoaded", () => {

    // Get the outer container
    const shell = document.querySelector('.boxs');

    // Get all child elements
    const cells = shell.querySelectorAll('.box');

    // Get container width
    const cellWidth = shell.offsetWidth;

    // Get container height (use the first box)
    const cellHeight = cells[0].offsetHeight;

    // Set cell size / radius height
    const cellSize = cellHeight;

    // Number of child elements (4)
    const cellCount = 4;

    // Calculate radius
    const radius = (cellSize * 1.0) / Math.tan(Math.PI / cellCount);

    // Calculate the angle for each element
    const theta = 360 / cellCount;

    // Currently selected box index
    let selectedIndex = 0;

    function rotateShell() {
        const angle = theta * selectedIndex * -1;

        shell.style.transform =
            'translateZ(' + -radius + 'px) rotateX(' + -angle + 'deg)';

        const cellIndex = ((selectedIndex % cellCount) + cellCount) % cellCount;

        // Highlight selected box
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

    // Fix: Add wheel listener on the iframe content, not the parent window
    let scrollLock = false;
    document.addEventListener("wheel", (e) => {
        if (scrollLock) return;
        scrollLock = true;

        if (e.deltaY > 0) selectNext();
        else selectPrev();

        setTimeout(() => scrollLock = false, 250);
    });

    // Initialization
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





