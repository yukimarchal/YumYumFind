import {GameZone} from "./Gamezone.js";

export class Chest {
    longueur_sprite = 16
    hauteur_sprite = 32
    decallage_sprite_y = -1 * GameZone.pixel

    constructor(x,y) {
        this.x = x
        this.y = y
        this.cpt = 0
        this.isOpen = false

        let tmp = new Image()
        tmp.src = "assets/duck_chest.svg"
        this.sprite = tmp
    }

    update = () => {
        let ctx = GameZone.context

        let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel + this.decallage_sprite_y

        let position_x = (this.x - GameZone.player.x) * GameZone.pixel + position_joueur_x
        let position_y = (this.y - GameZone.player.y) * GameZone.pixel + position_joueur_y

        let nbframe = this.sprite.width/this.longueur_sprite

        let debut_sprite_x = this.longueur_sprite*(this.cpt%nbframe)
        let debut_sprite_y = 0

        ctx.drawImage(this.sprite, debut_sprite_x, debut_sprite_y, this.longueur_sprite, this.hauteur_sprite, position_x, position_y, this.longueur_sprite, this.hauteur_sprite)

        if (this.isOpen && !(this.cpt%nbframe === nbframe-1))
            this.cpt++
    }
}