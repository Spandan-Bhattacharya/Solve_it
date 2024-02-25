let dino = document.querySelector(".dino");
let box = document.querySelector(".obstacle");
let reset = document.querySelector(".reset");
let flag = true;
let score = 0;
let scoreDiv = document.querySelector(".score");

function jump() {
    if (!dino.classList.contains("animateDino")) {
        dino.classList.add("animateDino");  
    }

    setTimeout(() => {
        dino.classList.remove("animateDino");
    }, 500);
}

setInterval(() => {
    let dinoPos = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let boxPos = parseInt(window.getComputedStyle(box).getPropertyValue("left"));

    // if (boxPos > 0 && boxPos <= 80 && dinoPos >= 350) {
    //     box.style.display = 'none';
    //     box.classList.remove("animateBox");
    //     flag = false;
    //     alert('Game Over') ;
    // }
    if (boxPos > 0 && boxPos <= 50 && dinoPos >= 370) {
        box.style.display = 'none';
        box.classList.remove("animateBox");
        flag = false;
        alert('Game Over') ;
    }
}, 10);

setInterval(() => {
    if(flag) { 
        score++;
        scoreDiv.innerHTML = `Score : ${score}`;
    }

}, 1200);
document.addEventListener("keydown", jump);

reset.addEventListener("click", () => {
    box.style.display = 'inline-block';
    box.classList.add("animateBox");
    scoreDiv.innerHTML = `Score : 0`;
    score = 0;
    flag = true;
})
