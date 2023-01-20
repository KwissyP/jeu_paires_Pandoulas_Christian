const cartes = document.querySelectorAll('.carte');

let carteRetournee = false;
let premiereCarte, secondeCarte;
let verouillage = false;

function retourneCarte(){

    if(verouillage) return;

    this.childNodes[1].classList.toggle('active');

    if(!carteRetournee){

        carteRetournee = true;
        premiereCarte = this;
        return;
    }

    carteRetournee = false;
    secondeCarte = this;

    correspondance();
}

cartes.forEach(carte => {
    carte.addEventListener('click', retourneCarte)
})

function correspondance(){

    if(premiereCarte.getAttribute('data-fashion') === secondeCarte.getAttribute('data-fashion')) {

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

function aleatoire(){
    cartes.forEach(card => {
        let randomPos = Math.floor(Math.random() * 8);
        card.style.order = randomPos;
    })
}
aleatoire();