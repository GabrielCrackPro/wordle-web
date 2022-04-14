const gameContainer = document.querySelector(".game-container");
const wordContainer = document.querySelector(".word-container");
const guessesContainer = document.querySelector(".guesses-container");
const lettersContainer = document.querySelector(".letters-buttons");

// global variables

const MAX_GUESSES = 6;
let guesses = 0;
let guessedLetters = [];

// create alphabet buttons

for (let i = 0; i < 26; i++) {
  const letter = document.createElement("button");
  letter.innerHTML = String.fromCharCode(i + 97);
  letter.classList.add(
    "letter-button",
    "btn",
    "btn-lg",
    "btn-secondary",
    "ms-2"
  );
  lettersContainer.appendChild(letter);
}

const alphabet = document.querySelectorAll(".letter-button");

const getWord = async () => {
  const words = await fetch("./words.txt").then((res) => res.text());
  let wordsArray = words.split("\n");
  wordsArray = wordsArray.filter((word) => word.length >= 3);
  let randomIndex = Math.floor(Math.random() * wordsArray.length);
  let word = wordsArray[randomIndex];
  return word;
};

const createSpaces = (word) => {
  const letters = word.split("");
  for (let i = 0; i < letters.length; i++) {
    const letterSpace = document.createElement("span");
    letterSpace.innerHTML = "-";
    wordContainer.appendChild(letterSpace);
  }
};

const checkLetter = (letter) => {
  const letters = wordContainer.querySelectorAll("span");
  let correct = false;
  for (let i = 0; i < letters.length; i++) {
    if (letter === letters[i].innerHTML) {
      letters[i].innerHTML = letter;
      correct = true;
    }
  }
  return correct;
};
window.onload = async () => {
  const word = await getWord();
  const letters = word.split("");
  console.log(word);
  createSpaces(word);
};
