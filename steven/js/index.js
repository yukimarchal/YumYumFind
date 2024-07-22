import { GameZone } from "./Gamezone.js"
import { Player } from "./Player.js"
import { Monster } from "./Monster.js"
import { Map } from "./Map.js"

GameZone.init()
const map1 = new Map("assets/map/map.svg", "assets/map/map_collision.svg")
const joueur = new Player()
const gobelin = new Monster({
    "idle": {
        "left" : "assets/sprite/goblin/idle/left.svg",
        "right": "assets/sprite/goblin/idle/right.svg",
    },
    "attack": {
        "left" : "assets/sprite/goblin/attack/left.svg",
        "right": "assets/sprite/goblin/attack/right.svg",
    },
    "hit": {
        "left" : "assets/sprite/goblin/hit/left.svg",
        "right": "assets/sprite/goblin/hit/right.svg",
    }
}, -24, -27)
const slime = new Monster({
    "idle": {
        "left" : "assets/sprite/slime/idle/left.svg",
        "right": "assets/sprite/slime/idle/right.svg",
    },
    "attack": {
        "left" : "assets/sprite/slime/attack/left.svg",
        "right": "assets/sprite/slime/attack/right.svg",
    },
    "hit": {
        "left" : "assets/sprite/slime/hit/left.svg",
        "right": "assets/sprite/slime/hit/right.svg",
    }
}, -24, -27)


window.joueur = joueur
window.gobelin = gobelin
window.slime = slime
window.grid = false

joueur.x = 14
joueur.y = 35

gobelin.x = 2
gobelin.y = 22

slime.x = 15
slime.y = 14
slime.direction = "left"

const gameloop = () => {
    GameZone.clear()
    map1.update()

    if (window.grid)
        drawGrid(GameZone.pixel, GameZone.context, GameZone.canvas)

    gobelin.update()
    slime.update()
    joueur.update()
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