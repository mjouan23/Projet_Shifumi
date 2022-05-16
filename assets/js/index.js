document.querySelector('#formNickname').addEventListener('submit', function(event){
    event.preventDefault();
    var nickname = document.querySelector('#nickname').value
    var message = document.querySelector('#message')
    if(nickname == '') {
        message.textContent = 'Renseigne ton nom';
    } else if (nickname.length < 5) {
        message.textContent = 'La longueur de ton nom est de minimum 5 caractères';
    }else if (nickname.length > 12) {
        message.textContent = 'La longueur de ton nom est de maximum 12 caractères';
    } else {
        localStorage.setItem('shifumiNickname', nickname);
        window.location.href = 'game.html';
    }
});