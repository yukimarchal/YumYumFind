import { GameZone } from "./Gamezone.js";
import { Character } from "./Character.js";
import { Map } from "./Map.js"

GameZone.init()
const map1 = new Map("assets/testmap.svg", "assets/map_collision.svg")
const joueur = new Character();

window.joueur = joueur

const gameloop = () => {
    GameZone.clear()
    map1.update()
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