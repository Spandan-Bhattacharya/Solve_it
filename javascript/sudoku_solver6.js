function setGrid() {
  const input = document.querySelector("#grid");
  const size = 6;

  for (let i = 0; i < size; i++) {
    let rows = document.createElement("div");
    input.appendChild(rows);
    rows.className = "rows";

    for (let j = 0; j < size; j++) {
      let field = document.createElement("input");
      field.type = "text";
      field.className = "cells";
      field.id = `grid${i}${j}`;
      field.addEventListener("input", handleInput);
      let flex = document.createElement("div");
      flex.className = "flex";
      flex.style.display = "inline";
      rows.appendChild(flex);
      flex.appendChild(field);
    }
  }
}

function handleInput(event) {
  const inputValue = event.target.value.replace(/[^0-9]/g, '');
  event.target.value = inputValue;
  const parsedValue = parseInt(inputValue);

  if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 6) {
      event.target.classList.remove("output-cell");
  } else {
      event.target.classList.add("output-cell");
  }
}

document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the form from being submitted and page refresh
  calculateGrid();
});

function calculateGrid() {
  let n = 6;
  let mat = [];
  let invalidCells = [];

  for (let i = 0; i < n; i++) {
    mat[i] = [];
    for (let j = 0; j < n; j++) {
      let inputValue = document.getElementById(`grid${i}${j}`).value;
      if (inputValue === "") {
        mat[i][j] = ".";
        document.getElementById(`grid${i}${j}`).classList.add("output-cell");
      } else {
        let parsedValue = parseInt(inputValue);
        if (isNaN(parsedValue) || parsedValue < 1  || parsedValue > 6) {
          invalidCells.push({ row: i, col: j });
        } else {
          mat[i][j] = parsedValue;
        }
      }
    }
  }

  if (invalidCells.length === 0 && isValid(mat)) {
    solve(mat);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        document.getElementById(`grid${i}${j}`).value = mat[i][j];
      }
    }
  } else {
    if (!document.getElementById("errorMessage")) {
      let errorMessage = document.createElement("div");
      errorMessage.innerHTML = "Invalid input!. Please enter valid Numbers.";
      errorMessage.style.color = "red";
      errorMessage.id = "errorMessage";
      document.body.appendChild(errorMessage);

      setTimeout(function () {
        document.body.removeChild(errorMessage);
        // resetInvalidCells(invalidCells);
        resetGrid();
      }, 2000);
    }
  }
}

// function resetInvalidCells(invalidCells) {
//   invalidCells.forEach(cell => {
//     document.getElementById(`grid${cell.row}${cell.col}`).value = "";
//   });
// }

function isValid(board) {
  let n = 6;
  //check columns
  let f = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] != ".") {
        if (check(board, i, j, board[i][j]) == 0) return false;
      }
    }
  }
  return true;
}
function check(board, i, j, cond) {
  let a = true;
  let b = cond;
  for (let k = 0; k < 6; k++) {
    if ((board[i][k] == b && k ^ j) || (board[k][j] == b && k ^ i)) a = false;
  }

  let r = Math.floor(i / 2) * 2;
  let c = Math.floor(j / 3) * 3;
  for (let p = r; p < r + 2; p++) {
    for (let q = c; q < c + 3; q++) {
      if (board[p][q] == b && p != i && q != j) a = false;
    }
  }
  return a;
}

function solve(board) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] == ".") {
        for (let k = "1"; k <= "6"; k++) {
          if (check(board, i, j, k)) {
            board[i][j] = parseInt(k);
            if (solve(board)) {
              return 1;
            } else {
              board[i][j] = ".";
            }
          } else {
            continue;
          }
        }
        return 0;
      }
    }
  }
  return 1;
}

function resetGrid() {
  const size = 6;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const field = document.getElementById(`grid${i}${j}`);
      if (field) {
        // Set the value to an initial state or clear it
        field.value = ""; // You can set it to any default value you prefer
        field.classList.remove("output-cell");
      }
    }
  }
}

// function gridReset(){
//  document.getElementById("resetButton").addEventListener("click", () => {
//     resetGrid();
//   });
// }

document.getElementById("resetButton").addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the form from being submitted and page refresh
  resetGrid();
});

