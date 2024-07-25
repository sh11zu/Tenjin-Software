// Function to handle the selection of categories (if needed)
function selectCategory(category) {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        if (card.getAttribute('data-category') === category) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

// Function to load and display the details for each category
function loadDetails(category) {
    selectCategory(category);

    if (category === 'volumes-manga') {
        showDetailsVolumesManga();
    } else if (category === 'editions') {
        showDetailsEditions();
    } else if (category === 'emplacements') {
        showDetailsEmplacements();
    } else if (category === 'factures') {
        showDetailsFactures();
    } else if (category === 'acheteurs') {
        showDetailsAcheteurs();
    } else if (category === 'vendeurs') {
        showDetailsVendeurs();
    } else if (category === 'auteurs') {
        showDetailsAuteurs();
    } else {
        showGenericDetails(category);
    }
}

// Function to show details for Volumes Manga category
async function showDetailsVolumesManga() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.remove('with-divider');

    const data = {
        chartData: {
            labels: ["Pika Edition", "Kana", "Panini", "Akata", "Ototo", "Shiba Edition", "Mangetsu"],
            datasets: [{
                label: "Volumes de Manga par Édition",
                data: [56, 72, 23, 2, 31, 0, 4],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(201, 203, 207, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(201, 203, 207, 1)"
                ],
                borderWidth: 1,
                hoverOffset: 5
            }]
        }
    };

    detailsSection.innerHTML = `
        <div class="details-content">
            <div class="chart" style="flex: 1;">
                <div class="chart-title">Volumes de Manga par Édition</div>
                <canvas id="volumesMangaChart"></canvas>
            </div>
        </div>
    `;

    const ctx = document.getElementById('volumesMangaChart').getContext('2d');
    window.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20 // Adjust this value to add more space between the chart and the legend
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                    text: 'Volumes de Manga par Édition'
                },
                datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: function(value, context) {
                        const total = context.chart._metasets[0].total;
                        const percentage = (value * 100 / total).toFixed(2);
                        return `${percentage}%`;
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}


// Function to show details for Editions category
async function showDetailsEditions() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.add('with-divider');

    const data = {
        chartData: {
            labels: ["Pika Edition", "Kana", "Panini", "Akata", "Ototo", "Shiba Edition", "Mangetsu"],
            datasets: [{
                label: "Volumes de Manga par Édition",
                data: [56, 72, 23, 2, 31, 0, 4],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(201, 203, 207, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(201, 203, 207, 1)"
                ],
                borderWidth: 1,
                hoverOffset: 5
            }]
        },
        tableData: [
            {"edition": "Shiba Edition", "date": "15/07/2023 14:34:16"},
            {"edition": "Mangetsu", "date": "10/06/2023 10:02:43"},
            {"edition": "Panini", "date": "03/04/2023 21:54:23"},
            {"edition": "Akata", "date": "22/02/2023 12:25:17"},
            {"edition": "Ototo", "date": "06/01/2023 09:10:21"}
        ]
    };

    detailsSection.innerHTML = `
        <div class="details-content with-divider">
            <div class="chart">
                <div class="chart-title">Répartition des volumes par éditions</div>
                <canvas id="editionsChart"></canvas>
                <div class="chart-buttons">
                    <a href="#" onclick="selectAll()">Tout sélectionner</a>
                    <a href="#" onclick="deselectAll()">Tout désélectionner</a>
                </div>
            </div>
            <div class="table">
                <div class="table-title">Derniers ajouts</div>
                <table id="editionsTable">
                    <thead>
                        <tr>
                            <th>Édition</th>
                            <th>Date d'ajout</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.tableData.map(item => `
                            <tr>
                                <td>
                                    <div class="edition-container">
                                        <img src="../images/${item.edition.replace(/\s+/g, '')}.png" alt="${item.edition} logo" width="40">
                                        <span>${item.edition}</span>
                                    </div>
                                </td>
                                <td>${item.date}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const ctx = document.getElementById('editionsChart').getContext('2d');
    window.myPieChart = new Chart(ctx, {
        type: 'pie',
        data: data.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20 // Adjust this value to add more space between the chart and the legend
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20 // Adjust this value to add more space within the legend itself
                    }
                },
                title: {
                    display: false,
                    text: 'Volumes de Manga par Édition'
                },
                datalabels: {
                    color: '#000',
                    anchor: 'center',
                    align: 'center',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: function(value, context) {
                        const total = context.chart._metasets[0].total;
                        const percentage = (value * 100 / total).toFixed(2);
                        const label = context.chart.data.labels[context.dataIndex].toUpperCase();
                        return percentage >= 5 ? [percentage + '%', label] : '';
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Function to show details for Emplacements category
async function showDetailsEmplacements() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.remove('with-divider');

    detailsSection.innerHTML = `
        <div class="details-content">
            <table class="thick-border">
                <tr>
                    <th>Col 1</th>
                    <th>Col 2</th>
                    <th>Col 3</th>
                    <th>Col 4</th>
                </tr>
                <tr>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                </tr>
                <tr>
                    <td>Row 2</td>
                    <td>Row 2</td>
                    <td>Row 2</td>
                    <td>Row 2</td>
                </tr>
                <tr>
                    <td>Row 3</td>
                    <td>Row 3</td>
                    <td>Row 3</td>
                    <td>Row 3</td>
                </tr>
                <tr>
                    <td>Row 4</td>
                    <td>Row 4</td>
                    <td>Row 4</td>
                    <td>Row 4</td>
                </tr>
                <tr>
                    <td>Row 5</td>
                    <td>Row 5</td>
                    <td>Row 5</td>
                    <td>Row 5</td>
                </tr>
                <tr>
                    <td>Row 6</td>
                    <td>Row 6</td>
                    <td>Row 6</td>
                    <td>Row 6</td>
                </tr>
            </table>
            <div class="spacer"></div>
            <table class="thick-border">
                <tr>
                    <td>1x1 Content</td>
                </tr>
            </table>
            <div class="spacer"></div>
            <table class="thick-border">
                <tr>
                    <td>1x3 Content</td>
                </tr>
                <tr>
                    <td>1x3 Content</td>
                </tr>
                <tr>
                    <td>1x3 Content</td>
                </tr>
            </table>
        </div>
    `;
}

// Function to show details for Emplacements category
async function showDetailsvolumesmanga() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';

    detailsSection.innerHTML = `
        <div class="details-content">
            <table class="thick-border">
                <tr>
                    <th>Col 1</th>
                    <th>Col 2</th>
                    <th>Col 3</th>
                    <th>Col 4</th>
                </tr>
                <tr>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                    <td>Row 1</td>
                </tr>
                <tr>
                    <td>Row 2</td>
                    <td>Row 2</td>
                    <td>Row 2</td>
                    <td>Row 2</td>
                </tr>
                <tr>
                    <td>Row 3</td>
                    <td>Row 3</td>
                    <td>Row 3</td>
                    <td>Row 3</td>
                </tr>
                <tr>
                    <td>Row 4</td>
                    <td>Row 4</td>
                    <td>Row 4</td>
                    <td>Row 4</td>
                </tr>
                <tr>
                    <td>Row 5</td>
                    <td>Row 5</td>
                    <td>Row 5</td>
                    <td>Row 5</td>
                </tr>
                <tr>
                    <td>Row 6</td>
                    <td>Row 6</td>
                    <td>Row 6</td>
                    <td>Row 6</td>
                </tr>
            </table>
            <div class="spacer"></div>
            <table class="thick-border">
                <tr>
                    <td>1x1 Content</td>
                </tr>
            </table>
            <div class="spacer"></div>
            <table class="thick-border">
                <tr>
                    <td>1x3 Content</td>
                </tr>
                <tr>
                    <td>1x3 Content</td>
                </tr>
                <tr>
                    <td>1x3 Content</td>
                </tr>
            </table>
        </div>
    `;
}

// Function to show details for Factures category
async function showDetailsFactures() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.add('with-divider');

    const data = {
        chartData: {
            labels: ["<2020", "2020", "2021", "2022", "2023", "2024"],
            datasets: [{
                label: "Nombre de Factures par Année",
                data: [12, 15, 20, 25, 30, 22], // Example data
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                borderColor: "rgba(255, 206, 86, 1)",
                borderWidth: 1,
                hoverOffset: 5
            }]
        },
        tableData: [
            {"link": "#", "numero": "F20211101", "date": "01/11/2021", "acheteur": "ETHAN"},
            {"link": "#", "numero": "F20211015", "date": "15/10/2021", "acheteur": "LUCAS"},
            {"link": "#", "numero": "F20210930", "date": "30/09/2021", "acheteur": "OLIVIA"},
            {"link": "#", "numero": "F20210825", "date": "25/08/2021", "acheteur": "EMMA"},
            {"link": "#", "numero": "F20210720", "date": "20/07/2021", "acheteur": "NOAH"},
            {"link": "#", "numero": "F20210615", "date": "15/06/2021", "acheteur": "AVA"},
            {"link": "#", "numero": "F20210510", "date": "10/05/2021", "acheteur": "ISABELLA"},
            {"link": "#", "numero": "F20210405", "date": "05/04/2021", "acheteur": "MASON"},
            {"link": "#", "numero": "F20210301", "date": "01/03/2021", "acheteur": "LOGAN"},
            {"link": "#", "numero": "F20210215", "date": "15/02/2021", "acheteur": "SOPHIA"}
        ]
    };

    detailsSection.innerHTML = `
        <div class="details-content with-divider">
            <div class="chart">
                <div class="chart-title">Nombre de Factures par Année</div>
                <canvas id="facturesChart"></canvas>
            </div>
            <div class="table">
                <div class="table-title">Dernières Factures</div>
                <table id="facturesTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>N° Facture</th>
                            <th>Date</th>
                            <th>Acheteur</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.tableData.map(item => `
                            <tr>
                                <td><a href="${item.link}"><i class="fas fa-search"></i></a></td>
                                <td>${item.numero}</td>
                                <td>${item.date}</td>
                                <td>${item.acheteur}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="more-link">
                    <a href="factures.html">Plus de factures...</a>
                </div>
            </div>
        </div>
    `;

    const ctx = document.getElementById('facturesChart').getContext('2d');
    window.myBarChart = new Chart(ctx, {
        type: 'bar',
        data: data.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20 // Adjust this value to add more space between the chart and the legend
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20 // Adjust this value to add more space within the legend itself
                    }
                },
                title: {
                    display: false,
                    text: 'Nombre de Factures par Année'
                },
                datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value; // Show the actual value
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    max: 50 // Set max value to 50
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Function to show details for Acheteurs category
async function showDetailsAcheteurs() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.remove('with-divider');

    const data = {
        chartData: {
            labels: ["AMBRE", "ANAËLLE", "ANAÏS", "CAM&TIFF", "CHANTAL", "COLO", "DENISE", "DORIAN", "DUFOUR", "ETHAN", "GIGI", "KEM", "LUCAS", "MARABOO", "MATHIS", "MEHDI", "MOMO", "SANDRINE", "SARAH", "THEO"],
            datasets: [{
                label: "Nombre de Volumes par Acheteur",
                data: Array.from({ length: 20 }, () => Math.floor(Math.random() * 100)), // Random data
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB"
                ],
                borderColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB"
                ],
                borderWidth: 1,
                hoverOffset: 5
            }]
        }
    };

    detailsSection.innerHTML = `
        <div class="details-content">
            <div class="chart" style="flex: 1;">
                <div class="chart-title">Nombre de Volumes par Acheteur</div>
                <canvas id="acheteursChart"></canvas>
            </div>
        </div>
    `;

    const ctx = document.getElementById('acheteursChart').getContext('2d');
    window.myDonutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    bottom: 20 // Adjust this value to add more space between the chart and the legend
                }
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20 // Adjust this value to add more space within the legend itself
                    }
                },
                title: {
                    display: false,
                    text: 'Nombre de Volumes par Acheteur'
                },
                datalabels: {
                    color: '#000',
                    anchor: 'end',
                    align: 'end',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value; // Show the actual value
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

// Function to show details for Vendeurs category
async function showDetailsVendeurs() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.add('with-divider');

    const data = {
        vendeursData: [
            {label: "AMAZON", value: 120},
            {label: "AUCHAN", value: 85},
            {label: "BULLES DE PAPIER", value: 90},
            {label: "BULLES D'ENCRE", value: 60},
            {label: "CARREFOUR", value: 70},
            {label: "COMPTOIR DU RÊVE", value: 50},
            {label: "EBAY", value: 40},
            {label: "ETERNELLEMENT MANGA", value: 110},
            {label: "FESTIVAL INTERNATIONAL BD", value: 65},
            {label: "FNAC", value: 95},
            {label: "GEANT CASINO", value: 45},
            {label: "GIBERT-JOSEPH", value: 55},
            {label: "GORAKOU", value: 30},
            {label: "INOKU", value: 20},
            {label: "INTERMARCHE", value: 35},
            {label: "JAPAN EXPO", value: 75},
            {label: "LA CROGNOTE RIEUSE", value: 25},
            {label: "LA LICORNE", value: 80},
            {label: "L'ANTRE DU SNORGLEUX", value: 100},
            {label: "L'ARGONAUTE", value: 15},
            {label: "LEBONCOIN", value: 10},
            {label: "LECLERC", value: 105},
            {label: "LIBRAIRIE ARLES BD", value: 20},
            {label: "LIBRAIRIE CHARLEMAGNE", value: 50},
            {label: "LIBRAIRIE GOULARD", value: 45},
            {label: "L'IMAGERIE", value: 35},
            {label: "MAISON DU LIVRE", value: 55},
            {label: "MALRAUX", value: 65},
            {label: "MANGA POP'", value: 75},
            {label: "MICROMANIA", value: 85},
            {label: "OCCASION", value: 25},
            {label: "PAGE ET PLUME", value: 90},
            {label: "PIKA EDITION", value: 95},
            {label: "PLANETES INTERDITES", value: 40},
            {label: "RÊVE DE MANGA", value: 110},
            {label: "SAURAMPS (COMEDIE)", value: 50},
            {label: "SAURAMPS (ODYSSEUM)", value: 70},
            {label: "SUPER U", value: 45},
            {label: "TANUKIE", value: 35},
            {label: "VINTED", value: 60}
        ],
        villesData: [
            {label: "AIX-EN-PROVENCE (13)", value: 150},
            {label: "ANGOULÊME (16)", value: 125},
            {label: "ARLES (13)", value: 100},
            {label: "AVIGNON (84)", value: 80},
            {label: "BRIVE-LA-GAILLARDE (19)", value: 70},
            {label: "CABRIÈS (13)", value: 60},
            {label: "CAPESTANG (34)", value: 50},
            {label: "CAPHAN (13)", value: 40},
            {label: "FOS-SUR-MER (13)", value: 35},
            {label: "FRANCE", value: 200},
            {label: "ISTRES (13)", value: 30},
            {label: "JAPON", value: 25},
            {label: "LIMOGES (87)", value: 20},
            {label: "MARSEILLE (13)", value: 15},
            {label: "MARTIGUES (13)", value: 10},
            {label: "MONTBAZENS (12)", value: 5},
            {label: "MONTPELLIER (34)", value: 95},
            {label: "NÎMES (30)", value: 85},
            {label: "PARIS (75)", value: 105},
            {label: "POITIERS (86)", value: 90},
            {label: "RODEZ (12)", value: 75},
            {label: "SAINT-MARTIN-DE-CRAU (13)", value: 65},
            {label: "TOULON (83)", value: 55},
            {label: "TOULOUSE (31)", value: 45}
        ]
    };

    // Sort and select top 10 for each chart
    const top10Vendeurs = data.vendeursData.sort((a, b) => b.value - a.value).slice(0, 10);
    const top10Villes = data.villesData.sort((a, b) => b.value - a.value).slice(0, 10);

    detailsSection.innerHTML = `
        <div class="details-content with-divider">
            <div class="chart" style="flex: 1;">
                <div class="chart-title">Top 10 Vendeurs</div>
                <canvas id="vendeursChart"></canvas>
            </div>
            <div class="chart" style="flex: 1;">
                <div class="chart-title">Top 10 Villes</div>
                <canvas id="villesChart"></canvas>
            </div>
        </div>
    `;

    const ctxVendeurs = document.getElementById('vendeursChart').getContext('2d');
    const ctxVilles = document.getElementById('villesChart').getContext('2d');

    new Chart(ctxVendeurs, {
        type: 'doughnut',
        data: {
            labels: top10Vendeurs.map(item => item.label),
            datasets: [{
                data: top10Vendeurs.map(item => item.value),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left'
                },
                datalabels: {
                    color: '#000',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: (value, context) => value
                }
            }
        }
    });

    new Chart(ctxVilles, {
        type: 'doughnut',
        data: {
            labels: top10Villes.map(item => item.label),
            datasets: [{
                data: top10Villes.map(item => item.value),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                datalabels: {
                    color: '#000',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: (value, context) => value
                }
            }
        }
    });
}

// Function to show details for Auteurs category
async function showDetailsAuteurs() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';
    detailsSection.classList.remove('with-divider');

    const data = [
        { label: "Hajime Isayama", value: 120 },
        { label: "Eiichiro Oda", value: 85 },
        { label: "Akira Toriyama", value: 90 },
        { label: "Masashi Kishimoto", value: 60 },
        { label: "Tite Kubo", value: 70 },
        { label: "Yoshihiro Togashi", value: 50 },
        { label: "Tsugumi Ohba", value: 40 },
        { label: "Takeshi Obata", value: 110 },
        { label: "Hiromu Arakawa", value: 65 },
        { label: "Gege Akutami", value: 95 },
        // Add other authors with their values here
    ];

    const top10Auteurs = data.sort((a, b) => b.value - a.value).slice(0, 10);

    detailsSection.innerHTML = `
        <div class="details-content">
            <div class="chart" style="flex: 1;">
                <div class="chart-title">Top 10 Auteurs</div>
                <canvas id="auteursChart"></canvas>
            </div>
        </div>
    `;

    const ctxAuteurs = document.getElementById('auteursChart').getContext('2d');

    new Chart(ctxAuteurs, {
        type: 'pie',
        data: {
            labels: top10Auteurs.map(item => item.label),
            datasets: [{
                data: top10Auteurs.map(item => item.value),
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'left'
                },
                datalabels: {
                    color: '#000',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    formatter: (value, context) => value
                }
            }
        }
    });
}

// Function to show generic details for other categories
async function showGenericDetails(category) {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';

    detailsSection.innerHTML = `
        <div class="details-content">
            <div class="generic-details">
                Mettre ici les informations pour la catégorie <strong>${category}</strong>.
            </div>
        </div>
    `;
}

function selectAll() {
    window.myPieChart.data.datasets.forEach((dataset) => {
        dataset.data = [56, 72, 23, 2, 31, 0, 4]; // Use original data
    });
    window.myPieChart.update();
}

function deselectAll() {
    window.myPieChart.data.datasets.forEach((dataset) => {
        dataset.data = dataset.data.map(() => 0); // Set all data to 0
    });
    window.myPieChart.update();
}
