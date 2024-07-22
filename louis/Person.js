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
            if(!stade.map.isCutscenePlaying && this.isPlayerControlled && stade.arrow){
                this.startBehavior(stade,{
                    type:"walk",
                    direction : stade.arrow
                })
            }
            this.updateSprite(stade);
        }
    }
//* set pour le hero et les pnj aller ou il vielle selon les limite de la map
    startBehavior(stade,behavior){
        this.direction = behavior.direction;
        if (behavior.type === "walk"){
            //* ici on s'arrete de bouger si il y a un true a la position (les corrodonée des mur table ,...) (le perso hein ! )
            if(stade.map.isSpaceTaken(this.x,this.y,this.direction)){

                behavior.retry && setTimeout(() => {
                    this.startBehavior(stade,behavior)
                }, 10);
                return;
            }
            //*Tout de go ! 
            stade.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining = 16;
            this.updateSprite(stade);
        }

        if(behavior.type === "stand"){
            setTimeout(() => {
                utils.emitEvent("PersonWalkingComlete",{
                    whoId: this.id
                })
            },behavior.time)
        }


    }


    updatePosition(){
            const [property,change] = this.directionUpdate[this.direction]
            this[property] += change;
            this.movingProgressRemaining -= 1

            if(this.movingProgressRemaining === 0){
                // ici c'est finis l'animation !

                utils.emitEvent("PersonWalkingComlete",{
                    whoId: this.id
                })
            }
    }

    updateSprite(){

        if (this.movingProgressRemaining> 0){
            this.sprite.setAnimation("walk-"+this.direction); 
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
        
    }



}