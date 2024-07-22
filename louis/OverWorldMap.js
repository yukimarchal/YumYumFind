class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
      this.walls=config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;

      this.isCutscenePlaying = false;


    }
  //* dessine les map du jeux avec diffrente couche 
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(10.5) - cameraPerson.x,
        utils.withGrid(6) - cameraPerson.y
        )
    }
  //* dessine les map du jeux avec diffrente couche 
    drawUpperImage(ctx,cameraPerson) {
    ctx.drawImage(this.upperImage, 
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
    } 
    //* savoir si la possition du hero est dans un mur ou non 
    isSpaceTaken(currentX,currentY,direction){
      const{x,y} =utils.nextPosition(currentX,currentY,direction);
      return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
      Object.keys(this.gameObjects).forEach(key =>{

        let object = this.gameObjects[key];
        object.id = key; 
        //TODO dertiminer les objet que on pour prendre 
        object.mount(this);

      })
    }

    async startCutscene(events){
      this.isCutscenePlaying = true;

      for(let i=0; i<events.length; i++){
        const eventHandler = new OverworldEvent({
          event : events[i],
          map : this,
        })
        await eventHandler.init();
      }
      this.isCutscenePlaying = false;
    }

    addWall(x,y){
      this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y){
      delete this.walls[`${x},${y}`] 
    }
    moveWall(wasX,wasY,direction){
      this.removeWall(wasX,wasY)
      const{x,y} = utils.nextPosition(wasX,wasY,direction);
      this.addWall(x,y);
    }

  }
  //TODO CHANGER LE NOM DE LA ZONE DE MAP SUIVIS DU TUTO EP 3 
  //! place les objet du jeux ICI (perso et map) !
  window.OverworldMaps = {
    DemoRoom: {
      lowerSrc: "/louis/images/maps/DemoLower.png",
      upperSrc: "/louis/images/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled:true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
          npcA: new Person({
           x: utils.withGrid(7),
           y: utils.withGrid(9),
            src: "/louis/images/characters/people/npc1.png",
            //* donne des info au png pour bouger avec un temps like pokemon 
            behaviorLoop: [
              {type:"stand",direction:"left",time: 800},
              {type:"stand",direction:"up",time: 800},
              {type:"stand",direction:"right",time: 1200},
              {type:"stand",direction:"up",time: 300},
            ]
          }),
          npcB: new Person({
            x: utils.withGrid(3),
            y: utils.withGrid(7),
             src: "/louis/images/characters/people/npc2.png",
              //* donne des info au png pour bouger avec un temps like pokemon 
             behaviorLoop: [
              {type:"walk",direction:"left"},
              {type:"stand",direction:"up",time: 800},
              {type:"walk",direction:"up"},
              {type:"walk",direction:"right"},
              {type:"walk",direction:"down"},
             ] 
           }),
      },
      walls: {
        //*dinamique key 
        //"16,16" : true 
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(8,7)] : true,
      }
    },
    Kitchen: {
      lowerSrc: "/louis/images/maps/KitchenLower.png",
      upperSrc: "/louis/images/maps/KitchenUpper.png",
      gameObjects: {
        hero: new GameObject({
          x: 3,
          y: 5,
        }),
        npc1: new GameObject({
          x: 9,
          y: 6,
          src: "/louis/images/characters/people/npc2.png"
        }),
        npc2: new GameObject({
          x: 10,
          y: 8,
          src: "/louis/images/characters/people/npc3.png"
        })
      }
    },
  }