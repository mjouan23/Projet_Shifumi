// Utilisation du LocalStorage Nickname
document.querySelector('#nickname').textContent = localStorage.getItem('shifumiNickname');

// On déclare le tableau des signes possibles pour l'ordinateur
var arSignComputer = ['scissor', 'paper', 'stone'];
// On récupère du DOM les emplacements de jeu de l'ordinateur et du joueur
var divPlayerboardPlayer = document.querySelector('#playboardPlayer');
var divPayerboardComputer = document.querySelector('#playboardComputer');
// On récupère la span du poucentage
var divPercent = document.querySelector('#percent').firstElementChild;
// On récupère la span du poucentage
var divRound = document.querySelector('#round').firstElementChild;
// On récupère les signes du joueur
var signs = document.querySelectorAll('.sign');
// On récupère du DOM la modal
var modalScore = document.querySelector('#modalScore');

var scorePlayer = 0;
var scoreComputer = 0;
var percent = 0;
var round = 1;
var divScorePlayer = document.querySelector('#scorePlayer').firstElementChild;
var divScoreComputer = document.querySelector('#scoreComputer').firstElementChild;

// Fonction permettant d'afficher le résultat et réinitialiser la partie
function showResult(result, picture, scorePlayer, scoreComputer) {
    // On met à jour la modale
    modalScore.firstElementChild.innerHTML = `<img src="${picture}" alt="${result}" />`;
    modalScore.lastElementChild.textContent = result;
    
    // On attend 1s avant d'afficher la modale
    setTimeout(function() {
        modalScore.style.display = 'block';
        // On attend 1s avant de cacher la modale
        setTimeout(function() {
            /****** On réinitialise le tour ******/
            // On supprime les symboles du joueur et de l'ordinateur
            divPlayerboardPlayer.firstElementChild.remove();
            divPayerboardComputer.firstElementChild.remove();
            modalScore.style.display = 'none';


            // Si le score du joueur ou de l'ordinateur atteint 3 on lance un nouveau round
            if(scorePlayer === 5 || scoreComputer === 5) {
                round++;
                // Afficher la modale de fin de round
                if(scorePlayer > scoreComputer) {
                    modalScore.lastElementChild.textContent = 'Victoire du round !';
                    modalScore.firstElementChild.innerHTML = '<img src="assets/img/round_win.png" alt="round" />';

                } else {
                    modalScore.lastElementChild.textContent = 'Défaite du round !';
                    modalScore.firstElementChild.innerHTML = '<img src="assets/img/round_lost.png" alt="round" />';
                }

                modalScore.style.display = 'block';
                setTimeout(function() {
                    initRound(round);
                    modalScore.style.display = 'none';
                }, 1500);
            } else {
                divScorePlayer.textContent = scorePlayer;
                divScoreComputer.textContent = scoreComputer;

                // Calcul du poucentage de victoire
                if (scorePlayer + scoreComputer != 0) {
                    percent = scorePlayer / (scorePlayer + scoreComputer) * 100
                }
                divPercent.textContent = Math.round(percent);
            }

            enablePlay();
        }, 1000);
    }, 1500);
}

// Fonction permettant de réinitialiser un round
function initRound(round) {
    // On remet les score à 0 ainsi que le pourcentage de victoire et on renseigne le nouveau round
    scorePlayer = 0;
    scoreComputer = 0;
    percent = 0;
    divRound.textContent = round;
    divScorePlayer.textContent = scorePlayer;
    divScoreComputer.textContent = scoreComputer;
    divPercent.textContent = percent;
}

// Fonction permettant de lancer l'action de jouer
function play(event) {

    disablePlay();
    console.log(event.target);
    divPlayerboardPlayer.innerHTML = event.target.outerHTML;
    var signPlayer = event.target.dataset.sign;

    // On sélectionne un signe aléatoire pour le computer
    var signComputer = arSignComputer[Math.floor(Math.random() * arSignComputer.length)];
    var imgSignComputer = document.querySelector('[data-sign="' + signComputer + '"]')
    divPayerboardComputer.innerHTML = imgSignComputer.outerHTML;
    
    //Egalité
    if(signComputer === signPlayer) {
        showResult('Egalité !', 'assets/img/equality.png', scorePlayer, scoreComputer);
    } 
    // Cas de victoire
    else if((signPlayer === 'scissor' && signComputer === 'paper')
        || (signPlayer === 'paper' && signComputer === 'stone')
        || (signPlayer === 'stone' && signComputer === 'scissor')
    ) {
        scorePlayer++;
        showResult('Gagné !', 'assets/img/win.png', scorePlayer, scoreComputer);
    } 
    // Sinon c'est perdu
    else {
        scoreComputer++;
        showResult('Perdu...', 'assets/img/lost.png', scorePlayer, scoreComputer);
    }
}

// Fonction permettant de désactiver les boutons après avoir joué
// => évite de cliquer alors que l'action n'a pas encore été prise en compte
function disablePlay() {
    // On boucle sur les signes du joueur
    for(sign of signs) {
        // On écoute quel signe a été cliqué par le joueur
        sign.removeEventListener('click', play)
    }
}

// Fonction permettant de réactiver les boutons une fois l'action prise en compte
function enablePlay() {
    // On boucle sur les signes du joueur
    for(sign of signs) {
        // On écoute quel signe a été cliqué par le joueur
        sign.addEventListener('click', play)
    }
}

// On commence par activer la partie
enablePlay();