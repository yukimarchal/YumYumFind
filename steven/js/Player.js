import { GameZone } from "./Gamezone.js";
import {ATTACK, Character, DEATH, HIT, IDLE, WALK} from "./Character.js";
import {PlayerHealthBar} from "./PlayerHealthBar.js";

export class Player extends Character{
    keys = 0

    constructor() {
        super()

        this.endurance += 1
        this.force += 1

        this.x = 9
        this.y = 30
        this.correction_position_x = -24
        this.correction_position_y = -32

        this.sprites = {
            "idle": {
                "front": "assets/sprite/player/idle/front.svg",
                "back" : "assets/sprite/player/idle/back.svg",
                "left" : "assets/sprite/player/idle/left.svg",
                "right": "assets/sprite/player/idle/right.svg",
            },
            "walk" : {
                "front": "assets/sprite/player/walk/front.svg",
                "back" : "assets/sprite/player/walk/back.svg",
                "left" : "assets/sprite/player/walk/left.svg",
                "right": "assets/sprite/player/walk/right.svg",
            },
            "attack": {
                "front": "assets/sprite/player/attack/front.svg",
                "back" : "assets/sprite/player/attack/back.svg",
                "left" : "assets/sprite/player/attack/left.svg",
                "right": "assets/sprite/player/attack/right.svg",
            },
            "hit": {
                "front": "assets/sprite/player/hit/front.svg",
                "back" : "assets/sprite/player/hit/back.svg",
                "left" : "assets/sprite/player/hit/left.svg",
                "right": "assets/sprite/player/hit/right.svg",
            },
            "death": {
                "front": "assets/sprite/player/death.svg",
                "back" : "assets/sprite/player/death.svg",
                "left" : "assets/sprite/player/death.svg",
                "right": "assets/sprite/player/death.svg",
            }
        }
        this.loadSprites()

        this.healthbar = PlayerHealthBar
    }

    update = () => {
        if (this.action === DEATH && !GameZone.endOfGame) GameZone.endOfGame = true

        let position_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel + this.correction_position_x
        let position_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel + this.correction_position_y

        this.drawImage(this.sprites[this.action][this.direction],position_x, position_y)
    }

    updateHealthBar = () => {
        this.healthbar.update(this.maxhp, this.hp,undefined, undefined, this.keys)
    }

    rotate = (dx, dy) => {
        if (dx < 0)
            this.direction = "left"
        else if (dx > 0)
            this.direction = "right"
        else if (dy < 0)
            this.direction = "back"
        else if (dy > 0)
            this.direction = "front"
    }

    move = (dx,dy) => {
        if (this.action === DEATH || this.action === ATTACK || this.action === HIT) return

        this.action = WALK
        this.x += dx;
        this.y += dy;
        this.rotate(dx,dy)
    }
}