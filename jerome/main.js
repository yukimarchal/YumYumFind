const plaTeau = document.querySelector("#plateau");
const affichJoueur = document.querySelector("#joueur");
const infoAffich = document.querySelector("#info-Affich");
const width = 8;

const placePieces = [
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour,
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    Pion, Pion, Pion, Pion, Pion, Pion, Pion, Pion,
    Tour, Cavalier, Fou, Reine, Roi, Fou, Cavalier, Tour
];

let playerJoue = 'black';
affichJoueur.textContent = 'black';

function affichPlateau() {
    placePieces.forEach((placePiece, i) => {
        const carre = document.createElement('div');
        carre.classList.add('carre');
        carre.innerHTML = placePiece;
        carre.firstChild?.setAttribute('draggable', true);
        carre.setAttribute('carre-id', i);
        const ligne = Math.floor((63 - i) / 8) + 1;
        if (ligne % 2 === 0) {
            carre.classList.add(i % 2 === 0 ? "chartreuse" : "blue");
        } else {
            carre.classList.add(i % 2 === 0 ? "blue" : "chartreuse");
        }
        if (i <= 15 && carre.firstChild) {
            carre.firstChild.firstChild.classList.add('black');
        }
        if (i >= 48 && carre.firstChild) {
            carre.firstChild.firstChild.classList.add('white');
        }
        plaTeau.append(carre);
    });

    const allCarres = document.querySelectorAll('#plateau .carre');
    allCarres.forEach(carre => {
        carre.addEventListener('dragstart', premierCoup);
        carre.addEventListener('dragover', coupPerdu);
        carre.addEventListener('drop', coupJouer);
    });
}

affichPlateau();

let positionInit;
let coup;

function premierCoup(e) {
    positionInit = e.target.parentNode.getAttribute('carre-id');
    coup = e.target;
}

function coupPerdu(e) {
    e.preventDefault();
}

function coupJouer(e) {
    e.stopPropagation();
    const carreId = e.target.getAttribute('carre-id');
    if (carreId) {
        e.target.append(coup);
        joueurSuivant();
    }
}

function joueurSuivant() {
    if (playerJoue === "black") {
        playerJoue = "white";
        affichJoueur.textContent = 'white';
    } else {
        playerJoue = "black";
        affichJoueur.textContent = 'black';
    }
}