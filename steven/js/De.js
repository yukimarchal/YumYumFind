export class De {
    static QuatreFace = new De(1,4)
    static SixFace = new De(1,6)

    #min
    #max

    constructor(min, max) {
        this.#min = min
        this.#max = max
    }

    lance = () => {
        return Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
    }

    QuatreLance = () => {
        return [this.lance(), this.lance(), this.lance(), this.lance()]
    }
}