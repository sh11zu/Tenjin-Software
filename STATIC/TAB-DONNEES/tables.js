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

    // Table PUBLICS :
    function initializeDataTablePublics() {
        if ($.fn.dataTable.isDataTable('#publicsTable')) {
            $('#publicsTable').DataTable().destroy();
        }

        $('#publicsTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table CATEGORIES REG :
    function initializeDataTableREG() {
        if ($.fn.dataTable.isDataTable('#regTable')) {
            $('#regTable').DataTable().destroy();
        }

        $('#regTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table CATEGORIES SPE :
    function initializeDataTableSPE() {
        if ($.fn.dataTable.isDataTable('#speTable')) {
            $('#speTable').DataTable().destroy();
        }

        $('#speTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table ETATS PARUTION :
    function initializeDataTableStatus() {
        if ($.fn.dataTable.isDataTable('#statusTable')) {
            $('#statusTable').DataTable().destroy();
        }

        $('#statusTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table EMPLACEMENTS :
    function initializeDataTableLocations() {
        if ($.fn.dataTable.isDataTable('#locationsTable')) {
            $('#locationsTable').DataTable().destroy();
        }

        $('#locationsTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table SERIES :
    function initializeDataTableSeries() {
        if ($.fn.dataTable.isDataTable('#seriesTable')) {
            $('#seriesTable').DataTable().destroy();
        }

        $('#seriesTable').DataTable({
            pageLength: 10,
            columnDefs: [
                { orderable: false, targets: 0 }
            ],
            language: {
                url: '/ressources/French.json'
            }
        });
    }

    // Table FACTURES :
    function initializeDataTableInvoices() {
        if ($.fn.dataTable.isDataTable('#facturesTable')) {
            $('#facturesTable').DataTable().destroy();
        }

        $('#facturesTable').DataTable({
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

    // Table PUBLICS :
    function initializeSweetAlertPublics() {
        $(document).on('click', '.delete-public', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
            });
        });
    
        $(document).on('click', '.edit-public', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
            });
        });
    
        $(document).on('click', '.view-public', function (e) {
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

    // Table REG :
    function initializeSweetAlertREG() {
        $(document).on('click', '.delete-reg', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
            });
        });
    
        $(document).on('click', '.edit-reg', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
            });
        });
    
        $(document).on('click', '.view-reg', function (e) {
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

    // Table SPE :
    function initializeSweetAlertSPE() {
        $(document).on('click', '.delete-spe', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
            });
        });
    
        $(document).on('click', '.edit-spe', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
            });
        });
    
        $(document).on('click', '.view-spe', function (e) {
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

    // Table ETATS DE PARUTION :
    function initializeSweetAlertStatus() {
        $(document).on('click', '.delete-status', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
            });
        });
    
        $(document).on('click', '.edit-status', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
            });
        });
    
        $(document).on('click', '.view-status', function (e) {
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

    // Table EMPLACEMENTS :
    function initializeSweetAlertLocations() {
        $(document).on('click', '.delete-location', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer un vendeur.',
            });
        });
    
        $(document).on('click', '.edit-location', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier un vendeur.',
            });
        });
    
        $(document).on('click', '.view-location', function (e) {
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

    // Table SERIES :
    function initializeSweetAlertSeries() {
        $(document).on('click', '.delete-serie', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer une série.',
            });
        });

        $(document).on('click', '.edit-serie', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier une série.',
            });
        });

        $(document).on('click', '.view-serie', function (e) {
            e.preventDefault();
            
            // Récupérer les données de la ligne cliquée
            // const row = $(this).closest('tr');
            // const id = row.data('id');
            // const codeserie = row.data('codeserie');
            // const serie = row.data('serie');
            // const public = row.data('public');
            // const edition = row.data('edition');
            // const scenario = row.data('scenario');
            // const mangaka = row.data('mangaka');
            // const charadesign = row.data('charadesign');
            // const histoireOriginale = row.data('histoire-originale');
            // const parution = row.data('parution');
            // const pays = row.data('pays');
            // const anneeVo = row.data('annee-vo');
            // const anneeVf = row.data('annee-vf');
            // const prixEditeur = row.data('prix-editeur');

            // Récupérer les données de la ligne cliquée
            const row = $(this).closest('tr');
            const id = row.find('td:eq(1)').text().trim();
            const codeserie = row.find('td:eq(2)').text().trim();
            const serie = row.find('td:eq(3)').text().trim();
            const public = row.find('td:eq(4)').text().trim();
            const edition = row.find('td:eq(5)').text().trim();
            const scenario = row.find('td:eq(6)').text().trim();
            const mangaka = row.find('td:eq(7)').text().trim();
            const charadesign = row.find('td:eq(8)').text().trim();
            const histoireOriginale = row.find('td:eq(9)').text().trim();
            const parution = row.find('td:eq(10)').text().trim();
            const pays = row.find('td:eq(11)').text().trim();
            const anneeVo = row.find('td:eq(12)').text().trim();
            const anneeVf = row.find('td:eq(13)').text().trim();
            const prixEditeur = row.find('td:eq(14)').text().trim();

            // Définir le statut de parution pour la mise en forme
            let parutionColorClass = '';
            if (parution === 'abandonnée') {
                parutionColorClass = 'abandonnee';
            } else if (parution === 'en cours') {
                parutionColorClass = 'encours';
            } else if (parution === 'terminée') {
                parutionColorClass = 'terminee';
            } else if (parution === 'en pause') {
                parutionColorClass = 'enpause';
            }

            // Drapeaux des pays
            const franceFlag = '<img src="/images/icons/france-flag.png" alt="France" style="width:20px; height:20px;">';
            const japanFlag = '<img src="/images/icons/japan-flag.png" alt="Japan" style="width:20px; height:20px;">';
            const paysFlag = pays === 'France' ? franceFlag : japanFlag;
            
            Swal.fire({
                title: `
                    <div class="title-container">
                        <span class="parution-column ${parutionColorClass}">Série ${parution}</span>
                        <span class="serie-name">${serie}</span>
                    </div>
                `,
                html: `
                    <div class="columns-container">
                        <div class="columnID">
                            <h3 class="column-title">Identification</h3>
                            <p><strong>ID :</strong> ${id}</p>
                            <p><strong>Code série :</strong> ${codeserie}</p>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="columnInfos">
                            <h3 class="column-title">Informations série</h3>
                            <p><strong>Public :</strong> ${public}</p>
                            <p><strong>Edition :</strong> ${edition}</p>
                            <p><strong>Parution :</strong> ${parution}</p>
                            <p><strong>Prix éditeur :</strong> ${prixEditeur}</p>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="columnAuteurs">
                            <h3 class="column-title">Auteurs</h3>
                            <p><strong>Scénario :</strong> ${scenario}</p>
                            <p><strong>Mangaka :</strong> ${mangaka}</p>
                            <p><strong>Chara-design :</strong> ${charadesign}</p>
                            <p><strong>Histoire originale :</strong> ${histoireOriginale}</p>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="column">
                            <h3 class="column-title">Origine</h3>
                            <div class="grid-origine">
                                <div class="grid-item"><strong>Pays :</strong></div>
                                <div class="grid-item flags-column">${paysFlag} ${pays}</div>
                                <div class="grid-item"><strong>Année VO :</strong></div>
                                <div class="grid-item flags-column">${paysFlag} ${anneeVo}</div>
                                <div class="grid-item"><strong>Année VF :</strong></div>
                                <div class="grid-item flags-column">${franceFlag} ${anneeVf}</div>
                            </div>
                        </div>
                    </div>
                `,
            customClass: {
                title: 'viewTitle',
                popup: 'popupHeight',
                htmlContainer: 'popupHTML',
                confirmButton: 'view-button'
            },
            // width: 300,
            height: 5,
            // padding: '3em',
            color: '#4A5C6A',
        });
        });
    }

    // Table FACTURES :
    function initializeSweetAlertFactures() {
        $(document).on('click', '.delete-facture', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour supprimer une facture.',
            });
        });

        $(document).on('click', '.edit-facture', function (e) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Vous n\'avez pas les autorisations pour modifier une facture.',
            });
        });

        $(document).on('click', '.view-facture', function (e) {
            e.preventDefault();

            // Récupérer les données de la ligne cliquée
            const row = $(this).closest('tr');
            const id = row.find('td:eq(1)').text().trim();
            const datefacture = row.find('td:eq(2)').text().trim();
            const mensualite = row.find('td:eq(3)').text().trim();
            const dateachat = row.find('td:eq(4)').text().trim();
            const datereception = row.find('td:eq(5)').text().trim();
            const acheteur = row.find('td:eq(6)').text().trim();
            const vendeur = row.find('td:eq(7)').text().trim();
            const pays = row.find('td:eq(8)').text().trim();
            const prixtotal = row.find('td:eq(9)').text().trim();
            const statutfacture = row.find('td:eq(10)').text().trim();

            // Définir le statut de parution pour la mise en forme
            let statusColorClass = '';
            if (statutfacture === 'enregistrée') {
                statusColorClass = 'enregistree';
            } else if (statutfacture === 'incomplète') {
                statusColorClass = 'incomplete';
            } else if (statutfacture === 'en transit') {
                statusColorClass = 'entransit';
            } else if (statutfacture === 'clôturée') {
                statusColorClass = 'cloturee';
            }
            
            Swal.fire({
                title: `
                    <div class="title-container">
                        <span class="status-label ${statusColorClass}">Facture ${statutfacture}</span>
                        <span class="serie-name">${id}</span>
                    </div>
                `,
                html: `
                    <div class="columns-container">
                        <div class="columnInfos">
                            <h3 class="column-title">Facture</h3>
                            <p><strong>N° Facture :</strong> ${id}</p>
                            <p><strong>Mensualité :</strong> ${mensualite}</p>
                            <p><strong>Date facture :</strong> ${datefacture}</p>
                            <p><strong>Statut facture :</strong> ${statutfacture}</p>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="columnInfos">
                            <h3 class="column-title">Détails</h3>
                            <p><strong>Date d'achat :</strong> ${dateachat}</p>
                            <p><strong>Date de réception :</strong> ${datereception}</p>
                            <p><strong>Prix total :</strong> ${prixtotal}</p>
                        </div>
                        <div class="vertical-divider"></div>
                        <div class="columnInfos">
                            <h3 class="column-title">Intervenants</h3>
                            <p><strong>Acheteur :</strong> ${acheteur}</p>
                            <p><strong>Vendeur :</strong> ${vendeur}</p>
                            <p><strong>Ville/Pays :</strong> ${pays}</p>
                        </div>
                    </div>
                `,
            customClass: {
                title: 'viewTitle',
                popup: 'popupHeight',
                htmlContainer: 'popupHTML',
                confirmButton: 'view-button'
            },
            height: 5,
            color: '#4A5C6A',
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

    // Table PUBLICS :
    function initializeHighlightPublics() {
        $('#publicsTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table CATEGORIES REG :
    function initializeHighlightREG() {
        $('#regTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table CATEGORIES SPE :
    function initializeHighlightSPE() {
        $('#speTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table ETATS DE PARUTION :
    function initializeHighlightStatus() {
        $('#statusTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table EMPLACEMENTS :
    function initializeHighlightLocations() {
        $('#locationsTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table SERIES :
    function initializeHighlightSeries() {
        $('#seriesTable tbody').on('mouseenter', 'tr', function () {
            $(this).addClass('highlight');
            $(this).find('td').addClass('highlight-cell');
            $(this).find('td:first-child').addClass('highlight-first-cell');
        }).on('mouseleave', 'tr', function () {
            $(this).removeClass('highlight');
            $(this).find('td').removeClass('highlight-cell');
            $(this).find('td:first-child').removeClass('highlight-first-cell');
        });
    }

    // Table FACTURES :
    function initializeHighlightFactures() {
        $('#facturesTable tbody').on('mouseenter', 'tr', function () {
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
        initializeDataTablePublics();
        initializeDataTableREG();
        initializeDataTableSPE();
        initializeDataTableStatus();
        initializeDataTableLocations();
        initializeDataTableSeries();
        initializeDataTableInvoices();
    }

    function initializeSweetAlert() {
        initializeSweetAlertAuteurs();
        initializeSweetAlertEditions();
        initializeSweetAlertAcheteurs();
        initializeSweetAlertVendeurs();
        initializeSweetAlertPublics();
        initializeSweetAlertREG();
        initializeSweetAlertSPE();
        initializeSweetAlertStatus();
        initializeSweetAlertLocations();
        initializeSweetAlertSeries();
        initializeSweetAlertFactures();
    }

    function initializeHighlight() {
        initializeHighlightAuteurs();
        initializeHighlightEditions();
        initializeHighlightAcheteurs();
        initializeHighlightVendeurs();
        initializeHighlightPublics();
        initializeHighlightREG();
        initializeHighlightSPE();
        initializeHighlightStatus();
        initializeHighlightLocations();
        initializeHighlightSeries();
        initializeHighlightFactures();
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