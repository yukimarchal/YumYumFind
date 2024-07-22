class Person extends GameObject{

    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up" : ["y",-1],
            "down" : ["y",1],
            "left" : ["x",-1],
            "right" : ["x",1],
        }
    }

    update(stade){
        this.updatePosition();
        this.updateSprite(stade);

        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && stade.arrow){
            this.direction = stade.arrow;
            this.movingProgressRemaining = 16;
        }
    }


    updatePosition(){
        if(this.movingProgressRemaining >0){
            const [property,change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1
        }
    }

    updateSprite(stade){


        if(this.isPlayerControlled && this.movingProgressRemaining === 0 && !stade.arrow){
            this.sprite.setAnimation("idle-"+this.direction);
            return;
        }
        if (this.movingProgressRemaining> 0){
            this.sprite.setAnimation("walk-"+this.direction); 
        }
    }


}