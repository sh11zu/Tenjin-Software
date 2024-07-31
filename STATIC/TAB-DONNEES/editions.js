document.addEventListener("DOMContentLoaded", function() {
    // Gestionnaire d'événements pour les boutons SweetAlert
    document.body.addEventListener('click', function(event) {
        const target = event.target;

        if (target.matches('.delete-edition, .delete-edition *')) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer une édition.',
            });
        }

        if (target.matches('.edit-edition, .edit-edition *')) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier une édition.',
            });
        }

        if (target.matches('.view-edition, .view-edition *')) {
            event.preventDefault();
            const row = target.closest('tr');
            const id = row.querySelector('td:nth-child(2)').textContent.trim();
            const edition = row.querySelector('.edition-logo-container span').textContent.trim();

            Swal.fire({
                title: `Détail de l'Édition`,
                html: `
                    <p><strong>ID :</strong> ${id}</p>
                    <p><strong>Édition :</strong> ${edition}</p>
                `,
                icon: 'info',
            });
        }
    });

    // Initialisation du tableau après chargement des données
    document.addEventListener('dataLoaded', initializeDataTable);
});
