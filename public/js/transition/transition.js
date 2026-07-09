window.addEventListener("load", () => {
    console.log("Triggered load event");
    graph();
    updateHRTDayCount();
    setProgressBars();
    setInterval(() => {
        updateConsultCountdown();
    }, 1000);
});
window.addEventListener("resize", graph);

async function graph() {
    console.log("entered graph()");
    let canvas = document.getElementById("graph");
    let width = document.querySelector("#hormone-tracker-area").clientWidth;
    const data = await getData("hormones");
    const coordinates = getCoordinates(data, width);    
    canvas.innerHTML = updateAltText(data);
    draw(canvas, width, coordinates);
}

async function getData(table) {
    const response = await fetch("/api/transition");
    const jsonData = await response.json();
    let result;
    switch (table) {
        case "hormones" : {
            result = jsonData.hormoneData.rows;
            break;
        }
        case "tasks" : {
            result = jsonData.taskData.rows;
            break;
        }
    }
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
        row = new Date(row[0], row[1] - 1, row[2]);
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

function updateConsultCountdown() {
    let resultArea = document.getElementById("consult-countdown");
    let currentDate = new Date();
    let consultDate = new Date(2026, 9, 28);
    let difference = 0;
    let countdown;

    difference = consultDate.getTime() - currentDate.getTime();
    /* countdown = (difference % 1000) + "ms";*/
    difference = Math.floor(difference / 1000);
    countdown = (difference % 60) + "s";
    difference = Math.floor(difference / 60);
    countdown = (difference % 60) + "m " + countdown;
    difference = Math.floor(difference / 60);
    countdown = (difference % 24) + "h " + countdown;
    difference = Math.floor(difference / 24);
    countdown = difference + "d " + countdown;

    resultArea.innerHTML = countdown;
}

function updateHRTDayCount() {
    let estrogenArea = document.getElementById("estrogen-day-count");
    let startDate = new Date(2025, 6, 5);
    let currentDate = new Date();

    estrogenArea.innerHTML = Math.floor(((((currentDate.getTime() - startDate.getTime()) / 1000) / 60) / 60) / 24);
}

async function setProgressBars() {
    const data = await getData("tasks");
    const progress = calculateProgress(data);
    drawProgressBars(progress);
}

function calculateProgress(data) {
    const progress = [];
    let completed = [0, 0, 0, 0];
    let total = [0, 0, 0, 0];
    let type;
    for (let i in data) {
        switch (data[i].task_type) {
                case "legal" : { type = 0; break; }
                case "vocal" : { type = 1; break; }
                case "FFS" : { type = 2; break; }
                case "vaginoplasty" : { type = 3; break; }
            }
            total[type]++;
            if (data[i].task_completed) {
                completed[type]++;
            }
    }

    for (let i = 0; i < total.length; i++) {
        progress.push(completed[i] / total[i]);
    }
    
    return progress;
}

function drawProgressBars(progress) {
    let width = document.querySelector("#progress-bars").clientWidth;
    let progressBars = document.querySelectorAll(".progress-bar");
    let labels = document.querySelectorAll(".progress-bar-label");
    for (let i in progressBars) {
        progressBars[i].width = width / 2;
        progressBars[i].height = width / 20;
        
        progressBars[i].style = "grid-area: progressBar" + i;
        labels[i].style = "grid-area: label" + i;
        labels[i].innerHTML += "&nbsp;" + (Math.round(progress[i] * 10000) / 100) + "%";
        
        fillProgressBar(progressBars[i], Math.round(progressBars[i].width * progress[i]), i);
    }
}

function fillProgressBar(bar, progress, palette) {
    const increment = Math.round(bar.height / 2);
    let color = 0;
    const colors = [
        ["darkorange", "orange", "white", "pink", "darkmagenta"],
        ["blue", "magenta", "white", "magenta"],
        ["magenta", "white"],
        ["red", "orange", "yellow", "green", "blue", "purple"]
    ]

    let c = bar.getContext("2d");
    for (let j = 0; j <= progress; j += (bar.height / 2)) {
        c.fillStyle = colors[palette][color];
        c.beginPath();
        c.moveTo(j, 0);
        c.lineTo(j + (bar.height / 2), 0);
        c.lineTo(j + (bar.height / 4), bar.height);
        c.lineTo(j - (bar.height / 4), bar.height);
        c.lineTo(j, 0);
        c.fill();

        bar.innerHTML = Math.round(progress / bar.width * 100) + "%";
        color++;
        if (color >= colors[palette].length) {
            color = 0;
        }
    }
    c.clearRect(progress, 0, bar.width - progress, bar.height);
}