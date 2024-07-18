import { joueur } from "./index.js";
import { GameZone } from "./Gamezone.js";

export class Life {
    constructor() {
        this.heart_full = new Image()
        this.heart_full.src = "assets/heart_full.svg"

        this.heart_half = new Image()
        this.heart_half.src = "assets/heart_half.svg"

        this.heart_empty = new Image()
        this.heart_empty.src = "assets/heart_empty.svg"
    }

    update() {
        let i = 0;
        let full= 0, half= 0, empty = 0

        while (i < joueur.maxhp)
        {
            if (i < joueur.hp && i+1 < joueur.hp)
                full++
            else if (i < joueur.hp)
                half++
            else
                empty++
            i += 2;
        }

        let ctx = GameZone.context
        let startX = (window.innerWidth/2/GameZone.decal) - ((full + half + empty) * (GameZone.decal+2)) / 2;

        for (i = 0; i < full; i++)
        {
            ctx.drawImage(this.heart_full, startX+i*10, 1)
        }

        if (half === 1)
        {
            ctx.drawImage(this.heart_half, startX+i*10, 1)
        }

        for (let j = 0; j < empty; j++)
        {
            ctx.drawImage(this.heart_empty, startX+(full+half+j)*10, 1)
        }
    }

}