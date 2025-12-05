// 定义变量 
let chosenSlideNumber = 1;
let offset = 0; 
let barOffset = 0; 

// 获取所有抽屉按钮
const drawerBtns = Array.from(document.querySelectorAll(".drawer-btn"));
drawerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
  });
});

// 幻灯片区域
const slideSection = document.querySelector("#slide-section");

// 切换到指定编号的幻灯片 
function slideTo(slideNumber) {

  // 限制循环范围：1~6
  if (slideNumber > 6) slideNumber = 1;
  if (slideNumber < 1) slideNumber = 6;

  drawerboxToggle(slideNumber);
  drawerbtnToggle(slideNumber);

  let previousSlideNumber = chosenSlideNumber;
  chosenSlideNumber = slideNumber;

  offset += (chosenSlideNumber - previousSlideNumber) * (-100);
  barOffset += (chosenSlideNumber - previousSlideNumber) * (100);

  barSlide(barOffset);

  const slides = document.querySelectorAll(".card");
  slides.forEach(slide => {
    slide.style.transform = `translateY(${offset}%)`;
  });
}

// 切换抽屉面板状态 
function drawerboxToggle(drawerboxNumber) {
  let prev = chosenSlideNumber;
  const boxes = document.querySelectorAll(".drawerbox");
  boxes[prev - 1].classList.toggle("active");
  boxes[drawerboxNumber - 1].classList.toggle("active");
}

// 切换抽屉按钮状态 
function drawerbtnToggle(drawerBtnNumber) {
  let prev = chosenSlideNumber;
  const btns = document.querySelectorAll(".drawer-btn");
  btns[prev - 1].classList.toggle("active");
  btns[drawerBtnNumber - 1].classList.toggle("active");
}

// 移动导航条 
function barSlide(barOffset) {
  const bar = document.querySelector("#bar");
  bar.style.transform = `translateY(${barOffset}%)`;
}

window.addEventListener("load", () => {
    setTimeout(() => {

        const loading = document.getElementById("loading-screen");
const main = document.getElementById("main");

// Start slide animation
loading.classList.add("slide-up");

setTimeout(() => {
    loading.style.display = "none";
    main.style.display = "flex";

    if (typeof slideTo === "function") slideTo(1);
}, 1000);

        if (typeof slideTo === "function") {
            slideTo(1);
        }

    }, 5000);
});
