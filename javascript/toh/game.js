const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const ans = document.getElementById('answers');
const towers = document.querySelectorAll('.tower')

let towerContent = [[], [], []]

let size = 3

let discs

const sleepTime = 300
let speed = 100


const DISC_COLORS = ['blue', 'green', 'black', 'orange', 'grey', 'aqua', 'red']


const startWidth = 95


const newGameBtn = document.getElementById('newGameBtn')
const discSelect = document.getElementById('discSelect')
const speedRange = document.getElementById('speedRange')
const btnSolve = document.getElementById('btnSolve')


let currentTower
let originTower


const buildTowers = (towers) => {
  towers.forEach(tower => {
    const stem = document.createElement('div')
    stem.className = 'stem'
    const plate = document.createElement('div')
    plate.className = 'plate'
    tower.innerHTML = ''
    tower.appendChild(stem)
    tower.appendChild(plate)
  })
}

start()

function start() {
  ans.innerHTML = '';
  towerContent = [[], [], []]
  buildTowers(towers)

  for (let i = 0; i < size; i++) {
    let tower = document.createElement('div')
    tower.classList.add('disc')
    tower.draggable = false
    tower.style.backgroundColor = DISC_COLORS[i]
    tower.style.width = (startWidth - 13 * i) + 'px'
    towerContent[0].push(tower)
  }

  towerContent[0].forEach(t => {
    towers[0].innerHTML = t.outerHTML + towers[0].innerHTML
  })

  for (let i = 0; i < towers.length; i++) {
    towers[i].addEventListener('dragenter', dragend)
    towers[i].addEventListener('dragover', dragend)
  }

  discs = document.querySelectorAll('.disc')

  discs.forEach(disc => {
    disc.addEventListener('dragstart', dragend)
    disc.addEventListener('dragend', dragend)
  })
}

function dragend() {
  let originTowerIndex = originTower.classList[1][1]
  let currentTowerIndex = currentTower.classList[1][1]
  moveTower(originTowerIndex, currentTowerIndex, this)
  originTower = undefined
  originTowerIndex = undefined
}


function moveTower(originTowerIndex, currentTowerIndex, disc) {
  towerContent[currentTowerIndex].push(towerContent[originTowerIndex].pop())
  originTower.removeChild(disc)
  currentTower.prepend(disc)
}

function isDroppable(originTowerIndex, currentTowerIndex, disc) {
  let top = isOnTop(originTowerIndex, disc)
  let topDiscIsLess = isDiscLessThan(currentTowerIndex, disc)
  return top && topDiscIsLess
}

function moveTopDisc(originTowerIndex, destinyTowerIndex) {
  originTower = towers[originTowerIndex]
  currentTower = towers[destinyTowerIndex]
  let disc = getTopDisc(originTowerIndex)
  moveTower(originTowerIndex, destinyTowerIndex, disc)
}

function getTopDisc(towerIndex) {
  let size = towerContent[towerIndex].length

  let sizeDisc = towerContent[towerIndex][size - 1].style.width
  let indexDisc = -1
  discs.forEach((el, index) => {
    if (el.style.width === sizeDisc) {
      indexDisc = index
    }
  })
  return discs[indexDisc]
}

async function moves(movements) {
  for (let i = 0; i < movements.length; i++) {
    const element = movements[i];
    moveTopDisc(element.origin, element.destiny)
    await sleep(5 * sleepTime - 14 * speed)
  }
}

class Game {
  newGame = () => {
    speedRange.addEventListener('input', event => {
      speed = event.target.value
    })


    newGameBtn.addEventListener('click', () => {
      size = discSelect.selectedIndex + 1
      start()
    })

    btnSolve.onclick = function () {
      const movements = getHanoiSolutions(size)
      moves(movements)
    }
  }
}

export default Game
const getHanoiSolutions = (nDiscs) => {
  const solutions = []
  let count = 1;
  const hanoi = (n, origin, destiny, aux) => {
    if (n == 1) {
      // Base case
      solutions.push({ disc: n, origin, destiny })
      ans.innerHTML += count + ". block goes from " + (origin + 1) + " to " + (destiny + 1) + "\n";
      count++;
      return;
    }

    hanoi(n - 1, origin, aux, destiny)

    solutions.push({ disc: n, origin, destiny })
    ans.innerHTML += count + ". block goes from " + (origin + 1) + " to " + (destiny + 1) + "\n";
    count++;
    hanoi(n - 1, aux, destiny, origin)
  }

  hanoi(nDiscs, 0, 1, 2)

  return solutions;
}


document.addEventListener('DOMContentLoaded', function () {
  var textarea = document.getElementById('answers');


  textarea.addEventListener('input', function () {
    adjustTextareaHeight(textarea);
  });

  // Initial adjustment on page load
  adjustTextareaHeight(textarea);
});

function adjustTextareaHeight(textarea) {
  // Set the textarea height to its scrollHeight
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

ans.addEventListener('input', function () {
  adjustTextareaHeight(ans);
});

adjustTextareaHeight(ans);



function adjustDiscs() {
  size = discSelect.selectedIndex + 1;
  start();
}

discSelect.addEventListener('change', adjustDiscs);

// Initialize the game
const game = new Game();
game.newGame();
