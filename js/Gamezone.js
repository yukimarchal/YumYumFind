export class GameZone {
    static decal = 8
    static canvas = document.getElementById("canvas")
    static context = GameZone.canvas.getContext('2d')

    static init = () => {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
        this.context.scale(4,4)
    }

    static clear = () => {
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}