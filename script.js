const box = document.getElementById("box");
const result = document.getElementById("result");
const bestDisplay = document.getElementById("best");
const restartBtn = document.getElementById("restart");

let startTime;
let timeout;
let ready = false;

let best = localStorage.getItem("best") || null;

function updateBest() {
    if (best) {
        bestDisplay.textContent = "Best: " + best + " ms";
    } else {
        bestDisplay.textContent = "Best: -";
    }
}

function startGame() {
    ready = false;
    box.style.background = "red";
    box.textContent = "Wait...";

    let delay = Math.random() * 3000 + 1000;

    timeout = setTimeout(() => {
        box.style.background = "green";
        box.textContent = "CLICK!";
        startTime = Date.now();
        ready = true;
    }, delay);
}

box.addEventListener("click", () => {
    if (!ready) {
        result.textContent = "Too early!";
        clearTimeout(timeout);
        setTimeout(startGame, 1500);
        return;
    }

    let reaction = Date.now() - startTime;
    result.textContent = "Time: " + reaction + " ms";

    if (!best || reaction < best) {
        best = reaction;
        localStorage.setItem("best", best);
        updateBest();
    }

    setTimeout(startGame, 2000);
});

restartBtn.addEventListener("click", () => {
    result.textContent = "";
    startGame();
});

updateBest();
startGame();