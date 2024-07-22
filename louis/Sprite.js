class Sprite{
    constructor(config) {

        //*creation de l'image 
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Shadow set up 

        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false

        if(this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }

        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }
        //*confururation de l'animation et amplacement du perso 
        //*cration de l'animation 
        this.animations = config.animations || {
            "idle-down":[ [0,0]  ],
            "idle-right":[ [0,1]  ],
            "idle-up":[ [0,2]  ],
            "idle-left":[ [0,3]  ],
            "walk-down":[ [1,0] ,[0,0],[3,0],[0,0] ],
            "walk-right":[ [1,1] ,[0,1],[3,1],[0,1] ],
            "walk-up":[ [1,2] ,[0,2],[3,2],[0,2] ],
            "walk-left":[ [1,3] ,[0,3],[3,3],[0,3] ]
           
        }
        this.currentAnimation = "walk-down" ;//config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;
        //* ici on peut chnager la vitesse de frame plus on va haut plus il est lent plus on va vers le bas plus il va vite (animation pas nombre de case) 
        this.animationsFrameLimit = config.animationsFrameLimit || 16;
        this.animationsFrameProgress = this.animationsFrameLimit;

        //* ref le jeux en object 
        this.gameObject= config.gameObject;
        
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationsFrameProgress = this.animationsFrameLimit;
        }
    }

    updateAnimationProgress(){
        //*bas animation 
        if(this.animationsFrameProgress > 0){
            this.animationsFrameProgress-=1;
            return;
        }
        // rest le conteur 
        this.animationsFrameProgress = this.animationsFrameLimit
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }
//! changement de calcule pour le x sup le - 8 sinon pas au centre des case pourquoi ??? 
    draw(ctx,cameraPerson) {
        const x = this.gameObject.x  + utils.withGrid(10,5) - cameraPerson.x;
        const y =this.gameObject.y  - 18 + utils.withGrid(6) - cameraPerson.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow,x,y)


        const[frameX,frameY]=this.frame

        this.isLoaded && ctx.drawImage(this.image,
            frameX*32,frameY*32, // couper l'image a gauche et en top
            32,32, // couper width et  height
            x,y, // pos en x et y 
            32,32 // taille du hero 
        )
        this.updateAnimationProgress();
    }

}

//! ici on cree les sprite (les perso) et on leur donne des coordoner et les info pour les mettre dans la page web a leur bonne zone 