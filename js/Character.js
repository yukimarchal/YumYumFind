import { GameZone } from "./Gamezone.js";
import { deplacement } from "./index.js";

export class Character {
    sprites= {
        "idle": {
            "front": "assets/sprite/idle/front.svg",
            "back" : "assets/sprite/idle/back.svg",
            "left" : "assets/sprite/idle/left.svg",
            "right": "assets/sprite/idle/right.svg",
        },
        "walk" : {
            "front": "assets/sprite/walk/front.svg",
            "back" : "assets/sprite/walk/back.svg",
            "left" : "assets/sprite/walk/left.svg",
            "right": "assets/sprite/walk/right.svg",
        },
        "attack": {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        },
        "hit": {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        }
    }


    constructor() {
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 14
        this.y = 34
        this.cpt = 0
        this.lastmovement = "front"

        for (let category in this.sprites) {
            for (let direction in this.sprites[category]) {
                let path = this.sprites[category][direction]
                let tmp = new Image()
                tmp.src = path
                tmp.onload = () => this.update()
                this.sprites[category][direction] = tmp
            }
        }
        window.sprites = this.sprites

        console.log()
    }

    update() {
        let ctx = GameZone.context

        let action = (deplacement) ? "walk" : "idle"
        let nbframe = this.sprites[action]["front"].width/64

        let position_x = window.innerWidth/2/GameZone.decal
        let position_y = window.innerHeight/2/GameZone.decal

        let longueur_sprite = 64
        let hauteur_sprite = 64

        let debut_sprite_x = 64*(this.cpt%nbframe)
        let debut_sprite_y = 0

        ctx.drawImage(this.sprites[action][this.lastmovement], debut_sprite_x, debut_sprite_y, longueur_sprite, hauteur_sprite, position_x, position_y, longueur_sprite, hauteur_sprite)
        this.cpt++
    }

    move(dx,dy) {
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
}