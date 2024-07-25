// details-editions.js
async function showDetailsEditions() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';

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
        <div class="details-content">
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
                                        <img src="images/${item.edition.replace(/\s+/g, '')}.png" alt="${item.edition} logo" width="40">
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
