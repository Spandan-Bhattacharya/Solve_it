let n = 20;
let arr = [];
let sortArr = [];
let speed = document.getElementById("speed");

let generateBtn = document.getElementById("genrate-btn");

let container = document.querySelector(".box-container");

function generateHeight() {
    return Math.floor(Math.random() * 95);
}

function generateArray() {
    arr = [];
    for (let i = 0; i < n; i++) {
        let ht = generateHeight();
        while (!ht) ht = generateHeight();// so that no height is zero
        arr[i] = ht;
    }

    showBars();
}

function showBars(indices) {
    container.innerHTML = ``;
    for (let i = 0; i < n; i++) {

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] + "%";

        if (indices && indices.includes(i)) {

            if (indices.includes("swap"))
                bar.style.backgroundColor = "lime";
            else
                bar.style.backgroundColor = "red";
        }
        container.appendChild(bar);
    }
}

function bubbleSort() {
    let temp = [...arr];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            sortArr.push([j, j + 1, "comp"]);
            if (temp[j] > temp[j + 1]) {
                sortArr.push([j, j + 1, "swap"]); 

                let t = temp[j];
                temp[j] = temp[j + 1];
                temp[j + 1] = t;
            }
        }
    }

    animate();
}

function selectionSort() {
    let temp = [...arr];

    for (let i = 0; i < n - 1; i++) {
        let min = i;

        for (let j = i + 1; j < n; j++) {
            sortArr.push([j, min, "comp"]);
            if (temp[min] > temp[j]) {
                min = j;
            }
        }

        if (min != i) {
            sortArr.push([min, i, "swap"]);

            let t = temp[min];
            temp[min] = temp[i];
            temp[i] = t;
        }
    }

    animate();
}

function insertionSort() {
    let temp = [...arr];

    for (let i = 1; i < n; i++) {

        let j = i;

        while (j > 0) {
            sortArr.push([j, j - 1, "comp"]);
            if (temp[j] < temp[j - 1]) {
                sortArr.push([j - 1, j, "swap"]);

                let t = temp[j];
                temp[j] = temp[j - 1];
                temp[j - 1] = t;

                j--;
            }
            else {
                break;
            }
        }
    }

    animate();
}

function animate() {
    if (sortArr.length == 0) {
        showBars();
        return;
    }

    let m = sortArr.shift();

    if (m[2] === "swap") {
        let t = arr[m[0]];
        arr[m[0]] = arr[m[1]];
        arr[m[1]] = t;
    }

    showBars([m[0], m[1], m[2]]);

    setTimeout(() => {
        animate();
    }, speed.value);
}


generateArray();

generateBtn.addEventListener("click", generateArray);

document.querySelector("#bubbleSort").addEventListener("click", bubbleSort);

document.querySelector("#selectionSort").addEventListener("click", selectionSort);

document.querySelector("#insertionSort").addEventListener("click", insertionSort);
