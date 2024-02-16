
var turn = "X";
var audioTurn = new Audio("ding-36029.mp3");
var game = false;
var winAudio = new Audio("short-crowd-cheer-6713.mp3");
// chnage Turn
function changeTurn () {
    return turn == "X" ? "O" : "X" ;
}

// check for win
function checkWin () {
    let boxtexts = document.getElementsByClassName('boxtext');
    var win = [
        [0,1,2,0,6,0],
        [3,4,5,0,20,0],
        [6,7,8,0,32,0],
        [0,3,6,-13,20,90],
        [1,4,7,0,20,90],
        [2,5,8,13,20,90],
        [0,4,8,1,20,45],
        [2,4,6,-0.5,20,135]
    ]

    win.forEach(e=>{
        if((boxtexts[e[0]].innerText == boxtexts[e[1]].innerText) && (boxtexts[e[1]].innerText == boxtexts[e[2]].innerText) && boxtexts[e[0]].innerText != ''){
            document.getElementsByClassName("changeOfTurn")[0].innerHTML = boxtexts[e[0]].innerText + " WINS"; 
            game = true;
            winAudio.play();
            document.querySelector('.gif-icon').classList.add("appear"); 
            document.querySelector('.line').classList.add("yes"); 
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            ;
        }
    })
}

// checks if my whole box is full and none of them is empty , then its a draw
function over () {
    var c = 0;
    for(var i=0;i<boxes.length;i++){
        if(boxes[i].querySelector('.boxtext').innerText != '')
        c++;
    }
    if(c == 9)
    return true;
    else
    return false;
}

//main logic
let boxes = document.getElementsByClassName("box");
// Array.from(boxes).forEach(element =>{
//     let boxtext = element.querySelector('.boxtext');
//     element.addEventListener('click' , ()=>{
//         if(boxtext.innerText === ''){
//             boxtext.innerText = turn;
//             turn = changeTurn();
//             audioTurn.play();
//             document.getElementsByClassName("changeOfTurn")[0].innerHTML = turn;
//         }
//     })
// })

for( var i=0;i<boxes.length;i++){
    boxes[i].addEventListener("click" , function (){
        var boxtext = this.querySelector(".boxtext");
        if(boxtext.innerHTML == '' && game==false){
            boxtext.innerHTML = turn;
            audioTurn.load();
            audioTurn.play();
            turn = changeTurn();
            setTimeout(()=>{
                audioTurn.pause();
            } , 100)
            checkWin();
            var k = over();
            if(!game) {
                document.getElementsByClassName("changeOfTurn")[0].innerHTML = "Turn For : "+turn;
            }
            if(k && !game){
                document.getElementsByClassName("changeOfTurn")[0].innerHTML = "DRAW !";
            }
        }
    })
}

document.querySelector(".reset").addEventListener('click' , function () {
    for(var i=0;i<boxes.length;i++){
        boxes[i].querySelector('.boxtext').innerText = "";
    }
    turn = changeTurn();
    document.getElementsByClassName("changeOfTurn")[0].innerHTML = "Turn For : "+turn;
    document.querySelector('.gif-icon').classList.remove("appear"); 
    document.querySelector('.line').classList.remove("yes"); 
    game = false;
    winAudio.pause();
})








