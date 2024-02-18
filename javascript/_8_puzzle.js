document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 3;
    const sudokuGrid = document.getElementById("sudoku-grid");

    //creating sudoku grid and input cells

    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
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

    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 8) {
        if (parsedValue == 0) {
            event.target.classList.remove("output-cell");
            event.target.style.color = "white";
            event.target.style.backgroundColor = "black";
        } else {
            event.target.classList.remove("output-cell");
            event.target.style.color = "black";
            event.target.style.backgroundColor = "";
        }
    } else {
        event.target.classList.add("output-cell");
        event.target.style.color = "red";
        event.target.style.backgroundColor = "";
    }
}

let puzzleState = [];
const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const maxIterations = 10000;
// Function to generate a random permutation of the numbers 1 to 8
function getRandomPermutation() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
}

// Function to display the puzzle board
function displayBoard(numbers) {
    puzzleState = [...numbers];
    gridSize = 3
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            document.getElementById(cellId).value = puzzleState[(row * 3) + col];
            if(puzzleState[(row * 3) + col]===0){
                document.getElementById(cellId).style.backgroundColor = "black";
                document.getElementById(cellId).style.color = "white";
            }else{
                document.getElementById(cellId).style.backgroundColor = ""; 
                document.getElementById(cellId).style.color = "black";
            }
        }
    }
}

// Function to randomize the puzzle
function randomize() {
    const randomNumbers = getRandomPermutation();
    displayBoard(randomNumbers);
}

// Function to Reset
function reset() {
    gridSize = 3
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            document.getElementById(cellId).value = '';
            document.getElementById(cellId).style.backgroundColor = ""; 
            document.getElementById(cellId).style.color = "black";
        }
    }
}

// Function to check if the custom order is valid
function isValidOrder(numbers) {
    const targetNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const duplicates = numbers.filter((item, index) => numbers.indexOf(item) !== index);
    return (
        duplicates.length === 0 &&
        numbers.length === 9 &&
        numbers.every((number) => targetNumbers.includes(number))
    );
}

// Function to solve the puzzle using A*
function solvePuzzle() {
    gridSize = 3
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            puzzleState[(row * 3) + col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }
    if (isValidOrder(puzzleState)) {
    } else {
        alert('Invalid input. Please enter a valid list of numbers.');
        return;
    }
    const solution = aStarAlgorithm(puzzleState);

    if (solution) {
        animateSolution(solution);
    } else {
        alert('Solution not found within the iteration limit.');
    }
}

// A* algorithm for solving the puzzle
function aStarAlgorithm(initialState) {
    const openSet = [initialState];
    const closedSet = new Set();
    const gScore = new Map();
    const fScore = new Map();
    const cameFrom = new Map();
    let iterations = 0;

    gScore.set(JSON.stringify(initialState), 0);
    fScore.set(JSON.stringify(initialState), heuristic(initialState));

    while (openSet.length > 0 && iterations < maxIterations) {
        const current = findLowestFScore(openSet, fScore);
        if (JSON.stringify(current) === JSON.stringify(goalState)) {
            const solutionPath = reconstructPath(cameFrom, current);
            console.log('Solution Tree Structure:');
            displaySolutionTables(solutionPath);
            return solutionPath;
        }

        openSet.splice(openSet.indexOf(current), 1);
        closedSet.add(JSON.stringify(current));

        const neighbors = getNeighbors(current);
        neighbors.forEach((neighbor) => {
            if (closedSet.has(JSON.stringify(neighbor))) {
                return;
            }

            const tentativeGScore = gScore.get(JSON.stringify(current)) + 1;
            if (!openSet.includes(neighbor) || tentativeGScore < gScore.get(JSON.stringify(neighbor))) {
                cameFrom.set(JSON.stringify(neighbor), current);
                gScore.set(JSON.stringify(neighbor), tentativeGScore);
                fScore.set(JSON.stringify(neighbor), tentativeGScore + heuristic(neighbor));

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        });

        iterations++;
    }

    if (iterations >= maxIterations) {
        alert('Solution not found within the iteration limit.');
    }

    return null; // No solution found
}

// // Function to display the tree structure in the console
// function displayTreeStructure(solutionPath, level) {
//   solutionPath.forEach((state, index) => {
//     const prefix = ' '.repeat(level * 2);
//     console.log(`${prefix}Level ${level}: Step ${index + 1}`);
//     console.log(`${prefix}${JSON.stringify(state)}`);
//   });
// }

function displaySolutionTables(solutionPath) {
    const solutionTablesContainer = document.getElementById('solution-tables');
    solutionTablesContainer.innerHTML = '';

    solutionPath.forEach((state, index) => {
        const table = createTable(state, index + 1);
        solutionTablesContainer.appendChild(table);
    });
}

// Function to create a table for a specific state
function createTable(state, step) {
    const table = document.createElement('table');
    const board = document.getElementById('board');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const tileValue = state[i * 3 + j];
            cell.textContent = tileValue === 0 ? '' : tileValue;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    const caption = document.createElement('caption');
    caption.textContent = `Step ${step}`;
    table.appendChild(caption);

    return table;
}

// Heuristic function (Manhattan distance)
function heuristic(state) {
    let distance = 0;
    for (let i = 0; i < state.length; i++) {
        if (state[i] !== 0) {
            const goalIndex = goalState.indexOf(state[i]);
            const currentIndex = i;
            const goalRow = Math.floor(goalIndex / 3);
            const goalCol = goalIndex % 3;
            const currentRow = Math.floor(currentIndex / 3);
            const currentCol = currentIndex % 3;
            distance += Math.abs(goalRow - currentRow) + Math.abs(goalCol - currentCol);
        }
    }
    return distance;
}

// Function to find the state with the lowest fScore in the open set
function findLowestFScore(openSet, fScore) {
    let lowestScore = Infinity;
    let lowestState = null;

    openSet.forEach((state) => {
        const score = fScore.get(JSON.stringify(state));
        if (score < lowestScore) {
            lowestScore = score;
            lowestState = state;
        }
    });

    return lowestState;
}

// Function to get neighboring states
function getNeighbors(state) {
    const neighbors = [];
    const zeroIndex = state.indexOf(0);
    const zeroRow = Math.floor(zeroIndex / 3);
    const zeroCol = zeroIndex % 3;

    const moves = [
        [0, -1], [0, 1], [-1, 0], [1, 0] // Up, Down, Left, Right
    ];

    moves.forEach(([rowMove, colMove]) => {
        const newRow = zeroRow + rowMove;
        const newCol = zeroCol + colMove;

        if (newRow >= 0 && newRow < 3 && newCol >= 0 && newCol < 3) {
            const neighbor = [...state];
            const newIndex = newRow * 3 + newCol;
            neighbor[zeroIndex] = state[newIndex];
            neighbor[newIndex] = 0;
            neighbors.push(neighbor);
        }
    });

    return neighbors;
}

// Function to reconstruct the path from the solution
function reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(JSON.stringify(current))) {
        current = cameFrom.get(JSON.stringify(current));
        path.unshift(current);
    }
    return path;
}

// Function to animate the solution
function animateSolution(solution) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < solution.length) {
            displayBoard(solution[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 500);
}
