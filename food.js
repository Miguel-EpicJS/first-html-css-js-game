const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

export function drawFood(x,y){
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 25, 25);
}