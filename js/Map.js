import { GameZone } from "./Gamezone.js";
import { joueur } from "./index.js";

export class Map {
    constructor(map, collision) {
        this.loadMap(map)
        //this.loadCollisionMap(collision)
    }

    loadMap(src) {
        this.map = new Image()
        this.map.src = src
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

        let x = joueur.x*16 - Math.floor(Math.floor((GameZone.canvas.width / 4) / 2) / 16) * 16
        let y = joueur.y*16 - Math.floor(Math.floor((GameZone.canvas.height / 4) / 2) / 16) * 16
        ctx.drawImage(this.map, -x, -y)

        ctx.font = "8px Arial";
        ctx.fillText(`jx ${joueur.x} | jy ${joueur.y}`, 10, 15)
        ctx.fillText(`mx ${x} | my ${y}`, 10, 25)
    }
}