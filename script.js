const box = document.getElementById("box");
const current = document.getElementById("current");
const bestEl = document.getElementById("best");
const avgEl = document.getElementById("avg");
const attemptsEl = document.getElementById("attempts");
const restart = document.getElementById("restart");

let startTime;
let timeout;
let ready = false;

let times = [];
let round = 0;
const maxRounds = 5;

let best = localStorage.getItem("best") || null;

function updateStats() {
    let avg = times.length
        ? Math.round(times.reduce((a, b) => a + b) / times.length)
        : 0;

    current.textContent = "Current: -";
    bestEl.textContent = "Best: " + (best ? best + " ms" : "-");
    avgEl.textContent = "Average: " + (times.length ? avg + " ms" : "-");
    attemptsEl.textContent = `Attempts: ${round} / ${maxRounds}`;
}

function startGame() {
    if (round >= maxRounds) {
        box.textContent = "Finished!";
        return;
    }

    ready = false;
    box.style.background = "red";
    box.textContent = "Wait...";
    box.classList.remove("active");

    let delay = Math.random() * 3000 + 1000;

    timeout = setTimeout(() => {
        box.style.background = "green";
        box.textContent = "CLICK!";
        box.classList.add("active");
        startTime = Date.now();
        ready = true;
    }, delay);
}

box.addEventListener("click", () => {
    if (!ready) {
        box.textContent = "Too early!";
        clearTimeout(timeout);
        setTimeout(startGame, 1000);
        return;
    }

    let reaction = Date.now() - startTime;
    times.push(reaction);
    round++;

    current.textContent = "Current: " + reaction + " ms";

    if (!best || reaction < best) {
        best = reaction;
        localStorage.setItem("best", best);
    }

    updateStats();

    setTimeout(startGame, 1000);
});

restart.addEventListener("click", () => {
    times = [];
    round = 0;
    updateStats();
    startGame();
});

updateStats();
startGame();