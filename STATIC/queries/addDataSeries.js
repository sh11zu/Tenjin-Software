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
            <div class="swal2-title">Ajouter une nouvelle série</div>
        </div>
        <div class="container-tabs">
            <div class="tabs">
                <div class="tabs-toggle">
                 
                    <div class="tab active" onclick="showTabContent(0)">Edition</div>
                    <div class="tab" onclick="showTabContent(1)">Auteurs</div>
                    <div class="tab" onclick="showTabContent(2)">Origine</div>
                    <div class="tab" onclick="showTabContent(3)">Prix et statut</div>
                    <div class="tab" onclick="showTabContent(4)">Récapitulatif</div>
                </div>
                

            </div>
        </div>
        <div class="tab-content-container">
            <div class="tab-content active" id="tab-1">
                <div class="form-group">
                    <label for="serieName" class="label-name">Nom de la série <span class="required-field">*</span></label>
                    <input type="text" id="serieName" class="inputField100" name="serieName" required>
                </div>
                <div class="form-group">
                    <label for="publicDropdown" class="label-name">Public <span class="required-field">*</span></label>
                    <select id="publicDropdown" class="inputField100" required onchange="updateInvoiceDate()">
                        <option value="" disabled selected>Choisir un public...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="publisherDropdown" class="label-name">Editeur <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="publisherDropdown" required onchange="updateInvoiceDate()">
                        <option value="" disabled selected>Choisir un éditeur...</option>
                    </select>
                    <button type="button" id="addPublisherButton" class="add-button">+</button>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="tab-2">
                <div class="form-group">
                    <label for="scenarioDropdown" class="label-name">Scénario <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="scenarioDropdown" required>
                        <option value="" disabled selected>Choisir un auteur...</option>
                    </select>
                    <button type="button" id="addAuthorButton" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="mangakaDropdown" class="label-name">Mangaka <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="mangakaDropdown" required>
                        <option value="" disabled selected>Choisir un auteur...</option>
                    </select>
                    <button type="button" id="addAuthorButton" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="charaDropdown" class="label-name">Chara-design <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="charaDropdown" required>
                        <option value="" disabled selected>Choisir un auteur...</option>
                    </select>
                    <button type="button" id="addAuthorButton" class="add-button">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label for="histoireDropdown" class="label-name">Histoire originale <span class="required-field">*</span></label>
                    <div class="addDropdownValue">
                    <select id="histoireDropdown" required>
                        <option value="" disabled selected>Choisir un auteur...</option>
                    </select>
                    <button type="button" id="addAuthorButton" class="add-button">+</button>
                    </div>
                </div>
                
            </div>
            <div class="tab-content" id="tab-3">
                <div class="row">
                    <div class="column">
                        <div class="form-group">
                            <label for="countryDropdown" class="label-name">Pays d'origine <span class="required-field">*</span></label>
                            <select id="countryDropdown" class="inputField100">
                            <option value="" disabled selected>Choisir un pays d'origine...</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="form-group">
                            <label>Année VO</label>
                            <input type="text" class="inputField100" id="voYear">
                        </div>
                        <div class="form-group">
                            <label>Année VF</label>
                            <input type="text" class="inputField100" id="vfYear">
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="tab-4">
                <div class="row">
                    <div class="column">
                        <div class="form-group">
                            <label for="parutionStatus" class="label-name">Etat de parution <span class="required-field">*</span></label>
                            <select id="parutionStatus" class="inputField100">
                            <option value="" disabled selected>Choisir un statut de parution...</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="form-group">
                            <label>Prix éditeur</label>
                            <input type="currency" class="inputField100" id="publisherPrice">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="tab-content" id="tab-5">
                <div class="serie-name-cont">
                <div class="form-group inputFieldF70">
                        <label>Nom de la série</label>
                        <input type="text" class="" id="recapSerieName" readonly>
                </div>
                <div class="form-group inputFieldF30">
                        <label>ID</label>
                        <input type="text" class="" id="serieID" readonly>
                </div>
                </div>
                <div class="row">
                    <div class="column">
                        <div class="form-group">
                            <label for="serieCode" class="label-name">Code série</label>
                            <input type="text" id="serieCode" class="inputField100" name="serieCode" value="" readonly required>
                        </div>
                        <div class="form-group">
                            <label>Public</label>
                            <input type="text" class="inputField100" id="recapPublic" readonly>
                        </div>
                        <div class="form-group">
                            <label>Editeur</label>
                            <input type="text" class="inputField100" id="recapPublisher" readonly>
                        </div>
                        <div class="form-group">
                            <label>Etat de parution</label>
                            <input type="text" class="inputField100" id="recapParutionStatus" readonly>
                        </div>
                        <div class="form-group">
                            <label>Scénario</label>
                            <input type="text" class="inputField100" id="recapScenario" readonly>
                        </div>
                        <div class="form-group">
                            <label>Chara-design</label>
                            <input type="text" class="inputField100" id="recapChara" readonly>
                        </div>
                    </div>
                    <div class="column">
                        <div class="form-group">
                            <label>Prix editeur</label>
                            <input type="text" class="inputField100" id="recapPublisherPrice" readonly>
                        </div>
                        <div class="form-group">
                            <label>Pays d'origine</label>
                            <input type="text" class="inputField100" id="recapCountry" readonly>
                        </div>
                        <div class="form-group">
                            <label>Année VO</label>
                            <input type="text" class="inputField100" id="recapVoYear" readonly>
                        </div>
                        <div class="form-group">
                            <label>Année VF</label>
                            <input type="text" class="inputField100" id="recapVfYear" readonly>
                        </div>
                        <div class="form-group">
                            <label>Mangaka</label>
                            <input type="text" class="inputField100" id="recapMangaka" readonly>
                        </div>
                        <div class="form-group">
                            <label>Histoire originale</label>
                            <input type="text" class="inputField100" id="recapHistoire" readonly>
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