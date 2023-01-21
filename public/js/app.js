// Game Launch
let scoreTable = {
    players: [],
    addPlayer: function (player) {
        let playerRow = document.createElement('tr');
        playerRow.style = 'margin-right: 15px'
        let playerName = document.createElement('td');
        playerName.innerHTML = player.name;
        playerRow.appendChild(playerName);
        let playerScore = document.createElement('td');
        playerScore.innerHTML = player.score;
        playerRow.appendChild(playerScore);
        document.getElementById("tBody").appendChild(playerRow);
    }
};

let startTime;
let joueur;

document.getElementById("startGame").addEventListener("click", function () {
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
// End of launch function
// Easy Mode
let easyModeActive = false;
let easyButton = document.getElementById('easyMode');

function easyMode() {
    let count = 3;
    for (let i = 0; i < cartes.length && count > 0; i++) {
        for (let j = i + 1; j < cartes.length; j++) {
            if (cartes[i].getAttribute('data-fashion') === cartes[j].getAttribute('data-fashion')) {
                removedCards.push(cartes[i]);
                console.log(removedCards);
                removedCardes.push(cartes[j]);
                console.log(removedCardes);
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
// End of Easy Mode

// FlipCard
const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

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

let interval;

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

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

let remove = [];

function galere() {
    if (easyModeActive) {
        if (remove.length === 4) {
            stopTimer();
            let endTime = Date.now();
            let duree = (endTime - startTime) / 1000
            let playerName = document.getElementById("playerInput").value;
            scoreTable.addPlayer({
                name: playerName,
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
    } else {
        verouillage = true;
        setTimeout(() => {
            premiereCarte.childNodes[1].classList.remove('active');
            secondeCarte.childNodes[1].classList.remove('active');
            verouillage = false;
        }, 500)
    }
}

function aleatoire() {
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 8);
        card.style.order = randomPos;
    })
}
aleatoire();
// End of FlipCard

// Reset Game
let removedCards = []
let removedCardes = []
function resetGame() {
    cartes.forEach(carte => {
        carte.childNodes[1].classList.remove('active');
    });
    document.getElementById("playerInput").value = "";
    easyModeActive = false;
    cartes.forEach(carte => {
        carte.addEventListener('click', retourneCarte);
    });
}
// End of Reset Game