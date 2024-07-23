import {GameZone} from "./Gamezone.js";

export class PlayerHealthBar {
    static #health_bar = {
        "pixel" : "assets/sprite/health_bar/player_health_bar.svg",
        "frame" : "assets/sprite/health_bar/player_health_bar_frame.svg"
    }

    static init = () => {
        let pixel = new Image()
        pixel.src = this.#health_bar["pixel"]
        this.#health_bar["pixel"] = pixel

        let frame = new Image()
        frame.src = this.#health_bar["frame"]
        this.#health_bar["frame"] = frame
    }

    static draw = (maxhp, hp, x = -2, y = 0) => {
        let ctx = GameZone.context

        let newMapHp = 43
        let hpRatio = hp / maxhp
        let newHp = Math.round(newMapHp * hpRatio)

        for (let i = 0; i < newHp; i++)
            ctx.drawImage(PlayerHealthBar.#health_bar["pixel"], x+33+i, y+12)

        ctx.drawImage(PlayerHealthBar.#health_bar["frame"], x, y)
    }
}