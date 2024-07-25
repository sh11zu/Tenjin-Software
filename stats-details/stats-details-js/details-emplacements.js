// details-emplacements.js
async function showDetailsEmplacements() {
    const detailsSection = document.getElementById('details-section');
    const detailsSubtitle = document.getElementById('details-subtitle');

    detailsSection.style.display = 'block'; // Ensure the section is visible
    detailsSubtitle.style.display = 'block'; // Ensure the subtitle is visible

    // Clear previous content
    detailsSection.innerHTML = '';

    detailsSection.innerHTML = `
        <div class="details-content">
            <div class="emplacements-tables">
                <table class="thick-border">
                    <thead>
                        <tr>
                            <th>Colonne 1</th>
                            <th>Colonne 2</th>
                            <th>Colonne 3</th>
                            <th>Colonne 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                        <tr><td>Données 1</td><td>Données 2</td><td>Données 3</td><td>Données 4</td></tr>
                    </tbody>
                </table>
                <div class="spacer"></div>
                <table class="thick-border">
                    <tbody>
                        <tr><td>Donnée unique</td></tr>
                    </tbody>
                </table>
                <div class="spacer"></div>
                <table class="thick-border">
                    <tbody>
                        <tr><td>Info 1</td></tr>
                        <tr><td>Info 2</td></tr>
                        <tr><td>Info 3</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}
