let options = document.querySelectorAll(".options span");
let result = document.querySelector(".game-container h1");

let user = document.querySelector(".user");
let cpu = document.querySelector(".cpu");

Array.from(options).forEach((option) => {
    option.addEventListener("click", (e) => {
        let userChoice = e.target.id;
        let cpuChoice = generateRandom();

        result.innerHTML = ``;
        user.src = `./images/rock.png`;
        cpu.src = `./images/rock.png`;

        user.classList.add("animate1");
        cpu.classList.add("animate2");

        setTimeout(() => {

            user.classList.remove("animate1");
            cpu.classList.remove("animate2");

            user.src = `./images/${userChoice}.png`;
            cpu.src = `./images/${cpuChoice}.png`;


            if (userChoice === cpuChoice) {
                // draw
                result.innerHTML = `Game Draw!`;
            }

            else if (userChoice === "rock") {
                if (cpuChoice === "paper") {
                    // cpu
                    result.innerHTML = `Cpu Wins!`;
                }
                if (cpuChoice === "scissor") {
                    // user
                    result.innerHTML = `User Wins!`;
                }
            }

            else if (userChoice === "paper") {
                if (cpuChoice === "rock") {
                    // user
                    result.innerHTML = `User Wins!`;
                }
                if (cpuChoice === "scissor") {
                    // cpu
                    result.innerHTML = `Cpu Wins!`;
                }
            }

            else if (userChoice === "scissor") {
                if (cpuChoice === "rock") {
                    // cpu
                    result.innerHTML = `Cpu Wins!`;
                }
                if (cpuChoice === "paper") {
                    // user
                    result.innerHTML = `User Wins!`;
                }
            }
        }, 3000);


    })
})

function generateRandom() {
    let ind = Math.floor(Math.random() * 3);
    return options[ind].id;
}