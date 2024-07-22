class OverworldEvent{

    constructor({map,event}){
        this.map = map;
        this.event = event;

    }

    stand(resolve){

         const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map :this.map
        },{
            type:"stand",
            direction : this.event.direction,
            time : this.event.time
        })
        //*Configurer un gestionnaire pour terminer lorsque la personne a fini de marcher, puis résoudre l'événement
         const completeHandler = e =>{
             if(e.detail.whoId === this.event.who){
                 document.removeEventListener("PersonWalkingComlete",completeHandler);
                 resolve();

            }
         }
        document.addEventListener("PersonWalkingComlete",completeHandler)

    }

    walk(resolve){
        const who = this.map.gameObjects[this.event.who];
        who.startBehavior({
            map :this.map
        },{
            type:"walk",
            direction : this.event.direction,
            retry: true
        })
        //*Configurer un gestionnaire pour terminer lorsque la personne a fini de marcher, puis résoudre l'événement
        const completeHandler = e =>{
            if(e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComlete",completeHandler);
                resolve();

            }
        }
        document.addEventListener("PersonWalkingComlete",completeHandler)

    }

    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }










}

//? ici ce trouve les event que on peut avoir dans le jeux 