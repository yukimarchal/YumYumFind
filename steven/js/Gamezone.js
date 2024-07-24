import {Key} from "./Key.js";
import {Chest} from "./Chest.js";
import {Message} from "./Message.js";

export class GameZone {
    static scale = 4
    static pixel = 16
    static canvas = document.getElementById("canvas")
    static context = GameZone.canvas.getContext('2d')
    static #messages = []

    static init = (map, player, monsters) => {
        this.resize()
        this.map = map
        this.player = player
        this.monsters = monsters
        this.keys = []
        this.chest = new Chest(14,3)

        this.monsters.forEach((m) => {
            let key = new Key()
            m.addKey(key)
            this.keys.push(key)
        })
    }

    static resize = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context.scale(this.scale,this.scale)
    }

    static gameloop = () => {
        this.clear()
        this.map.update()

        if (window.grid)
            this.drawGrid(GameZone.pixel, GameZone.context, GameZone.canvas)

        this.chest.update()

        this.monsters.forEach((monster) => monster.update())
        this.player.update()

        this.player.updateHealthBar()

        this.#showMessage()

        //requestAnimationFrame(GameZone.gameloop)
    }

    static drawGrid = (spritesize, ctx, canvas) => {
        const gridSize = spritesize
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height

        ctx.lineWidth = 0.5
        ctx.beginPath()
        for (let x = 0; x <= canvasWidth; x += gridSize) {
            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvasHeight)
        }
        for (let y = 0; y <= canvasHeight; y += gridSize) {
            ctx.moveTo(0, y)
            ctx.lineTo(canvasWidth, y)
        }
        ctx.strokeStyle = '#000'
        ctx.stroke()
    }

    static keyevent = (e) => {
        if (e.code.startsWith("Arrow")) {
            let dx = 0, dy = 0;
            if (e.code === "ArrowDown")
                dy += 1
            else if (e.code === "ArrowUp")
                dy -= 1
            else if (e.code === "ArrowLeft")
                dx -= 1
            else if (e.code === "ArrowRight")
                dx += 1

            if (GameZone.noObstacle(this.player.x+dx, this.player.y+dy)) {
                this.player.move(dx,dy)

                let monster = GameZone.KeyIsPresent(this.player.x, this.player.y)
                if (monster !== undefined && monster.key.isVisible) {
                    monster.key.isVisible = false
                    this.player.keys++
                }
            }
            else {
                this.player.rotate(dx,dy)
            }
        }
        else if (e.code === "Space") {
            let coordAttack = this.player.coordAttack()
            let monster = GameZone.monsterIsPresent(coordAttack.x, coordAttack.y)
            this.player.attack(monster)

            let isChest = GameZone.chestIsPresent(coordAttack.x, coordAttack.y)
            if (isChest) {
                if (this.chest.isOpen) {
                    GameZone.#newMessage("Tu vas tuer le canard avec ton épée 🤬")
                }
                else if (this.player.keys === this.monsters.length) {
                    this.chest.isOpen = true
                    GameZone.#newMessage("Tu as libéré le canard !")
                }
                else {
                    GameZone.#newMessage(`Il manque ${this.monsters.length-this.player.keys} clé(s)`)
                }
            }
        }
    }

    static #newMessage = (msg) => {
        this.#messages.push(new Message(msg))
    }

    static #showMessage = () => {
        this.#messages.forEach((m, i) => {
            m.update(i)
        })
        this.#messages = this.#messages.filter(m => m.cpt !== 0)
    }

    static noObstacle = (x,y) => {
        return !GameZone.monsterIsPresent(x, y) && !GameZone.wallIsPresent(x, y) && !GameZone.chestIsPresent(x,y)
    }

    static wallIsPresent = (x,y) => {
        return this.map.wallIsPresent(x,y)
    }

    static monsterIsPresent = (x,y) => {
        return this.monsters.find((e) => e.x === x && e.y === y && e.hp > 0)
    }

    static chestIsPresent = (x,y) => {
        return this.chest.x === x && this.chest.y === y
    }

    static playerIsPresent = (x,y) => {
        return this.player.x === x && this.player.y === y && this.player.hp > 0
    }

    static KeyIsPresent = (x,y) => {
        return this.monsters.find((m) => m.x === x && m.y === y && m.key.isVisible)
    }

    static clear = () => {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}