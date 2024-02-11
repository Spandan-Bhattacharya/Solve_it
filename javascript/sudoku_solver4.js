
document.addEventListener('DOMContentLoaded', function(){
  const gridSize=4;
  const solveButton= document.getElementById("solve-btn");
  solveButton.addEventListener('click',solveSudoku);

  const sudokuGrid = document.getElementById("sudoku-grid");

  //creating sudoku grid and input cells

  for(let row=0;row<gridSize;row++){
      const newRow= document.createElement("tr");
      for(let col=0;col<gridSize;col++){
          const cell =document.createElement("td");
          const input = document.createElement("input");
          input.type="text";
          input.className="cell";
          input.id=`cell-${row}-${col}`;
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
  const inputValue = event.target.value.replace(/[^0-9]/g, '');
  event.target.value = inputValue;
  const parsedValue = parseInt(inputValue);

  if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 4) {
      event.target.classList.remove("output-cell");
      event.target.style.color = "black";
  } else {
      event.target.classList.add("output-cell");
      event.target.style.color = "red";
  }
}

async function solveSudoku(){
  const gridSize=4;
  const sudokuArray=[];

//fill the sudoku array

for(let row=0;row<gridSize;row++){
  sudokuArray[row]=[];
  for(let col=0;col<gridSize;col++){
      const cellId=`cell-${row}-${col}`;
      const cellValue= document.getElementById(cellId).value;
      sudokuArray[row][col]=cellValue !== "" ? parseInt(cellValue):0;
  }
}
 //Indentifying user-input and mark

 for(let row=0;row<gridSize;row++){
      for(let col=0;col<gridSize;col++){
          const cellId=`cell-${row}-${col}`;
          const cell=document.getElementById(cellId);

          if(sudokuArray[row][col]!==0){
              cell.classList.add("user-input");
          }else {
              cell.classList.add("output-cell");
          }


      }
          
  }

  //Solving the soduko and dosplaying the solution
  if(solveSudokuHelper(sudokuArray)){
      for(let row=0;row<gridSize;row++){
          for(let col=0;col<gridSize;col++){
              const cellId=`cell-${row}-${col}`;
              const cell=document.getElementById(cellId);

              //filling in solved valued and applying animations
               if(!cell.classList.contains("user-input")){
                  cell.value=sudokuArray[row][col];
                  cell.classList.add("solved");
                  await sleep(60); //delay for visualisation
               }
          }

      }
  }else{
      alert("No solution exists for the given Sudoku puzzle.");
  }
}

function solveSudokuHelper(board){
  const gridSize=4;

  for(let row = 0 ;row < gridSize ; row++){
      for(let col=0;col<gridSize;col++){
          if(board[row][col]===0 ){
              for(let num=1;num<=4;num++){
                  if(isValidMove(board,row,col,num)){
                      board[row][col]=num;

                      //recursively check if there is a solution

                      if(solveSudokuHelper(board)){
                          return true; //solved
                      }

                      board[row][col]=0;  //Backtrack
                  }
              }
              return false; //No valid number found
          }
      }
  }

  return true ;//All cekks filled
}

function isValidMove(board,row,col,num){
  const gridSize = 4;

  //Check row and column for conflicts

  for(let i=0;i<gridSize;i++){
      if(board[row][i] === num || board [i][col] === num){
          return false;//Conflict found
      }
  }

  //Check the 3*3 subgrid conflicts

  const startRow= Math.floor(row / 2)*2;
  const startCol= Math.floor(col / 2)*2;

  for(let i= startRow; i < startRow + 2 ;i++){
      for(let j= startCol; j<startCol + 2 ; j++){
          if(board[i][j]==num){
              return false; //Conflict found
          }
      }
  }
  
  return true; //No conflicts found

}

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}
function resetGrid() {
  const gridSize = 4;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const field = document.getElementById(`cell-${i}-${j}`);
      if (field) {
        field.value = "";
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

// Call gridReset to attach the event listener to the resetButton
gridReset();

