let availableKeywords = [
    'Sudoku Solver: 4x4',
    'Sudoku Solver: 6x6',
    'Sudoku Solve: 8x8',
    'Sudoku Solve: 9x9',
    'Sudoku Solve: 10x10',
    'find way',
    'treasure hunt', // Corrected typo: 'trasure hunt' to 'treasure hunt'
    'find error',
];

//const searchInput = document.querySelector(".search-box");
const resultBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
// const icon = searchInput.querySelector(".search-btn");
// let linkTag = searchInput.querySelector("a");
// let webLink;

inputBox.onkeyup = function () {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
        result = availableKeywords.filter((keyword) => {
            return keyword.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    }
    display(result);
    if(!result.length) {
        resultBox.innerHTML='';
    }
      
}
function display(result){
    const content = result.map((list)=>{
        return "<li>" + list + "</li>";
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";

}
function selectInput(list){
    inputBox.value =list.innerHTML;
    resultBox.innerHTML='';
}
