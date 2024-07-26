import { GameZone } from "./Gamezone.js";
import {Character, DEATH} from "./Character.js";
import {EnnemiesHealthBar} from "./EnnemiesHealthBar.js";

export class Monster extends Character{
    #idInteraval = undefined

    constructor(sprites, corr_x, corr_y, health_corr_x, health_corr_y, bonus_endu = 0, bonus_force = 0) {
        super()
        this.x = 8
        this.y = 30

        this.endurance += bonus_endu
        this.force += bonus_force

        this.correction_position_x = corr_x
        this.correction_position_y = corr_y
        this.health_corr_x = health_corr_x
        this.health_corr_y = health_corr_y

        this.sprites = sprites
        this.loadSprites()

        this.healthbar = EnnemiesHealthBar

        this.#idInteraval = setInterval(this.#check, 1500)
    }

    #check = () => {
        if (GameZone.playerIsPresent(this.x-1, this.y))
        {
            this.direction = "left"
            this.attack(GameZone.player)
        }
        else if (GameZone.playerIsPresent(this.x+1, this.y))
        {
            this.direction = "right"
            this.attack(GameZone.player)
        }

    }

    addKey = (key) => {
        this.key = key
    }

    update = () => {
        let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel

        let position_x = (this.x - GameZone.player.x) * GameZone.pixel + position_joueur_x + this.correction_position_x
        let position_y = (this.y - GameZone.player.y) * GameZone.pixel + position_joueur_y + this.correction_position_y

        this.drawImage(this.sprites[this.action][this.direction],position_x, position_y, this.hp !== this.maxhp && this.hp > 0)

        this.key.update()

        if (this.action === DEATH && this.#idInteraval !== undefined) {
            this.key.x = this.x
            this.key.y = this.y
            this.key.isVisible = true

            clearInterval(this.#idInteraval)
            this.#idInteraval = undefined
        }
    }
}