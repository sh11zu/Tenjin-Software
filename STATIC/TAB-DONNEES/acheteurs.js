document.addEventListener('DOMContentLoaded', function () {
    $('#acheteursTable').DataTable({
        pageLength: 10,
        columnDefs: [
            { orderable: false, targets: 0 }
        ],
        language: {
            url: '/ressources/French.json'
        }
    });

    $(document).on('click', '.delete-acheteur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour supprimer un acheteur.',
        });
    });

    $(document).on('click', '.edit-acheteur', function (e) {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous n\'avez pas les autorisations pour modifier un acheteur.',
        });
    });

    $(document).on('click', '.view-acheteur', function (e) {
        e.preventDefault();
        
        // Récupérer les données de la ligne cliquée
        const row = $(this).closest('tr');
        const id = row.find('td:eq(1)').text().trim();
        
        Swal.fire({
            title: `Détail de l'acheteur`,
            html: `
                <p><strong>Acheteur :</strong> ${id}</p>
            `,
            icon: 'info',
        });
    });
    

    // Gestion de la surbrillance de la ligne entière
    $('#acheteursTable tbody').on('mouseenter', 'tr', function () {
        $(this).addClass('highlight');
        $(this).find('td').addClass('highlight'); // Ajouter la classe à toutes les cellules
    }).on('mouseleave', 'tr', function () {
        $(this).removeClass('highlight');
        $(this).find('td').removeClass('highlight'); // Retirer la classe de toutes les cellules
    });
});