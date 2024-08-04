document.addEventListener('DOMContentLoaded', function() {
    fetchSeriesData();
});

function fetchSeriesData() {
    fetch('/api/series')
        .then(response => response.json())
        .then(series => {
            updateSeriesTable(series);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des séries:', error);
        });
}

function updateSeriesTable(series) {
    const tableBody = document.querySelector('#seriesTable tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    
    series.forEach(serie => {
        const row = document.createElement('tr');
        row.innerHTML = `
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
            <td>${serie.serie_id}</td>
            <td>${serie.serie_code}</td>
            <td>${serie.serie_name}</td>
            <td>${serie.public_name}</td>
            <td>${serie.publisher_name}</td>
            <td>${serie.author_scenario}</td>
            <td>${serie.author_mangaka}</td>
            <td>${serie.author_chara}</td>
            <td>${serie.author_histoire}</td>
            <td>${serie.release_status}</td>
            <td>${serie.country}</td>
            <td>${serie.vo_year}</td>
            <td>${serie.vf_year}</td>
        `;
        tableBody.appendChild(row);
    });
}
