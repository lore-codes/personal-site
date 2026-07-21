import { Button } from "/js/programming/Button.js";

export class Grid {
    #id;
    #div;
    #buttons;
    #numButtons;
    #numIdentified;
    
    constructor(id, width, height) {
        this.#id = id;
        this.#div = document.querySelector("#" + this.#id);
        this.#div.style = this.setGrid(width, height);
        this.#buttons = this.#setButtons();
        this.#numButtons = this.#buttons.length;
        this.#numIdentified = 0;
    }

    getID() {
        return this.#id;
    }

    getDiv() {
        return this.#div;
    }

    getButtons() {
        return this.#buttons;
    }

    #setButtons() {
        let buttons = [];
        let button;
        for (let i = 0; i < this.#div.childElementCount; i++) {
            buttons.push(new Button(this.#div.children[i].id));
            buttons[i].getHTMLButton().addEventListener("click", () => {
                this.checkIdentified();
            })
        }
        return buttons;
    }

    getNumButtons() {
        return this.#numButtons;
    }

    getNumIdentified() {
        return this.#numIdentified;
    }
    setNumIdentified(numIdentified) {
        this.#numIdentified = numIdentified;
    }

    checkIdentified() {
        let identified = 0;
        for (let i = 0; i < this.getNumButtons(); i++) {
            if (this.getButtons()[i].getState() == "&#10060;") {
                identified++;
            }
        }

        this.setNumIdentified(identified);

        if (this.getNumIdentified() == (this.getNumButtons() - 1)) {
            for (let i = 0; i < this.getNumButtons(); i++) {
                if (this.getButtons()[i].getState() == "?") {
                    this.getButtons()[i].setState("&#10004");
                }
            }
        }
    }

    setGrid(width, height) {
        if (width < height && this.getID() != "clue-lairs") {
            return "display: grid; grid-template-columns: 50% 50%;";
        }
        else {
            return "display: grid; grid-template-columns: calc(100% / 3) calc(100% / 3) calc(100% / 3);";
        }
    }
}