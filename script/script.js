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
const bgm = document.querySelector("#bgm");
const clickSound1 = document.querySelector("#click-1");
const clickSound2 = document.querySelector("#click-2");
const winSound = document.querySelector("#win-sound");
const drawSound = document.querySelector("#draw-sound");

let spaces = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;
let gameWon = false;

function startGame() {
  startScreen.classList.add("hide");
  gameTable.classList.add("show");
  bgm.pause();
  renderGame();
  playerTurn.setAttribute("class", "player-turn player");
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
  clickSound1.play();
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
  let botOptions = [];
  if (isRunning) {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === "") {
        botOptions.push(cells[i]);
      }
      console.log(botOptions);
    }
    const emptyIndex = Math.floor(Math.random() * botOptions.length);
    console.log(emptyIndex);
    botOptions[emptyIndex].textContent = "O";
    botOptions[emptyIndex].style.pointerEvents = "none";
    clickSound2.play();
    checkWinner();
    gameTable.style.pointerEvents = "auto";
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
    // console.log("someone won!");
    setTimeout(() => {
      winSound.play();
      message.textContent = `Player ${currentPlayer} wins!`;
      gameTable.style.pointerEvents = "auto";
      winScreen.classList.add("show");
    }, 1000);
  } else if (cells.every(isTrue)) {
    setTimeout(() => {
      drawSound.play();
      message.textContent = "Draw! Click the button to play again.";
      gameTable.style.pointerEvents = "auto";
      winScreen.classList.add("show");
      //   console.log("draw!");
    }, 1000);
  } else {
    changePlayer();
  }
}

function restart() {
  location.reload();
}

restartBtn.addEventListener("click", restart);
