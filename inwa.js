function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

const inventoryData = {
    IT: {
        weekly: ["Smartfony", "Słuchawki truewireless", "Myszki gamingowe"],
        twoWeeks: ["Słuchawki nauszne"],
        monthly: ["Tusze", "Papier", "Głośniki mobilne", "Słuchawki douszne", "Smartbandy", "Smartwatche", "Folie ochronne", "Dyski PSSD", "Dyski SSD M.2 NVME", "Dyski SSD SATA", "Dyski zewnętrzne", "Słuchawki gamingowe", "Nośniki logistyczne"]
    },
    RTV: {
        weekly: [], // RTV nie ma tygodniowych
        twoWeeks: ["Konsole", "Android TV", "Alkomaty", "Wideorejestratory"],
        monthly: ["Akcesoria do konsol", "Komunikatory drogowe", "Kamery sportowe", "Nawigacje"]
    },
    AGD: {
        weekly: [], // AGD nie ma tygodniowych
        twoWeeks: [], // AGD nie ma 2-tygodniowych
        monthly: ["Akcesoria do golarek", "Depilatory świetlne", "Szczoteczki", "Trymery", "Urządzenia do pielęgnacji twarzy i ciała", "Akcesoria do urządzeń SODASTREAM", "Kawa ziarnista", "Kawa w kapsułkach", "Syropy"]
    }
};

function switchDept(dept) {
    // Aktualizacja przycisków tabów
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.includes(dept)) btn.classList.add('active');
    });

    const gridW = document.getElementById('gridWeekly');
    const grid2W = document.getElementById('grid2Weeks');
    const gridM = document.getElementById('gridMonthly');

    // Renderowanie i sterowanie widocznością sekcji
    renderSection(gridW, inventoryData[dept].weekly, 'secWeekly');
    renderSection(grid2W, inventoryData[dept].twoWeeks, 'secTwoWeeks');
    renderSection(gridM, inventoryData[dept].monthly, 'secMonthly');
}

function renderSection(grid, data, sectionId) {
    const section = document.getElementById(sectionId);
    if (data.length === 0) {
        section.style.display = 'none';
    } else {
        section.style.display = 'block';
        grid.innerHTML = data.map(item => `
            <div class="item-card">
                <h3>${item}</h3>
                <div class="status-row">
                    <div class="dot"></div>
                    <span>DO SPRAWDZENIA</span>
                </div>
                <button class="approve-btn">Zatwierdź</button>
            </div>
        `).join('');
    }
}

// Inicjalizacja na starcie
window.onload = () => switchDept('IT');
