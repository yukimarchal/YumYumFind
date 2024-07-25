const CURSOR = document.querySelector(".cursor")
const HOLES = [...document.querySelectorAll(".hole")]
const SCOREEL = document.querySelector(".score span")
const LIFEPOINT = document.querySelector(".life span")
const GAMEOVER = document.querySelector(".life")
let score =0
let time = 1000
let life = 5
let timeout = 3000
const SOUND = new Audio("/louis/images/bonk.mp3")
const SOUNCAWK = new Audio("/louis/images/duck-quack.mp3")
Session.createIfNotExists("louis")









function speedtime (time){

    

}

function run(){
    const i = Math.floor(Math.random() * HOLES.length)
    const hole = HOLES[i]
    const choiseimg =  Math.floor(Math.random() * 4)
    const img = document.createElement("img")
    let timer  = null
    let canClick = true;

    function choiximg(choiseimg){
        if(choiseimg === 0){
            img.classList.add("logo")
            img.src = "/louis/images/css-oof.png"
            SOUND.play()
        }else if (choiseimg === 1){
            img.classList.add("logo")
            img.src = "/louis/images/html-oof.png"
            SOUND.play()
        }else if (choiseimg === 2){
            img.classList.add("logo")
            img.src = "/louis/images/javascript-oof.png"
            SOUND.play()
        }else if (choiseimg === 3){
            img.classList.add("logo")
            img.src = "/louis/images/duck-oof.png"
            SOUNCAWK.play()
        }
        
    }

    //* choix des image ici  // 
    if(choiseimg === 0){
        img.classList.add("logo")
        img.src = "/louis/images/css-3.png"
    }else if (choiseimg === 1){
        img.classList.add("logo")
        img.src = "/louis/images/html-1.png"
    }else if (choiseimg === 2){
        img.classList.add("logo")
        img.src = "/louis/images/javascript-1.png"
    }else if (choiseimg === 3){
        img.classList.add("logo")
        img.src = "/louis/images/duck.png"
    }
    

    
    img.addEventListener("click", () =>{
        
        if(canClick){

            if (choiseimg != 3){
                score += 10

            }else{
                score -=10
                life -=1
                console.log("toucher")
                
            }
            time -=10
            SCOREEL.textContent = score
            LIFEPOINT.textContent = life
            choiximg(choiseimg)
            clearTimeout(timer)
            console.log(time)
            timer = setTimeout(() => {
                hole.removeChild(img)
                run()
            },400)
            
        }

    })
    hole.appendChild(img)

    setTimeout(() => {
        canClick = false;
     }, time); // coupe le click en 1sec 

     

    timer = setTimeout(() => {
        hole.removeChild(img)
        if(life != 0 &&  timeout > 0 ){
            timeout -= 100
            console.log(timeout)
            run()

        }else if (timeout === 0 && life > 0){

            GAMEOVER.textContent ='patie terminer ! '
            Session.win("louis")
        }else{
            GAMEOVER.textContent ='GAME OVER !'
        }
        
    },time)// ici pour chnager le temps des appartision du logo 

}











//*  init fonction et jeux 

if (life >0){
console.log("ouais c'est michel ")
    run()
}else{
    GAMEOVER.textContent = "GAME OVER !"
}

//? event avec le clic  et la sourir ↓↓↓

//* suivis de la souri du marteaux 
window.addEventListener("mousemove", e => {
    CURSOR.style.top = e.pageY + "px"
    CURSOR.style.left = e.pageX + "px"
})

//* mouvement du marteaux appel 

window.addEventListener("mousedown", () =>{
 CURSOR.classList.add("active")
})

window.addEventListener("mouseup", () =>{
    CURSOR.classList.remove("active")
   })

