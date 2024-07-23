class OverworldEvent {
    constructor({ map, event}) {
      this.map = map;
      this.event = event;
    }
  
    stand(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "stand",
        direction: this.event.direction,
        time: this.event.time
      })
      
      //*Configurer un gestionnaire pour terminer lorsque la personne a fini de marcher, puis résoudre l'événement
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonStandComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonStandComplete", completeHandler)
    }
  
    walk(resolve) {
      const who = this.map.gameObjects[ this.event.who ];
      who.startBehavior({
        map: this.map
      }, {
        type: "walk",
        direction: this.event.direction,
        retry: true
      })
  
     //*Configurer un gestionnaire pour terminer lorsque la personne a fini de marcher, puis résoudre l'événement
      const completeHandler = e => {
        if (e.detail.whoId === this.event.who) {
          document.removeEventListener("PersonWalkingComplete", completeHandler);
          resolve();
        }
      }
      document.addEventListener("PersonWalkingComplete", completeHandler)
  
    }
    // check message et direction de la tete pour parler au hero 
    textMessage(resolve) {
  
      if (this.event.faceHero) {
        const obj = this.map.gameObjects[this.event.faceHero];
        obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
      }
  
      const message = new TextMessage({
        text: this.event.text,
        onComplete: () => resolve()
      })
      message.init( document.querySelector(".game-container") )
    }
   //changer la zone de map 
    changeMap(resolve) {
  
      const sceneTransition = new SceneTransition();
      sceneTransition.init(document.querySelector(".game-container"),() => {
        this.map.overworld.startMap( window.OverworldMaps[this.event.map] );
        resolve();
  
        sceneTransition.fadeOut();
      })
  
    
    }
  
    init() {
      return new Promise(resolve => {
        this[this.event.type](resolve)      
      })
    }
  
  }
  //? ici ce trouve les event que on peut avoir dans le jeux 