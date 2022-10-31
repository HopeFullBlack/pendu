const motEl = document.getElementById('mot')
const mauvaiseLettre = document.getElementById('lettre')
const rejouerbouton = document.getElementById('play-button')
const popup = document.getElementById('popupContenant')
const notification = document.getElementById('notification')
const messageFinal = document.getElementById('message-final')
const tete = document.getElementById('cadavre1')
const torse = document.getElementById('cadavre2')
const brasDroit = document.getElementById('cadavre3')
const brasGauche = document.getElementById('cadavre4')
const jambeDroit = document.getElementById('cadavre5')
const jambeGauche = document.getElementById('cadavre6')
const partieCorps = [tete, torse, brasDroit, brasGauche, jambeDroit, jambeGauche]
const sac = document.getElementById('sac')
const mots = ["chapeau", "halloween", "rebel", "chips", "formation", "amoureux", ]

// Selectionner un mot pour jouer
let motSelectionne = mots[Math.floor(Math.random() * mots.length)];
console.log(motSelectionne)

const bonnesLettreArr = ['']
const mauvaisesLettreArr = ['']

//Afficher le mot caché
function afficherMot() {

    partialWord = "";

    motEl.innerHTML = `
    ${motSelectionne
        .split('')
        .map((lettre) => {
            partialWord += bonnesLettreArr.includes(lettre) ? lettre : '*';

            return `
            <span class="lettre">
            ${bonnesLettreArr.includes(lettre) ? lettre : ''}
            </span>
            `
            }
        )
        .join("")
    }
`;

    //on compare le partialWord et le motSelectionner

    if (partialWord === motSelectionne) {
        messageFinal.innerText = 'Bravo ! Tu as gagné !';
        popup.classList.add('flex');
    }
}


//Afficher la notification

function afficherNotification() {
    notification.classList.add('afficher')
    setTimeout(() => {
        notification.classList.remove('afficher')
    }, 2000)
}


//Mauvaise lettres

function updateMauvaiseLettreEl() {
    //afficher les mauvaises lettre

    mauvaiseLettre.innerHTML = ` 
    ${mauvaisesLettreArr.map(lettre => `<span> ${lettre}</span>`)}
        `
// Afficher le bonhomme

    tete.style.display = 'flex'

}


//Vérifier si on a perdu

// if(mauvaisesLettreArr.length === corpsPartie.length){
//     messageFinal.innerText = 'Dommage ! Tu as perdu !';
//     popup.classList.add('flex');
    // sac.classList.display = 'flex'

// }

//EVENT LISTENERS
// associer le clavier  // keycode = les numeros associer aux touches du clavier
window.addEventListener('keydown', e => {

    console.log(e.keyCode)

    if (e.keyCode >= 65 && e.keyCode <= 90) { //65 = lettre A ; 90 = lettre Z
        const lettre = e.key;
        console.log(lettre)

        if (motSelectionne.includes(lettre)) {
            if (!bonnesLettreArr.includes(lettre)) { //si la lettre n'est pas inclus
                bonnesLettreArr.push(lettre)
                afficherMot()
            } else {
                afficherNotification()
            }

        } else {
            if (!mauvaisesLettreArr.includes(lettre)) {
                mauvaisesLettreArr.push(lettre)
                updateMauvaiseLettreEl()
            } else {
                afficherNotification()
            }
        }
    }
});


//Bouton rejouer
rejouerbouton.addEventListener("click", () => {
    //vider les tableaux
    bonnesLettreArr.splice(0);
    mauvaisesLettreArr.splice(0);

    motSelectionne = mots[Math.floor(Math.random() * mots.length)];
    afficherMot();

    updateMauvaiseLettreEl(0);

    popup.style.display = 'none'


})


afficherMot();