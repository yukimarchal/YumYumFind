class GameObject{
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/louis/images/characters/people/hero.png",
        });
    }

    mount(map){
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x,this.y)
    }
    update(){

    }





}

//TODO CHANGER LES SKIN DES PERSO ICI !!! 