// INSTANCES & OBJETS
let scoreTable = {
    players: [],
    addPlayer: function (player) {
        let playerRow = document.createElement('tr');
        playerRow.style = 'margin-right: 5px'
        let playerName = document.createElement('td');
        playerName.innerHTML = player.name;
        playerRow.appendChild(playerName);
        let playerMode = document.createElement('td');
        playerMode.innerHTML = player.mode;
        playerRow.appendChild(playerMode);
        let playerScore = document.createElement('td');
        playerScore.innerHTML = player.score;
        playerRow.appendChild(playerScore);
        document.getElementById("tBody").appendChild(playerRow);
    }
};
let startTime;
let joueur;
let easyModeActive = false;
let easyButton = document.getElementById('easyMode');
let cartes = document.querySelectorAll('.carte');
let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;
let remove = [];
let noob = 0;
let interval;
let removedCards = [];
// Fin INSTANCES & OBJETS

// PETITES FUNCTIONS
function startTimer() {
    let seconds = 0;
    interval = setInterval(function () {
        seconds++;
        document.querySelector("#timer").textContent = seconds + ' secondes';
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function aleatoire() {
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 8);
        card.style.order = randomPos;
    })
}
aleatoire();
// Fin PETITES FUNCTIONS

// FUNCTIONS HARD TROP FUN TROP GALERE
// FlipCard
function retourneCarte() {

    if (verouillage) return;
    this.childNodes[1].classList.toggle('active');
    if (!carteRetournee) {
        carteRetournee = true;
        premiereCarte = this;
        return;
    }
    carteRetournee = false;
    secondeCarte = this;

    galere()
}

function galere() {
    if (easyModeActive) {
        if (remove.length === 4) {
            stopTimer();
            let endTime = Date.now();
            let duree = (endTime - startTime) / 1000
            let playerName = document.getElementById("playerInput").value;
            scoreTable.addPlayer({
                name: playerName,
                mode: 'EASY',
                score: duree
            });
            let retour = document.getElementById('secBefore');
            retour.removeAttribute('style');
            header.style.display = 'none';
            let jeu = document.getElementById('jeu');
            jeu.style.display = 'none';
            resetGame();
        }
    } else {
        if (remove.length === 6) {
            stopTimer();
            let endTime = Date.now();
            let duree = (endTime - startTime) / 1000
            let playerName = document.getElementById("playerInput").value;
            scoreTable.addPlayer({
                name: playerName,
                mode: 'HARD',
                score: duree
            });
            let retour = document.getElementById('secBefore');
            retour.removeAttribute('style');
            header.style.display = 'none';
            let jeu = document.getElementById('jeu');
            jeu.style.display = 'none';
            resetGame();
        }
    }
    if (premiereCarte.getAttribute('data-fashion') === secondeCarte.getAttribute('data-fashion')) {
        remove.push(premiereCarte);
        remove.push(secondeCarte);
        premiereCarte.removeEventListener('click', retourneCarte);
        secondeCarte.removeEventListener('click', retourneCarte);
        let cardMatch = document.querySelectorAll(`[data-fashion="${premiereCarte.getAttribute('data-fashion')}"]`);
        cardMatch.forEach(card => {
            card.classList.remove('highlight')
        });
        noob = 0;
    } else {
        verouillage = true;
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');
            verouillage = false;
        }, 500)
        noob++;
        if (noob === 2) {
            if (premiereCarte.getAttribute('data-fashion') !== secondeCarte.getAttribute('data-fashion')) {
                let cardMatch = document.querySelectorAll(`[data-fashion="${premiereCarte.getAttribute('data-fashion')}"]`);
                cardMatch.forEach(card => {
                    card.classList.add('highlight')
                });
            }
        }
    }
}
// End of FlipCard
// FUNCTION EASY MODE
function easyMode() {
    let count = 3;
    for (let i = 0; i < cartes.length && count > 0; i++) {
        for (let j = i + 1; j < cartes.length; j++) {
            if (cartes[i].getAttribute('data-fashion') === cartes[j].getAttribute('data-fashion')) {
                removedCards.push(cartes[i]);
                removedCards.push(cartes[j]);
                cartes[i].style.display = 'none';
                cartes[j].style.display = 'none';
                cartes.splice(j, 1);
                cartes.splice(i, 1);
                count--;
                i--;
                break;
            }
        }
    }
}
// END FUNCTION EASY MODE
// Reset Game
function resetGame() {
    removedCards.forEach(card => {
        card.style.display = 'block';
        document.querySelector('.grille').appendChild(card);
    });
    removedCards = [];
    cartes.forEach(carte => {
        carte.childNodes[1].classList.remove('active')
        carte.addEventListener('click', retourneCarte);
    });
    document.getElementById("playerInput").value = "";
    easyModeActive = false;
}
// End of Reset Game
// FIN FUNCTIONS HARD TROP FUN TROP GALERE


// BOUTONS DE LANCEMENT
// EASY MODE
easyButton.addEventListener('click', () => {
    easyModeActive = true;
    let tableau = document.getElementById('secBefore');
    tableau.style = 'display: none!important';
    header.removeAttribute('style');
    let jeu = document.getElementById('jeu');
    jeu.removeAttribute('style');
    joueur = document.getElementById('playerInput').value;
    startTimer();
    startTime = Date.now();
    easyMode()
});
// HARD MODE
document.getElementById("startGame").addEventListener("click", () => {
    easyModeActive = false;
    let tableau = document.getElementById('secBefore');
    tableau.style = 'display: none!important';
    header.removeAttribute('style');
    let jeu = document.getElementById('jeu');
    jeu.removeAttribute('style');
    joueur = document.getElementById('playerInput').value;
    startTimer();
    startTime = Date.now();
});
// CLICK EVENT ON CARD
cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})
// FIN BOUTONS DE LANCEMENT