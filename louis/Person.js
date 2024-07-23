class Person extends GameObject {
    constructor(config) {
      super(config);
      this.movingProgressRemaining = 0;
      this.isStanding = false;
  
      this.isPlayerControlled = config.isPlayerControlled || false;
  
      this.directionUpdate = {
        "up": ["y", -1],
        "down": ["y", 1],
        "left": ["x", -1],
        "right": ["x", 1],
      }
    }
  
    update(state) {
      if (this.movingProgressRemaining > 0) {
        this.updatePosition();
      } else {
  
        //? plus de case pour commence a macher 
        //
        //
  
        //*case pour savoir si la touche a bien ete presser et executer 
        if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow
          })
        }
        this.updateSprite(state);
      }
    }
  //* set pour le hero et les pnj aller ou il vielle selon les limite de la map
    startBehavior(state, behavior) {
       //* ici on s'arrete de bouger si il y a un true a la position (les corrodonée des mur table ,...) (le perso hein ! )
      this.direction = behavior.direction;
      
      if (behavior.type === "walk") {
        //Stop here if space is not free
        if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
  
          behavior.retry && setTimeout(() => {
            this.startBehavior(state, behavior)
          }, 10);
  
          return;
        }
  
        //*Tout de go !
        state.map.moveWall(this.x, this.y, this.direction);
        this.movingProgressRemaining = 16;
        this.updateSprite(state);
      }
  
      if (behavior.type === "stand") {
        this.isStanding = true;
        setTimeout(() => {
          utils.emitEvent("PersonStandComplete", {
            whoId: this.id
          })
          this.isStanding = false;
        }, behavior.time)
      }
  
    }
  
    updatePosition() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
  
        if (this.movingProgressRemaining === 0) {
          // ici c'est finis l'animation !
          utils.emitEvent("PersonWalkingComplete", {
            whoId: this.id
          })
  
        }
    }
  
    updateSprite() {
      if (this.movingProgressRemaining > 0) {
        this.sprite.setAnimation("walk-"+this.direction);
        return;
      }
      this.sprite.setAnimation("idle-"+this.direction);    
    }
  
  }