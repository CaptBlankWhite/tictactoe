"use strict";

const startScreen = document.querySelector(".start-screen");
const startBtn = startScreen.querySelector(".start-container .start-btn");
const gameTable = document.querySelector(".game-container");
const winScreen = document.querySelector(".game-win");
const winMessage = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-btn");
const playerTurn = document.querySelector(".player-turn");
const slider = document.querySelector(".slider");
const message = document.querySelector(".message");
const cells = Array.from(document.querySelectorAll(".cell"));

let spaces = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;
let gameWon = false;

function startGame() {
  startScreen.classList.add("hide");
  gameTable.classList.add("show");
  renderGame();
  playerTurn.setAttribute("class", "player-turn player"); // testing tracker
}

startBtn.addEventListener("click", startGame);

function renderGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  isRunning = true;
}

function cellClicked() {
  //   console.log("clicked!");
  const cellIndex = this.getAttribute("id");
  //   console.log(cellIndex);
  if (spaces[cellIndex] != "" || !isRunning) {
    return;
  }
  placeSymbol(this, cellIndex);

  checkWinner();
  gameTable.style.pointerEvents = "none";
  let botDelay = Math.random() * 1000 + 200;
  setTimeout(() => {
    vsComputer();
  }, botDelay);
}

function placeSymbol(cell, index) {
  spaces[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  if (currentPlayer === "X") {
    playerTurn.classList.remove("active");
  } else {
    playerTurn.classList.add("active");
  }
}

function vsComputer() {
  let botOptions = []; //create an empty array
  if (isRunning) {
    for (let i = 0; i < cells.length; i++) {
      // figure out which cells are empty then push to the array
      if (cells[i].textContent === "") {
        botOptions.push(cells[i]);
      }
      console.log(botOptions);
    }
    const emptyIndex = Math.floor(Math.random() * botOptions.length); //generate random index from the array
    console.log(emptyIndex);
    botOptions[emptyIndex].textContent = "O";
    botOptions[emptyIndex].style.pointerEvents = "none";
    checkWinner();
    gameTable.style.pointerEvents = "auto";
    //   changePlayer();
    //place O into selected cell
    //if game is running changePlayer()
  }
}

function checkWinningRow(cell1, cell2, cell3, symbol) {
  if (
    cell1.textContent === symbol &&
    cell2.textContent === symbol &&
    cell3.textContent === symbol
  ) {
    return true;
  } else {
    return false;
  }
}

function checkWinner() {
  const isTrue = (currentValue) => currentValue.textContent !== "";
  if (
    checkWinningRow(cells[0], cells[1], cells[2], currentPlayer) ||
    checkWinningRow(cells[3], cells[4], cells[5], currentPlayer) ||
    checkWinningRow(cells[6], cells[7], cells[8], currentPlayer) ||
    checkWinningRow(cells[0], cells[3], cells[6], currentPlayer) ||
    checkWinningRow(cells[1], cells[4], cells[7], currentPlayer) ||
    checkWinningRow(cells[2], cells[5], cells[8], currentPlayer) ||
    checkWinningRow(cells[0], cells[4], cells[8], currentPlayer) ||
    checkWinningRow(cells[2], cells[4], cells[6], currentPlayer)
  ) {
    gameWon = true;
    isRunning = false;
    cells.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
    console.log("someone won!");
    setTimeout(() => {
      message.textContent = `${currentPlayer} wins!`;
      // gameTable.style.pointerEvents = "none";
      winScreen.classList.add("show");
    }, 1000);
  } else if (cells.every(isTrue)) {
    setTimeout(() => {
      winScreen.classList.add("show");
      message.textContent = "It's a tie! Click the button to play again.";
      console.log("game is a draw!");
    }, 1000);
  } else {
    changePlayer();
  }
}

// function reset() {
//   //   isRunning = true;
//   cells.forEach((cell) => {
//     cell.textContent = "";
//     cell.style.pointerEvents = "auto";
//   });
//   gameTable.style.pointerEvents = "auto";
// }

//   winScreen.classList.remove("show");
//   reset();
//   startGame();
function restart() {
  currentPlayer = "X";
  spaces = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = " "));
  isRunning = true;
  winScreen.classList.add("hide");
}

restartBtn.addEventListener("click", restart);
