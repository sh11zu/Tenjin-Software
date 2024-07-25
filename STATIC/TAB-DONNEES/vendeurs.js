document.addEventListener('DOMContentLoaded', function () {
    $('#vendeursTable').DataTable({
        pageLength: 10,
        columnDefs: [
            { orderable: false, targets: 0 }
        ],
        language: {
            url: '/ressources/French.json'
        }
    });

    $(document).on('click', '.delete-vendeur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
        });
    });

    $(document).on('click', '.edit-vendeur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
        });
    });

    $(document).on('click', '.view-vendeur', function (e) {
        e.preventDefault();
        
        // Récupérer les données de la ligne cliquée
        const row = $(this).closest('tr');
        const id = row.find('td:eq(1)').text().trim();
        const localisation = row.find('td:eq(2)').text().trim();
        
        Swal.fire({
            title: `Détail du vendeur`,
            html: `
                <p><strong>Vendeur :</strong> ${id}</p>
                <p><strong>Ville/Pays :</strong> ${localisation}</p>
            `,
            icon: 'info',
        });
    });
    

    // Gestion de la surbrillance de la ligne entière
    $('#vendeursTable tbody').on('mouseenter', 'tr', function () {
        $(this).addClass('highlight');
        $(this).find('td').addClass('highlight'); // Ajouter la classe à toutes les cellules
    }).on('mouseleave', 'tr', function () {
        $(this).removeClass('highlight');
        $(this).find('td').removeClass('highlight'); // Retirer la classe de toutes les cellules
    });
});