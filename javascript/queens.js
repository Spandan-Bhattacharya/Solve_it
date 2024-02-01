const boardSize = 8;
    let queensPlacement = [];

    function initializeChessboard() {
      const chessboard = document.getElementById('chessboard');
      chessboard.innerHTML = '';

      for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
          const square = document.createElement('div');
          square.classList.add('square');
          square.dataset.row = row;
          square.dataset.col = col;
          square.textContent = ' ';
          square.addEventListener('click', () => placeQueen(row, col));
          chessboard.appendChild(square);
        }
      }
    }

    function placeQueen(row, col) {
      queensPlacement.push({ row, col });
      const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
      square.textContent = '♛';
      square.classList.add('queen');
    }

    function solveQueens() {
      clearQueens();
      solve(0);
      displaySolution();
    }

    function solve(row) {
      if (row === boardSize) {
        // Successfully placed queens
        return true;
      }

      for (let col = 0; col < boardSize; col++) {
        if (isSafe(row, col)) {
          placeQueen(row, col);

          if (solve(row + 1)) {
            return true; // Continue to the next row
          }

          // If placing the queen in the current position leads to no solution, backtrack
          clearQueens();
        }
      }

      // No valid placement found in this row
      return false;
    }

    function isSafe(row, col) {
      for (const queen of queensPlacement) {
        if (
          queen.row === row ||
          queen.col === col ||
          Math.abs(queen.row - row) === Math.abs(queen.col - col)
        ) {
          return false;
        }
      }
      return true;
    }

    function clearQueens() {
      queensPlacement.forEach(queen => {
        const square = document.querySelector(`.square[data-row="${queen.row}"][data-col="${queen.col}"]`);
        square.textContent = ' ';
        square.classList.remove('queen');
      });
      queensPlacement = [];
    }

    function displaySolution() {
      queensPlacement.forEach(queen => {
        const square = document.querySelector(`.square[data-row="${queen.row}"][data-col="${queen.col}"]`);
        square.classList.add('queen');
      });
    }
    function resetGame() {
        clearQueens();
        initializeChessboard();
      }

    document.addEventListener('DOMContentLoaded', initializeChessboard);
  