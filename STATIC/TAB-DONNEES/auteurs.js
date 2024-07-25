document.addEventListener('DOMContentLoaded', function () {
    $('#auteursTable').DataTable({
        pageLength: 10,
        columnDefs: [
            { orderable: false, targets: 0 }
        ],
        language: {
            url: '/ressources/French.json'
        }
    });

    $(document).on('click', '.delete-auteur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour supprimer un auteur.',
        });
    });

    $(document).on('click', '.edit-auteur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour modifier un auteur.',
        });
    });

    $(document).on('click', '.view-auteur', function (e) {
        e.preventDefault();
        
        // Récupérer les données de la ligne cliquée
        const row = $(this).closest('tr');
        const id = row.find('td:eq(1)').text().trim();
        
        Swal.fire({
            title: `Détail de l'auteur`,
            html: `
                <p><strong>Auteur :</strong> ${id}</p>
            `,
            icon: 'info',
        });
    });
    

    // Gestion de la surbrillance de la ligne entière
    $('#auteursTable tbody').on('mouseenter', 'tr', function () {
        $(this).addClass('highlight');
        $(this).find('td').addClass('highlight'); // Ajouter la classe à toutes les cellules
    }).on('mouseleave', 'tr', function () {
        $(this).removeClass('highlight');
        $(this).find('td').removeClass('highlight'); // Retirer la classe de toutes les cellules
    });
});