window.addEventListener("load", graph);
window.addEventListener("resize", graph);

async function graph() {
    let canvas = document.getElementById("graph");
    let width = document.querySelector("main").clientWidth / 4;
    const data = await getData();
    const coordinates = getCoordinates(data, width);    
    canvas.innerHTML = updateAltText(data);
    draw(canvas, width, coordinates);
}

async function getData() {
    const response = await fetch("/api/transition");
    const result = await response.json();
    return result;
}

function getCoordinates(originalData, width) {
    let data = JSON.parse(JSON.stringify(originalData));
    const xVals = getXVals(data, width);
    const yVals = getYVals(data, width);
    return getXYVals(xVals, yVals);
}

function getXVals(data, width) {
    let dates = [];
    for (let row of data) {
        row = row.date;
        row = row.split("-");
        row = new Date(row[0], row[1], row[2]);
        row = (((row.getTime() / 1000) / 60) / 60);
        dates.push(row);
    }
    let offset = dates[0];
    for (let i in dates) {
        dates[i] = dates[i] - offset;
    }
    for (let i in dates) {
        dates[i] = Math.round((dates[i] / dates[dates.length - 1]) * width);
    }
    return dates;
}

function getYVals(data, width) {
    let yVals = {
        estrogen: [],
        testosterone: []
    }

    for (let row of data) {
        row.estrogen = Math.round((1 - (row.estrogen / 250)) * width);
        row.testosterone = Math.round((1 - (row.testosterone / 250)) * width);
        yVals.estrogen.push(row.estrogen);
        yVals.testosterone.push(row.testosterone);
    }

    return yVals;
}

function getXYVals(xVals, yVals) {
    let coordinates = {
        date: [],
        estrogen: [],
        testosterone: []
    }

    for (let date of xVals) {
        coordinates.date.push(date);
    }
    for (let i in yVals.estrogen) {
        coordinates.estrogen.push(yVals.estrogen[i]);
    }
    for (let i in yVals.testosterone) {
        coordinates.testosterone.push(yVals.testosterone[i]);
    }

    return coordinates;
}

function updateAltText(data) {
    let altText = "";
    
    altText += "A line graph containing two lines, one pink and one blue. There are ";
    altText += data.length;
altText += " data points: <ol>" 
    
    for (let row of data) {
        altText += "<li>";
        altText += "On " + row.date + ", ";
        altText += "estrogen was at " + row.estrogen + " pg/ml and ";
        altText += "testosterone was at " + row.testosterone + " pg/ml";
        altText += "</li>";
    }
    
    altText += "</ol>";

    return altText;
}

function draw(canvas, width, coordinates) {
    let c = canvas.getContext("2d");
    
    canvas.width = width;
    canvas.height = width;

    c.clearRect(0, 0, width, width);

    for (let i in coordinates.date) {
        drawDot(c, coordinates.date[i], coordinates.estrogen[i], Math.round(width * 0.05), "darkmagenta");
        drawDot(c, coordinates.date[i], coordinates.testosterone[i], Math.round(width * 0.05), "darkblue");
        if (i > 0) {
            drawLine(c, coordinates.date[i - 1], coordinates.testosterone[i - 1], coordinates.date[i], coordinates.testosterone[i], "darkblue");
            drawLine(c, coordinates.date[i - 1], coordinates.estrogen[i - 1], coordinates.date[i], coordinates.estrogen[i], "darkmagenta");
        }
    }
}

function drawDot(c, x, y, r, color) {
    c.beginPath();
    c.arc(x, y, r, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
}

function drawLine(c, x1, y1, x2, y2, color) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.lineWidth = 5;
    c.strokeStyle = color;
    c.stroke();
}