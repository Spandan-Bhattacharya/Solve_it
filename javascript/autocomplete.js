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

  'Bingo Game'

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

    } else {
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

    } else {
      puzzle.classList.remove("visible");
      puzzle.classList.add("hide");
    }
  }
  document.getElementById("puzz").style.display="block";
  document.getElementById("gum").style.display="block";

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
    let games = document.getElementsByClassName('game');
    let game;
    for (i = 0; i < games.length; i++) {
      game = games[i];
      game.classList.remove("visible");
      game.classList.add("hide");
    }

    let puzzles = document.getElementsByClassName('puzzle');
    let puzzle;
    for (i = 0; i < puzzles.length; i++) {
      puzzle = puzzles[i];
      puzzle.classList.remove("visible");
      puzzle.classList.add("hide");

    }
    document.querySelector(".searchButton i").classList.remove("fa-times");
    document.querySelector(".searchButton i").classList.add("fa-search");
  }
});

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
  //Search
  let games = document.getElementsByClassName('game');
  let game;
  let txtValue;
  let title;

  for (i = 0; i < games.length; i++) {
    game = games[i];
    title = game.getElementsByTagName('span');
    txtValue = title[0].innerText;
    if (txtValue==list.innerText) {

      game.classList.remove("hide");
      game.classList.add("visible");

    } else {
      game.classList.remove("visible");
      game.classList.add("hide");
    }
  }

  let puzzles = document.getElementsByClassName('puzzle');
  let puzzle;
  for (i = 0; i < puzzles.length; i++) {
    puzzle = puzzles[i];
    title = puzzle.getElementsByTagName('span');
    txtValue = title[0].innerText;

    if (txtValue==list.innerText) {

      puzzle.classList.remove("hide");
      puzzle.classList.add("visible");

    } else {
      puzzle.classList.remove("visible");
      puzzle.classList.add("hide");
    }
  }


  window.location.href = "#solvers";
}