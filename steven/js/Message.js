import {GameZone} from "./Gamezone.js";

export class Message {
    cpt = 40

    constructor(msg) {
        this.msg = msg
    }

    update = () => {
        let ctx = GameZone.context

        ctx.font = `5px PixelOperator`
        ctx.fillStyle = 'white'
        ctx.globalAlpha = this.#calculateAlpha()

        const textWidth = ctx.measureText(this.msg).width

        ctx.fillText(this.msg, (GameZone.canvas.width / GameZone.scale) - textWidth - GameZone.pixel/2, GameZone.pixel)

        ctx.globalAlpha = 1.00
        this.cpt--
    }

    #calculateAlpha = () => {
        return Math.max(0, (this.cpt - 1) * 0.20);
    }
}