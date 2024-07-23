class GameObject {
    constructor(config) {
      this.id = null;
      this.isMounted = false;
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.direction = config.direction || "down";
      this.sprite = new Sprite({
        gameObject: this,
        src: config.src || "/louis/images/characters/people/hero.png",
      });
  
      this.behaviorLoop = config.behaviorLoop || [];
      this.behaviorLoopIndex = 0;
  
      this.talking = config.talking || [];
  
    }
  
    mount(map) {
      console.log("mounting!")
      this.isMounted = true;
      map.addWall(this.x, this.y);
  
      //* si il y a un behavior, le dégagder apres un moment 
      setTimeout(() => {
        this.doBehaviorEvent(map);
      }, 10)
    }
  
    update() {
    }
  
    async doBehaviorEvent(map) { 
  
      //* async et await est une fonction qui va exsucuter le truc dans le await et après il repasse dans la fonction pour faire le sreste 
      if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
        return;
      }
  
      // si il n'y a pas action de mouvenent de perso alors on sort 
      let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
      eventConfig.who = this.id;
  
      // paramettre de creation pour avoir les info 
      const eventHandler = new OverworldEvent({ map, event: eventConfig });
      await eventHandler.init(); 
  
      // apres fais ca. (settup la prochain event la prochaine action )
      this.behaviorLoopIndex += 1;
      if (this.behaviorLoopIndex === this.behaviorLoop.length) {
        this.behaviorLoopIndex = 0;
      } 
  
      // refais ca en boucle 
      this.doBehaviorEvent(map);
      
  
    }
  
  
  }
  
  //TODO ICI CE TROUVE LE HERO A CHANGER 