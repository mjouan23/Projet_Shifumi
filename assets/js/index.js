// On écoute la soumission du formulaire
document.querySelector('#formNickname').addEventListener('submit', function(event){
    // On désactive l'action de soumission du formulaire
    event.preventDefault();
    // on récupère le nom saisi
    var nickname = document.querySelector('#nickname').value
    // on récupère l'encart permettant d'afficher les alertes
    var message = document.querySelector('#message')
    // Si le nom n'est pas renseigné
    if(nickname == '') {
        // On affiche un alerte à l'utilisateur
        message.textContent = 'Renseigne ton nom';
    } 
    // Sinon si le nom est inférieur à 5 caractères
    else if (nickname.length < 5) {
        // On affiche un alerte à l'utilisateur
        message.textContent = 'La longueur de ton nom est de minimum 5 caractères';
    }
    // Sinon si le nom est supérieur à 12 caractères
    else if (nickname.length > 12) {
        message.textContent = 'La longueur de ton nom est de maximum 12 caractères';
    } 
    // Sinon tout est ok => on stocke le nom dans le localStorage et on redirige vers la page de jeu
    else {
        localStorage.setItem('shifumiNickname', nickname);
        window.location.href = 'game.html';
    }
});