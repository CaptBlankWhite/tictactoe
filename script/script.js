"use strict";

const startScreen = document.querySelector(".start-screen");
const startBtn = startScreen.querySelector(".start-container .start-btn");
const gameTable = document.querySelector(".game-container");
const winScreen = document.querySelector(".game-win");
const winMessage = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-btn");
const cells = document.querySelectorAll(".cell");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let spaces = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;

function startGame() {
  startScreen.classList.add("hide");
  gameTable.classList.add("show");
}

startBtn.addEventListener("click", startGame);

function renderGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
}

renderGame();

function cellClicked() {
  //   console.log("clicked!");
  const cellIndex = this.getAttribute("id");
  console.log(cellIndex);
}
