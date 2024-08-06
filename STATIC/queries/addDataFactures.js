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

function updateRecapFields() {
    document.getElementById('recapPurchaseDate').value = document.getElementById('purchaseDate').value;
    document.getElementById('recapReceptionDate').value = document.getElementById('receptionDate').value;
    document.getElementById('recapCustomer').value = document.getElementById('customerDropdown').value;
    document.getElementById('recapSeller').value = document.getElementById('sellerDropdown').value;
    document.getElementById('recapCity').value = document.getElementById('cityDropdown').value;
    document.getElementById('recapInvoiceStatus').value = document.getElementById('invoiceStatus').value;
}


function resetFormFields() {
const formFields = document.querySelectorAll('.tab-content input, .tab-content select');
formFields.forEach(field => {
field.value = '';
field.classList.remove('error');
field.removeAttribute('required');
field.disabled = false;
});

const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
group.classList.add('hide-required');
});

const errorMessage = document.getElementById('errorMessage');
errorMessage.textContent = '';
errorMessage.classList.remove('error');

// Reset specific fields or states if needed
updateInvoiceDate();
updateInvoiceNumberAndMonthlyPayment();
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

function confirmStatusChange(oldStatus, newStatus, callback) {
const confirmationModal = document.createElement('div');
confirmationModal.innerHTML = `
<div class="confirmation-modal">
    <div class="confirmation-content">
        <p>Changer le statut de la facture de ${oldStatus} à ${newStatus} ?</p>
        <button id="confirmButton" class="confirm-button">Oui</button>
        <button id="cancelButton" class="cancel-button">Non</button>
    </div>
</div>
`;
document.body.appendChild(confirmationModal);

document.getElementById('confirmButton').onclick = () => {
document.body.removeChild(confirmationModal);
callback();
};

document.getElementById('cancelButton').onclick = () => {
document.body.removeChild(confirmationModal);
};
}

function showAlert(message, focusFieldId) {
const alertModal = document.createElement('div');
alertModal.classList.add('confirmation-modal');
alertModal.innerHTML = `
<div class="confirmation-content">
    <p>${message}</p>
    <button id="alertConfirmButton" class="confirm-button">OK</button>
</div>
`;
document.body.appendChild(alertModal);

document.getElementById('alertConfirmButton').onclick = () => {
document.body.removeChild(alertModal);
if (focusFieldId) {
    document.getElementById(focusFieldId).focus();
}
showTabContent(0); // Navigate back to the "Dates" tab
};
}

function setInvoiceStatus(status) {
const currentStatus = document.getElementById('invoiceStatus').value;
if (currentStatus === status) return;

if (status === 'incomplète' && document.getElementById('customerDropdown').value === 'Ethan MASNEUF') {
const purchaseDateField = document.getElementById('purchaseDate');
if (!purchaseDateField.value) {
    showAlert('Pour l\'état Incomplète avec l\'acheteur Ethan MASNEUF, il faut remplir une date d\'achat.', 'purchaseDate');
    return;
}
}

confirmStatusChange(currentStatus, status, () => {
const invoiceStatus = document.getElementById('invoiceStatus');
invoiceStatus.value = status;

const purchaseDateField = document.getElementById('purchaseDate');
const receptionDateField = document.getElementById('receptionDate');
const customerDropdown = document.getElementById('customerDropdown');
const sellerDropdown = document.getElementById('sellerDropdown');
const cityDropdown = document.getElementById('cityDropdown');
const addCustomerButton = document.getElementById('addCustomerButton');

const formGroups = document.querySelectorAll('.form-group');

// Reset required fields and hide asterisks
purchaseDateField.removeAttribute('required');
receptionDateField.removeAttribute('required');
customerDropdown.removeAttribute('required');
sellerDropdown.removeAttribute('required');
cityDropdown.removeAttribute('required');
formGroups.forEach(group => group.classList.add('hide-required'));

// Set required fields and show asterisks based on status
if (status === 'incomplète') {
    // No fields required, but at least one date should be filled
    formGroups.forEach(group => {
        if (group.querySelector('input, select').id === 'purchaseDate' || group.querySelector('input, select').id === 'receptionDate') {
            group.classList.remove('hide-required');
        }
    });
} else if (status === 'en transit') {
    purchaseDateField.setAttribute('required', 'required');
    customerDropdown.setAttribute('required', 'required');
    sellerDropdown.setAttribute('required', 'required');
    cityDropdown.setAttribute('required', 'required');

    // Set customer to "Ethan MASNEUF" and disable dropdown
    customerDropdown.value = 'Ethan MASNEUF';
    customerDropdown.disabled = true;
    addCustomerButton.disabled = true;

    // Clear and disable reception date field
    receptionDateField.value = '';
    receptionDateField.disabled = true;

    formGroups.forEach(group => {
        if (['purchaseDate', 'customerDropdown', 'sellerDropdown', 'cityDropdown'].includes(group.querySelector('input, select').id)) {
            group.classList.remove('hide-required');
        }
    });
} else if (status === 'enregistrée') {
    purchaseDateField.setAttribute('required', 'required');
    receptionDateField.setAttribute('required', 'required');
    customerDropdown.setAttribute('required', 'required');
    sellerDropdown.setAttribute('required', 'required');
    cityDropdown.setAttribute('required', 'required');
    customerDropdown.disabled = false; // Enable customer dropdown
    addCustomerButton.disabled = false;
    receptionDateField.disabled = false;

    formGroups.forEach(group => {
        if (['purchaseDate', 'receptionDate', 'customerDropdown', 'sellerDropdown', 'cityDropdown'].includes(group.querySelector('input, select').id)) {
            group.classList.remove('hide-required');
        }
    });
}

document.getElementById('option1').classList.remove('active');
document.getElementById('option2').classList.remove('active');
document.getElementById('option3').classList.remove('active');

if (status === 'incomplète') {
    document.getElementById('option1').classList.add('active');
} else if (status === 'en transit') {
    document.getElementById('option2').classList.add('active');
} else if (status === 'enregistrée') {
    document.getElementById('option3').classList.add('active');
}

// Disable tabs 2 and 3
document.querySelectorAll('.tab')[1].classList.add('disabled');
document.querySelectorAll('.tab')[2].classList.add('disabled');

showTabContent(0); // Navigate back to the "Dates" tab
});
}




function validateRequiredFields() {
const requiredFields = document.querySelectorAll('.tab-content.active [required]');
let allFieldsValid = true;
let incomplèteValid = true;

requiredFields.forEach(field => {
if (!field.value) {
    allFieldsValid = false;
    field.classList.add('error');
    // Add event listener to remove error class on input and check all fields
    field.addEventListener('input', function handleInput() {
        if (field.value) {
            field.classList.remove('error');
            if (areAllRequiredFieldsFilled()) {
                document.getElementById('errorMessage').textContent = '';
            }
            field.removeEventListener('input', handleInput); // Remove listener once error is resolved
        }
    });
} else {
    field.classList.remove('error');
}
});

const errorMessage = document.getElementById('errorMessage');
if (document.getElementById('invoiceStatus').value === 'incomplète') {
const purchaseDate = document.getElementById('purchaseDate').value;
const receptionDate = document.getElementById('receptionDate').value;
if (!purchaseDate && !receptionDate) {
    incomplèteValid = false;
    document.getElementById('purchaseDate').classList.add('error');
    document.getElementById('receptionDate').classList.add('error');
} else {
    document.getElementById('purchaseDate').classList.remove('error');
    document.getElementById('receptionDate').classList.remove('error');
}
}

if (!allFieldsValid) {
errorMessage.classList.add('error-message');
errorMessage.textContent = 'ⓘ Veuillez remplir tous les champs obligatoires avant de continuer.';
return false;
} else if (!incomplèteValid) {
errorMessage.classList.add('error-message');
errorMessage.textContent = 'ⓘ Il faut au moins une date d\'achat ou une date de réception.';
return false;
} else {
errorMessage.textContent = '';
return true;
}
}

function areAllRequiredFieldsFilled() {
const requiredFields = document.querySelectorAll('.tab-content.active [required]');
return Array.from(requiredFields).every(field => field.value);
}

'none';

function showNextTab() {
if (!validateRequiredFields()) {
return;
}

const currentTabIndex = Array.from(document.querySelectorAll('.tab')).findIndex(tab => tab.classList.contains('active'));
if (currentTabIndex < 2) {
showTabContent(currentTabIndex + 1);
}

const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab, index) => {
if (index <= currentTabIndex + 1) {
    tab.classList.remove('disabled');
}
});
}

function showPreviousTab() {
const currentTabIndex = Array.from(document.querySelectorAll('.tab')).findIndex(tab => tab.classList.contains('active'));
if (currentTabIndex > 0) {
showTabContent(currentTabIndex - 1);
}
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
            <div class="swal2-title">Ajouter une nouvelle facture</div>
        </div>
        <div class="container-tabs">
            <div class="tabs">
                <div class="tabs-toggle">
                 
                    <div class="tab active" onclick="showTabContent(0)">Dates</div>
                    <div class="tab disabled" onclick="showTabContent(1)">Acheteur et Vendeur</div>
                    <div class="tab disabled" onclick="showTabContent(2)">Récapitulatif</div>
                </div>
                <div class="toggle-container">
                    <button class="toggle-button" id="option1" onclick="setInvoiceStatus('incomplète')">Incomplète</button>
                    <button class="toggle-button" id="option2" onclick="setInvoiceStatus('en transit')">En transit</button>
                    <button class="toggle-button active" id="option3" onclick="setInvoiceStatus('enregistrée')">Enregistrée</button>
                </div>

            </div>
        </div>
        <div class="tab-content-container">
            <div class="tab-content active" id="tab-1">
                <div class="form-group">
                    <label for="purchaseDate" class="label-name">Date achat <span class="required-field">*</span></label>
                    <input type="date" id="purchaseDate" name="purchaseDate" required onchange="updateInvoiceDate()">
                </div>
                <div class="form-group">
                    <label for="receptionDate" class="label-name">Date réception <span class="required-field">*</span></label>
                    <input type="date" id="receptionDate" name="receptionDate" required onchange="updateInvoiceDate()">
                </div>
            </div>
            <div class="tab-content" id="tab-2">
                <div class="form-group">
                    <label for="customerDropdown" class="label-name">Acheteur <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="customerDropdown" required onchange="updateInvoiceDate()">
                        <option value="" disabled selected>Choisir un acheteur...</option>
                    </select>
                    <button type="button" id="addCustomerButton" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="sellerDropdown" class="label-name">Vendeur <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="sellerDropdown" required onchange="updateCities()">
                        <option value="" disabled selected>Choisir un vendeur...</option>
                    </select>
                    <button type="button" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="cityDropdown" class="label-name">Ville/Pays <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="cityDropdown" required>
                        <option value="" disabled selected>Choisir une ville/pays...</option>
                    </select>
                    <button type="button" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group-invisible">
                    <label for="invoiceStatus" class="label-name">Statut facture :</label>
                    <input type="text" id="invoiceStatus" name="invoiceStatus" value="enregistrée" readonly>
                </div>
                
            </div>
            <div class="tab-content" id="tab-3">
                <div class="row">
                    <div class="column">
                        <div class="form-group">
                            <label for="invoiceNumber" class="label-name">N° Facture</label>
                            <input type="text" id="invoiceNumber" name="invoiceNumber" value="F" readonly required>
                        </div>
                        <div class="form-group">
                            <label for="invoiceDate" class="label-name">Date Facture</label>
                            <input type="date" id="invoiceDate" name="invoiceDate" readonly required>
                        </div>
                        <div class="form-group">
                            <label for="monthlyPayment" class="label-name">Mensualité</label>
                            <input type="text" id="monthlyPayment" name="monthlyPayment" readonly required>
                        </div>
                        <div class="form-group">
                            <label>Acheteur</label>
                            <input type="text" id="recapCustomer" readonly>
                        </div>
                        <div class="form-group">
                            <label>Vendeur</label>
                            <input type="text" id="recapSeller" readonly>
                        </div>
                        <div class="form-group">
                            <label>Ville/Pays</label>
                            <input type="text" id="recapCity" readonly>
                        </div>
                    </div>
                    <div class="column">
                        <div class="form-group">
                            <label>Statut facture</label>
                            <input type="text" id="recapInvoiceStatus" readonly>
                        </div>
                        <div class="form-group">
                            <label>Date achat</label>
                            <input type="date" id="recapPurchaseDate" readonly>
                        </div>
                        <div class="form-group">
                            <label>Date réception</label>
                            <input type="date" id="recapReceptionDate" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            <div class="container-button">
                <div class="button-group left">
                    <button type="button" class="swal2-confirm swal2-styled" id="addButton">Ajouter des références</button>
                </div>
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