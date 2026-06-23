export class Color {
    #red;
    #green;
    #blue;
    
    constructor() {
        this.#red = this.#randomValue();
        this.#green = this.#randomValue();
        this.#blue = this.#randomValue();
    }

    getRed() {
        return this.#red;
    }
    setRed(red) {
        this.#red = red;
        if (this.#red < 0) {
            this.#red = 0;
        }
        if (this.#red > 255) {
            this.#red = 255;
        }
    }

    getGreen() {
        return this.#green;
    }
    setGreen(green) {
        this.#green = green;
        if (this.#green < 0) {
            this.#green = 0;
        }
        if (this.#green > 255) {
            this.#green = 255;
        }
    }

    getBlue() {
        return this.#blue;
    }
    setBlue(blue) {
        this.#blue = blue;
        if (this.#blue < 0) {
            this.#blue = 0;
        }
        if (this.#blue > 255) {
            this.#blue = 255;
        }
    }

    getColor() {
        return "#" + this.#decToHex(Math.round(this.getRed())) + this.#decToHex(Math.round(this.getGreen())) + this.#decToHex(Math.round(this.getBlue()));
    }
    randomize() {
        this.setRed(this.#randomValue());
        this.setGreen(this.#randomValue());
        this.setBlue(this.#randomValue());
    }

    #randomValue() {
        return Math.floor(Math.random() * 256);
    }

    #decToHex(color) {
        let secondHex = color % 16;
        let firstHex = Math.floor(color / 16);
        firstHex %= 16;

        firstHex = this.#alphabetize(firstHex);
        secondHex = this.#alphabetize(secondHex);

        return "" + firstHex + secondHex;
    }
    #alphabetize(hex) {
        if (hex >= 10) {
            switch (hex) {
                case 10 : { hex = "A"; break; }
                case 11 : { hex = "B"; break; }
                case 12 : { hex = "C"; break; }
                case 13 : { hex = "D"; break; }
                case 14 : { hex = "E"; break; }
                case 15 : { hex = "F"; break; }
            }
        }
        return hex;
    }
}