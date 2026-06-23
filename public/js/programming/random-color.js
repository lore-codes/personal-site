import { Color } from "/js/programming/Color.js";

let target = new Color();
let current = new Color();
let next = new Color();
let step = setStep(target, current);

let canvas = document.getElementById("color-area");
let c = canvas.getContext("2d");

canvas.width = document.querySelector("main").clientWidth / 3;
canvas.height = document.querySelector("main").clientWidth / 3;

setInterval(() => {
    if (colorsEqual(target, current)) {
        target.randomize();
        step = setStep(target, current);
    }
    next.setRed(setNext(target.getRed(), current.getRed(), step.red));
    next.setGreen(setNext(target.getGreen(), current.getGreen(), step.green));
    next.setBlue(setNext(target.getBlue(), current.getBlue(), step.blue));

    draw(canvas.width, c, next.getColor());
    
    current.setRed(next.getRed());
    current.setGreen(next.getGreen());
    current.setBlue(next.getBlue());
}, 50);

function draw(width, c, color) {
    c.clearRect(0, 0, width, width);
    c.fillStyle = color;
    c.fillRect(0, 0, width, width);
}

function setStep(target, current) {
    let step = {
        red: 0,
        green: 0,
        blue: 0
    };

    step.red = target.getRed() - current.getRed();
    step.green = target.getGreen() - current.getGreen();
    step.blue = target.getBlue() - current.getBlue();

    let least = 256;
    for (let color of Object.values(step)) {
        if (least > Math.abs(color) && Math.abs(color )> 0) {
            least = Math.abs(color);
        }
    }
    step.red /= least;
    step.green /= least;
    step.blue /= least;

    return step;
}

function colorsEqual(target, current) {
    if (Math.abs(target.getRed() - current.getRed()) <= 1 && Math.abs(target.getGreen() - current.getGreen()) <= 1 && Math.abs(target.getBlue() - current.getBlue()) <= 1) {
        return true;
    }
    else {
        return false;
    }
}

function setNext(target, current, step) {
    let next = current + step;

    if ((step > 0 && (current + step) > target) || (step < 0 && (current + step < target))) {
        return target;
    }
    else {
        return next;
    }
}