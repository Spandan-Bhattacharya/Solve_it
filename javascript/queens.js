
document.addEventListener('DOMContentLoaded', initializeChessboard);

let queensPlacement = [];
function initializeChessboard() {
  const chessboard = document.getElementById('chessboard');
  queensPlacement = [];
  
  for (let row = 0; row < Number(document.getElementById("size").value); row++) {
    for (let col = 0; col < Number(document.getElementById("size").value); col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      if(((row+1)%2==0&&(col+1)%2==0)||((row+1)%2!=0&&(col+1)%2!=0)){
        square.style.backgroundColor="#b58863";
      }else{
        square.style.backgroundColor="#f0d9b5";
      }
      square.dataset.row = row + 1;
      square.dataset.col = col + 1;
      square.textContent = queensPlacement.includes(col + 1) ? '♛' : ' ';
      square.classList.add(queensPlacement.includes(col + 1) ? 'queen' : getSquareColor(row, col));
      square.addEventListener('click', () => toggleQueen(row, col));
      chessboard.appendChild(square);
    }
  }

  document.addEventListener('keydown', handleKeyPress);
}

function getSquareColor(row, col) {
  return (row + col) % 2 === 0 ? 'white' : 'black';
}

function toggleQueen(row, col) {
  const existingQueen = queensPlacement.find(q => q.row === row && q.col === col);

  if (existingQueen) {
    removeQueen(row, col);
  } else {
    placeQueen(row, col);
  }
}

function placeQueen(row, col) {
  if (queensPlacement.length < Number(document.getElementById("size").value)) {
    queensPlacement.push({ row, col });
    updateSquare(row, col, '♛', 'queen');
  }
}

function removeQueen(row, col) {
  queensPlacement = queensPlacement.filter(q => !(q.row === row && q.col === col));
  updateSquare(row, col, getSquareColor(row, col) === 'white' ? ' ' : ' ', 'queen');
}

function solveQueens() {
    queensPlacement = queensPlacement.filter(q => q.row <= Number(document.getElementById("size").value) && q.col <= Number(document.getElementById("size").value));
    queensPlacement.length = Math.min(queensPlacement.length, Number(document.getElementById("size").value));
  
    // Clear the chessboard
    const chessboard = document.getElementById('chessboard');
    chessboard.style.gridTemplateColumns=`repeat(${Number(document.getElementById("size").value)}, 50px)`;
    chessboard.innerHTML = '';
  
    // Reinitialize the chessboard
    initializeChessboard();
    solve(0)? displaySolution():document.getElementById("nosol").innerText="No Solution Exist";
  }
  

function solve(row) {
  if (row === Number(document.getElementById("size").value)) {
    return true;
  }

  for (let col = 0; col < Number(document.getElementById("size").value); col++) {
    if (isSafe(row, col)) {
      placeQueen(row, col);

      if (solve(row + 1)) {
        return true;
      }

      removeQueen(row, col);
    }
  }

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

function displaySolution() {
  document.getElementById("nosol").innerText="";
  queensPlacement.forEach(queen => {
    const square = document.querySelector(`.square[data-row="${queen.row + 1}"][data-col="${queen.col + 1}"]`);
    square.classList.add('queen');
  });
}

function resetGame() {
    queensPlacement = [];
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = ''; // Clear the chessboard
    initializeChessboard(); // Reinitialize the chessboard
  }
  
function handleKeyPress(event) {
  if (event.key === 'Delete' || event.key === 'Backspace') {
    const selectedSquare = document.querySelector('.selected');
    if (selectedSquare) {
      const row = parseInt(selectedSquare.dataset.row, 10) - 1;
      const col = parseInt(selectedSquare.dataset.col, 10) - 1;
      removeQueen(row, col);
    }
  }
}

function updateSquare(row, col, content, className) {
  const square = document.querySelector(`.square[data-row="${row + 1}"][data-col="${col + 1}"]`);
  square.textContent = content;
  square.className = 'square ' + className;
}

