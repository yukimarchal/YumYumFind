import { GameZone } from "./Gamezone.js";
import { Character } from "./Character.js";
import { Monster } from "./Monster.js";
import { Map } from "./Map.js"

GameZone.init()
const map1 = new Map("assets/testmap.svg", "assets/map_collision.svg")
const joueur = new Character();
const monster = new Monster();

window.joueur = joueur
window.monster = monster
window.grid = false

const gameloop = () => {
    GameZone.clear()
    map1.update()

    if (window.grid)
        drawGrid(GameZone.pixel, GameZone.context, GameZone.canvas)

    joueur.update()
    monster.update()
}

const arrowkey = (e) => {
    if (e.code.startsWith("Arrow")) {
        let dx = 0, dy = 0;
        if (e.code === "ArrowDown")
            dy += 1
        else if (e.code === "ArrowUp")
            dy -= 1
        else if (e.code === "ArrowLeft")
            dx -= 1
        else if (e.code === "ArrowRight")
            dx += 1

        if (!map1.wallIsPresent(joueur.x+dx, joueur.y+dy))
            joueur.move(dx,dy)
    }
    else if (e.code === "Space") {
        joueur.attack()
    }
}

const drawGrid = (spritesize, ctx, canvas) => {
    const gridSize = spritesize;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x <= canvasWidth; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
    }
    for (let y = 0; y <= canvasHeight; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
    }
    ctx.strokeStyle = '#000';
    ctx.stroke();
}

window.addEventListener('load', () => {
    document.getElementById("loader").classList.add("hidden")
    GameZone.canvas.classList.remove("hidden")

    setInterval(gameloop, 100)
    window.addEventListener('keydown', arrowkey)
    window.addEventListener('keyup', (e) => {
        if (e.code.startsWith("Arrow")) joueur.stopaction()
    })
})

window.addEventListener('resize', GameZone.init)


export { joueur }