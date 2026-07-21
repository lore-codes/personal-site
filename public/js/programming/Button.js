export class Button {
    #id;
    #htmlButton;
    #span;
    #state;

    constructor(id) {
        this.#id = id;
        this.#htmlButton = document.querySelector("#" + this.#id);
        this.#htmlButton.innerHTML += '<span id="' + this.#id + '-state" class="clue-tile-state"></span>';
        this.#htmlButton.addEventListener("click", () => {
            this.toggleState()
        });
        this.#span = document.querySelector("#" + this.#id + "-state");
        this.#state = "?";
        this.#span.innerHTML = this.#state;
    }

    getID() {
        return this.#id;
    }

    getHTMLButton() {
        return this.#htmlButton;
    }

    getSpan() {
        return this.#span;
    }

    getState() {
        return this.#state;
    }
    setState(state) {
        this.#state = state;
        this.#span.innerHTML = this.#state;
    }

    toggleState() {
        if (this.getState() == "?") {
            this.setState("&#10060;");
        }
        else if (this.getState() == "&#10060;") {
            this.setState("?");
        }
    }
}