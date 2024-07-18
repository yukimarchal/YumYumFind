import { GameZone } from "./Gamezone.js";
import { joueur } from "./index.js";

export class Map {
    constructor(map, collision) {
        this.loadMap(map)
        this.loadCollisionMap(collision)
    }

    loadMap(src) {
        this.map = new Image()
        this.map.src = src
        this.map.onload = () => {
            let ctx = GameZone.context
            ctx.drawImage(this.map, 0, 0)
        }
    }

    loadCollisionMap(src) {
        let tmpcol = new Image()
        tmpcol.src = src
        tmpcol.onload = () => {
            let tmpcan = document.getElementById('hiddencanvas')
            tmpcan.width = tmpcol.width
            tmpcan.height = tmpcol.height

            let ctx = tmpcan.getContext('2d')
            ctx.drawImage(tmpcol, 0, 0)

            const pixels = ctx.getImageData(0,0,tmpcan.width,tmpcan.height).data
            const boolArray = []

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] === 255 && pixels[i + 1] === 0 && pixels[i + 2] === 0)
                    boolArray.push(true)
                else
                    boolArray.push(false)
            }

            const result = []
            for (let i = 0; i < boolArray.length; i+=tmpcan.width) {
                result.push(boolArray.slice(i, i + tmpcan.width));
            }

            this.collision = result
        }
    }

    wallIsPresent(x,y) {
        //return this.collision[y][x]
        return false
    }

    update() {
        let ctx = GameZone.context
        ctx.drawImage(this.map, 0-joueur.x*GameZone.decal+window.innerWidth/2/GameZone.decal, 0-joueur.y*GameZone.decal+window.innerHeight/2/GameZone.decal)
    }
}