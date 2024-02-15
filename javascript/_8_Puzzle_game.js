let numberArr = [
    1, 8, 2,
    0, 4, 3,
    7, 6, 5
]
let finalState = "[1,2,3,4,5,6,7,8,0]"
let gameArea = document.getElementById('game_area');
let gameControls = document.getElementById('game_controls')
let gameWinState = false;

let checkGameState = (arr) => {
    if ((JSON.stringify(arr) === finalState)) {
        alert('Congratulation !! You Won');
        reset();
    }
}

let checkInversion = (arr) => {
    let invCount = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] && arr[i] && arr[i] > arr[j]) {
                invCount++;
            }
        }
    }
    return invCount;
}

let isSolvable = (numberArr) => {
    let inversions = checkInversion(numberArr);
    if (inversions % 2 == 0) {
        return true;
    }
    return false;
}


let getRandomIntBetweenRange = (min, max) => {
    return Math.floor(Math.random(min, max) * (max - min + 1) + min);
}


let shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let numberBetweenRange = getRandomIntBetweenRange(0, i);
        temp = arr[i];
        arr[i] = arr[numberBetweenRange];
        arr[numberBetweenRange] = temp;
    }
    return arr;
}


let renderUi = function (flag) {
    let initialRender = flag;
    if (initialRender) {
        elementFactory();
    } else {
        repaint();
    }
}

let reset = () => {
    let preGameShuffle = shuffleArray(numberArr);
    let isGameSolvable = isSolvable(preGameShuffle);
    if (isGameSolvable) {
        numberArr = preGameShuffle;
    } else {
        reset();
    }
    gameWinState = false;
    renderUi(false);
}

let elementFactory = function () {
    let resetButton = document.createElement('button');
    gameControls.appendChild(resetButton);
    resetButton.classList.add('reset_btn')
    resetButton.innerText = 'RESET'
    resetButton.addEventListener('click', reset);
    for (var i = 0; i < 9; i++) {
        let number_div = document.createElement('div');
        gameArea.appendChild(number_div);
        number_div.classList.add('number-block');
        number_div.setAttribute('data-number', numberArr[i]);
        number_div.setAttribute('data-index', i);
        number_div.innerText = number_div.getAttribute('data-number');
        number_div.classList.add('number_class');
        number_div.addEventListener('click', evaluate);
        if (numberArr[i] === 0) {
            number_div.classList.add('void_class');
        }
    }

}

let repaint = () => {
    willRepaintGame.then(function () {
        let numberBlocks = document.getElementsByClassName('number-block');
        debugger;
        for (let key in numberBlocks) {
            if (typeof numberBlocks[key] === 'object') {
                numberBlocks[key].setAttribute('data-number', numberArr[key]);
                numberBlocks[key].innerText = numberBlocks[key].getAttribute('data-number');
                if (numberBlocks[key].classList.contains('void_class')) {

                    numberBlocks[key].classList.remove('void_class');
                } else if (numberArr[key] === 0) {
                    numberBlocks[key].classList.add('void_class');
                }
            }
        }
    }).then(function () {
        setTimeout(function () {
            checkGameState(numberArr);
        }, 100);
    })
}

let willRepaintGame = new Promise((resolve, reject) => {
    resolve(); // resolve regardless;
});

let swapFunction = function (temp, arr, i, j) {
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    temp = null;
    return temp, arr;
}

let evaluate = function (e) {
    let currNumClicked = parseInt(e.target.dataset.number);
    if (currNumClicked === 0) return false;
    let temp;
    let numberState = numberArr;
    let indexOfNumber = numberState.indexOf(currNumClicked);
    let voidCases = [2, 3, 5, 6]
    let targetElementIndex = parseInt(e.target.dataset.index);

    if (voidCases.indexOf(targetElementIndex) >= 0) {
        if (targetElementIndex === 2 || targetElementIndex === 5) {
            if (numberState[indexOfNumber + 1] === 0) return false;
        } else if (targetElementIndex === 3 || targetElementIndex === 6) {
            if (numberState[indexOfNumber - 1] === 0) return false;
        }
    }

    //if the number clicked is at index 0
    if (indexOfNumber === 0) {
        if (numberState[1] === 0) {
            temp, numberState = swapFunction(temp, numberState, 1, 0);
        } else if (numberState[3] === 0) {
            temp = numberState[3];
            numberState[3] = numberState[0];
            numberState[0] = temp;
            temp = null;
        }

    }

    //if the number clicked is at index 1 to 7

    if (indexOfNumber >= 1 && indexOfNumber <= 8) {
        //check for 0
        if (numberState[indexOfNumber - 1] === 0) {
            temp, numberState = swapFunction(temp, numberState, indexOfNumber - 1, indexOfNumber);
        } else if (numberState[indexOfNumber + 1] === 0) {
            temp, numberState = swapFunction(temp, numberState, indexOfNumber + 1, indexOfNumber);
        } else if (numberState[indexOfNumber + 3] === 0) {
            temp, numberState = swapFunction(temp, numberState, indexOfNumber + 3, indexOfNumber);
        } else if (numberState[indexOfNumber - 3] === 0) {
            temp, numberState = swapFunction(temp, numberState, indexOfNumber - 3, indexOfNumber);
        } else {
            return false;
        }
    }

    numberArr = numberState;
    //check for game State
    renderUi(false);
}

/* game start */
renderUi(true);