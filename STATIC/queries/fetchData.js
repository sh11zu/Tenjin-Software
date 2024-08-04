function fetchDataAndInitializeTable(url, tableBodyId, rowGenerator, tableId) {
    fetch(url)
        .then(response => {
            console.log(`Response received from ${url}`, response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Data fetched from ${url}`, data);
            const tableBody = document.getElementById(tableBodyId);
            tableBody.innerHTML = ''; // Vider le contenu existant

            if (data.length === 0) {
                console.log(`No data found from ${url}`);
            } else {
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = rowGenerator(item);
                    tableBody.appendChild(row);
                });

                // Déclencher un événement pour signaler que les données sont chargées
                document.dispatchEvent(new Event('dataLoaded'));
            }

            // Initialiser DataTable après l'insertion des données
            $(`#${tableId}`).DataTable();
        })
        .catch(error => console.error(`Error fetching data from ${url}:`, error));
}

document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndInitializeTable('http://localhost:3003/api/publishers', 'publishers-table-body', publisherRowGenerator, 'editionsTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/sellers', 'sellers-table-body', sellerRowGenerator, 'sellersTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/customers', 'customers-table-body', customerRowGenerator, 'customersTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/authors', 'authors-table-body', authorRowGenerator, 'authorsTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/publics', 'publics-table-body', publicsRowGenerator, 'publicsTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/locations', 'locations-table-body', locationsRowGenerator, 'locationsTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/series', 'series-table-body', seriesRowGenerator, 'seriesTable');
    fetchDataAndInitializeTable('http://localhost:3003/api/invoices', 'factures-table-body', facturesRowGenerator, 'facturesTable');
});

function publisherRowGenerator(publisher) {
    const imageName = publisher.publisher_name.replace(/[\s'&]/g, '').toLowerCase() + '.png';
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-edition"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-edition"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-edition"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td><strong>${publisher.publisher_code}</strong></td>
        <td class="edition-logo-container">
            <img src="/images/${imageName}" alt="${publisher.publisher_name} Logo">
            <span>${publisher.publisher_name}</span>
        </td>
    `;
}

function sellerRowGenerator(seller) {
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-vendeur"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-vendeur"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-vendeur"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td><strong>${seller.seller_name}</strong></td>
        <td><strong>${seller.seller_city}</strong></td>
    `;
}

function customerRowGenerator(customer) {
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-acheteur"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-acheteur"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-acheteur"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td>
            <div class="author-info">
                <strong>${customer.customer_name}</strong>
                <span class="right-aligned">156 références</span>
            </div>
        </td>
    `;
}

function authorRowGenerator(author) {
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-author"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-author"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-author"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td>
            <div class="author-info">
                <strong>${author.author_name}</strong>
                <span class="right-aligned">Scénario ; Mangaka</span>
            </div>
        </td>
    `;
}

function publicsRowGenerator(publics) {
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-public"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-public"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-public"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td>
            <div class="author-info">
                <strong>${publics.public_name}</strong>
            </div>
        </td>
    `;
}

function locationsRowGenerator(locations) {
    return `
        <td>
            <div class="table-dropdown">
                <button class="dropbtn"><span></span></button>
                <div class="table-dropdown-content">
                    <a href="#" class="view-location"><i class="fas fa-search"></i> View</a>
                    <a href="#" class="edit-location"><i class="fas fa-edit"></i> Edit</a>
                    <a href="#" class="delete-location"><i class="fas fa-trash"></i> Delete</a>
                </div>
            </div>
        </td>
        <td>
            <div class="author-info">
                <strong>${locations.location_id}</strong>
            </div>
        </td>
    `;
}


function seriesRowGenerator(series) {

// Définir le statut de parution pour la mise en forme
let parutionColorClass = '';
if (series.release_status === 'abandonnée') {
    parutionColorClass = 'abandonnee';
} else if (series.release_status === 'en cours') {
    parutionColorClass = 'encours';
} else if (series.release_status === 'terminée') {
    parutionColorClass = 'terminee';
} else if (series.release_status === 'en pause') {
    parutionColorClass = 'enpause';
}

// Drapeaux des pays
const franceFlag = '<img src="/images/icons/france-flag.png" alt="France" style="width:25px; height:25px;">';
const japanFlag = '<img src="/images/icons/japan-flag.png" alt="Japan" style="width:25px; height:25px;">';
const paysFlag = series.country === 'France' ? franceFlag : japanFlag;

    return `
        <tr>
            <td>
                <div class="table-dropdown">
                    <button class="dropbtn"><span></span></button>
                    <div class="table-dropdown-content">
                        <a href="#" class="view-serie"><i class="fas fa-search"></i> View</a>
                        <a href="#" class="edit-serie"><i class="fas fa-edit"></i> Edit</a>
                        <a href="#" class="delete-serie"><i class="fas fa-trash"></i> Delete</a>
                    </div>
                </div>
            </td>
            <td><strong>${formatNumberToThreeDigits(series.serie_id)}</strong></td>
            <td><strong>${series.serie_code}</strong></td>
            <td><strong>${series.serie_name}</strong></td>
            <td>${series.tr_public_id_name}</td>
            <td>${series.tr_publisher_id_name}</td>
            <td>${series.tr_author_id_scenario}</td>
            <td>${series.tr_author_id_mangaka}</td>
            <td>${series.tr_author_id_chara}</td>
            <td>${series.tr_author_id_histoire}</td>
            <td>
            <span class="parution-column ${parutionColorClass}">${series.release_status}</span>
            </td>
            <td class="flags-table-column">${paysFlag} ${series.country}</td>
            <td>${series.vo_year}</td>
            <td>${series.vf_year}</td>
            <td><strong>${formatPrice(series.publisher_price)}</strong></td>
        </tr>
    `;
}

function facturesRowGenerator(invoices) {  
    
// Définir le statut de parution pour la mise en forme
let statusColorClass = '';
if (invoices.invoice_status === 'enregistrée') {
    statusColorClass = 'enregistree';
} else if (invoices.invoice_status === 'incomplète') {
    statusColorClass = 'incomplete';
} else if (invoices.invoice_status === 'en transit') {
    statusColorClass = 'entransit';
} else if (invoices.invoice_status === 'clôturée') {
    statusColorClass = 'cloturee';
}

// Définir la date de la facture
let invoice_date = '';
if (invoices.tr_iv_customer_name === 'Ethan MASNEUF') {
    invoice_date = invoices.purchase_date;
} else {
    invoice_date = invoices.reception_date;
}

        return `
            <tr>
                <td>
                    <div class="table-dropdown">
                        <button class="dropbtn"><span></span></button>
                        <div class="table-dropdown-content">
                            <a href="#" class="view-facture"><i class="fas fa-search"></i> View</a>
                            <a href="#" class="edit-facture"><i class="fas fa-edit"></i> Edit</a>
                            <a href="#" class="delete-facture"><i class="fas fa-trash"></i> Delete</a>
                        </div>
                    </div>
                </td>
                <td><strong>${invoices.invoice_id}</strong></td>
                <td><strong>${formatDate(invoice_date)}</strong></td>
                <td><strong>${invoices.month}</strong></td>
                <td>${formatDate(invoices.purchase_date)}</td>
                <td>${formatDate(invoices.reception_date)}</td>
                <td>${invoices.tr_iv_customer_name}</td>
                <td>${invoices.tr_iv_seller_name}</td>
                <td>${invoices.tr_seller_city}</td>
                <td>${formatPrice(invoices.tr_total_price)}</strong></td>
                <td>
                <span class="status-label ${statusColorClass}">${invoices.invoice_status}</span>
                </td>
                </tr>
        `;
    }

function formatNumberToThreeDigits(number) {
    return number.toString().padStart(3, '0');
}

function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace('.', ',') + ' €';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
