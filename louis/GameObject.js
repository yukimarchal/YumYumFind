class GameObject{
    constructor(config) {
        this.id=null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/louis/images/characters/people/hero.png",
        });

        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIdex = 0;




    }

    mount(map){
        console.log("mounting");
        this.isMounted = true;
        map.addWall(this.x,this.y)
        //* si il y a un behavior, le dégagder apres un moment 
        setTimeout(()=>{
            this.doBehaviorEvent(map);
        },10)



    }
    update(){
    }

    //* async et await est une fonction qui va exsucuter le truc dans le await et après il repasse dans la fonction pour faire le sreste 
    async doBehaviorEvent(map){

        // si il n'y a pas action de mouvenent de perso alors on sort 
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0){
            return
        }


        // paramettre de creation pour avoir les info 
        let eventConfing = this.behaviorLoop[this.behaviorLoopIdex];
        eventConfing.who = this.id;
        //cree l'event que on l'on vois dans le rendu final
        const eventHandler = new OverworldEvent({ map,event : eventConfing });
       await eventHandler.init();

       // apres fais ca. (settup la prochain event la prochaine action )

       this.behaviorLoopIdex += 1;
       if(this.behaviorLoopIdex === this.behaviorLoop.length){
        this.behaviorLoopIdex = 0;
       }
       // refais ca en boucle ! 
       this.doBehaviorEvent(map);


    }



}

//TODO CHANGER LES SKIN DES PERSO ICI !!! 