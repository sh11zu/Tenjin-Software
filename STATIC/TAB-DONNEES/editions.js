        document.addEventListener('DOMContentLoaded', function () {
            $('#editionsTable').DataTable({
                pageLength: 10,
                columnDefs: [
                    { orderable: false, targets: 0 }
                ],
                language: {
                    url: '/ressources/French.json'
                }
            });

            $(document).on('click', '.delete-edition', function (e) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Vous n\'avez pas les autorisations pour supprimer une édition.',
                });
            });

            $(document).on('click', '.edit-edition', function (e) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Vous n\'avez pas les autorisations pour modifier une édition.',
                });
            });

            $(document).on('click', '.view-edition', function (e) {
                e.preventDefault();
                
                // Récupérer les données de la ligne cliquée
                const row = $(this).closest('tr');
                const id = row.find('td:eq(1)').text().trim();
                const edition = row.find('.edition-logo-container span').text().trim();
                
                Swal.fire({
                    title: `Détail de l'Édition`,
                    html: `
                        <p><strong>ID :</strong> ${id}</p>
                        <p><strong>Édition :</strong> ${edition}</p>
                    `,
                    icon: 'info',
                });
            });
            

            // Gestion de la surbrillance de la ligne entière
            $('#editionsTable tbody').on('mouseenter', 'tr', function () {
                $(this).addClass('highlight');
                $(this).find('td').addClass('highlight'); // Ajouter la classe à toutes les cellules
            }).on('mouseleave', 'tr', function () {
                $(this).removeClass('highlight');
                $(this).find('td').removeClass('highlight'); // Retirer la classe de toutes les cellules
            });
        });