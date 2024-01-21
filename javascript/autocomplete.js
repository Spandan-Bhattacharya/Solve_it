let availableKeywords = [
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
    // Check if the click was outside the search box and result box
    if (
        !event.target.closest(".search-box") &&
        event.target !== inputBox &&
        event.target !== resultBox
    ) {
        resultBox.innerHTML = ""; // Close suggestions
    }
});

inputBox.addEventListener("keyup", function () {
    let result = [];
    let input = inputBox.value;

    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
    }

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

function display(result) {
    const content = result.map((list) => {
        return "<li onclick='selectInput(this)'>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    inputBox.value = list.innerHTML;
    resultBox.innerHTML = '';
}
