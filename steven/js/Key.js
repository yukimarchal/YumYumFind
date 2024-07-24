import {GameZone} from "./Gamezone.js";

export class Key {
    x = 0
    y = 0
    isVisible = false

    constructor() {
        if (!(Key.sprites instanceof Image)) {
            let tmp = new Image()
            tmp.src = "assets/key.svg"
            Key.sprites = tmp
        }
    }

    update = () => {
        if (this.isVisible) {
            let position_joueur_x = Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
            let position_joueur_y = Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel

            let x = (this.x - GameZone.player.x) * GameZone.pixel + position_joueur_x
            let y = (this.y - GameZone.player.y) * GameZone.pixel + position_joueur_y

            let ctx = GameZone.context
            ctx.drawImage(Key.sprites, x, y)
        }
    }
}