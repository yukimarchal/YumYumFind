import {GameZone} from "./Gamezone.js";

export class EnnemiesHealthBar {
    static #health_bar_sprites = {
        "pixel" : "assets/sprite/health_bar/monster_health_bar.svg",
        "frame" : "assets/sprite/health_bar/monster_health_bar_frame.svg"
    }

    static init = () => {
        let pixel = new Image()
        pixel.src = this.#health_bar_sprites["pixel"]
        this.#health_bar_sprites["pixel"] = pixel

        let frame = new Image()
        frame.src = this.#health_bar_sprites["frame"]
        this.#health_bar_sprites["frame"] = frame
    }

    static draw = (maxhp, hp, x, y) => {
        let ctx = GameZone.context
        ctx.drawImage(EnnemiesHealthBar.#health_bar_sprites["frame"], x, y)

        let newMapHp = 23
        let hpRatio = hp / maxhp
        let newHp = Math.round(newMapHp * hpRatio)

        for (let i = 0; i < newHp; i++)
            ctx.drawImage(EnnemiesHealthBar.#health_bar_sprites["pixel"], x+10+i, y+3)
    }
}