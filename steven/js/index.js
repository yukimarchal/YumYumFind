import { GameZone } from "./Gamezone.js"
import { Player } from "./Player.js"
import { Monster } from "./Monster.js"
import { Map } from "./Map.js";

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

GameZone.init(map, joueur, [gobelin, slime])

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

window.addEventListener('load', () => {
    document.getElementById("loader").classList.add("hidden")
    GameZone.canvas.classList.remove("hidden")

    setInterval(GameZone.gameloop, 100)
    window.addEventListener('keydown', GameZone.keyevent)
    window.addEventListener('keyup', (e) => {
        if (e.code.startsWith("Arrow")) joueur.stopaction()
    })
})

window.addEventListener('resize', GameZone.init)