async function fetchData() {
    const customersResponse = await fetch('http://localhost:3003/api/customers');
    const sellersResponse = await fetch('http://localhost:3003/api/sellers');

    const customers = await customersResponse.json();
    const sellers = await sellersResponse.json();

    return { customers, sellers };
}

async function initializeDropdowns() {
    const { customers, sellers } = await fetchData();
    const uniqueSellers = [...new Set(sellers.map(item => item.seller_name))];
    const uniqueCustomers = [...new Set(customers.map(item => item.customer_name))];

    const customerDropdown = document.getElementById('customerDropdown');
    uniqueCustomers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer;
        option.textContent = customer;
        customerDropdown.appendChild(option);
    });

    const sellerDropdown = document.getElementById('sellerDropdown');
    uniqueSellers.forEach(seller => {
        const option = document.createElement('option');
        option.value = seller;
        option.textContent = seller;
        sellerDropdown.appendChild(option);
    });

    window.sellerData = sellers;
}

function showTabContent(tabIndex) {
const contents = document.querySelectorAll('.tab-content');
const addReferencesButton = document.getElementById('addButton');

contents.forEach((content, index) => {
if (index === tabIndex) {
    content.classList.add('active');
} else {
    content.classList.remove('active');
}
});

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab, index) => {
if (index === tabIndex) {
    tab.classList.add('active');
} else {
    tab.classList.remove('active');
}
});

const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

if (tabIndex === 0) {
prevButton.style.display = 'none';
nextButton.style.marginLeft = 'auto';
} else {
prevButton.style.display = 'inline-block';
nextButton.style.marginLeft = '0';
}

if (tabIndex === 2) {
nextButton.textContent = 'Enregistrer';
nextButton.onclick = () => Swal.close();
addReferencesButton.style.display = 'inline-block';
updateRecapFields(); // Update recap fields when switching to the recap tab
} else {
nextButton.textContent = 'Suivant';
nextButton.onclick = showNextTab;
addReferencesButton.style.display = 'none';
}

// Clear the error message when moving to a different tab
document.getElementById('errorMessage').textContent = '';
}

document.addEventListener('DOMContentLoaded', function () {
    // Ajouter un événement de clic au bouton flottant
    document.querySelector('.floating-btn').addEventListener('click', function () {
    Swal.fire({
        width: '1000px',
        heightAuto: false,
        showConfirmButton: false,
        html: `
        <div class="container-title">
            <div class="swal2-title">Ajouter un nouvel acheteur</div>
        </div>
        <div class="container-tabs">
            <div class="tabs">
                <div class="tabs-toggle">
                 
                    <div class="tab active" onclick="showTabContent(0)">Acheteur</div>
                </div>
                

            </div>
        </div>
        <div class="tab-content-container">
            <div class="tab-content active" id="tab-1">
                <div class="form-group">
                    <label for="customerName" class="label-name">Nom de l'acheteur <span class="required-field">*</span></label>
                    <input type="text" id="customerName" class="inputField100" name="customerName" required>
                </div>
            </div>
                <div>
            <div class="container-button">
                <div class="button-group right">
                    <button type="button" class="swal2-cancel swal2-styled" id="prevButton" onclick="showPreviousTab()">Précédent</button>
                    <button type="button" class="swal2-confirm swal2-styled" id="nextButton" onclick="showNextTab()">Suivant</button>
                </div>
            </div>
            <div id="errorMessage" class="error-message"></div>  
        </div>
        `,
        didOpen: () => {
            initializeDropdowns();
            document.querySelectorAll('.tab').forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    if (!tab.classList.contains('disabled')) {
                        showTabContent(index);
                    }
                });
            });
            showTabContent(0);
            setInvoiceStatus('enregistrée');
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

            document.getElementById('recapPurchaseDate').value = purchaseDate;
            document.getElementById('recapReceptionDate').value = receptionDate;
            document.getElementById('recapCustomer').value = customer;
            document.getElementById('recapSeller').value = seller;
            document.getElementById('recapCity').value = city;
            document.getElementById('recapInvoiceStatus').value = invoiceStatus;

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

            document.getElementById('recapInvoiceStatus').value = invoiceStatus;
        }
    });
});
});