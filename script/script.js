"use strict";

const startScreen = document.querySelector(".start-screen");
const startBtn = startScreen.querySelector(".start-container .start-btn");
const gameTable = document.querySelector(".game-container");
const winScreen = document.querySelector(".game-win");
const winMessage = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-btn");
const cells = Array.from(document.querySelectorAll(".cell"));

// const winPatterns = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

let spaces = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;
let gameWon = false;

function startGame() {
  startScreen.classList.add("hide");
  gameTable.classList.add("show");
  renderGame();
}

startBtn.addEventListener("click", startGame);

function renderGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  isRunning = true;
}

function cellClicked() {
  //   console.log("clicked!");
  const cellIndex = this.getAttribute("id");
  console.log(cellIndex);

  if (spaces[cellIndex] != "" || !isRunning) {
    return;
  }
  placeSymbol(this, cellIndex);
  checkWinner();
  //   element.style.pointerEvents = "none"; // so user can't click!
  //   gameTable.style.pointerEvents = "none";
  //   let botDelay =
  vsComputer();
}

function placeSymbol(cell, index) {
  spaces[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function vsComputer() {
  let botOptions = []; //create an empty array
  for (let i = 0; i < cells.length; i++) {
    // figure out which cells are empty then push to the array
    if (cells[i].textContent === "") {
      botOptions.push(cells[i]);
    }
    console.log(botOptions);
  }
  const emptyIndex = Math.floor(Math.random() * botOptions.length); //generate random index from the array
  console.log(emptyIndex);
  placeSymbol(currentPlayer); //place O into selected cell
  //if game is running changePlayer()
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
    gameTable.style.pointerEvents = "none";
    gameTable.classList.remove("show");
    winScreen.classList.add("show");
  } else {
    if (cells.every(isTrue)) {
      gameTable.classList.remove("show");
      winScreen.classList.add("show");
      console.log("game is a draw");
    }
  }
}
