const icon = document.getElementById("icon");
const closeIcon = document.querySelector(".close");
const footerDate = document.getElementById("date");
// local storage

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

const local = localStorage.getItem("theme");

if (local == "light") {
  document.body.classList.remove("dark-theme");
  icon.src = "../images/moon.png";
} else if (local == "dark") {
  document.body.classList.add("dark-theme");
  icon.src = "../images/sun.png";
}

// toggle
function closeMenu() {
  closeIcon.classList.toggle("active");
  const nav = document.querySelector(".nav");
  nav.classList.toggle("active");
}
closeIcon.addEventListener("click", closeMenu);

icon.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    icon.src = "../images/sun.png";
  } else {
    localStorage.setItem("theme", "light");
    icon.src = "../images/moon.png";
  }
});

footerDate.textContent = new Date().getFullYear();

const activeFooter = new IntersectionObserver(
  (itemToWatch) => {
    itemToWatch.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("active");
        activeFooter.unobserve(item.target);
      }
    });
  },
  { threshold: 0.7 }
);
const footer = document.querySelector(".footer");
activeFooter.observe(footer);

const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-items")
  );
  const totalSliderItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const nextSlide = function () {
    currentSlidePos++;

    sliderContainer.style.transform = `translateX(
     -${sliderContainer.children[currentSlidePos].offsetLeft}px
    )`;
    if (currentSlidePos >= totalSliderItems)
      sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.removeAttribute("disabled");
  };
  sliderNextBtn.addEventListener("click", nextSlide);
  const prevSlide = function () {
    currentSlidePos--;

    sliderContainer.style.transform = `translateX(
     -${sliderContainer.children[currentSlidePos].offsetLeft}px
    )`;
    if (currentSlidePos <= 0) sliderPrevBtn.setAttribute("disabled", "");
    sliderNextBtn.removeAttribute("disabled");
  };
  sliderPrevBtn.addEventListener("click", prevSlide);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) sliderNextBtn.setAttribute("disabled", "");

  sliderPrevBtn.setAttribute("disabled", "");

  sliderPrevBtn.setAttribute("disabled", "");
};
for (let i = 0; i < sliders.length; i++) {
  sliderInit(sliders[i]);
}

const iframe = document.getElementById("iframe");

const imageTrailer = document.querySelectorAll(".trailer-img");

imageTrailer.forEach((image) => image.addEventListener("click", changeIframe));

function changeIframe() {
  const trailer = this.getAttribute("data-iframe");
  setTimeout(() => {
    iframe.setAttribute("src", trailer);
  }, 1000);
}

const loadingText = document.querySelector(".loading-text");
const wraper = document.querySelector(".wrapper");

let load = 0;
let init = setInterval(blurring, 30);
function blurring() {
  load++;
  if (load > 99) {
    clearInterval(init);
    loadingText.style.display = "none";
  }
  loadingText.innerText = `${load}%`;
  loadingText.style.opacity = scale(load, 0, 100, 1, 0);
  wraper.style.filter = `blur(${scale(load, 0, 100, 100, 0)}px)`;
}
function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
