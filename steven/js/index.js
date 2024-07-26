import { GameZone } from "./Gamezone.js"
import { Player } from "./Player.js"
import { Monster } from "./Monster.js"
import { Map } from "./Map.js";
import {EnnemiesHealthBar} from "./EnnemiesHealthBar.js";
import {PlayerHealthBar} from "./PlayerHealthBar.js";

const map = new Map("assets/map/map.svg", "assets/map/map_collision.svg")
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
    },
    "death": {
        "left" : "assets/sprite/goblin/death.svg",
        "right": "assets/sprite/goblin/death.svg",
    }
}, -24, -27, 10, 8, 0, 1)
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
    },
    "death": {
        "left" : "assets/sprite/slime/death.svg",
        "right": "assets/sprite/slime/death.svg",
    }
}, -24, -27, 12, 8, 1, 0)

Session.createIfNotExists("steven")
GameZone.init(map, joueur, [gobelin, slime])
PlayerHealthBar.init()
EnnemiesHealthBar.init()

window.gz = GameZone
window.joueur = joueur
window.gobelin = gobelin
window.slime = slime
window.grid = false

joueur.x = 11
joueur.y = 17
joueur.direction = "right"

gobelin.x = 1
gobelin.y = 15

slime.x = 21
slime.y = 12
slime.direction = "left"

window.addEventListener('load', () => {
    document.getElementById("loader").classList.add("hidden")
    GameZone.canvas.classList.remove("hidden")

    setInterval(GameZone.gameloop, 100)
    //requestAnimationFrame(GameZone.gameloop)

    window.addEventListener('keydown', GameZone.keyevent)
    window.addEventListener('keyup', (e) => {
        if (e.code.startsWith("Arrow")) joueur.stopaction()
    })
})

window.addEventListener('resize', GameZone.resize)