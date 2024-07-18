import { GameZone } from "./Gamezone.js";
import { Character } from "./Character.js";
import { Map } from "./Map.js"
import {Life} from "./Life.js";
import {Inventory} from "./Inventory.js";
import {initSprite} from "./CharacterSpriteIdle.js";


GameZone.init()
initSprite()
const map1 = new Map("assets/testmap.svg", "assets/map_collision.svg")
const joueur = new Character();
const life = new Life()
const inventory = new Inventory()

window.joueur = joueur

const gameloop = () => {
    GameZone.clear()
    map1.update()
    joueur.update()
}

const arrowkey = (e) => {
    let dx = 0, dy = 0;
    if (e.key === "ArrowDown")
        dy += 1
    else if (e.key === "ArrowUp")
        dy -= 1
    else if (e.key === "ArrowLeft")
        dx -= 1
    else if (e.key === "ArrowRight")
        dx += 1

    if (!map1.wallIsPresent(joueur.x+dx, joueur.y+dy))
        joueur.move(dx,dy)
}

window.addEventListener('DOMContentLoaded', () => setInterval(gameloop, 100))
window.addEventListener('resize', GameZone.init)
window.addEventListener('keydown', arrowkey)

export { joueur }
