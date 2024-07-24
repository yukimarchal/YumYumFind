const plaTeau = document.querySelector("#plateau")
const affichJoueur = document.querySelector("#joueur")
const infoAffich = document.querySelector("#info-Affich")
const width = 8

const placePieces = [
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour,
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour
]

let playerJoue = 'black'
affichJoueur.textContent = 'black'

function affichPlateau() {
    placePieces.forEach((placePiece, i) => {
        const carre = document.createElement('div')
        carre.classList.add('carre')
        carre.innerHTML = placePiece
        carre.firstChild?.setAttribute('draggable', true)
        carre.setAttribute('carre-id', i)
        const ligne = Math.floor((63 - i) / 8) + 1
        if (ligne % 2 === 0) {
            carre.classList.add(i % 2 === 0 ? "chartreuse" : "blue")
        } else {
            carre.classList.add(i % 2 === 0 ? "blue" : "chartreuse")
        }
        if (i <= 15 && carre.firstChild) {
            carre.firstChild.firstChild.classList.add('black')
        }
        if (i >= 48 && carre.firstChild) {
            carre.firstChild.firstChild.classList.add('white')
        }
        plaTeau.append(carre)
    })
}
affichPlateau()

const allCarres = document.querySelectorAll('.carre')

allCarres.forEach(carre => {
    carre.addEventListener('dragstart', premierCoup)
    carre.addEventListener('dragover', coupPerdu)
    carre.addEventListener('drop', coupJouer)
})


let startPositionInit
let coup

function premierCoup(e) {
    startPositionInit = e.target.parentNode.getAttribute('carre-id')
    coup = e.target
}

function coupPerdu(e) {
    e.preventDefault()
}

function coupJouer(e) {
    e.stopPropagation()
    console.log('e.target', e.target)
    const coupCorrect = coup.firstChild.classList.contains(playerJoue)
    const pris = e.target.classList.contains('pieces')
    const valid = coupPossible(e.target)
    const premierJoueur = playerJoue === 'white' ? 'black' : 'white'
    const coupPris = e.target.firstChild?.classList.contains(premierJoueur)

    if (coupCorrect) {

        if (coupPris && valid) {
            e.target.parentNode.append(coup)
            e.target.remove()
            echecetmat()
            joueurSuivant()
            return;
        }
        if (pris && !coupPris) {
            infoAffich.textContent = "non non non"
            setTimeout (() => infoAffich.textContent = "", 2000)
            return;
        }

        if (valid) {
            e.target.append(coup)
            echecetmat()
            joueurSuivant()
            return;
        }
    }
}

function coupPossible(target) {
    const cibleId = Number(target.getAttribute('carre-id')) || Number(target.parentNode.getAttribute('carre-id'))
    const positionInit = Number(startPositionInit)
    const pieces = coup.id
    console.log('cibleId' , cibleId)
    console.log('positionInit', positionInit)
    console.log('pieces' , pieces)

    switch(pieces) {
        case 'Pion' :
            const startLigne = [8,9,10,11,12,13,14,15]
            if(
                startLigne.includes(positionInit) && positionInit + width * 2 === cibleId ||
                positionInit + width === cibleId ||
                positionInit + width === cibleId && document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild ||
                positionInit + width === cibleId && document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild 
            ) {
                return true
            }
            break;
        case 'Cavaliers' :
            if(
                positionInit + width * 2 + 1 === cibleId ||
                positionInit + width * 2 - 1 === cibleId ||
                positionInit + width - 2 === cibleId ||
                positionInit + width + 2 === cibleId ||
                positionInit - width * 2 + 1 === cibleId ||
                positionInit - width * 2 - 1 === cibleId ||
                positionInit - width - 2 === cibleId ||
                positionInit - width + 2 === cibleId
            ) {
                return true
            } break;
        case 'Fou' : 
            if (
                positionInit + width + 1 === cibleId ||
                positionInit + width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild ||
                positionInit + width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild ||
                positionInit + width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild ||
                positionInit + width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild ||
                positionInit + width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild ||
                positionInit + width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 7 + 7}"]`).firstChild ||
                
                positionInit - width - 1 === cibleId ||
                positionInit - width - 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild ||
                positionInit - width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild ||
                positionInit - width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild ||
                positionInit - width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 - 5}"]`).firstChild ||
                positionInit - width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild ||
                positionInit - width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 7 - 7}"]`).firstChild ||            
                
                positionInit + width - 1 === cibleId ||
                positionInit + width * 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild ||
                positionInit + width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild ||
                positionInit + width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit + width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild ||
                positionInit + width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 7 - 7}"]`).firstChild ||
                
                positionInit - width + 1 === cibleId ||
                positionInit - width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild ||
                positionInit - width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild ||
                positionInit - width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild ||
                positionInit - width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild ||
                positionInit - width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild ||
                positionInit - width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 7 + 7}"]`).firstChild
            ) {
                return true
            } break;
            case 'Tour' : 
            if(
                positionInit + width === cibleId ||
                positionInit + width * 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild ||
                positionInit + width * 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild ||
                positionInit + width * 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild ||
                positionInit + width * 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild ||
                positionInit + width * 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5}"]`).firstChild ||
                positionInit + width * 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6}"]`).firstChild ||

                positionInit - width === cibleId ||
                positionInit - width * 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild ||
                positionInit - width * 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild ||
                positionInit - width * 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild ||
                positionInit - width * 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild ||
                positionInit - width * 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5}"]`).firstChild ||
                positionInit - width * 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6}"]`).firstChild ||

                positionInit + 1 === cibleId ||
                positionInit + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild ||
                positionInit + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild ||
                positionInit + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild ||
                positionInit + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild ||
                positionInit + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 5}"]`).firstChild ||
                positionInit + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit +  1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 6}"]`).firstChild ||

                positionInit - 1 === cibleId ||
                positionInit - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild ||
                positionInit - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild ||
                positionInit - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild ||
                positionInit - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild ||
                positionInit - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 5}"]`).firstChild ||
                positionInit - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 6}"]`).firstChild 
            ) {
                return true
            }
            break;

        case 'Reine' : 
            if(
                positionInit + width + 1 === cibleId ||
                positionInit + width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild ||
                positionInit + width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild ||
                positionInit + width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild ||
                positionInit + width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild ||
                positionInit + width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild ||
                positionInit + width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 7 + 7}"]`).firstChild ||
                
                positionInit - width - 1 === cibleId ||
                positionInit - width - 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild ||
                positionInit - width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild ||
                positionInit - width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild ||
                positionInit - width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 - 5}"]`).firstChild ||
                positionInit - width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild ||
                positionInit - width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 7 - 7}"]`).firstChild ||            
                
                positionInit + width - 1 === cibleId ||
                positionInit + width * 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild ||
                positionInit + width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild ||
                positionInit + width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit + width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild ||
                positionInit + width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 7 - 7}"]`).firstChild ||
                
                positionInit - width + 1 === cibleId ||
                positionInit - width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild ||
                positionInit - width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild ||
                positionInit - width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild ||
                positionInit - width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild ||
                positionInit - width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild ||
                positionInit - width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 7 + 7}"]`).firstChild ||

                positionInit + width === cibleId ||
                positionInit + width * 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild ||
                positionInit + width * 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild ||
                positionInit + width * 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild ||
                positionInit + width * 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild ||
                positionInit + width * 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5}"]`).firstChild ||
                positionInit + width * 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6}"]`).firstChild ||

                positionInit - width === cibleId ||
                positionInit - width * 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild ||
                positionInit - width * 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild ||
                positionInit - width * 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild ||
                positionInit - width * 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild ||
                positionInit - width * 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5}"]`).firstChild ||
                positionInit - width * 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - width * 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6}"]`).firstChild ||

                positionInit + 1 === cibleId ||
                positionInit + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild ||
                positionInit + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild ||
                positionInit + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild ||
                positionInit + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild ||
                positionInit + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 5}"]`).firstChild ||
                positionInit + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + 6}"]`).firstChild ||

                positionInit - 1 === cibleId ||
                positionInit - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild ||
                positionInit - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild ||
                positionInit - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild ||
                positionInit - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild ||
                positionInit - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 5}"]`).firstChild ||
                positionInit - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 2}"]`).firstChild  && !document.querySelector(`[carre-id="${positionInit - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - 6}"]`).firstChild 
            ) {
                return true
            }
            break ;
        
        case 'Roi' : 
            if (
                positionInit + 1 === cibleId ||
                positionInit - 1 === cibleId ||
                positionInit + width === cibleId ||
                positionInit - width === cibleId ||
                positionInit + width + 1 === cibleId ||
                positionInit + width - 1 === cibleId ||
                positionInit - width + 1 === cibleId ||
                positionInit - width - 1 === cibleId 
            ) {
                return true;
            }

    }
}


function joueurSuivant() {
    if (playerJoue === "black") {
        reverseIds()
        playerJoue = "white"
        affichJoueur.textContent = 'white'
    } else {
        revertIds()
        playerJoue = "black"
        affichJoueur.textContent = 'black'
    }
}

function reverseIds() {
    const allCarres = document.querySelectorAll(".carre")
    allCarres.forEach((carre, i) => 
        carre.setAttribute('carre-id', (width * width - 1) -i))
}

function revertIds() {
    const allCarres = document.querySelectorAll(".carre")
    allCarres.forEach((carre, i)=> carre.setAttribute('carre-id', i))
}

function echecetmat() {
    const kings = Array.from(document.querySelectorAll('#king'))
    console.log('kings')
    if (kings.some(king => king.firstChild.classList.contains('white'))) {
        infoAffich.innerHTML = "Les noirs ont gagnés !!!"
        const allCarres = document.querySelectorAll('.carre')
        allCarres.forEach(carre => carre.firstChild?.setAttribute('draggable', false))
    }
    if (kings.some(king => king.firstChild.classList.contains('black'))) {
        infoAffich.innerHTML = "Les blancs ont gagnés !!!"
        const allCarres = document.querySelectorAll('.carre')
        allCarres.forEach(carre => carre.firstChild?.setAttribute('draggable', false))
    }
}