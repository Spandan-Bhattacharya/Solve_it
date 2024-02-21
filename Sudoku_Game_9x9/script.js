let currentDifficulty = 0; // 0: easy, 1: medium, 2: hard, 3: super hard
const difficulties = [
    [
        [[7,2,3,0,0,0,1,5,9] , [6,0,0,3,0,2,0,0,8] , [8,0,0,0,1,0,0,0,2] , [0,7,0,6,5,4,0,2,0] , [0,0,4,2,0,7,3,0,0] , [0,5,0,9,3,1,0,4,0] , [5,0,0,0,7,0,0,0,3] , [4,0,0,1,0,3,0,0,6] , [9,3,2,0,0,0,7,1,4]],
        [[0,0,7,1,5,0,9,0,0] , [0,0,9,4,3,0,0,0,0] , [5,0,0,0,0,2,0,1,3] , [0,0,6,5,0,4,0,2,9] , [4,3,0,0,8,0,0,5,7] , [9,7,0,3,0,1,4,0,0] , [7,6,0,2,0,0,0,0,5] , [0,0,0,0,9,6,2,0,0] , [0,0,3,0,4,5,6,0,0]],
        // Add more easy puzzles
    ],
    [
        [[0,0,5,0,0,7,0,0,0] , [0,0,0,0,0,0,9,0,2] , [7,0,1,2,0,9,6,0,0] , [9,5,0,0,8,0,3,0,0] , [0,2,0,0,3,6,0,0,0] , [0,0,7,0,0,5,0,1,0] , [0,0,0,6,0,0,0,5,9] , [5,3,0,0,9,0,0,0,0] , [0,0,0,1,5,0,2,6,0]],
        [[0,0,2,0,8,0,0,0,0] , [0,1,0,0,0,3,4,9,0] , [0,0,9,0,7,0,0,0,5] , [6,4,0,0,0,0,3,0,0] , [0,0,0,0,0,4,8,0,9] , [0,0,5,0,2,7,0,0,4] , [0,9,0,0,0,0,0,1,0] , [0,0,0,8,9,2,0,0,0] , [0,0,7,1,4,0,0,2,0]],

        
        // Add more medium puzzles
    ],
    [
       [[0,1,0,0,2,0,0,0,0] , [0,0,0,0,0,8,3,0,0] , [0,0,0,4,5,0,0,1,6] , [1,0,0,0,0,3,0,0,0] , [0,0,0,0,0,0,0,7,2] , [0,0,9,0,0,0,0,4,0] , [6,7,0,5,0,0,0,3,0] , [0,4,2,0,0,0,6,0,0] , [0,0,0,9,0,7,0,0,0]],
       [[0,0,0,7,0,6,0,0,0] , [0,8,0,4,0,0,0,0,3] , [0,3,0,0,0,0,1,0,9] , [0,0,8,5,7,0,0,0,0] , [0,1,5,3,9,0,0,7,0] , [0,0,3,8,0,2,0,0,0] , [0,0,0,0,0,0,0,9,0] , [4,0,7,0,0,0,0,0,5] , [0,0,0,0,0,0,8,2,0]]
        // Add more hard puzzles
    ],
];

let lives = 3;
let totalSeconds = 600; // 10 minutes in seconds
let timerInterval;

document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");

    //creating sudoku grid and input cells

    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            input.dataset.row = row;
            input.dataset.col = col;
            input.addEventListener("keydown", function (e) {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                }
            });
            input.addEventListener("input", handleInput);
            cell.appendChild(input);
            newRow.appendChild(cell);

        }
        sudokuGrid.appendChild(newRow);

    }
    changeDifficulty(0);
    updateTimer();
});

function changeDifficulty(difficulty) {
    currentDifficulty = difficulty;
    resetGrid();
}

function board() {
    const gridSize = 9;
    const sudokuArray = [];

    //fill the sudoku array

    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }
    return sudokuArray;
}

function handleInput(event) {
    let row = event.srcElement.dataset.row;
    let col = event.srcElement.dataset.col;
    let b = [];
    b = board();
    console.log(b);
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = inputValue;
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9 && isValidMove(b, row, col, parsedValue)) {
        event.target.classList.remove("output-cell");
        event.target.style.color = "black";
    } else {
        event.target.classList.add("output-cell");
        event.target.style.color = "red";
        if (!isNaN(parsedValue)) {
            document.getElementById(`h-${lives}`).style.display="none";
            lives--;
        }
        if (lives<=0) {
            gameOver();
        }
    }
}

function gameOver() {
    alert("Game Over!");
    resetGrid();
}

async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = board();
    //Indentifying user-input and mark

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            } else {
                cell.classList.add("output-cell");
            }


        }

    }

    //Solving the soduko and dosplaying the solution
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                //filling in solved valued and applying animations
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(60); //delay for visualisation
                }
            }

        }
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
        resetGrid();
    }
}

function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if(board[row][col]>9||board[row][col]<0){
                return false;
            }
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        //recursively check if there is a solution

                        if (solveSudokuHelper(board)) {
                            return true; //solved
                        }

                        board[row][col] = 0;  //Backtrack
                    }
                }
                return false; //No valid number found
            }
        }
    }
    return true;//All cekks filled
}

function isValidMove(board, row, col, num) {
    if(num>9||num<1){
        return false;
    }
    const gridSize = 9;

    //Check row and column for conflicts

    for (let i = 0; i < gridSize; i++) {
        if ((i != col && board[row][i] === num) || (i != row && board[i][col] === num)) {
            return false;//Conflict found
        }
    }

    //Check the 3*3 subgrid conflicts

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (!(i == row && j == col) && board[i][j] == num) {
                return false; //Conflict found
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    complete();
    return true; //No conflicts found
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function resetGrid() {
    clearInterval(timerInterval);
    totalSeconds = (3 - currentDifficulty) * 600;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    lives = 3;
    document.getElementById(`h-1`).style.display="";
    document.getElementById(`h-2`).style.display="";
    document.getElementById(`h-3`).style.display="";
    const gridSize = 9;
    console.log(currentDifficulty);
    const puzzle = difficulties[currentDifficulty][Math.floor(Math.random() * difficulties[currentDifficulty].length)];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const field = document.getElementById(`cell-${i}-${j}`);
            if (field) {
                field.value = puzzle[i][j] !== 0 ? puzzle[i][j] : "";
                field.classList.remove("user-input");
                field.style.color = '#1e25e8';
                //   field.classList.remove("output-cell");
            }
        }
    }
}


function gridReset() {
    document.getElementById("resetButton").addEventListener("click", (e) => {
        e.preventDefault(); // Prevents the form from being submitted and page refresh
        resetGrid();
    });
}

function complete() {
    alert("Congratulation !!! You Solved The Game");
    clearInterval(timerInterval);
}

function updateTimer() {
    let timerElement = document.getElementById('timer');
    let minutes, seconds;
    console.log(totalSeconds);
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (totalSeconds <= 0) {
        clearInterval(timerInterval);
        alert("Time's UP");
        resetGrid();
    } else {
        totalSeconds--;
    }
}

timerInterval = setInterval(updateTimer, 1000); // Update the timer every second

// Call gridReset to attach the event listener to the resetButton
gridReset();