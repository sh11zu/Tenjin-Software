document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        "Cette fonctionnalité est bientôt disponible!"
    ];
    const messageElement = document.querySelector('.maintenance-message h1');
    let currentIndex = 0;

    function changeMessage() {
        messageElement.textContent = messages[currentIndex];
        currentIndex = (currentIndex + 1) % messages.length;
        setTimeout(changeMessage, 3000);
    }

    changeMessage();
});
