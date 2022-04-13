const gameContainer = document.querySelector(".game-container");
const wordContainer = document.querySelector(".word-container");
const lettersContainer = document.querySelector(".letters-buttons");

// global variables

const MAX_GUESSES = 6;
let guesses = 0;
let guessedLetters = [];

// create alphabet buttons

for (let i = 0; i < 26; i++) {
  const letter = document.createElement("button");
  letter.innerHTML = String.fromCharCode(i + 65);
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
window.onload = async () => {
  const word = await getWord();
  console.log(word);
  createSpaces(word);
  alphabet.forEach((char) => {
    char.addEventListener("click", () => {
      if (guesses < MAX_GUESSES) {
        if (word.includes(char.innerHTML)) {
          const letterSpaces = document.querySelectorAll(".letter-space");
          letterSpaces.forEach((letterSpace, index) => {
            if (letterSpace.innerHTML === "-") {
              letterSpace.innerHTML = char.innerHTML;
              guessedLetters.push(char.innerHTML);
            }
          });
        }
        if (!guessedLetters.includes(char.innerHTML)) {
          guessedLetters.push(char.innerHTML);
          guesses++;
          console.log(guessedLetters);
        }
      }
    });
  });
};
