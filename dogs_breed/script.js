window.onload  = function () {
  let grounds = ["tan", "pink", "red"];
  let irises = {
    1: {
      ground: "tan",
      src: "https://js.web-online.net.ua/fl2.jpg"
    },
    2: {
      ground: "pink",
      src: "https://js.web-online.net.ua/fl1.jpg"
    },
    3: {
      ground: "red",
      src: "https://plus.unsplash.com/premium_photo-1677178628425-84a64dc416b6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  }
  function generateGrounds(grounds) {
    for (let groundName of grounds){
        let ground = document.createElement("div");
        ground.id = groundName;
        ground.style.width = "400px";
        ground.style.height = "300px";
        ground.style.background = groundName;
        ground.style.display = "inline-block";
        ground.style.border = "none";
        document.body.appendChild(ground);
    }
  }

  function generateIrises(irises){
    for (let key in irises){
      let value = irises[key];
      let image = document.createElement("img");
      image.id = `iris${key}`;
      image.class = "iris";
      image.style.position = "absolute";
      image.style.left = "120px",
      image.style.top = `${10+110*(key-1)}px`;
      image.src = value.src;
      image.draggable = true;
      image.dataset.breed = value.ground;
      document.body.appendChild(image);
    } 
  }

  generateGrounds(grounds);
  generateIrises(irises);

}



const tan = document.getElementById("tan"); // Поле
const pink = document.getElementById("pink"); // Поле

const showCoords = document.getElementById("showCoords");
const state = document.getElementById("state");

const irises = document.getElementsByClassName("iris"); // Ириси

let irisesState = [];
for (let i = 0; i < irises.length; i++) {
  // створення масиву для відстеження irises
  irisesState[irises[i].id] = true;
}

for (let i = 0; i < irises.length; i++) {
  // подія натискання миші
  irises[i].addEventListener("mousedown", go);
}

function go(event) {
  const flower = document.getElementById(event.target.id);
  const breed = flower.dataset.breed;
  // console.log(breed);
  const coords = getCoords(flower);
  // shiftX - сдвиг курсора от левого края картинки
  const shiftX = event.pageX - coords.left;
  // shiftY - сдвиг курсора от верхнего края картинки
  const shiftY = event.pageY - coords.top;
  console.log(shiftX, shiftY);

  function moveAt(event) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    const left = event.pageX - shiftX;
    const top = event.pageY - shiftY;

    flower.style.left = left + "px";
    flower.style.top = top + "px";
    showCoords.innerHTML = `x: ${flower.style.left} y: ${flower.style.top}`;
    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
        //irisesState[flower.id] = true;
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  flower.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    tan.style.border = "none";
    pink.style.border = "none";
    // отримуємо координати квітки
    const left = parseInt(flower.style.left);
    const top = parseInt(flower.style.top);
    // перевірка, чи потрапляє на поле tan квітка з координатами left, top
    if (onField(tan, left, top)) {
      state.innerHTML = flower.id + " сорт " + breed + " відпускаємо на поле tan!";
      if (breed == "tan") {
        irisesState[flower.id] = true;
      } else {
        irisesState[flower.id] = false;
      }
    }
    // перевірка, чи потрапляє на поле pink квітка з координатами left, top
    if (onField(pink, left, top)) {
        state.innerHTML = flower.id + " сорт " + breed + " відпускаємо на поле pink!";
        if (breed == "pink") {
          irisesState[flower.id] = true;
        } else {
          irisesState[flower.id] = false;
        }
    }
    document.onmousemove = null;
    flower.onmouseup = null;
  }
  flower.ondragstart = function () {
    return false; // скасування drag and drop браузера
  };
}

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(field, left, top) {
  let f = getCoords(field);
  if (
    left > f.left &&
    left < f.left + f.width &&
    top > f.top &&
    top < f.top + f.height
  ) {
    return true;
  }
  return false;
}

// функция возвращает размер элемента и его координаты относительно объемлющего элемента.
function getCoords(elem) {
  const box = elem.getBoundingClientRect();
  //pageYOffset и pageXOffset возвращают скроллирование окна в пикселях
  return {
    width: box.width,
    height: box.height,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}


function check() {
  let allOnPlace = true;
  for (let key in irisesState) {
    if (!irisesState[key]) {
      allOnPlace = false;
      break;
    }
  }
  if (allOnPlace) {
    state.innerHTML = "Всі квітки на місці!";
  } else {
    state.innerHTML = "Не всі квітки на місці!";
  }
}