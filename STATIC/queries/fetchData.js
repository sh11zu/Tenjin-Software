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