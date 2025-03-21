const treasure = {
  x: 100,
  y: 200,
};
const info = document.getElementById("info");
const map = document.getElementById("map");

console.log(map);
console.log(map.width);
console.log(map.height);
const wrap = document.getElementById("wrap");
const distance = document.getElementById("distance");

wrap.style.width = `${map.width}px`;
wrap.style.height = `${map.height}px`;
wrap.style.position = "relative";

info.style.height = "40px";

let treasureCircle = document.createElement("div");
treasureCircle.style = `width: 60px; height: 60px; position: absolute; top: ${treasure.x}px; left: 0; border: solid red 3px;`;
wrap.appendChild(treasureCircle);

treasureCircle.classList.add("fade");

map.onmousemove = function (event) {
  const coords = document.getElementById("coords");
  let distanceX = Math.abs(event.offsetX - treasure.x);
  let distanceY = Math.abs(event.offsetY - treasure.y);
  coords.value = `Координати: ${event.offsetX}`;
  if (distanceX < 60) {
    // умова, де знаходиться скарб - відстань від координат курсору до координат скарбу менше 30
    info.innerHTML = "<span style='color: red;'>Скарб тут!</span>";
    treasureCircle.classList.remove("fade");
  } else {
    info.innerHTML = "Скарб не тут!";
    treasureCircle.classList.add("fade");
    distance.innerHTML = `До скарбу: ${Math.sqrt(distanceX+distanceY).toFixed(2)}`
  }
};
