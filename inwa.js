const inwaData = [
    // --- DZIAŁ IT ---
    // Tygodniowe
    { id: 1, name: "Smartfony", freq: "week", dept: "it" },
    { id: 2, name: "Słuchawki Truewireless", freq: "week", dept: "it" },
    { id: 3, name: "Myszki gamingowe", freq: "week", dept: "it" },
    // 2-Tygodniowe
    { id: 4, name: "Słuchawki nauszne", freq: "2month", dept: "it" },
    // Miesięczne
    { id: 5, name: "Tusze", freq: "month", dept: "it" },
    { id: 6, name: "Papier", freq: "month", dept: "it" },
    { id: 7, name: "Głośniki mobilne", freq: "month", dept: "it" },
    { id: 8, name: "Słuchawki douszne", freq: "month", dept: "it" },
    { id: 9, name: "Smartbandy", freq: "month", dept: "it" },
    { id: 10, name: "Smartwatche", freq: "month", dept: "it" },
    { id: 11, name: "Folie ochronne", freq: "month", dept: "it" },
    { id: 12, name: "Dyski PSSD", freq: "month", dept: "it" },
    { id: 13, name: "Dyski SSD M.2 NVME", freq: "month", dept: "it" },
    { id: 14, name: "Dyski SSD SATA", freq: "month", dept: "it" },
    { id: 15, name: "Dyski zewnętrzne", freq: "month", dept: "it" },
    { id: 16, name: "Słuchawki gamingowe", freq: "month", dept: "it" },
    { id: 17, name: "Nośniki logistyczne", freq: "month", dept: "it" },

    // --- DZIAŁ RTV ---
    // 2-Tygodniowe
    { id: 18, name: "Konsole", freq: "2month", dept: "rtv" },
    { id: 19, name: "Android TV", freq: "2month", dept: "rtv" },
    { id: 20, name: "Alkomaty", freq: "2month", dept: "rtv" },
    { id: 21, name: "Wideorejestratory", freq: "2month", dept: "rtv" },
    // Miesięczne
    { id: 22, name: "Akcesoria do konsol", freq: "month", dept: "rtv" },
    { id: 23, name: "Komunikatory drogowe", freq: "month", dept: "rtv" },
    { id: 24, name: "Kamery sportowe", freq: "month", dept: "rtv" },
    { id: 25, name: "Nawigacje", freq: "month", dept: "rtv" },

    // --- DZIAŁ AGD ---
    // Miesięczne
    { id: 26, name: "Akcesoria do golarek", freq: "month", dept: "agd" },
    { id: 27, name: "Depilatory świetlne", freq: "month", dept: "agd" },
    { id: 28, name: "Szczoteczki", freq: "month", dept: "agd" },
    { id: 29, name: "Trymery", freq: "month", dept: "agd" },
    { id: 30, name: "Urządzenia do pielęgnacji twarzy i ciała", freq: "month", dept: "agd" },
    { id: 31, name: "Akcesoria do urządzeń SODASTREAM", freq: "month", dept: "agd" },
    { id: 32, name: "Kawa ziarnista", freq: "month", dept: "agd" },
    { id: 33, name: "Kawa w kapsułkach", freq: "month", dept: "agd" },
    { id: 34, name: "Syropy", freq: "month", dept: "agd" }
];

let currentDept = 'it';

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function filterDept(dept, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDept = dept;
    renderList();
}

function changeMonth() {
    renderList();
}

function getStorageKey(id) {
    const month = document.getElementById('monthSelect').value;
    return `inwa_${month}_${id}`;
}

function renderList() {
    const container = document.getElementById('inwaList');
    if (!container) return;
    container.innerHTML = '';

    const timeFrames = [
        { key: 'week', label: 'Inwentury Cotygodniowe' },
        { key: '2month', label: 'Dwa razy w miesiącu' },
        { key: 'month', label: 'Raz w miesiącu' }
    ];

    timeFrames.forEach(frame => {
        const filteredItems = inwaData.filter(item => item.dept === currentDept && item.freq === frame.key);
        
        if (filteredItems.length > 0) {
            const header = document.createElement('div');
            header.className = 'time-group-header';
            header.innerText = frame.label;
            container.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'inwa-grid';

            filteredItems.forEach(item => {
                const storageKey = getStorageKey(item.id);
                const saved = JSON.parse(localStorage.getItem(storageKey)) || { status: 'none', time: '' };
                
                const card = document.createElement('div');
                card.className = `inwa-card ${saved.status === 'pending' ? 'pending' : ''}`;
                card.innerHTML = `
                    <div class="inwa-info">
                        <h3>${item.name}</h3>
                        <p>${saved.time ? '📅 ' + saved.time : '🔴 DO ZROBIENIA'}</p>
                    </div>
                    <button class="done-btn" onclick="submitInwa(${item.id})">
                        ${saved.status === 'pending' ? 'COFNIJ' : 'WYKONAŁEM'}
                    </button>
                `;
                grid.appendChild(card);
            });
            container.appendChild(grid);
        }
    });
}

function submitInwa(id) {
    const storageKey = getStorageKey(id);
    const saved = JSON.parse(localStorage.getItem(storageKey)) || { status: 'none', time: '' };
    
    if (saved.status === 'pending') {
        if (confirm("Czy chcesz cofnąć zgłoszenie?")) {
            localStorage.removeItem(storageKey);
            renderList();
        }
        return;
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString('pl-PL') + ' ' + now.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});
    localStorage.setItem(storageKey, JSON.stringify({ status: 'pending', time: timeStr }));
    renderList();
}

window.onload = () => renderList();
