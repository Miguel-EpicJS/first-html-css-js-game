import { drawFood } from './food.js'

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let deltaX = 0;
let deltaY = 0;
let foodX = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];
let foodY = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];
let score = 0;
const scoreText = document.getElementById('score')
let keys = [];
let speed = 2;

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(deltaX, deltaY, 50, 50);
}
function keysPressed(e) {
    keys[e.keyCode] = true;

    if (keys[37] && deltaX > 0) {
        deltaX -= speed;
    }

    if (keys[39] && deltaX < 850) {
        deltaX += speed;
    }

    if (keys[38] && deltaY > 0) {
        deltaY -= speed;
    }

    if (keys[40] && deltaY < 850) {
        deltaY += speed;
    }

    e.preventDefault();

    drawPlayer();
    for (let i = 0; i < 5; i++) {
        drawFood(foodX[i], foodY[i])
    }
    collisionFood()
}
function keysReleased(e) {
    keys[e.keyCode] = false;
}
function collisionFood() {
    for (let i = 0; i < 5; i++) {
        if (deltaX < foodX[i] + 25 &&
            deltaX + 50 > foodX[i] &&
            deltaY < foodY[i] + 25 &&
            deltaY + 50 > foodY[i]) {
            score = score + 2
            scoreText.innerHTML = score
            foodX[i] = Math.floor(Math.random() * 850);
            foodY[i] = Math.floor(Math.random() * 850);
            speed = speed + 0.1
        }   
    }
}

drawPlayer()
for (let i = 0; i < 5; i++) {
    drawFood(foodX[i], foodY[i])
}
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);