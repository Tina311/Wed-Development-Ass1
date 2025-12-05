// Track which slide is active
let chosenSlideNumber = 1;

// Vertical slide offset (moves slides up/down)
let offset = 0;

// Progress bar offset
let barOffset = 0;

// Get all drawer buttons (left menu)
const drawerBtns = Array.from(document.querySelectorAll(".drawer-btn"));

// Add empty click listener (not needed but prevents errors)
drawerBtns.forEach(btn => {
  btn.addEventListener("click", () => {});
});

// -----------------------------
// Main function to change slide
// -----------------------------
function slideTo(slideNumber) {

  // Loop slide numbers between 1 - 6
  if (slideNumber > 6) slideNumber = 1;
  if (slideNumber < 1) slideNumber = 6;

  // Toggle active state on drawer boxes + buttons
  drawerboxToggle(slideNumber);
  drawerbtnToggle(slideNumber);

  // Store previous slide
  let previousSlideNumber = chosenSlideNumber;

  // Update new slide
  chosenSlideNumber = slideNumber;

  // Update offset based on direction
  offset += (chosenSlideNumber - previousSlideNumber) * (-100);

  // Move progress bar in opposite direction
  barOffset += (chosenSlideNumber - previousSlideNumber) * (100);

  // Move bar
  barSlide(barOffset);

  // Move slide cards
  const slides = document.querySelectorAll(".card");
  slides.forEach(slide => {
    slide.style.transform = `translateY(${offset}%)`;
  });
}

// --------------------------------------
// Toggle drawer box highlight on left side
// --------------------------------------
function drawerboxToggle(drawerboxNumber) {
  let prev = chosenSlideNumber;
  const boxes = document.querySelectorAll(".drawerbox");

  // Remove active from previous
  boxes[prev - 1].classList.toggle("active");

  // Add active to current
  boxes[drawerboxNumber - 1].classList.toggle("active");
}

// --------------------------------------
// Toggle left menu button active state
// --------------------------------------
function drawerbtnToggle(drawerBtnNumber) {
  let prev = chosenSlideNumber;
  const btns = document.querySelectorAll(".drawer-btn");

  // Remove active from previous
  btns[prev - 1].classList.toggle("active");

  // Add active to current
  btns[drawerBtnNumber - 1].classList.toggle("active");
}

// --------------------------------------
// Move progress bar vertically
// --------------------------------------
function barSlide(barOffset) {
  const bar = document.querySelector("#bar");
  bar.style.transform = `translateY(${barOffset}%)`;
}

// --------------------------------------
// Loading screen fade-out
// --------------------------------------
window.addEventListener("load", () => {

  // Wait for animation + loading time
  setTimeout(() => {

    const loading = document.getElementById("loading-screen");
    const main = document.getElementById("main");

    // Start slide-up animation of loading layer
    loading.classList.add("slide-up");

    // After animation finishes:
    setTimeout(() => {

      // Fully hide loading screen
      loading.style.display = "none";

      // Show main content
      main.style.display = "flex";

      // Move to first slide if function exists
      if (typeof slideTo === "function") slideTo(1);

    }, 1000);

    // Also try to slide to the first page immediately
    if (typeof slideTo === "function") slideTo(1);

  }, 5000); // 5 second loading screen duration
});