document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        if (username === 'admin' && password === 'admin') {
            window.location.href = 'index.html';
            // Connexion réussie, rediriger ou effectuer une autre action
            // window.location.href = 'dashboard.html'; // exemple de redirection
        } else {
            // Effacer le champ de mot de passe et afficher un message d'erreur
            document.getElementById('password').value = '';
            errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
            // Ajouter la classe 'shake' pour faire trembler le conteneur de connexion
            loginContainer.classList.add('shake');
            // Supprimer la classe 'shake' après l'animation
            setTimeout(function () {
                loginContainer.classList.remove('shake');
            }, 500); // Durée de l'animation de tremblement
        }
    });
});
