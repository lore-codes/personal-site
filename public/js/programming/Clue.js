import { Grid } from "/js/programming/Grid.js";

export class Clue {
    #width;
    #height;
    #grids;
    #visibleGrid;
    #leftButton;
    #rightButton;
    #heading;
    
    constructor(width, height) {
        this.#width = width;
        this.#height = height;
        this.#grids = this.#setGrids();
        this.#visibleGrid = 0;
        this.#leftButton = this.#setButton("left");
        this.#rightButton = this.#setButton("right");
        this.#heading = document.querySelector("#clue-grid-heading");
        this.#showGrid();
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    #getGrids() {
        return this.#grids;
    }
    #setGrids() {
        let grids = document.querySelectorAll(".clue-grid");
        let clueGrids = [];
        for (let i = 0; i < grids.length; i++) {
            clueGrids.push(new Grid(grids[i].id, this.getWidth(), this.getHeight()));
        }
        return clueGrids;
    }

    #getVisibleGrid() {
        return this.#visibleGrid;
    }
    #setVisibleGrid(visibleGrid) {
        this.#visibleGrid = visibleGrid;
    }

    #setButton(direction) {
        let button = document.querySelector("#" + direction + "-button");
        switch (direction) {
            case "left" : { button.innerHTML = "&#9664;"; break; }
            case "right" : { button.innerHTML = "&#9654;"; break; }
        }
        button.addEventListener("click", () => {
            this.#toggleGrid(direction);
        });
        return button;
    }

    getHeading() {
        return this.#heading;
    }
    #setHeading(heading) {
        this.#heading.innerHTML = heading;
    }

    #showGrid() {
        for (let i = 0; i < this.#getGrids().length; i++) {
            if (this.#getVisibleGrid() == i) {
                this.#getGrids()[i].getDiv().style = this.#getGrids()[i].setGrid(this.getWidth(), this.getHeight()) + this.#setDivHeight(i);
                this.#setHeading(this.#getGrids()[i].getID().split("-")[1]);
            }
            else {
                this.#getGrids()[i].getDiv().style = "display: none;";
            }
        }
    }

    #toggleGrid(direction) {
        let visible = this.#getVisibleGrid();
        switch (direction) {
            case "left" : { visible--; break; }
            case "right" : { visible++; break; }
        }
        if (visible < 0) {
            visible = this.#getGrids().length - 1;
        }
        if (visible > this.#getGrids().length - 1) {
            visible = 0;
        }
        this.#setVisibleGrid(visible);
        this.#showGrid();
    }

    #setDivHeight(i) {
        return " height: calc(" 
        + this.#getGrids()[i].getDiv().clientHeight + "px + (100vw - "
        + document.querySelector("main").clientHeight + "px;";
    }
}