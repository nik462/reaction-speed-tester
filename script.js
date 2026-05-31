const box = document.getElementById("box");
const result = document.getElementById("result");

let startTime;
let timeout;
let ready = false;

function startGame() {
    ready = false;
    box.style.background = "red";
    box.textContent = "Wait...";

    const delay = Math.random() * 3000 + 1000;

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

    const reaction = Date.now() - startTime;
    result.textContent = `Reaction time: ${reaction} ms`;

    setTimeout(startGame, 2000);
});

startGame();
