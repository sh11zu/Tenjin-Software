document.addEventListener("DOMContentLoaded", function() {
    function initializeDataTable(tableId) {
        if ($.fn.dataTable.isDataTable(`#${tableId}`)) {
            $(`#${tableId}`).DataTable().destroy();
        }

        $(`#${tableId}`).DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    function initializeSweetAlert() {
        $(document).on('click', '.delete-edition, .delete-author', function(e) {
            e.preventDefault();
            closeAllDropdowns(); // Fermer tous les dropdowns
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Vous n'avez pas les autorisations pour supprimer ${$(this).hasClass('delete-edition') ? 'une édition' : 'un auteur'}.`,
            });
        });

        $(document).on('click', '.edit-edition, .edit-author', function(e) {
            e.preventDefault();
            closeAllDropdowns(); // Fermer tous les dropdowns
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: `Vous n'avez pas les autorisations pour modifier ${$(this).hasClass('edit-edition') ? 'une édition' : 'un auteur'}.`,
            });
        });

        $(document).on('click', '.view-edition, .view-author', function(e) {
            e.preventDefault();
            closeAllDropdowns(); // Fermer tous les dropdowns

            const row = $(this).closest('tr');
            const id = row.find('td:eq(1)').text().trim();
            let detailHtml = '';

            if ($(this).hasClass('view-edition')) {
                const edition = row.find('.edition-logo-container span').text().trim();
                detailHtml = `
                    <p><strong>ID :</strong> ${id}</p>
                    <p><strong>Édition :</strong> ${edition}</p>
                `;
            } else if ($(this).hasClass('view-author')) {
                const authorName = row.find('td:eq(1) .author-info strong').text().trim();
                const authorDetails = row.find('td:eq(1) .author-info .right-aligned').text().trim();
                detailHtml = `
                    <p><strong>ID :</strong> ${id}</p>
                    <p><strong>Auteur :</strong> ${authorName}</p>
                    <p><strong>Détails :</strong> ${authorDetails}</p>
                `;
            }

            Swal.fire({
                title: `Détail de ${$(this).hasClass('view-edition') ? 'l\'Édition' : 'l\'Auteur'}`,
                html: detailHtml,
                icon: 'info',
            });
        });
    }

    function initializeHighlight(tableId) {
        $(`#${tableId} tbody`).on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    function initializeDropdown() {
        $(document).on('click', function(event) {
            if ($(event.target).closest('.dropbtn').length) {
                event.stopPropagation();
                var dropbtn = $(event.target).closest('.dropbtn');
                var dropdownContent = dropbtn.next('.table-dropdown-content');
                if (dropdownContent.is(':visible')) {
                    dropdownContent.hide();
                    dropbtn.removeClass('active');
                } else {
                    closeAllDropdowns();
                    dropdownContent.show();
                    dropbtn.addClass('active');
                }
            } else if (!$(event.target).closest('.table-dropdown-content').length) {
                closeAllDropdowns();
            }
        });

        function closeAllDropdowns() {
            $('.table-dropdown-content').hide();
            $('.dropbtn').removeClass('active');
        }
    }

    function initializeAll() {
        initializeDataTable('editionsTable');
        initializeDataTable('auteursTable');
        initializeDropdown();
        initializeSweetAlert();
        initializeHighlight('editionsTable');
        initializeHighlight('auteursTable');
    }

    // Initialisation des fonctionnalités après le chargement des données
    document.addEventListener('dataLoaded', initializeAll);

    // Initialisation immédiate si les données sont déjà chargées
    // initializeAll();
});
