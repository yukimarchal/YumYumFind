import {GameZone} from "./Gamezone.js";
import {EnnemiesHealthBar} from "./EnnemiesHealthBar.js";
import {De} from "./De.js";

export const ATTACK = "attack"
export const DEATH = "death"
export const HIT = "hit"
export const IDLE = "idle"
export const WALK = "walk"

export class Character {
    endurance = 0
    force = 0

    hp = 10
    maxhp = this.hp

    x = 0
    y = 0

    direction = "right"
    action = IDLE
    cpt = 0

    health_corr_x = 0
    health_corr_y = 0

    longueur_sprite = 64
    hauteur_sprite = 64

    sprites = undefined
    healthbar = EnnemiesHealthBar

    constructor() {
        this.endurance = this.sommeMeilleursLances(De.SixFace.QuatreLance()) + 5;
        this.force = this.sommeMeilleursLances(De.QuatreFace.QuatreLance());
        this.hp = this.maxhp = this.applyModificator(this.endurance);
    }

    sommeMeilleursLances = (l,nb = 3) => {
        l.sort((a, b) => a - b)
        return l.slice(-nb).reduce((acc, val) => acc + val, 0)
    }

    applyModificator = (statBase) => {
        switch(true){
            case statBase < 5: return statBase - 1
            case statBase < 10: return statBase + 0
            case statBase < 15: return statBase + 1
            default: return statBase + 2;
        }
    }

    loadSprites = () => {
        if (this.sprites !== undefined) {
            for (let category in this.sprites) {
                for (let direction in this.sprites[category]) {
                    if (this.sprites[category][direction] !== undefined) {
                        let tmp = new Image()
                        tmp.src = this.sprites[category][direction]
                        this.sprites[category][direction] = tmp
                    }
                }
            }
        }
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
            let damage = this.sommeMeilleursLances(De.QuatreFace.QuatreLance(),4) + this.applyModificator(this.force)
            target.hit(damage)
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
