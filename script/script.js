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
  let cellloc = [];
  if (isRunning) {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === "") {
        botOptions.push(cells[i]);
        cellloc.push(i);
      }
      console.log(botOptions);
    }

    let isPlayerWinning = false
    let iscomputerWinning = false
    let index = 0;

    for (let i = 0; i < botOptions.length; i++) {
      let temp = cells.map((cell) => cell.cloneNode(true));
      temp[cellloc[i]].textContent = "O";
      if (checkWinningRow(temp, "O")) {
        iscomputerWinning = true;
        index = i;
        break;
      }

      temp[cellloc[i]].textContent = "X";
      if (checkWinningRow(temp, "X")) {
        isPlayerWinning = true;
        index = i;
        break;
      }
      

    }


    let emptyIndex = 0
    if (!isPlayerWinning && !iscomputerWinning) {
      emptyIndex = Math.floor(Math.random() * botOptions.length);
    } else {
      emptyIndex = index;
    }

    console.log(emptyIndex);
    botOptions[emptyIndex].textContent = "O";
    botOptions[emptyIndex].style.pointerEvents = "none";
    clickSound2.play();
    checkWinner();
    gameTable.style.pointerEvents = "auto";
  }
}

function checkWinningRow(cell, symbol) {
  let flag = false

  let diagonal1 = (cells[0].textContent === symbol && cells[4].textContent === symbol && cells[8].textContent === symbol);
  let diagonal2 = (cells[2].textContent === symbol && cells[4].textContent === symbol && cells[6].textContent === symbol);
  
  if (diagonal1 || diagonal2) {
    flag= true;
  }

  for (let i = 0; i < 3; i++) {
    let rowcheck = (cell[i*3].textContent === symbol && cell[i*3+1].textContent === symbol && cell[i*3+2].textContent === symbol);
    let colcheck = (cell[i].textContent === symbol && cell[i+3].textContent === symbol && cell[i+6].textContent === symbol);
    if (rowcheck || colcheck) {
      flag= true;
    }
  }
  return flag;


}

function checkWinner() {
  const isTrue = (currentValue) => currentValue.textContent !== "";
  if (
    checkWinningRow(cells, currentPlayer)
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
    }, 1300);
  } else if (cells.every(isTrue)) {
    setTimeout(() => {
      drawSound.play();
      message.textContent = "Draw! Click the button to play again.";
      gameTable.style.pointerEvents = "auto";
      winScreen.classList.add("show");
      //   console.log("draw!");
    }, 1300);
  } else {
    changePlayer();
  }
}

function restart() {
  location.reload();
}

restartBtn.addEventListener("click", restart);
