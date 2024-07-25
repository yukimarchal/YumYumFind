const plaTeau = document.querySelector("#plateau")
const affichJoueur = document.querySelector("#joueur")
const infoAffich = document.querySelector("#info-Affich")
const width = 8

const placePieces = [
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour,
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', Duck, '', '', '',
    '', '', '', '', '', '', '', '',
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour
]

Session.createIfNotExists('jerome')


let canardDeplace = false
let pieceDeplace = false
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
        if (i === 36 && carre.firstChild) {
            carre.firstChild.firstChild.classList.add('black') 
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

    if (coup.id === 'Duck') {
        if(pieceDeplace && valid && !e.target.firstChild) {
            e.target.append(coup)
            canardDeplace = true
            if (canardDeplace) {
                joueurSuivant()
            } return
        }else {
            infoAffich.textContent = "joue d'abord un Pion"
            setTimeout (() => infoAffich.textContent = "", 2000)
            return;
        }
    }
    if (coupCorrect && !pieceDeplace) {

        if (coupPris && valid) {
            e.target.parentNode.append(coup)
            e.target.remove()
            echecetmat()
            pieceDeplace = true
            return;
        }
        if (pris && !coupPris) {
            infoAffich.textContent = "Vous ne pouvez pas joué ce coup"
            setTimeout (() => infoAffich.textContent = "", 2000)
            return;
        }

        if (valid) {
            e.target.append(coup)
            echecetmat()
            pieceDeplace = true
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
        case 'Pion':
            const startLigne = [8, 9, 10, 11, 12, 13, 14, 15];
            if (
              startLigne.includes(positionInit) && positionInit + width * 2 === cibleId &&
            !document.querySelector(`[carre-id="${positionInit + width}"]`).firstChild &&
            !target.firstChild
            ) {
            return true;
            }
            if (
            positionInit + width === cibleId &&
            !target.firstChild
            ) {
            return true;
            }
            if (
            positionInit + width === cibleId &&
            document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild &&
            document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild.classList.contains(playerJoue === 'white' ? 'black' : 'white')
            ) {
            return true;
            }
            if (
            positionInit + width === cibleId &&
            document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild &&
            document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild.classList.contains(playerJoue === 'white' ? 'black' : 'white')
            ) {
            return true;
            }
            break;
        case 'Cavalier' :
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
                positionInit + width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild ||
                positionInit + width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild ||
                positionInit + width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild ||
                positionInit + width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild ||
                positionInit + width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild ||
                
                positionInit - width - 1 === cibleId ||
                positionInit - width - 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild ||
                positionInit - width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild ||
                positionInit - width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild ||
                positionInit - width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild ||
                positionInit - width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit - width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild ||            
                
                positionInit + width - 1 === cibleId ||
                positionInit + width * 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild ||
                positionInit + width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild ||
                positionInit + width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit + width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild ||
                
                positionInit - width + 1 === cibleId ||
                positionInit - width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild ||
                positionInit - width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild ||
                positionInit - width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild ||
                positionInit - width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild ||
                positionInit - width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild ||
                positionInit - width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild
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
                positionInit + width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild ||
                positionInit + width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild ||
                positionInit + width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild ||
                positionInit + width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild ||
                positionInit + width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 + 6}"]`).firstChild ||
                
                positionInit - width - 1 === cibleId ||
                positionInit - width - 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild ||
                positionInit - width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild ||
                positionInit - width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild ||
                positionInit - width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild ||
                positionInit - width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit - width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 - 6}"]`).firstChild ||            
                
                positionInit + width - 1 === cibleId ||
                positionInit + width * 2 - 2 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild ||
                positionInit + width * 3 - 3 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 4 - 4 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild ||
                positionInit + width * 5 - 5 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild ||
                positionInit + width * 6 - 6 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild ||
                positionInit + width * 7 - 7 === cibleId && !document.querySelector(`[carre-id="${positionInit + width - 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 2 - 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 3 - 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 4 - 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 5 - 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit + width * 6 - 6}"]`).firstChild ||
                
                positionInit - width + 1 === cibleId ||
                positionInit - width * 2 + 2 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild ||
                positionInit - width * 3 + 3 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild ||
                positionInit - width * 4 + 4 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild ||
                positionInit - width * 5 + 5 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild ||
                positionInit - width * 6 + 6 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild ||
                positionInit - width * 7 + 7 === cibleId && !document.querySelector(`[carre-id="${positionInit - width + 1}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 2 + 2}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 3 + 3}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 4 + 4}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 5 + 5}"]`).firstChild && !document.querySelector(`[carre-id="${positionInit - width * 6 + 6}"]`).firstChild ||

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
            } break

        case 'Duck' : 
            if(
                !target.firstChild || target.firstChild.id === 'Duck')
            {
                return true
            } break
        
    }
}


function joueurSuivant() {
    if (playerJoue === "black") {
        reverseIds()
        playerJoue = "white"
        affichJoueur.textContent = 'white'
        changeDuckColor('white')
    } else {
        revertIds()
        playerJoue = "black"
        affichJoueur.textContent = 'black'
        changeDuckColor('black')
    }
    canardDeplace = false
    pieceDeplace = false
}

function changeDuckColor(color) {
    const duck = document.querySelector('#Duck')
    if (duck) {
        duck.firstChild.classList.remove('black', 'white')
        duck.firstChild.classList.add(color)
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
    const kings = Array.from(document.querySelectorAll('#Roi'))
    console.log('kings')
    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoAffich.innerHTML = "Les noirs ont gagnés !!!"
        const allCarres = document.querySelectorAll('.carre')
        allCarres.forEach(carre => carre.firstChild?.setAttribute('draggable', false))

        Session.win('jerome')
    }
    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoAffich.innerHTML = "Les blancs ont gagnés !!!"
        const allCarres = document.querySelectorAll('.carre')
        allCarres.forEach(carre => carre.firstChild?.setAttribute('draggable', false))
        Session.win('jerome')
    }

}

