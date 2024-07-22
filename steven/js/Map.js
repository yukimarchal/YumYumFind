import { GameZone } from "./Gamezone.js";

export class Map {
    constructor(map, collision) {
        this.loadMap(map)
        this.loadCollisionMap(collision)
    }

    loadMap = (src) => {
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

    loadCollisionMap = (src) => {
        let tmpcol = new Image()
        tmpcol.src = src
        tmpcol.onload = () => {
            let tmpcan = document.getElementById('hiddencanvas')

            tmpcan.width = tmpcol.width
            tmpcan.height = tmpcol.height

            let ctx = tmpcan.getContext('2d')
            ctx.scale(1, 1)
            ctx.drawImage(tmpcol, 0, 0)

            const pixels = ctx.getImageData(0,0,tmpcan.width,tmpcan.height).data
            const boolArray = []

            for (let i = 0; i < pixels.length; i += 4) {
                if (pixels[i] === 255 && pixels[i + 1] === 0 && pixels[i + 2] === 0)
                    boolArray.push(false)
                else
                    boolArray.push(true)
            }

            const result = []
            for (let i = 0; i < boolArray.length; i+=tmpcan.width) {
                result.push(boolArray.slice(i, i + tmpcan.width));
            }
            this.collision = result
        }

    }

    wallIsPresent(x,y) {
        return this.collision[y][x]
    }

    update() {
        let x = GameZone.player.x*GameZone.pixel - Math.floor(Math.floor((GameZone.canvas.width / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        let y = GameZone.player.y*GameZone.pixel - Math.floor(Math.floor((GameZone.canvas.height / GameZone.scale) / 2) / GameZone.pixel) * GameZone.pixel
        GameZone.canvas.style.backgroundPositionX = `${-x*GameZone.scale}px`
        GameZone.canvas.style.backgroundPositionY = `${-y*GameZone.scale}px`
    }
}