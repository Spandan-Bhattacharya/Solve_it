const availableKeywords = [
    'Sudoku Solver: 4x4',
    'Sudoku Solver: 6x6',
    'Sudoku Solve: 8x8',
    'Sudoku Solve: 9x9',
    'Sudoku Solve: 10x10',
    'find way',
    'treasure hunt',
    'find error',
];

const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");

document.addEventListener("click", function (event) {
    const isSearchBox = event.target.closest(".search-box");
    if (!isSearchBox && event.target !== inputBox && event.target !== resultBox) {
        resultBox.innerHTML = "";
    }
});

function filterKeywords(input) {
    return availableKeywords.filter(keyword => keyword.toLowerCase().includes(input.toLowerCase()));
}

function display(result) {
    const content = result.map(list => `<li onclick='selectInput(this)'>${list}</li>`);
    resultBox.innerHTML = `<ul>${content.join('')}</ul>`;
}

inputBox.addEventListener("keyup", function () {
    const input = inputBox.value.trim();
    const result = input.length ? filterKeywords(input) : [];
    display(result);
});

inputBox.addEventListener("click", function () {
    const input = inputBox.value.trim();
    const result = input.length ? filterKeywords(input) : [];
    display(result);
});

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = '';
}
