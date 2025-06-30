   // accessing the cells, restart ,newgame buttons and hidden container  from the HTML    in which we want to change by using JavaScript
// we are using querySelectorAll to select all the elements with class "cell" and query
let cells = document.querySelectorAll(".cell");
let restartbtn= document.querySelector("#restart-btn");
let newgamebtn= document.querySelector("#newgame-btn");
let msgContainer= document.querySelector(".msg-container-hidden");
let msg= document.querySelector("#msg");

let turn0=true;  // player0 and player1
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// Function to handle cell click
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if(turn0){
                cell.innerText="0";
                cell.classList.add("zero");
                cell.classList.remove("x");
                turn0=false;
        }
        else{
                cell.innerText="x";
                cell.classList.add("x");
                cell.classList.remove("zero");
                turn0=true;
        }
        cell.disabled=true;
        checkWinner();
        checkDraw(); // Check for draw after each move
    });
});
//function to disable all the cells wheen any of the player wins
const disableCells = () => {
        for(let cell of cells) {
                cell.disabled = true;
        }
};
// function to enable all the cells when new game is restarted
const enableCells = () => {
        for(let cell of cells) {
                cell.disabled = false;
                cell.innerText = "";
                cell.classList.remove("zero", "x");
        }
        msgContainer.classList.add("msg-container-hidden");
        newgamebtn.classList.remove("blinking_glow");
        msg.style.fontSize = ""; // Reset font size
};
// Function to show the winner
const showWinner = (winner) => {
        msgContainer.classList.remove("msg-container-hidden");
        msg.innerText = "Congratulations! Player " + winner + " wins!";
        msg.style.fontSize = ""; // Reset font size
        newgamebtn.classList.add("blinking_glow");
        disableCells();
};
// Function to check for a winner
 const checkWinner = () => {
     for(let it of winningConditions){
                 let pos1val= cells[it[0]].innerText;
                 let pos2val= cells[it[1]].innerText;
                 let pos3val= cells[it[2]].innerText;
                 if(pos1val != "" && pos2val != "" && pos3val != "") {
                        if(pos1val === pos2val && pos2val === pos3val){
                                showWinner(pos1val);
                                return; // Stop further checking if winner found
                        }
                 }
     }
 }
// Function to restart the game
const restartGame = () => {
        enableCells();
        turn0 = true;
        msg.innerText = "";
        msgContainer.classList.add("msg-container-hidden");
        newgamebtn.classList.remove("blinking_glow");
        msg.style.fontSize = ""; // Reset font size
}
newgamebtn.addEventListener("click", enableCells);
restartbtn.addEventListener("click", restartGame);
// adding condition for draw 
const checkDraw = () => {
        let allCellsFilled = Array.from(cells).every(cell => cell.innerText !== "");
        // Only show draw if there is no winner
        let hasWinner = Array.from(winningConditions).some(it => {
                let pos1val = cells[it[0]].innerText;
                let pos2val = cells[it[1]].innerText;
                let pos3val = cells[it[2]].innerText;
                return pos1val !== "" && pos1val === pos2val && pos2val === pos3val;
        });
        if (allCellsFilled && !hasWinner) {
                msgContainer.classList.remove("msg-container-hidden");
                msg.innerText = "It's a draw!";
                disableCells();
                newgamebtn.classList.add("blinking_glow");
        }
};