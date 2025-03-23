let word = "прокрастинація";

let remain = word.length - 2;
let usedLetters = [];

let answer = []; // що відкрито
answer[0] = word[0]; // перша літера буде відкрита
answer[word.length - 1] = word[word.length - 1]; // остання літера буде відкрита

for (let i = 1; i < word.length - 1; i++) {
  answer[i] = "_"; // між першою та останньою літерою - знаки підкреслення
}

let answElement = document.getElementById("answ");
answElement.innerHTML = answer.join(" ");

let remainElement = document.getElementById("remain");
remainElement.innerHTML = remain;

let usedElement = document.getElementById("used");
usedElement.innerHTML = usedLetters.join(", ");

function guessLetter() {
  let guess = prompt("Введіть літеру").toLowerCase();

  if (guess.length !== 1) {
    alert("Будь ласка, введіть одну літеру.");
    return;
  }

  if (usedLetters.includes(guess)) {
    alert("Ви вже використовували цю літеру.");
    return;
  }

  usedLetters.push(guess);
  usedElement.innerHTML = usedLetters.join(", ");

  let correctGuess = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      answer[i] = guess;
      correctGuess = true;
    }
  }

  if (!correctGuess) {
    remain--;
  }

  answElement.innerHTML = answer.join(" ");
  remainElement.innerHTML = remain;

  if (remain === 0 || !answer.includes("_")) {
    if (!answer.includes("_")) {
      alert("Ви виграли!");
    } else {
      alert("Ви програли!");
    }
  }
}
