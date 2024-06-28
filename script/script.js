"use strict";

const startScreen = document.querySelector(".start-screen");
const startBtn = startScreen.querySelector(".start-container .start-btn");
const gameTable = document.querySelector(".game-container");

function startGame() {
  startScreen.classList.add("hide");
  gameTable.classList.add("show");
}

startBtn.addEventListener("click", startGame);
