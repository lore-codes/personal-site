window.addEventListener("load", gridify);

function gridify() {
    setButtons();
    setGrids();
}

function setButtons() {
    let h2 = document.querySelector("h2");
    let buttons = document.querySelectorAll("div button");

    h2.innerHTML = "Not broken";

    for (let i in buttons) {
        let name = buttons[i].id;
        buttons[i].addEventListener("click", () => {
            cycleState(name);
        });
        buttons[i].classList.add("clue-button");
        if (i < 6) {
            buttons[i].classList.add("clue-villain");
        }
        else if (i >= 6 && i < 12) {
            buttons[i].classList.add("clue-weapon");
        }
        else {
            buttons[i].classList.add("clue-lair");
        }
        buttons[i].innerHTML = name.toUpperCase().replace("-", " ") + "&#274c";
    }
}

function cycleState(name) {
    let h2 = document.querySelector("h2");
    h2.innerHTML = "The function worked: " + name;
}