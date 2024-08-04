    // Fonction pour récupérer les données du serveur
    async function fetchData() {
        const customersResponse = await fetch('http://localhost:3003/api/customers');
        const sellersResponse = await fetch('http://localhost:3003/api/sellers');
        
        const customers = await customersResponse.json();
        const sellers = await sellersResponse.json();

        return { customers, sellers };
    }
    
    // Fonction pour initialiser les dropdowns
    async function initializeDropdowns() {
        const { customers, sellers } = await fetchData();

        // Obtenir des noms de vendeurs uniques
        const uniqueSellers = [...new Set(sellers.map(item => item.seller_name))];
        // Obtenir des noms de clients uniques
        const uniqueCustomers = [...new Set(customers.map(item => item.customer_name))];

        // Populer le dropdown des clients
        const customerDropdown = document.getElementById('customerDropdown');
        uniqueCustomers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer;
            option.textContent = customer;
            customerDropdown.appendChild(option);
        });

        // Populer le dropdown des vendeurs
        const sellerDropdown = document.getElementById('sellerDropdown');
        uniqueSellers.forEach(seller => {
            const option = document.createElement('option');
            option.value = seller;
            option.textContent = seller;
            sellerDropdown.appendChild(option);
        });

        // Stocker les données pour l'utiliser dans la fonction updateCities
        window.sellerData = sellers;
    }

    // Fonction pour mettre à jour les villes basées sur le vendeur sélectionné
    function updateCities() {
        const selectedSeller = document.getElementById('sellerDropdown').value;
        const data = window.sellerData.filter(item => item.seller_name === selectedSeller);
        const uniqueCities = [...new Set(data.map(item => item.seller_city))];

        const cityDropdown = document.getElementById('cityDropdown');
        cityDropdown.innerHTML = '<option value="">Select City</option>';
        uniqueCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
        });
    }

    // Fonction pour mettre à jour la date de facture en fonction du client sélectionné
    function updateInvoiceDate() {
        const customer = document.getElementById('customerDropdown').value;
        const purchaseDate = document.getElementById('purchaseDate').value;
        const receptionDate = document.getElementById('receptionDate').value;
        const invoiceDate = document.getElementById('invoiceDate');

        if (customer === 'Ethan MASNEUF') {
            invoiceDate.value = purchaseDate;
        } else {
            invoiceDate.value = receptionDate;
        }

        updateInvoiceNumberAndMonthlyPayment();
    }

    // Fonction pour mettre à jour le numéro de facture et la mensualité en fonction de la date de facture
    function updateInvoiceNumberAndMonthlyPayment() {
        const invoiceDate = document.getElementById('invoiceDate').value;
        const invoiceNumber = document.getElementById('invoiceNumber');
        const monthlyPayment = document.getElementById('monthlyPayment');

        if (invoiceDate) {
            const date = new Date(invoiceDate);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            
            invoiceNumber.value = `F${year}${month}`;
            monthlyPayment.value = `${monthNames[date.getMonth()]} ${year}`;
        } else {
            invoiceNumber.value = 'F';
            monthlyPayment.value = '';
        }
    }

    // Fonction pour gérer le changement d'état du toggle
    function toggleInvoiceStatus() {
        const toggle = document.getElementById('statusToggle');
        const invoiceStatus = document.getElementById('invoiceStatus');
        const fieldsToToggle = ['purchaseDate', 'receptionDate', 'sellerDropdown', 'cityDropdown'];

        if (toggle.checked) {
            invoiceStatus.value = 'en transit';
            fieldsToToggle.forEach(field => document.getElementById(field).removeAttribute('required'));
        } else {
            invoiceStatus.value = 'enregistrée';
            fieldsToToggle.forEach(field => document.getElementById(field).setAttribute('required', 'required'));
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
    // Ajouter un événement de clic au bouton flottant
    document.querySelector('.floating-btn').addEventListener('click', function () {
        // Ouvrir SweetAlert avec un formulaire
        Swal.fire({
            title: 'Ajouter une nouvelle facture',
            width: '1400px',  // Augmenter la largeur de la fenêtre modale
            html: `
                <div class="swal2-columns">
                    <div class="swal2-row">
                        <div class="form-group">
                            <label for="invoiceNumber" class="label-name">N° Facture <span class="required-field">*</span>:</label>
                            <input type="text" id="invoiceNumber" name="invoiceNumber" value="F" readonly required>
                        </div>
                        <div class="form-group">
                            <label for="invoiceDate" class="label-name">Date Facture <span class="required-field">*</span>:</label>
                            <input type="date" id="invoiceDate" name="invoiceDate" readonly required>
                        </div>
                        <div class="form-group">
                            <label for="monthlyPayment" class="label-name">Mensualité <span class="required-field">*</span>:</label>
                            <input type="text" id="monthlyPayment" name="monthlyPayment" readonly required>
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="swal2-row">
                        <div class="swal2-column">
                            <div class="form-group">
                                <label for="purchaseDate" class="label-name">Date achat <span class="required-field">*</span>:</label>
                                <input type="date" id="purchaseDate" name="purchaseDate" required onchange="updateInvoiceDate()">
                            </div>
                            <div class="form-group">
                                <label for="receptionDate" class="label-name">Date réception <span class="required-field">*</span>:</label>
                                <input type="date" id="receptionDate" name="receptionDate" required onchange="updateInvoiceDate()">
                            </div>
                        </div>
                        <div class="divider-vertical"></div>
                        <div class="swal2-column">
                            <div class="form-group">
                                <label for="customerDropdown" class="label-name">Acheteur <span class="required-field">*</span>:</label>
                                <select id="customerDropdown" class="swal2-input select2" required onchange="updateInvoiceDate()">
                                    <option value="" disabled selected>Choisir un acheteur...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="sellerDropdown" class="label-name">Vendeur <span class="required-field">*</span>:</label>
                                <select id="sellerDropdown" class="swal2-input select2" required onchange="updateCities()">
                                    <option value="" disabled selected>Choisir un vendeur...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="cityDropdown" class="label-name">Ville/Pays <span class="required-field">*</span>:</label>
                                <select id="cityDropdown" class="swal2-input select2" required>
                                    <option value="" disabled selected>Choisir une ville/pays...</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="divider-horizontal"></div>
                    <div class="swal2-row">
                        <div class="form-group" style="flex: 1;">
                            <label for="invoiceStatus" class="label-name">Statut facture :</label>
                            <input type="text" id="invoiceStatus" name="invoiceStatus" value="enregistrée" readonly>
                        </div>
                        <div class="form-group" style="flex: 1; display: flex; align-items: center; justify-content: flex-end;">
                            <label>Changer le statut :</label>
                            <label class="toggle-button">
                                <input type="checkbox" id="statusToggle" onchange="toggleInvoiceStatus()">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            `,
            didOpen: () => {
                initializeDropdowns();
            },
            preConfirm: () => {
                const invoiceNumber = document.getElementById('invoiceNumber').value;
                const invoiceDate = document.getElementById('invoiceDate').value;
                const monthlyPayment = document.getElementById('monthlyPayment').value;
                const purchaseDate = document.getElementById('purchaseDate').value;
                const receptionDate = document.getElementById('receptionDate').value;
                const customer = document.getElementById('customerDropdown').value;
                const seller = document.getElementById('sellerDropdown').value;
                const city = document.getElementById('cityDropdown').value;
                const invoiceStatus = document.getElementById('invoiceStatus').value;
        
                if (!document.getElementById('statusToggle').checked) {
                    if (!invoiceNumber || !invoiceDate || !monthlyPayment || !purchaseDate || !receptionDate || !customer || !seller || !city) {
                        Swal.showValidationMessage(`Veuillez remplir tous les champs obligatoires`);
                    }
                }
        
                return { invoiceNumber, invoiceDate, monthlyPayment, purchaseDate, receptionDate, customer, seller, city, invoiceStatus };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { invoiceNumber, invoiceDate, monthlyPayment, purchaseDate, receptionDate, customer, seller, city, invoiceStatus } = result.value;
                console.log('N° Facture:', invoiceNumber);
                console.log('Date Facture:', invoiceDate);
                console.log('Mensualité:', monthlyPayment);
                console.log('Date achat:', purchaseDate);
                console.log('Date réception:', receptionDate);
                console.log('Customer:', customer);
                console.log('Seller:', seller);
                console.log('City:', city);
                console.log('Statut facture:', invoiceStatus);
            }
        });
    });
});
