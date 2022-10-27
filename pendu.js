const motEl = document.getElementById('mot')
const mauvaiseLettre = document.getElementById('lettre')
const rejouerbouton = document.getElementById('play-button')
const popup = document.getElementById('popupContenant')
const notification = document.getElementById('notification')
const messageFinal = document.getElementById('message-final')

const mots = ["chapeau", "rebel", "chips", "formation", "amoureux",]

// Selectionner un mot pour jouer
let motSelectionne = mots[Math.floor(Math.random()*mots.length)];
console.log(motSelectionne)

const bonnesLettreArr = ['']
const mauvaisesLettreArr = ['']

//Afficher le mot caché
function afficherMot() {

    motEl.innerHTML = `
    ${motSelectionne
        .split('')
        .map(
            lettre => `
            <span class="lettre">
            ${bonnesLettreArr.includes(lettre) ? lettre : ''}
            </span>
            `
        )
        .join("")
    }
`;

const motInterne = motEl.innerText.replace(/\n/g, '') //regrouper les lettres

    console.log(motInterne, motSelectionne)

//on compare le motInterne et le motSelectionner
    if (motInterne === motSelectionne){
        messageFinal.innerText = 'Bravo ! Tu as gagné !';
        popup.style.display = 'flex';
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


//Vérifier si on a perdu

if(mauvaisesLettreArr.length === figurePartie.length){
    
}


}



//EVENT LISTENERS
// associer le clavier  // keycode = les numeros associer aux touches du clavier
window.addEventListener('keydown', e => {

   console.log(e.keyCode)

   if(e.keyCode >=65 && e.keyCode <=90){
    const lettre = e.key;
    console.log(lettre)

    if(motSelectionne.includes(lettre)){
        if(!bonnesLettreArr.includes(lettre)){ //si la lettre n'est pas inclus
            bonnesLettreArr.push(lettre)
            afficherMot()
        } else {
          afficherNotification()
        }

    } else {
        if(!mauvaisesLettreArr.includes(lettre)){
            mauvaisesLettreArr.push(lettre)
          updateMauvaiseLettreEl()
        } else{
          afficherNotification()
        }
    }
   }
});


//Bouton rejouer
rejouerbouton.addEventListener("click", () =>{
    //vider les tableaux
    bonnesLettreArr.splice(0);
    mauvaisesLettreArr.splice(0);

    motSelectionne = mots[Math.floor(Math.random()*mots.length)];
    afficherMot();

    updateMauvaiseLettreEl();

    popup.style.display = 'none'
})


afficherMot();
