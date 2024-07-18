import { GameZone } from "./Gamezone.js";
import { sprites } from "./CharacterSpriteIdle.js";
import {GIF} from "./GIF.js";

export class Character {
    constructor() {
        this.maxhp = 11
        this.hp = this.maxhp
        this.x = 14
        this.y = 34
        this.cpt = 0
        // this.sprite = new Image()
        // this.sprite.src = "assets/sprite/front/idle_front.gif"
        // this.sprite.onload = () => this.update()

        this.sprite = GIF()
        this.sprite.load("assets/sprite/front/idle_front.gif")
    }

    update() {
        let ctx = GameZone.context
        ctx.drawImage(this.sprite.image, window.innerWidth/2/GameZone.decal, window.innerHeight/2/GameZone.decal)
    }

    move(dx,dy)
    {
        this.x += dx;
        this.y += dy;
    }
}