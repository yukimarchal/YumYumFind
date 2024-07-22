import { GameZone } from "./Gamezone.js";

const ATTACK = "attack"
const HIT = "hit"
const IDLE = "idle"
const WALK = "walk"

export class Character {
    sprites= {
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
        }
    }

    constructor() {
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 14
        this.y = 34
        this.cpt = 0

        this.lastmovement = "front"
        this.action = IDLE

        for (let category in this.sprites) {
            for (let direction in this.sprites[category]) {
                let path = this.sprites[category][direction]
                let tmp = new Image()
                tmp.src = path
                this.sprites[category][direction] = tmp
            }
        }
        window.sprites = this.sprites
    }

    update() {
        let ctx = GameZone.context
        let nbframe = this.sprites[this.action]["front"].width/64

        let correction_position_x = -24
        let correction_position_y = -32

        let position_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel + correction_position_x
        let position_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel + correction_position_y

        let longueur_sprite = 64
        let hauteur_sprite = 64

        let debut_sprite_x = 64*(this.cpt%nbframe)
        let debut_sprite_y = 0

        ctx.drawImage(this.sprites[this.action][this.lastmovement], debut_sprite_x, debut_sprite_y, longueur_sprite, hauteur_sprite, position_x, position_y, longueur_sprite, hauteur_sprite)
        this.cpt++

        if ((this.action === ATTACK || this.action === HIT) && this.cpt%nbframe === nbframe-1) {
            this.stopaction()
        }
    }


    move(dx,dy) {
        if (this.action === ATTACK || this.action === HIT) return

        this.action = WALK
        this.x += dx;
        this.y += dy;

        if (dx < 0)
            this.lastmovement = "left"
        else if (dx > 0)
            this.lastmovement = "right"
        else if (dy < 0)
            this.lastmovement = "back"
        else if (dy > 0)
            this.lastmovement = "front"
    }

    attack() {
        this.action = ATTACK
        this.cpt = 0
    }

    hit() {
        this.action = HIT
        this.cpt = 0
    }

    stopaction() {
        this.action = IDLE
    }
}