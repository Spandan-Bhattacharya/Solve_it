document.addEventListener('DOMContentLoaded', function () {
  const gridSize = 16;
  const solveButton = document.getElementById("solve-btn");
  solveButton.addEventListener('click', solveSudoku);

  const sudokuGrid = document.getElementById("sudoku-grid");

  for (let row = 0; row < gridSize; row++) {
    const newRow = document.createElement("tr");
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.className = "cell";
      input.id = `cell-${row}-${col}`;
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
});

function handleInput(event) {
  let parsedValue = parseInt(event.target.value, 16);

  if (parsedValue >= 1 && parsedValue <= 15 || event.target.value == "G") {
    event.target.classList.remove("output-cell");
    event.target.style.color = "black";
  } else {
    event.target.classList.add("output-cell");
    event.target.style.color = "red";
  }

}

async function solveSudoku() {
  const gridSize = 16;
  const sudokuArray = [];


  for (let row = 0; row < gridSize; row++) {
    sudokuArray[row] = [];
    for (let col = 0; col < gridSize; col++) {
      const cellId = `cell-${row}-${col}`;
      const cell = document.getElementById(cellId);
      if (cell.classList.contains("output-cell")) {
        alert("Invalid Input!");
        resetGrid();
        Window.location.reload();
      }
      else {
        const cellValue = document.getElementById(cellId).value;
        if(cellValue !== "") {
          let val = parseInt(cellValue,16);
          if(val == NaN) val = 16;
          sudokuArray[row][col] = val;
        }else{
          sudokuArray[row][col] = 0;
        }
        // sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
      }

    }
  }

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

  if (solveSudokuHelper(sudokuArray)) {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const cellId = `cell-${row}-${col}`;
        const cell = document.getElementById(cellId);

        if (!cell.classList.contains("user-input")) {
          if (sudokuArray[row][col] >= 1 && sudokuArray[row][col] <= 15)
            cell.value = sudokuArray[row][col].toString(16).toUpperCase();
          else if (sudokuArray[row][col] == 16) cell.value = "G";
          cell.classList.add("solved");
          await sleep(20);
        }
      }

    }
  } else {
    alert("No solution exists for the given Sudoku puzzle.");
  }
}

function solveSudokuHelper(board) {
  const gridSize = 16;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 16; num++) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudokuHelper(board)) {
              return true;
            }

            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }

  return true;
}

function isValidMove(board, row, col, num) {
  const gridSize = 16;

  for (let i = 0; i < gridSize; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }


  const startRow = Math.floor(row / 4) * 4;
  const startCol = Math.floor(col / 4) * 4;

  for (let i = startRow; i < startRow + 4; i++) {
    for (let j = startCol; j < startCol + 4; j++) {
      if (board[i][j] == num) {
        return false;
      }
    }
  }

  return true;

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function resetGrid() {
  const gridSize = 16;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const field = document.getElementById(`cell-${i}-${j}`);
      if (field) {
        field.value = "";
        field.classList.remove("user-input");
        field.classList.remove("output-cell");
      }
    }
  }
}

function gridReset() {
  document.getElementById("resetButton").addEventListener("click", (e) => {
    e.preventDefault();
    resetGrid();
  });
}

gridReset();

