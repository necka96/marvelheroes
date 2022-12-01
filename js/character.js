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

// event

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

let activeIndex = 0;

const slides = document.getElementsByTagName("article");

const handleLeftClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : slides.length - 1;

  const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
    nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

  currentSlide.dataset.status = "after";

  nextSlide.dataset.status = "becoming-active-from-before";

  setTimeout(() => {
    nextSlide.dataset.status = "active";
    activeIndex = nextIndex;
  });
};

const handleRightClick = () => {
  const nextIndex = activeIndex + 1 <= slides.length - 1 ? activeIndex + 1 : 0;

  const currentSlide = document.querySelector(`[data-index="${activeIndex}"]`),
    nextSlide = document.querySelector(`[data-index="${nextIndex}"]`);

  currentSlide.dataset.status = "before";

  nextSlide.dataset.status = "becoming-active-from-after";

  setTimeout(() => {
    nextSlide.dataset.status = "active";
    activeIndex = nextIndex;
  });
};

const loadingText = document.querySelector(".loading-text");
const wraper = document.querySelector(".wrapper");

let load = 0;

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
window.addEventListener("load", () => {
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
});
