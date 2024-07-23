class RevealingText{
    constructor(config){
        this.element = config.element;
        this.text = config.text;
        this.speed =config.speed || 50;


        this.timeout = null;
        this.isDone = false;
    }
//*recusive elle s'appelle elle même 
    revealOneCharacter(list){
        const next = list.splice(0,1)[0];
        next.span.classList.add("revealed")

        if (list.length>0){
            this.timeout = setTimeout(() => {
                this.revealOneCharacter(list)
            }, next.delayAfter);
        }else{
            this.isDone = true;
        }
    }

    warpToDone(){
        clearTimeout(this.timeout);
        this.isDone = true;
        this.element.querySelectorAll("span").forEach(s => {
            s.classList.add("revealed");
        })
    }

    init() {

        //*creation d'une liste pour avoir les lettre par lettre du texte pour les faire apparaitre  1 par 1 
        let characters = [];
        this.text.split("").forEach(character => {

            // cration d'un span et ajout les element dans le DOM 
            let span = document.createElement("span");
            span.textContent= character;
            this.element.appendChild(span);

            //ajouter le span dans notre interal state Array 
            characters.push({
                span,
                delayAfter: character === " " ? 0 : this.speed // if 
            })
        })


        this.revealOneCharacter(characters)

    }


}