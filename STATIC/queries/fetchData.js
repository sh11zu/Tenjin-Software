document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Fetch sellers
    fetch('http://localhost:3003/api/sellers')
        .then(response => {
            console.log('Response received', response);
            return response.json();
        })
        .then(data => {
            console.log('Data fetched', data);
            const tableBody = document.getElementById('sellers-table-body');
            tableBody.innerHTML = ''; // Vider le contenu existant

            data.forEach(seller => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${seller.seller_name}</td>
                    <td>${seller.seller_city}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch customers
    fetch('http://localhost:3003/api/customers')
        .then(response => {
            console.log('Response received', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched', data);
            const tableBody = document.getElementById('customers-table-body');
            tableBody.innerHTML = ''; // Vider le contenu existant

            if (data.length === 0) {
                console.log('No data found');
            } else {
                data.forEach(customer => {
                    console.log('Processing customer:', customer);
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>
                            <a href="#" class="view-acheteur"><i class="fas fa-search"></i></a>
                            <a href="#" class="edit-acheteur"><i class="fas fa-edit"></i></a>
                            <a href="#" class="delete-acheteur"><i class="fas fa-trash"></i></a>
                        </td>
                        <td>
                            <div class="author-info">
                                <strong>${customer.customer_name}</strong>
                                <span class="right-aligned">156 références</span>
                            </div>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));


    // Fetch sellers
    fetch('http://localhost:3003/api/sellers')
        .then(response => {
            console.log('Response received', response);
            return response.json();
        })
        .then(data => {
            console.log('Data fetched', data);
            const tableBody = document.getElementById('sellers-table-body');
            tableBody.innerHTML = ''; // Vider le contenu existant

            data.forEach(seller => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <a href="#" class="view-vendeur"><i class="fas fa-search"></i></a>
                        <a href="#" class="edit-vendeur"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete-vendeur"><i class="fas fa-trash"></i></a>
                    </td>
                    <td><strong>${seller.seller_name}</strong></td>
                    <td><strong>${seller.seller_city}</strong></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    
    // Fetch publishers
    fetch('http://localhost:3003/api/publishers')
        .then(response => {
            console.log('Response received', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched', data);
            const tableBody = document.getElementById('publishers-table-body');
            tableBody.innerHTML = ''; // Vider le contenu existant

            data.forEach(publisher => {
                // Convertir le nom de l'éditeur en nom de fichier
                const imageName = publisher.publisher_name.replace(/[\s'&]/g, '').toLowerCase() + '.png';
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <a href="#" class="view-edition"><i class="fas fa-search"></i></a>
                        <a href="#" class="edit-edition"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete-edition"><i class="fas fa-trash"></i></a>
                    </td>
                    <td><strong>${publisher.publisher_code}</strong></td>
                    <td class="edition-logo-container">
                        <img src="/images/${imageName}" alt="${publisher.publisher_name} Logo">
                        <span>${publisher.publisher_name}</span>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));


    // Fetch authors
    fetch('http://localhost:3003/api/authors')
        .then(response => {
            console.log('Response received', response);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched', data);
            const tableBody = document.getElementById('authors-table-body');
            tableBody.innerHTML = ''; // Vider le contenu existant

            data.forEach(author => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <a href="#" class="view-auteur"><i class="fas fa-search"></i></a>
                        <a href="#" class="edit-auteur"><i class="fas fa-edit"></i></a>
                        <a href="#" class="delete-auteur"><i class="fas fa-trash"></i></a>
                    </td>
                    <td>
                        <div class="author-info">
                            <strong>${author.author_name}</strong>
                            <span class="right-aligned">Scénario ; Mangaka</span>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
        
});
