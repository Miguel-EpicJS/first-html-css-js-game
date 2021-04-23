const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

export function drawEnemy(x,y){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, 50, 50);
}