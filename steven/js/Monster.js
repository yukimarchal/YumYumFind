import { GameZone } from "./Gamezone.js";
import {joueur} from "./index.js";

const ATTACK = "attack"
const HIT = "hit"
const IDLE = "idle"
const WALK = "walk"

export class Monster {
    sprites= {
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
    }

    constructor() {
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 8
        this.y = 30
        this.cpt = 0

        this.lastmovement = "right"
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
        let nbframe = this.sprites[this.action]["right"].width/64

        let correction_position_x = -24
        let correction_position_y = -27

        let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel

        let position_x = (this.x - joueur.x) * GameZone.pixel + position_joueur_x + correction_position_x
        let position_y = (this.y - joueur.y) * GameZone.pixel + position_joueur_y + correction_position_y

        console.log((this.x - joueur.x) * GameZone.pixel, (this.y - joueur.y) * GameZone.pixel)

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