const closeIcon = document.querySelector(".close");
const footerDate = document.getElementById("date");
const icon = document.getElementById("icon");

// local storage

if (localStorage.getItem("theme") == null) {
  localStorage.setItem("theme", "light");
}

const local = localStorage.getItem("theme");

if (local == "light") {
  document.body.classList.remove("dark-theme");
  icon.src = "./images/moon.png";
} else if (local == "dark") {
  document.body.classList.add("dark-theme");
  icon.src = "./images/sun.png";
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
    icon.src = "./images/sun.png";
  } else {
    localStorage.setItem("theme", "light");
    icon.src = "./images/moon.png";
  }
});
// image toggle
let imgBx = document.querySelectorAll(".imgBx");
imgBx.forEach((slika) =>
  slika.addEventListener("click", () => {
    slika.classList.toggle("active");
  })
);

// current yera

footerDate.textContent = new Date().getFullYear();

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
