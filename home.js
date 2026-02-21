const inwaData = [
    { id: 1, name: "Myszki gamingowe", freq: "week" },
    { id: 2, name: "Słuchawki Truewireless", freq: "week" },
    { id: 3, name: "Smartfony", freq: "week" },
    { id: 4, name: "Słuchawki nauszne", freq: "2month" },
    { id: 5, name: "Konsole", freq: "2month" },
    { id: 6, name: "Android TV", freq: "2month" },
    { id: 7, name: "Tusze", freq: "month" },
    { id: 8, name: "Papier", freq: "month" },
    { id: 9, name: "Akcesoria do konsol", freq: "month" },
    { id: 10, name: "Akcesoria do golarek", freq: "month" }
];

let currentFilter = 'all';

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function filterInwa(filter, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = filter;
    renderList(filter);
}

function renderList(filter = 'all') {
    const container = document.getElementById('inwaList');
    if (!container) return;
    container.innerHTML = '';

    const filtered = inwaData.filter(item => filter === 'all' || item.freq === filter);

    filtered.forEach(item => {
        const saved = JSON.parse(localStorage.getItem(`inwa_v2_${item.id}`)) || { status: 'none', time: '' };
        
        const card = document.createElement('div');
        card.className = `inwa-card ${saved.status === 'pending' ? 'pending' : ''}`;

        card.innerHTML = `
            <div class="inwa-info">
                <h3>${item.name}</h3>
                <p>${item.freq === '2month' ? 'DWA RAZY W MIESIĄCU' : item.freq.toUpperCase()} ${saved.time ? '| ' + saved.time : ''}</p>
            </div>
            <button class="done-btn" onclick="submitInwa(${item.id})">
                ${saved.status === 'pending' ? 'OCZEKUJE NA ZATWIERDZENIE' : 'WYKONAŁEM'}
            </button>
        `;
        container.appendChild(card);
    });
}

function submitInwa(id) {
    const saved = JSON.parse(localStorage.getItem(`inwa_v2_${id}`)) || { status: 'none', time: '' };
    if (saved.status === 'pending') return;

    const now = new Date();
    const timeStr = now.toLocaleDateString('pl-PL') + ' ' + now.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});

    const newData = { status: 'pending', time: timeStr };
    localStorage.setItem(`inwa_v2_${id}`, JSON.stringify(newData));
    
    renderList(currentFilter);
}

function changeMonth() {
    const val = document.getElementById('monthSelect').value;
    alert("Przełączono na widok: " + val + ". (Logika archiwum zostanie podpięta pod bazę danych)");
    // Tutaj w przyszłości dodamy pobieranie danych z konkretnego miesiąca z serwera
}

// Inicjalizacja
window.onload = () => renderList('all');
