import { GameZone } from "./Gamezone.js";
import {joueur} from "./index.js";
import {ATTACK, Character, DEATH, HIT, IDLE, WALK} from "./Character.js";

export class Monster extends Character{


    constructor() {
        super()
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 8
        this.y = 30

        this.correction_position_x = -24
        this.correction_position_y = -27

        this.sprites= {
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

        this.loadSprites()
    }

    update() {
        let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel

        let position_x = (this.x - joueur.x) * GameZone.pixel + position_joueur_x + this.correction_position_x
        let position_y = (this.y - joueur.y) * GameZone.pixel + position_joueur_y + this.correction_position_y

        this.drawImage(this.sprites[this.action][this.direction],position_x, position_y)
    }
}