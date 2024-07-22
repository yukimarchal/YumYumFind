class OverworldMap {
    constructor(config) {
      this.gameObjects = config.gameObjects;
      this.walls=config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
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
      Object.values(this.gameObjects).forEach(o =>{

        //TODO dertiminer les objet que on pour prendre 


        o.mount(this);

      })
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
          npc1: new Person({
           x: utils.withGrid(7),
           y: utils.withGrid(9),
            src: "/louis/images/characters/people/npc1.png"
          })
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
        npcA: new GameObject({
          x: 9,
          y: 6,
          src: "/louis/images/characters/people/npc2.png"
        }),
        npcB: new GameObject({
          x: 10,
          y: 8,
          src: "/louis/images/characters/people/npc3.png"
        })
      }
    },
  }