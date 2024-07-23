import {GameZone} from "./Gamezone.js";
import {EnnemiesHealthBar} from "./EnnemiesHealthBar.js";

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
        this.x = 0
        this.y = 0
        this.maxhp = 10
        this.hp = this.maxhp

        this.health_corr_x = 0
        this.health_corr_y = 0

        this.longueur_sprite = 64
        this.hauteur_sprite = 64

        if (sprites !== undefined) {
            this.sprites = sprites
            this.loadSprites()
            this.healthbar = EnnemiesHealthBar
        }
    }

    loadSprites = () => {
        for (let category in this.sprites) {
            for (let direction in this.sprites[category]) {
                if (this.sprites[category][direction] !== undefined) {
                    this.sprites[category][direction] = this.#convertPathToImg(this.sprites[category][direction])
                }
            }
        }
    }

    #convertPathToImg = (path) => {
        let tmp = new Image()
        tmp.src = path
        return tmp
    }

    drawImage = (image, x, y, isHealthBar = false ) => {
        let ctx = GameZone.context

        let nbframe = this.sprites[this.action]["right"].width/this.longueur_sprite

        let debut_sprite_x = this.longueur_sprite*(this.cpt%nbframe)
        let debut_sprite_y = 0

        ctx.drawImage(image, debut_sprite_x, debut_sprite_y, this.longueur_sprite, this.hauteur_sprite, x, y, this.longueur_sprite, this.hauteur_sprite)
        if (isHealthBar) this.healthbar.draw(this.maxhp, this.hp,x+this.health_corr_x,y+this.health_corr_y)

        //(Continue les animations tant que l'animation de mort n'est pas termine)
        if (!(this.action === DEATH && this.cpt%nbframe === nbframe-1))
            this.cpt++

        if ((this.action === ATTACK || this.action === HIT) && this.cpt%nbframe === nbframe-1) {
            this.stopaction()
        }
    }

    coordAttack  = () => {
        let x = this.x, y = this.y;
        if (this.direction === "front")
            y += 1
        else if (this.direction  === "back")
            y -= 1
        else if (this.direction  === "left")
            x -= 1
        else if (this.direction  === "right")
            x += 1
        return {x,y}
    }

    attack = (target = undefined) => {
        if (this.action === DEATH || this.action === ATTACK || this.action === HIT) return
        this.action = ATTACK
        this.cpt = 0

        if (target !== undefined) {
            target.hit(3)
        }
    }

    hit = (damage = 0) => {
        if (this.action === DEATH) return

        this.hp -= damage
        if (this.hp <= 0) {
            this.action = DEATH
        }
        else {
            this.action = HIT
        }
        this.cpt = 0
    }

    stopaction = () => {
        if (this.action === DEATH) return
        this.action = IDLE
    }
}
