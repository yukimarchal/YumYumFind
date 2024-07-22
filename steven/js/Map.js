import { GameZone } from "./Gamezone.js";
import { joueur } from "./index.js";

export class Map {
    constructor(map, collision) {
        this.loadMap(map)
        //this.loadCollisionMap(collision)
    }

    loadMap(src) {
        let map = new Image()
        map.src = src
        map.onload = () => {
            let tmpcan = document.getElementById('hiddencanvas')
            tmpcan.width = map.width*4
            tmpcan.height = map.height*4

            let ctx = tmpcan.getContext('2d')
            ctx.scale(GameZone.scale, GameZone.scale)
            ctx.drawImage(map, 0, 0)

            GameZone.canvas.style.backgroundImage = `url(${tmpcan.toDataURL()})`
            ctx.clearRect(0,0,tmpcan.width,tmpcan.height)
        }

    }

    loadCollisionMap(src) {
        let tmpcol = new Image()
        tmpcol.src = src
        tmpcol.onload = () => {
            let tmpcan = document.getElementById('hiddencanvas')
            tmpcan.scale(1, 1)
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
        let x = joueur.x*GameZone.pixel - Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let y = joueur.y*GameZone.pixel - Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        GameZone.canvas.style.backgroundPositionX = `${-x*GameZone.scale}px`
        GameZone.canvas.style.backgroundPositionY = `${-y*GameZone.scale}px`
    }
}