export class GameZone {
    static scale = 4
    static pixel = 16
    static canvas = document.getElementById("canvas")
    static context = GameZone.canvas.getContext('2d')

    static init = (map, player, monsters) => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context.scale(this.scale,this.scale)

        this.map = map
        this.player = player
        this.monsters = monsters
    }

    static gameloop = () => {
        this.clear()
        this.map.update()

        if (window.grid)
            this.drawGrid(GameZone.pixel, GameZone.context, GameZone.canvas)

        this.player.update()
        this.monsters.forEach((monster) => monster.update())
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

            if (!GameZone.wallIsPresent(this.player.x+dx, this.player.y+dy))
                this.player.move(dx,dy)
        }
        else if (e.code === "Space") {
            this.player.attack()
        }
    }

    static wallIsPresent = (x,y) => {
        return this.map.wallIsPresent(x,y)
    }

    static clear = () => {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}