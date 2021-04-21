import { drawFood } from './food.js'
import { drawEnemy } from './enemy.js'
import { sec } from './timer.js'

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let deltaX = 0;
let deltaY = 0;

let foodX = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];
let foodY = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];

let score = 0;

const scoreText = document.getElementById('score')

let keys = [];
let speed =2;

let enemyX = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];
let enemyY = [Math.floor(Math.random() * 850), Math.floor(Math.random() * 850), Math.floor(Math.random() * 850)];


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
    for (let i = 0; i < 3; i++) {
        drawEnemy(enemyX[i], enemyY[i])
    }
    collisionFood()
    collisionEnemy()
    if(sec == 0){
        alert('O tempo acabou')
        location.reload();
    }
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
            score += 2
            scoreText.innerHTML = score
            foodX[i] = Math.floor(Math.random() * 850);
            foodY[i] = Math.floor(Math.random() * 850);
            if(speed < 5){
                speed += 0.2
            }
        }   
    }
}
function collisionEnemy() {
    for (let i = 0; i < 3; i++) {
        if (deltaX < enemyX[i] + 50 &&
            deltaX + 50 > enemyX[i] &&
            deltaY < enemyY[i] + 50 &&
            deltaY + 50 > enemyY[i]) {
            score = score - 5
            scoreText.innerHTML = score
            enemyX[i] = Math.floor(Math.random() * 850);
            enemyY[i] = Math.floor(Math.random() * 850);
            if (speed >= -45) {
                speed = speed - 0.1                
            }
        }   
    }
}

drawPlayer()
for (let i = 0; i < 5; i++) {
    drawFood(foodX[i], foodY[i])
}
for (let i = 0; i < 3; i++) {
    drawEnemy(enemyX[i], enemyY[i])
}
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);