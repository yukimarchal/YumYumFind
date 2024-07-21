export class GameZone {
    static scale = 4
    static pixel = 16
    static canvas = document.getElementById("canvas")
    static context = GameZone.canvas.getContext('2d')

    static init = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context.scale(this.scale,this.scale)
    }

    static clear = () => {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}