function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const inventoryData = {
    IT: {
        twoWeeks: ["Słuchawki nauszne"],
        monthly: ["Tusze", "Papier", "Głośniki mobilne", "Słuchawki douszne", "Smartbandy", "Smartwatche", "Folie ochronne", "Dyski PSSD", "Dyski SSD M.2 NVME", "Dyski SSD SATA", "Dyski zewnętrzne", "Słuchawki gamingowe", "Nośniki logistyczne"]
    },
    RTV: {
        twoWeeks: ["Konsole", "Android TV", "Alkomaty", "Wideorejestratory"],
        monthly: ["Akcesoria do konsol", "Komunikatory drogowe", "Kamery sportowe", "Nawigacje"]
    },
    AGD: {
        twoWeeks: [], // AGD nie ma 2-tygodniowych
        monthly: ["Akcesoria do golarek", "Depilatory świetlne", "Szczoteczki", "Trymery", "Urządzenia do pielęgnacji twarzy i ciała", "Akcesoria do urządzeń SODASTREAM", "Kawa ziarnista", "Kawa w kapsułkach", "Syropy"]
    }
};

function switchDept(dept) {
    // Aktualizacja przycisków
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const grid2W = document.getElementById('grid2Weeks');
    const gridM = document.getElementById('gridMonthly');

    // Renderowanie kart
    grid2W.innerHTML = inventoryData[dept].twoWeeks.map(item => createCard(item)).join('');
    gridM.innerHTML = inventoryData[dept].monthly.map(item => createCard(item)).join('');
}

function createCard(title) {
    return `
        <div class="item-card">
            <h3>${title}</h3>
            <div class="status-row">
                <div class="dot"></div>
                <span>DO SPRAWDZENIA</span>
            </div>
            <button class="approve-btn">Zatwierdź</button>
        </div>
    `;
}

// Start
window.onload = () => switchDept('IT');
