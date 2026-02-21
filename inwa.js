const inwaData = [
    // DZIAŁ IT
    { id: 1, name: "Myszki gamingowe", freq: "week", dept: "it" },
    { id: 2, name: "Słuchawki Truewireless", freq: "week", dept: "it" },
    { id: 3, name: "Smartfony", freq: "week", dept: "it" },
    { id: 4, name: "Słuchawki nauszne", freq: "2month", dept: "it" },
    { id: 5, name: "Tusze i Papier", freq: "month", dept: "it" },
    // DZIAŁ RTV
    { id: 6, name: "Telewizory powyżej 55", freq: "week", dept: "rtv" },
    { id: 7, name: "Soundbary", freq: "2month", dept: "rtv" },
    { id: 8, name: "Konsole i Gry", freq: "2month", dept: "rtv" },
    { id: 9, name: "Akcesoria RTV", freq: "month", dept: "rtv" },
    // DZIAŁ AGD
    { id: 10, name: "Ekspresy do kawy", freq: "week", dept: "agd" },
    { id: 11, name: "Szczoteczki elektryczne", freq: "week", dept: "agd" },
    { id: 12, name: "Golarki i Trymery", freq: "2month", dept: "agd" },
    { id: 13, name: "Odkurzacze pionowe", freq: "month", dept: "agd" }
];

let currentDept = 'it';

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
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

// Funkcja generująca unikalny klucz dla miesiąca
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
