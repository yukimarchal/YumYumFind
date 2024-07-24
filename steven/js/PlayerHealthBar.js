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

    static update = (maxhp, hp, x = -2, y = 0, keys) => {
        let ctx = GameZone.context

        let newMapHp = 45
        let hpRatio = hp / maxhp
        let newHp = Math.round(newMapHp * hpRatio)

        for (let i = 0; i < newHp; i++) {
            if (i === 43 || i === 44) {
                ctx.drawImage(PlayerHealthBar.#health_bar["pixel"], 0, 0, 1, 3, x + 33 + i, y + 12, 1, 3)
            }
            else {
                ctx.drawImage(PlayerHealthBar.#health_bar["pixel"], x+33+i, y+12)
            }
        }

        ctx.drawImage(PlayerHealthBar.#health_bar["frame"], x, y)

        ctx.font = "5px PixelOperator";
        ctx.fillStyle = "white";
        ctx.fillText(keys,x+41,y+26);
    }
}