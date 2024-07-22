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
        if(this.movingProgressRemaining >0){
        this.updatePosition();
        }
        else{

            //? plus de case pour commence a macher 
            //
            //

            //*case pour savoir si la touche a bien ete presser et executer 
            if(this.isPlayerControlled && stade.arrow){
                this.startBehavior(stade,{
                    type:"walk",
                    direction : stade.arrow
                })
            }
        }
        this.updateSprite(stade);
    }
//* set pour le hero et les pnj aller ou il vielle selon les limite de la map
    startBehavior(stade,behavior){
        this.direction = behavior.direction;
        if (behavior.type === "walk"){
            //* ici on s'arrete de bouger si il y a un true a la position (les corrodonée des mur table ,...) (le perso hein ! )
            if(stade.map.isSpaceTaken(this.x,this.y,this.direction)){
                return;
            }
            //*Tout de go ! 
            stade.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining = 16;
        }
    }


    updatePosition(){
            const [property,change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1
    }

    updateSprite(){

        if (this.movingProgressRemaining> 0){
            this.sprite.setAnimation("walk-"+this.direction); 
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
        
    }



}