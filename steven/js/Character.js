import {GameZone} from "./Gamezone.js";

export const ATTACK = "attack"
export const DEATH = "death"
export const HIT = "hit"
export const IDLE = "idle"
export const WALK = "walk"

export class Character {
    sprites= {
        ATTACK: {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        },
        HIT: {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        },
        IDLE: {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        },
        WALK : {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        }
    }

    constructor(sprites = undefined) {
        this.direction = "right"
        this.action = IDLE
        this.cpt = 0

        this.longueur_sprite = 64
        this.hauteur_sprite = 64

        if (sprites !== undefined) {
            this.sprites = sprites
            this.loadSprites()
        }
    }

    loadSprites = () => {
        for (let category in this.sprites) {
            for (let direction in this.sprites[category]) {
                if (this.sprites[category][direction] !== undefined) {
                    let path = this.sprites[category][direction]
                    let tmp = new Image()
                    tmp.src = path
                    this.sprites[category][direction] = tmp
                }
            }
        }
    }

    drawImage = (image, x, y) => {
        let ctx = GameZone.context

        let nbframe = this.sprites[this.action]["right"].width/64

        let debut_sprite_x = 64*(this.cpt%nbframe)
        let debut_sprite_y = 0

        ctx.drawImage(image, debut_sprite_x, debut_sprite_y, this.longueur_sprite, this.hauteur_sprite, x, y, this.longueur_sprite, this.hauteur_sprite)
        this.cpt++

        if ((this.action === ATTACK || this.action === HIT) && this.cpt%nbframe === nbframe-1) {
            this.stopaction()
        }
    }

    attack = () => {
        this.action = ATTACK
        this.cpt = 0
    }

    hit = () => {
        this.action = HIT
        this.cpt = 0
    }

    stopaction = () => {
        this.action = IDLE
    }
}
