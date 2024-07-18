const srcsprites = {
    "idle": {
        "front": [
            "assets/sprite/front/1.svg",
            "assets/sprite/front/2.svg",
            "assets/sprite/front/3.svg",
            "assets/sprite/front/4.svg",
            "assets/sprite/front/5.svg",
            "assets/sprite/front/6.svg",
            "assets/sprite/front/7.svg",
            "assets/sprite/front/8.svg",
            "assets/sprite/front/9.svg",
            "assets/sprite/front/10.svg",
            "assets/sprite/front/11.svg",
            "assets/sprite/front/12.svg"
        ],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "walk" : {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "attack": {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "hit": {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    }
}

const sprites = {
    "idle": {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "walk" : {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "attack": {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    },
    "hit": {
        "front": [],
        "back" : [],
        "left" : [],
        "right": [],
    }

}

const initSprite = () => {
    let buffer = []
    srcsprites["idle"]["front"].forEach((v) => {
        let img = new Image()
        img.src = v
        buffer.push(img)
    })
    sprites["idle"]["front"] = buffer

}

export {initSprite, sprites}
