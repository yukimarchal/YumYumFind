import { GameZone } from "./Gamezone.js";

export class Character {
    sprites= {
        "idle": {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
        },
        "walk" : {
            "front": undefined,
            "back" : undefined,
            "left" : undefined,
            "right": undefined,
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


        this.sprite = new Image()
        this.sprite.src = "assets/sprite/idle/right.svg"
        this.sprite.onload = () => this.update()


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

        let position_x = window.innerWidth/2/GameZone.decal
        let position_y = window.innerHeight/2/GameZone.decal

        let longueur_sprite = 64
        let hauteur_sprite = 32

        let debut_sprite_x = 64*(this.cpt%12)
        let debut_sprite_y = 0

        ctx.drawImage(this.sprite, debut_sprite_x, debut_sprite_y, longueur_sprite, hauteur_sprite, position_x, position_y, longueur_sprite, hauteur_sprite)
        this.cpt++
    }

    move(dx,dy) {
        //axe x => gauche droite | axe y => bas haut
        this.x += dx;
        this.y += dy;



    }
}