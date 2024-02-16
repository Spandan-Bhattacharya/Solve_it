
var currentWord, currentHint;

var wordContainer = document.querySelector(".word-container");

var incorrectGuesses = 0, correctGuesses = 0;

function generateWord() {
    let ind = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[ind].word.toUpperCase();
    currentHint = wordList[ind].hint;
    console.log(currentWord);
    letterGeneration();
    keyGeneration();
}

function letterGeneration() {
    var wordLength = currentWord.length;

    for (let i = 0; i < wordLength; i++) {
        let letter = document.createElement("li");
        letter.classList.add("letter");
        wordContainer.appendChild(letter);
    }

    var hintContainer = document.querySelector(".hint-container");
    hintContainer.innerHTML = `<p><b>Hint :</b> ${currentHint}</p>`;
}

function keyGeneration() {
    let keyboard = document.querySelector(".keyboard");
    for (let i = 65; i <= 90; i++) {
        let key = document.createElement("button");
        key.innerText = String.fromCharCode(i);
        key.classList.add("keys");
        keyboard.appendChild(key);
    }

    solveFunction();
}

function solveFunction() {
    let keys = document.querySelectorAll(".keys");

    let letters = document.querySelectorAll(".letter");
    letters = Array.from(letters);

    // console.log(letters);
    Array.from(keys).forEach((e) => {
        e.addEventListener("click", (e) => {
            var typedLetter = e.target.innerText;
            var flag = 0;

            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === typedLetter) {
                    flag = 1;
                    break;
                }
            }


            if (flag) {
                for (let i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] === typedLetter) {
                        correctGuesses++;
                        letters[i].innerText = typedLetter;
                    }
                }

                if (correctGuesses == currentWord.length) {
                    let popUp = document.querySelector(".pop-up");
                    popUp.style.display = "flex";
                    let gif = document.querySelector(".gif-section img");
                    gif.src = `images/victory.gif`;
                    let message = document.querySelector(".message");
                    message.innerHTML = `Congrats 😄!! The word is: ${currentWord}`;
                }
            }
            else {
                incorrectGuesses++;

                let guess = document.querySelector(".guesses");
                guess.innerHTML = `Guesses : <span style="color: red;">${incorrectGuesses} / 6`;
                let image = document.querySelector(".image-section img");
                image.src = `images/hangman-${incorrectGuesses}.svg`;


                if (incorrectGuesses == 6) {
                    let popUp = document.querySelector(".pop-up");
                    popUp.style.display = "flex";
                    let gif = document.querySelector(".gif-section img");
                    gif.src = `images/lost.gif`;
                    let message = document.querySelector(".message");
                    message.innerHTML = `Oops!! 😑 The Correct word is: ${currentWord}`;
                }
            }
        })
    })
}

let reset = document.querySelector(".reset");

reset.addEventListener("click", () => {
    incorrectGuesses = 0, correctGuesses = 0;
    wordContainer.innerHTML = ``;
    
    let keyboard = document.querySelector(".keyboard");
    keyboard.innerHTML = ``;

    let guess = document.querySelector(".guesses");
    guess.innerHTML = `Guesses : <span style="color: red;">0 / 6`;
    let image = document.querySelector(".image-section img");
    image.src = `images/hangman-0.svg`;


    let popUp = document.querySelector(".pop-up");
    popUp.style.display = "none";

    generateWord();
})



generateWord();