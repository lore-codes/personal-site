import { Clue } from "/js/programming/Clue.js";

window.addEventListener("load", startGame);

function startGame() {
    let h2 = document.querySelector("h2");
    let width = document.querySelector("body").clientWidth;
    let height = document.querySelector("body").clientHeight;
    h2.innerHTML = "Width: " + width + " Height: " + height;
    let clue = new Clue(width, height);
}