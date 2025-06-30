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
    if(turn0){     //initially turn0 is true, so player0 will play first
        cell.innerText="0"; //after player0 plays, turn0 will be false
        cell.classList.add("zero");
        cell.classList.remove("x");
        turn0=false;
    }
    else{
        cell.innerText="x"; //after player1 plays, turn0 will be true
        cell.classList.add("x");
        cell.classList.remove("zero");
        turn0=true;
    }
    cell.disabled=true; // cell button will be fixed after any player plays it once 
    checkWinner(); // we are calling the function to check if any player has won
  });
});
//function to disable all the cells wheen any of the player wins
const disableCells = () => {
    for(let cell of cells) {
        cell.disabled = true; // this will disable all the cells
    }
};
// function to enable all the cells when new game is restarted
const enableCells = () => {
    for(let cell of cells) {
        cell.disabled = false; // this will enable all the cells
        cell.innerText = ""; // this will clear the text inside the cell
        cell.classList.remove("zero", "x");
    }
    msgContainer.classList.add("msg-container-hidden"); // this will hide the message container
    // Remove blinking_glow from New Game button
    newgamebtn.classList.remove("blinking_glow");
};
// Function to show the winner
const showWinner = (winner) => {
    msgContainer.classList.remove("msg-container-hidden");
    msg.innerText = "Congratulations! Player " + winner + " wins!";
    // Add blinking_glow to New Game button
    newgamebtn.classList.add("blinking_glow");
    disableCells(); // we are calling the function to disable all the cells when any player wins
};
// Function to check for a winner
 const checkWinner = () => {
   for(let it of winningConditions){  // this is same as we take elements from adjacency list in graph
         let pos1val= cells[it[0]].innerText;    // this assing the value of cell to a variable pos1val innerText is used to get the text(0 or x) inside the cell
         let pos2val= cells[it[1]].innerText;
         let pos3val= cells[it[2]].innerText;
         // if any of the cell is empty, then we will not check for winner ,if not empty then we will check if all the three cells have same value
         // if all the three cells have same value, then we will declare that player as winner
         if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
                showWinner(pos1val); // we are calling the function to show the winner
            }
         }
   }
 }
// Function to restart the game
const restartGame = () => {
    enableCells(); // we are calling the function to enable all the cells
    turn0 = true; // we are setting the turn0 to true so that player0 can play first
    msg.innerText = ""; // this will clear the text inside the message container
    msgContainer.classList.add("msg-container-hidden"); // this will hide the message container
    // Remove blinking_glow from New Game button
    newgamebtn.classList.remove("blinking_glow");
}
newgamebtn.addEventListener("click", enableCells);
restartbtn.addEventListener("click", restartGame); // we are calling the function to restart the game when restart button is clicked