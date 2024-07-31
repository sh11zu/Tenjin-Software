document.addEventListener("DOMContentLoaded", function() {

// -------------------------------------------------------------------------------------------------
// Fonctions qui gèrent les créations des tableaux :
// -------------------------------------------------------------------------------------------------

    // Table EDITIONS :
    function initializeDataTableEditions() {
        if ($.fn.dataTable.isDataTable('#editionsTable')) {
            $('#editionsTable').DataTable().destroy();
        }

        $('#editionsTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table AUTEURS :
    function initializeDataTableAuteurs() {
        if ($.fn.dataTable.isDataTable('#auteursTable')) {
            $('#auteursTable').DataTable().destroy();
        }

        $('#auteursTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table ACHETEURS :
    function initializeDataTableAcheteurs() {
        if ($.fn.dataTable.isDataTable('#acheteursTable')) {
            $('#acheteursTable').DataTable().destroy();
        }

        $('#acheteursTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table VENDEURS :
    function initializeDataTableVendeurs() {
        if ($.fn.dataTable.isDataTable('#vendeursTable')) {
            $('#vendeursTable').DataTable().destroy();
        }

        $('#vendeursTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

// -------------------------------------------------------------------------------------------------
// Fonctions qui gèrent les Pop-Up SweetAlert :
// -------------------------------------------------------------------------------------------------

    // Table EDITIONS :
    function initializeSweetAlertEditions() {
        $(document).on('click', '.delete-edition', function(e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer une édition.',
            });
        });

        $(document).on('click', '.edit-edition', function(e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier une édition.',
            });
        });

        $(document).on('click', '.view-edition', function(e) {
            e.preventDefault();
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
    }

    // Table AUTEURS :
    function initializeSweetAlertAuteurs() {
        $(document).on('click', '.delete-author', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un auteur.',
            });
        });

        $(document).on('click', '.edit-author', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un auteur.',
            });
        });

        $(document).on('click', '.view-author', function (e) {
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
    }

    // Table ACHETEURS :
    function initializeSweetAlertAcheteurs() {
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
    }

    // Table VENDEURS :
    function initializeSweetAlertVendeurs() {
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
    }

// -------------------------------------------------------------------------------------------------
// Fonctions qui gèrent les surbrillances des lignes :
// -------------------------------------------------------------------------------------------------

    // Table EDITIONS :
    function initializeHighlightEditions() {
        $('#editionsTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table AUTEURS :
    function initializeHighlightAuteurs() {
        $('#auteursTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table AUTEURS :
    function initializeHighlightAcheteurs() {
        $('#acheteursTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table VENDEURS :
    function initializeHighlightVendeurs() {
        $('#vendeursTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

// -------------------------------------------------------------------------------------------------
// Fonctions qui gèrent les DropDown :
// -------------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------------
// Fin du script et initialisation des fonctions :
// -------------------------------------------------------------------------------------------------

    function initializeDataTable() {
        initializeDataTableAuteurs();
        initializeDataTableEditions();
        initializeDataTableAcheteurs();
        initializeDataTableVendeurs();
    }

    function initializeSweetAlert() {
        initializeSweetAlertAuteurs();
        initializeSweetAlertEditions();
        initializeSweetAlertAcheteurs();
        initializeSweetAlertVendeurs();
    }

    function initializeHighlight() {
        initializeHighlightAuteurs();
        initializeHighlightEditions();
        initializeHighlightAcheteurs();
        initializeHighlightVendeurs();
    }

    function initializeAll() {
        initializeDropdown();
    }

    // Initialisation des fonctionnalités après le chargement des données
    document.addEventListener('dataLoaded', initializeHighlight);
    document.addEventListener('dataLoaded', initializeAll);
    document.addEventListener('dataLoaded', initializeSweetAlert);
    document.addEventListener('dataLoaded', initializeDataTable);

});