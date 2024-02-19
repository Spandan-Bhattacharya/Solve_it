var blockSize = 20, rows = 20, cols = 20;
var board, context;
var score = 0;

var startX = blockSize * 5;
var startY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;

var keys = document.querySelectorAll(".keys");

var resetBtn = document.querySelector("#reset");

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    generateFood();
    document.addEventListener("keyup", changeDirection);

    Array.from(keys).forEach((e) => {
        e.addEventListener("click", (key) => {
            changeDirectionForKey(key.target.id);
        })
    })

    setInterval(update, 100);
}

function update() {
    if (gameOver) {
        score = 0;
        document.querySelector(".Score").innerHTML = `Score: ${score}`;
        return;
    }

    context.fillStyle = "crimson";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "white";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (startX == foodX && startY == foodY) {
        score++;
        document.querySelector(".Score").innerHTML = `Score: ${score}`;
        snakeBody.push([foodX, foodY]);
        generateFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [startX, startY];
    }

    startX += velocityX * blockSize;
    startY += velocityY * blockSize;
    context.fillStyle = "green";
    context.fillRect(startX, startY, blockSize, blockSize);
    context.fillStyle = "lime";
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (startX < 0 || startX > cols * blockSize || startY < 0 || startY > rows * blockSize) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (startX == snakeBody[i][0] && startY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e) {
    if (e.key == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.key == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.key == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function changeDirectionForKey(e) {
    if (e == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function generateFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

Array.from(keys).forEach((e) => {
    e.addEventListener("click", (key) => {
        console.log(key.target.id);
    })
})

resetBtn.addEventListener("click", resetGame);

function resetGame() {
    startX = blockSize * 5;
    startY = blockSize * 5;

    velocityX = 0;
    velocityY = 0;

    snakeBody = [];

    generateFood();
    gameOver = false;
}