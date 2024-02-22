const availableKeywords = [
  'Sudoku Solver: 4x4',
  'Sudoku Solver: 6x6',
  'Sudoku Solver: 8x8',
  'Sudoku Solver: 9x9',
  'Word Unjumbler',
  'Number Solver',
  'Tower of Hanoi',
  '8 Puzzle Solver',
  'N Queen Solver',
  'Sorting Visualizer',
  'Sudoku Game: 4x4',
  'Sudoku Game: 6x6',
  'Sudoku Game: 8x8',
  'Sudoku Game: 9x9',
  'Simon Game',
  'Checker Game',
  '8 Puzzle Game',
  'Connect 4 Game',
  'Tic-Tac-Toe Game',
  'HangMan Game',
  'Word Scramble',
  'Rock Paper Scissor',
  'Crosswords',
  '2048',
  'Snake Game',
  'Tetris',
  'UNO',
  'Word Guessing',

];

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
const searchButton = document.querySelector(".searchButton");

let boxs = document.getElementsByClassName("box");
let box, title, txtvalue;

document.addEventListener("click", function (event) {
  const isSearchBox = event.target.closest(".searchBox");
  if ((!isSearchBox && event.target !== inputBox && event.target !== resultBox) || event.target === searchButton || event.target === searchButton.children[0]) {
    resultBox.innerHTML = "";
  }
});

function filterKeywords(input) {
  var filter, puzzles, puzzle, games, game, title, i, txtValue;
  filter = input.toLowerCase();
  games = document.getElementsByClassName('game');
  console.log(filter);
  for (i = 0; i < games.length; i++) {
    game = games[i];
    title = game.getElementsByTagName('span');
    txtValue = title[0].innerText;
    // let temp = Array.from(game.classList);
    console.log(txtValue.toLowerCase());
    if (txtValue.toLowerCase().indexOf(filter) > -1) {

      game.classList.remove("hide");
      game.classList.add("visible");

    } else{
      game.classList.remove("visible");
      game.classList.add("hide");
    }
  }

  puzzles = document.getElementsByClassName('puzzle');
  for (i = 0; i < puzzles.length; i++) {
    puzzle = puzzles[i];
    title = puzzle.getElementsByTagName('span');
    txtValue = title[0].innerText;
    // let temp = Array.from(puzzle.classList);
    console.log(txtValue.toLowerCase());

    if (txtValue.toLowerCase().indexOf(filter) > -1) {

      puzzle.classList.remove("hide");
      puzzle.classList.add("visible");

    } else{
      puzzle.classList.remove("visible");
      puzzle.classList.add("hide");
    }
  }

  return availableKeywords.filter(keyword => keyword.toLowerCase().includes(input.toLowerCase()));
}

function display(result) {
  const content = result.map(list => `<li onclick="selectInput(this)">${list}</li>`);
  resultBox.innerHTML = `<ul>${content.join('')}</ul>`;
}

inputBox.addEventListener("keyup", (e) => {
  const input = inputBox.value.trim();
  const result = input.length ? filterKeywords(input) : [];
  display(result);
});

inputBox.addEventListener("click", function () {
  let input = inputBox.value;

  if (input.length) {
    let result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    display(result);
  }
});

const viewportWidth = window.innerWidth;
searchButton.addEventListener("click", () => {
  inputBox.classList.toggle("active");

  if (inputBox.classList.contains("active")) {
    inputBox.style.width = "240px";
    inputBox.style.padding = "0 6px";
    if (viewportWidth <= 768) {
      if (viewportWidth <= 450) {
        inputBox.style.width = "100px";
        inputBox.style.padding = "0 4px";
      } else {
        inputBox.style.width = "150px";
        inputBox.style.padding = "0 5px";
      }
    }
    document.querySelector(".searchButton i").classList.remove("fa-search");
    document.querySelector(".searchButton i").classList.add("fa-times");
  } else {
    inputBox.style.width = "0px";
    inputBox.style.padding = "0px";
    inputBox.value = '';
    let puzzles = document.querySelectorAll(".puzzle");
    let games = document.querySelectorAll(".game");
    let game;
    let puzzle;

    for (i = 0; i < games.length; i++) {
      game = games[i];
      let temp = Array.from(game.classList);
      if (temp.indexOf("visible") >= 0) {
        game.classList.remove("visible");
        game.classList.add("hide");
      }

    }

    for (i = 0; i < puzzles.length; i++) {
      puzzle = puzzles[i];
      let temp = Array.from(puzzle.classList);
      if (temp.indexOf("visible") >= 0) {
        puzzle.classList.remove("visible");
        puzzle.classList.add("hide");
      }
    }
    document.querySelectorAll(".pg .box").forEach((e) => {
      e.classList.remove("hide");
      e.classList.add("visible");
    });
    document.querySelector('#Result').classList.remove("visible");
    document.querySelector('#Result').classList.add("hide");
    document.querySelector(".searchButton i").classList.remove("fa-times");
    document.querySelector(".searchButton i").classList.add("fa-search");
  }
});

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
  //Search

  let result = document.querySelector('#Result');
  document.querySelectorAll(".pg .box").forEach((e) => {
    e.classList.remove("visible");
    e.classList.add("hide");
  });
  for (i = 0; i < boxs.length; i++) {
    box = boxs[i];
    title = box.getElementsByTagName("span");
    txtvalue = title[0].innerText;
    if (txtvalue == list.innerText) {

      result.classList.remove("hide");
      result.classList.add("visible");
      box.classList.remove("hide");
      box.classList.add("visible");
    } else {
      let temp = Array.from(box.classList);
      if (temp.indexOf("visible") >= 0) {
        box.classList.remove("visible");
        box.classList.add("hide");
      }

    }

  }
  window.location.href = "#solvers";
}