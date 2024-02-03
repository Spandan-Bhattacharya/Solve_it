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
    const board = document.getElementById('board');
    board.innerHTML = '';

    numbers.forEach((number) => {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = number === 0 ? '' : number;
        board.appendChild(tile);
    });
}

// Function to randomize the puzzle
function randomize() {
    const randomNumbers = getRandomPermutation();
    displayBoard(randomNumbers);
}

// Function to prompt the user for a custom order
function customOrder() {
    const inputOrder = prompt('Enter a comma-separated list of numbers (0 to 8):');
    const customNumbers = inputOrder.split(',').map(Number);

    // Check if the input is valid
    if (isValidOrder(customNumbers)) {
        displayBoard(customNumbers);
    } else {
        alert('Invalid input. Please enter a valid list of numbers.');
    }
}

// Function to check if the custom order is valid
function isValidOrder(numbers) {
    const targetNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return (
        numbers.length === 9 &&
        numbers.every((number) => targetNumbers.includes(number))
    );
}

// Function to solve the puzzle using A*
function solvePuzzle() {
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
