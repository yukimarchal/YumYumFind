import {Key} from "./Key.js";
import {Chest} from "./Chest.js";
import {Message} from "./Message.js";

export class GameZone {
    static scale = 4
    static pixel = 16
    static canvas = document.getElementById("canvas")
    static context = GameZone.canvas.getContext('2d')
    static #messages = []
    static endOfGame = false
    static cpt_eog = 25

    static init = (map, player, monsters) => {
        this.resize()
        this.map = map
        this.player = player
        this.monsters = monsters
        this.keys = []
        this.chest = new Chest(11,3)

        this.monsters.forEach((m) => {
            let key = new Key()
            m.addKey(key)
            this.keys.push(key)
        })

        this.rkey = new Image()
        this.rkey.src = "assets/keyboard/r.svg"

        this.mkey = new Image()
        this.mkey.src = "assets/keyboard/m.svg"

        this.upkey = new Image()
        this.upkey.src = "assets/keyboard/arrow_up.svg"

        this.leftkey = new Image()
        this.leftkey.src = "assets/keyboard/arrow_left.svg"

        this.downkey = new Image()
        this.downkey.src = "assets/keyboard/arrow_down.svg"

        this.rightkey = new Image()
        this.rightkey.src = "assets/keyboard/arrow_right.svg"

        this.spacekey = new Image()
        this.spacekey.src = "assets/keyboard/space.svg"
    }

    static resize = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight-80
        this.context.scale(this.scale,this.scale)
    }

    static gameloop = () => {
        this.clear()
        let ctx = GameZone.context
        ctx.globalAlpha =  this.calculateAlpha(GameZone.cpt_eog, 0.15)

        this.map.update()

        if (window.grid)
            this.drawGrid(GameZone.pixel, ctx, GameZone.canvas)

        this.chest.update()

        this.monsters.forEach((monster) => monster.update())
        this.player.update()

        this.player.updateHealthBar()

        ctx.drawImage(this.spacekey,(GameZone.canvas.width / 4)-85, (GameZone.canvas.height / 4)-15, 42, 12)
        ctx.drawImage(this.upkey,(GameZone.canvas.width / 4)-28, (GameZone.canvas.height / 4)-28, 12, 12)
        ctx.drawImage(this.leftkey,(GameZone.canvas.width / 4)-41, (GameZone.canvas.height / 4)-15, 12, 12)
        ctx.drawImage(this.downkey,(GameZone.canvas.width / 4)-28, (GameZone.canvas.height / 4)-15, 12, 12)
        ctx.drawImage(this.rightkey,(GameZone.canvas.width / 4)-15, (GameZone.canvas.height / 4)-15, 12, 12)

        this.#showMessage()

        ctx.globalAlpha = 1.0

        if (GameZone.endOfGame) {
            ctx.globalAlpha = this.calculateAlpha(-(GameZone.cpt_eog-5), 0.35)

            ctx.fillStyle = "black"
            ctx.fillRect(0,0,this.canvas.width,this.canvas.height)

            const msg = (this.chest.isOpen) ? "Tu as libéré le canard 🦆" : "Tu as perdu 😒"
            ctx.font = `5px PixelOperator`
            ctx.fillStyle = 'white'
            const textWidth = ctx.measureText(msg).width
            ctx.fillText(msg, (GameZone.canvas.width / 4 / 2) - textWidth/2, (GameZone.canvas.height / 4 / 2))

            ctx.drawImage(this.rkey,(GameZone.canvas.width / 4 / 2) - textWidth/2, (GameZone.canvas.height / 4 / 2)+8, 8,8)
            ctx.fillText("recommencer", (GameZone.canvas.width / 4 / 2) - textWidth/2 + 12, (GameZone.canvas.height / 4 / 2)+15)

            ctx.drawImage(this.mkey,(GameZone.canvas.width / 4 / 2) - textWidth/2, (GameZone.canvas.height / 4 / 2)+20, 8,8)
            ctx.fillText("menu principal", (GameZone.canvas.width / 4 / 2) - textWidth/2 + 12, (GameZone.canvas.height / 4 / 2)+27)

            GameZone.cpt_eog--
        }

        //requestAnimationFrame(GameZone.gameloop)
    }

    static calculateAlpha = (cpt, facteur) => {
        return Math.min(1, Math.max(0, (cpt - 1) * facteur))

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
        else if (e.keyCode === 32) {
            let coordAttack = this.player.coordAttack()
            let monster = GameZone.monsterIsPresent(coordAttack.x, coordAttack.y)
            this.player.attack(monster)

            let isChest = GameZone.chestIsPresent(coordAttack.x, coordAttack.y)
            if (isChest) {
                if (this.chest.isOpen) {
                    GameZone.#newMessage("Tu vas tuer le canard avec ton épée 🤬")
                }
                else if (this.player.keys === this.monsters.length) {
                    Session.win("steven")
                    this.chest.isOpen = true
                    this.endOfGame = true
                    GameZone.#newMessage("Tu as libéré le canard !")
                }
                else {
                    GameZone.#newMessage(`Il manque ${this.monsters.length-this.player.keys} clé(s)`)
                }
            }
        }
        else if (e.keyCode === 82 && GameZone.endOfGame){
            window.location.href = "./"
        }
        else if (e.keyCode === 77 && GameZone.endOfGame){
            window.location.href = "../"
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

    static wallIsPresent = (x,y) => this.map.wallIsPresent(x,y)

    static monsterIsPresent = (x,y) => this.monsters.find((e) => e.x === x && e.y === y && e.hp > 0)

    static chestIsPresent = (x,y) => this.chest.x === x && this.chest.y === y

    static playerIsPresent = (x,y) => this.player.x === x && this.player.y === y && this.player.hp > 0

    static KeyIsPresent = (x,y) => this.monsters.find((m) => m.x === x && m.y === y && m.key.isVisible)

    static clear = () => this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
}