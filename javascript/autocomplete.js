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
  return availableKeywords.filter(keyword => keyword.toLowerCase().includes(input.toLowerCase()));
}

function display(result) {
  const content = result.map(list => `<li onclick="selectInput(this)">${list}</li>`);
  resultBox.innerHTML = `<ul>${content.join('')}</ul>`;
}

inputBox.addEventListener("keyup", function () {
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
    for (i = 0; i < boxs.length; i++) {
      box = boxs[i];
      box.style.display = '';
    }
    document.querySelector(".searchButton i").classList.remove("fa-times");
    document.querySelector(".searchButton i").classList.add("fa-search");
  }
});

function selectInput(list) {
  inputBox.value = list.innerHTML;
  resultBox.innerHTML = "";
  //Search
  for (i = 0; i < boxs.length; i++) {
    box = boxs[i];
    title = box.getElementsByTagName("span");
    txtvalue = title[0].innerText;
    if (txtvalue == list.innerText) {
      box.style.display = '';
    } else {
      box.style.display = 'none';
    }

  }
  window.location.href = "#solvers";
}
