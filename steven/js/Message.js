import {GameZone} from "./Gamezone.js";

export class Message {
    cpt = 40

    constructor(msg) {
        this.msg = msg
    }

    update = (i) => {
        i++
        let ctx = GameZone.context

        ctx.font = `5px PixelOperator`
        ctx.fillStyle = 'white'
        ctx.globalAlpha = GameZone.calculateAlpha(this.cpt, 0.20)

        const textWidth = ctx.measureText(this.msg).width

        ctx.fillText(this.msg, (GameZone.canvas.width / GameZone.scale) - textWidth - GameZone.pixel/2, GameZone.pixel*i)

        ctx.globalAlpha = 1.00
        this.cpt--
    }
}