import { drawFood } from './food.js'
import { drawEnemy } from './enemy.js'

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let x = 0;
let y = 0;

let foodX = [];
let foodY = [];

function randomFoodPosition() {
    for (let i = 0; i < Math.floor(Math.random() * 31)+10; i++) {
        foodX[i] = Math.floor(Math.random() * 850)
        foodY[i] = Math.floor(Math.random() * 850)
    }
}
randomFoodPosition()
let score = 0;

const scoreText = document.getElementById('score')

let velY = 0, velX = 0, speed = 4, friction = 0.95, keys = [];

let enemyX = [];
let enemyY = [];
function randomEnemyPosition() {
    for (let i = 0; i < Math.floor(Math.random() * 15)+5; i++) {
        enemyX[i] = Math.floor(Math.random() * 850)
        enemyY[i] = Math.floor(Math.random() * 850)
    }
}
randomEnemyPosition()

function drawPlayer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, 50, 50);
}
function collisionFood() {
    for (let i = 0; i < foodX.length; i++) {
        if (x < foodX[i] + 25 &&
            x + 50 > foodX[i] &&
            y < foodY[i] + 25 &&
            y + 50 > foodY[i]) {
            score += 2
            scoreText.innerHTML = score
            foodX[i] = Math.floor(Math.random() * 850);
            foodY[i] = Math.floor(Math.random() * 850);
            if (speed < 7) {
                speed += 0.2
            }
        }
    }
}
function collisionEnemy() {
    for (let i = 0; i < enemyX.length; i++) {
        if (x < enemyX[i] + 50 &&
            x + 50 > enemyX[i] &&
            y < enemyY[i] + 50 &&
            y + 50 > enemyY[i]) {
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

function update() {
    requestAnimationFrame(update);

    if (keys[38]) {
        if (velY > -speed) {
            velY--;
            collisionFood()
            collisionEnemy()
        }
    }

    if (keys[40]) {
        if (velY < speed) {
            velY++;
            collisionFood()
            collisionEnemy()
        }
    }
    if (keys[39]) {
        if (velX < speed) {
            velX++;
            collisionFood()
            collisionEnemy()
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
            collisionFood()
            collisionEnemy()
        }
    }

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;
    collisionFood()
    collisionEnemy()


    if (x > 850) {
        x = 850;
    } else if (x <= 0) {
        x = 0;
    }

    if (y > 850) {
        y = 850;
    } else if (y <= 0) {
        y = 0;
    }

    ctx.clearRect(0, 0, 900, 900);
    drawPlayer()
    for (let i = 0; i < foodX.length; i++) {
        drawFood(foodX[i], foodY[i])
    }
    for (let i = 0; i < enemyX.length; i++) {
        drawEnemy(enemyX[i], enemyY[i])
    }
}

update();
document.body.addEventListener("keydown", function (e) {
    keys[e.which] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.which] = false;
});