
let wordContainer = document.querySelector(".word-container");
let hintContainer = document.querySelector(".hint-container");
let timerContainer = document.querySelector(".time-container");
const submitBtn = document.querySelector(".submit");
const refreshBtn = document.querySelector(".refresh");
let answer = document.querySelector("#input");
let currentWord;
let tempWord;
let currentHint;
let click = 0;
const resultContainer = document.querySelector(".result-container");
let message = document.querySelector(".message");

let timer = 30;

function generateRandomWord() {
    let ind = Math.floor(Math.random() * words.length);
    currentWord = words[ind].word;
    currentHint = words[ind].hint;
    tempWord = jumble();
    letterGeneration(tempWord);
    hintContainer.innerHTML = `<p><b>HINT :</b> ${currentHint}</p>`;
    
    timerFunction();
}

function letterGeneration(tempWord) {

    for (let i = 0; i < tempWord.length; i++) {
        const letter = document.createElement("div");
        letter.innerText = tempWord[i];
        letter.classList.add("letter");      
        wordContainer.appendChild(letter);
    }
}

function jumble() {

    var a = currentWord.split("");
    var n = a.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }

    var newWord = "";
    for(var i = 0; i < n; i++) newWord = newWord + a[i];
    
    tempWord = newWord;
    return tempWord;
}

async function timerFunction() {

    for(let i = timer ; i >= 0; i--) {
        if(click) break;
        timerContainer.innerHTML = `<p><b>Time Left:</b> ${i}s</p>`;
        await sleep(1000);
    }

    if(answer.value.toUpperCase() !== currentWord.toUpperCase()) {
        resultContainer.style.display = "flex";
        resultContainer.innerHTML = `<p class="message"><b>Wrong!</b> Correct Word : <b>${currentWord}</b>.</p>`;
        resultContainer.style.color = "red";
    }
    else if(answer.value.toUpperCase() === currentWord.toUpperCase()) {
        resultContainer.style.display = "flex";
        resultContainer.innerHTML = `<p class="message"><b>You Guessed It Correct !</b></p>`;
        resultContainer.style.color = "green";
    }

    timerContainer.innerHTML = `<p><b>Time Left:</b> 30s</p>`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

submitBtn.addEventListener("click" , ()=> {
    click++;
})

refreshBtn.addEventListener("click" , ()=> {
   wordContainer.innerHTML = ``;
   hintContainer.innerHTML = ``;
   timer = 30;
   answer.value = "";
   resultContainer.style.display = "none";
   click = 0;
   generateRandomWord();
})


generateRandomWord();