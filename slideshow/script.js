const links = [
  "images/landscape-photography-tips-yosemite-valley-feature.webp",
  "images/lanscape.jfif",
  "images/UK_advice-gardening-growing-poppies_header.jpg",
]; // масив шляхів до картинок
let i = 0;
let effect = "none";
let intervalId;

const effectButton = document.getElementById("get_effect");

const formEl = document.forms.effects;
console.log(formEl);

window.onload = function () {
  let slider = document.getElementById("slider");
  let nextButton = document.getElementById("next");
  let startSlideshow = document.getElementById("start_slideshow");
  let stopSlideshow = document.getElementById("stop_slideshow");
  startSlideshow.addEventListener("click", () => {intervalId = setInterval(next, 1000)});
  stopSlideshow.addEventListener("click", () => {clearInterval(intervalId)});

  nextButton.addEventListener("click", next);


  let imagesMini = document.querySelectorAll("img.mini");
  for (let i = 0; i < imagesMini.length; i++) {
    imagesMini[i].addEventListener("click", showSlide);
  }

  function showSlide(event) {
    let image = event.target;
    let src = image.src;
    console.log(src);
    slider.src = src;
  }

  function next() {
    i++;
    if (i >= links.length) {
      i = 0;
    }
    addEffect();
    slider.src = links[i];
    removeEffect();
  }
};

function addEffect() {
  slider.classList.add(effect);
}

function removeEffect() {
  slider.classList.remove(effect);
}

effectButton.addEventListener("click", getEffect);

function getEffect() {
  for (let i = 0; i < formEl.length; i++) {
    if (formEl[i].checked) {
      effect = formEl[i].value;
      console.log(effect);
    }
  }
}
