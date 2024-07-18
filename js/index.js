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
    life.update()
    inventory.update()
}

const arrowkey = (e) => {
    if (e.key === "ArrowDown" && !map1.wallIsPresent(joueur.x, joueur.y+1))
        joueur.move(0,1)
    else if (e.key === "ArrowUp" && !map1.wallIsPresent(joueur.x, joueur.y-1))
        joueur.move(0,-1)
    else if (e.key === "ArrowLeft"  && !map1.wallIsPresent(joueur.x-1, joueur.y))
        joueur.move(-1,0)
    else if (e.key === "ArrowRight" && !map1.wallIsPresent(joueur.x+1, joueur.y))
        joueur.move(1,0)
}

window.addEventListener('DOMContentLoaded', () => setInterval(gameloop, 400))
window.addEventListener('resize', GameZone.init)
window.addEventListener('keydown', arrowkey)

export { joueur }
