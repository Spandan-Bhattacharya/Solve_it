let dino = document.querySelector(".dino");
let box = document.querySelector(".obstacle");
let reset = document.querySelector(".reset");

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

    if (boxPos > 0 && boxPos <= 80 && dinoPos >= 350) {
        box.style.display = 'none';
        box.classList.remove("animateBox");
        alert('Game Over');
    }

}, 10);
document.addEventListener("keydown", jump);

reset.addEventListener("click", () => {
    box.style.display = 'inline-block';
    box.classList.add("animateBox");
})
