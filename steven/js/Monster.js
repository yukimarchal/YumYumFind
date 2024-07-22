import { GameZone } from "./Gamezone.js";
import {ATTACK, Character, DEATH, HIT, IDLE, WALK} from "./Character.js";

export class Monster extends Character{


    constructor(sprites, corr_x, corr_y) {
        super()
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 8
        this.y = 30

        this.correction_position_x = corr_x
        this.correction_position_y = corr_y
        this.sprites = sprites
        this.loadSprites()
    }

    update() {
        let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel

        let position_x = (this.x - GameZone.player.x) * GameZone.pixel + position_joueur_x + this.correction_position_x
        let position_y = (this.y - GameZone.player.y) * GameZone.pixel + position_joueur_y + this.correction_position_y

        this.drawImage(this.sprites[this.action][this.direction],position_x, position_y)
    }
}