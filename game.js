const cells = document.querySelectorAll('.cell');
const showTurn = document.getElementById("showTurn");
const restart = document.getElementById("restart");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restart.addEventListener('click', restartGame);
    showTurn.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    showTurn.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i=0; i<winConditions.length; i++){
        let cnd = winConditions[i];
        let cellA = options[ cnd[0] ];
        let cellB = options[ cnd[1] ];
        let cellC = options[ cnd[2] ];
        console.log(cellA);
        console.log(cellB);
        console.log(cellC);
        if( cellA=="" ||cellB=="" ||cellC=="" ){
            continue;
        }
        if(cellA==cellB && cellB==cellC){
            roundWon = true;
            break;
        }        
    }

    if(roundWon){
        showTurn.textContent = `${currentPlayer} WON`;
        running = false;
    }else if(!options.includes("")){
        showTurn.textContent = `DRAW!`;
        running = false;
    }else{
        changePlayer();
    }
}
function restartGame(){
   currentPlayer = "X";
   cells.forEach(cell=>{
    cell.textContent = "";
    })
    for(let j = 0; j<9; j++){
        options[j] = "";
    }
    showTurn.textContent = `${currentPlayer}'s turn`;
    running = true;
}