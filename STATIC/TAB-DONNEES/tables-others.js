document.addEventListener("DOMContentLoaded", function() {
    const tableInitializations = {
        publicsTable: false,
        regTable: false,
        speTable: false,
        statusTable: false,
        locationsTable: false,
    };

    function initializeDataTable(tableId) {
        if (tableInitializations[tableId]) return;
        if ($.fn.dataTable.isDataTable(`#${tableId}`)) {
            $(`#${tableId}`).DataTable().destroy();
        }
        $(`#${tableId}`).DataTable({
            pageLength: 10,
            columnDefs: [{ orderable: false, targets: 0 }],
            language: { url: '/ressources/French.json' }
        });
        tableInitializations[tableId] = true;
    }

    function showTab(tableId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.dataTables_wrapper').forEach(wrapper => {
            wrapper.style.display = 'none';
        });

        document.getElementById(tableId).classList.add('active');
        document.getElementById(`${tableId}_wrapper`).style.display = 'block';

        initializeDataTable(tableId);
    }

    document.querySelectorAll('.navigation-tab-buttons button').forEach(button => {
        button.addEventListener('click', function() {
            const tableId = this.getAttribute('onclick').match(/'(.*)'/)[1];
            showTab(tableId);
        });
    });

    // Initialiser la page avec la table "publicsTable" visible
    showTab('publicsTable');

    // Simuler un clic sur le bouton publics pour s'assurer qu'il est affiché
    document.querySelector('.navtab-publics').click();

    // function initializeSweetAlerts() {
    //     $(document).on('click', '.delete-public', function(e) {
    //         e.preventDefault();
    //         Swal.fire({ icon: 'error', title: 'Erreur', text: 'Vous n\'avez pas les autorisations pour supprimer ce public.' });
    //     });
    //     $(document).on('click', '.edit-public', function(e) {
    //         e.preventDefault();
    //         Swal.fire({ icon: 'error', title: 'Erreur', text: 'Vous n\'avez pas les autorisations pour modifier ce public.' });
    //     });
    //     $(document).on('click', '.view-public', function(e) {
    //         e.preventDefault();
    //         const row = $(this).closest('tr');
    //         const id = row.find('td:eq(1)').text().trim();
    //         Swal.fire({ title: 'Détail du Public', html: `<p><strong>ID :</strong> ${id}</p>`, icon: 'info' });
    //     });
    //     // Repeat similar SweetAlert initializations for reg, spe, status, and locations...
    // }

    // initializeSweetAlerts();

    // function initializeHighlights() {
    //     function addHighlight(tableId) {
    //         $(`#${tableId} tbody`).on('mouseenter', 'tr', function () {
    //             $(this).addClass('highlight');
    //         }).on('mouseleave', 'tr', function () {
    //             $(this).removeClass('highlight');
    //         });
    //     }

    //     ['publicsTable', 'regTable', 'speTable', 'statusTable', 'locationsTable'].forEach(addHighlight);
    // }

    // initializeHighlights();

    // function initializeDropdown() {
    //     $(document).on('click', function(event) {
    //         if ($(event.target).closest('.dropbtn').length) {
    //             event.stopPropagation();
    //             var dropbtn = $(event.target).closest('.dropbtn');
    //             var dropdownContent = dropbtn.next('.table-dropdown-content');
    //             if (dropdownContent.is(':visible')) {
    //                 dropdownContent.hide();
    //                 dropbtn.removeClass('active');
    //             } else {
    //                 closeAllDropdowns();
    //                 dropdownContent.show();
    //                 dropbtn.addClass('active');
    //             }
    //         } else if (!$(event.target).closest('.table-dropdown-content').length) {
    //             closeAllDropdowns();
    //         }
    //     });

    //     function closeAllDropdowns() {
    //         $('.table-dropdown-content').hide();
    //         $('.dropbtn').removeClass('active');
    //     }
    // }

    // initializeDropdown();
});
