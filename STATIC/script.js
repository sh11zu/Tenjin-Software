document.addEventListener('DOMContentLoaded', function () {
    $('#editionsTable').DataTable({
        pageLength: 25,
        columnDefs: [
            { orderable: false, targets: 0 }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json'
        }
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
