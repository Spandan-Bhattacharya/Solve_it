function setGrid() {

  const input = document.querySelector("#grid");
  const size = 4;

  for (let i = 0; i < size; i++) {
    let rows = document.createElement("div");
    input.appendChild(rows);
    rows.className = "rows";

    for (let j = 0; j < size; j++) {
      let field = document.createElement("input");
      field.type = "number";
      field.className = "cells";
      field.id = `grid${i}${j}`;
      let flex = document.createElement("div");
      flex.className = "flex";
      flex.style.display = "inline";

      rows.appendChild(flex);
      flex.appendChild(field);
    }

  }
}
document.getElementById("submitButton").addEventListener("click", (e) => {
  e.preventDefault(); // Prevents the form from being submitted and page refresh
  calculateGrid();
});
function calculateGrid() {
  let n =4;
  let mat = [];
  for (let i = 0; i < n; i++) {
    mat[i] = [];
    for (let j = 0; j < n; j++) {
      if (document.getElementById(`grid${i}${j}`).value) {
        mat[i][j] =parseInt(document.getElementById(`grid${i}${j}`).value);
      }
      else mat[i][j] = '.';
    }
  }
//  console.log(mat);
if(isValid(mat)){

  solve(mat);
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
      
          document.getElementById(`grid${i}${j}`).value=mat[i][j];
        
       
      }
    }
  }
    else {
    if (!document.getElementById("errorMessage")) {
      let errorMessage = document.createElement("div");
      errorMessage.innerHTML = "Invalid input!. Please enter valid Numbers.";
      errorMessage.style.color = "red";
      errorMessage.id = "errorMessage";
      document.body.appendChild(errorMessage);

      setTimeout(function () {
        document.body.removeChild(errorMessage);
        resetGrid();
      }, 2000);
    }
  }
  }

  
  // document.getElementById("resultdet").innerHTML = ans;
  // document.querySelector("#resultboxdet").style.display = "block";


function isValid(board){
  let n=4;
  //check columns
  let f=1;
  for(let i=0;i<n;i++){
    for(let j=0;j<n;j++){
      if(board[i][j]!='.'){
        if(check(board,i,j,board[i][j])==0)return false;
      }
    }
  }
  return true;

}
function check(board,i,j,cond){
  
  
  let a=true;
  let b=cond;
  for(let k=0;k<4;k++){
      if((board[i][k]==b&&(k^j)) || (board[k][j]==b&&(k^i))) a=false;
      }
  
let r=Math.floor(i/2)*2;
let c=Math.floor(j/2)*2;
for(let p=r;p<r+2;p++){
  for(let q=c;q<c+2;q++){
      if(board[p][q]==b && p!=i&&q!=j) a=false;
      }
  }
  return a;

}

function solve(board){
  
  for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
          if(board[i][j]=='.'){
             
              
              for(let k='1';k<='4';k++){
                  if(check(board,i,j,k)){
                      
                      board[i][j]=parseInt(k);
                      if(solve(board)){return 1;}
                      else{
                          board[i][j]='.';
                      }
                      
                      
                      
                  }
                  else{
                      continue;
                  }
              }
             return 0;
          }
          
              
          
      }
  }
  return 1;
}

function resetGrid(){
const size = 4;

for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const field = document.getElementById(`grid${i}${j}`);
    if (field) {
      // Set the value to an initial state or clear it
      field.value = ''; // You can set it to any default value you prefer
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


//Dark mode to Light Mode
const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');

toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
    }else{
        body.style.background = 'black';
        body.style.color = 'white';
        body.style.transition = '2s';
    }
});

  

