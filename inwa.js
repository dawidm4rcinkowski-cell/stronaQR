// Baza danych inwentur (możesz tu dopisywać kolejne pozycje)
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

// Funkcja obsługi menu bocznego
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Obsługa filtrów (Tydzień, Miesiąc itd.)
function filterInwa(filter, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = filter;
    renderList(filter);
}

// Funkcja zmiany miesiąca (Archiwum)
function changeMonth() {
    const val = document.getElementById('monthSelect').value;
    console.log("Wybrano miesiąc archiwalny: " + val);
    // Tutaj w przyszłości dodamy ładowanie danych historycznych
    renderList(currentFilter); 
}

// Główna funkcja generująca listę kart
function renderList(filter = 'all') {
    const container = document.getElementById('inwaList');
    if (!container) return;
    container.innerHTML = '';

    const filtered = inwaData.filter(item => filter === 'all' || item.freq === filter);

    filtered.forEach(item => {
        const saved = JSON.parse(localStorage.getItem(`inwa_v2_${item.id}`)) || { status: 'none', time: '' };
        
        const card = document.createElement('div');
        card.className = `inwa-card ${saved.status === 'pending' ? 'pending' : ''}`;

        // Mapowanie nazw częstotliwości na ładne etykiety
        let freqLabel = item.freq.toUpperCase();
        if(item.freq === '2month') freqLabel = "DWA RAZY W MIESIĄCU";
        if(item.freq === 'week') freqLabel = "RAZ W TYGODNIU";
        if(item.freq === 'month') freqLabel = "RAZ W MIESIĄCU";

        card.innerHTML = `
            <div class="inwa-info">
                <h3>${item.name}</h3>
                <p>${freqLabel} ${saved.time ? '| ' + saved.time : ''}</p>
            </div>
            <button class="done-btn" onclick="submitInwa(${item.id})">
                ${saved.status === 'pending' ? 'OCZEKUJE NA ZATWIERDZENIE (KLIKNIJ ABY COFNĄĆ)' : 'WYKONAŁEM'}
            </button>
        `;
        container.appendChild(card);
    });
}

// Funkcja obsługująca przycisk akcji
function submitInwa(id) {
    const saved = JSON.parse(localStorage.getItem(`inwa_v2_${id}`)) || { status: 'none', time: '' };
    
    // LOGIKA COFANIA: Jeśli status to "pending", drugie kliknięcie resetuje kartę
    if (saved.status === 'pending') {
        const confirmReset = confirm("Czy chcesz cofnąć zgłoszenie do zatwierdzenia?");
        if (confirmReset) {
            localStorage.removeItem(`inwa_v2_${id}`);
            renderList(currentFilter);
        }
        return;
    }

    // LOGIKA ZATWIERDZANIA: Pierwsze kliknięcie ustawia status na "pending"
    const now = new Date();
    const timeStr = now.toLocaleDateString('pl-PL') + ' ' + now.toLocaleTimeString('pl-PL', {
        hour: '2-digit', 
        minute: '2-digit'
    });

    const newData = { 
        status: 'pending', 
        time: timeStr 
    };

    localStorage.setItem(`inwa_v2_${id}`, JSON.stringify(newData));
    
    // Powiadomienie w konsoli (pod przyszły system dla Kierownika)
    console.log(`Inwentura ID:${id} wysłana do bazy. Czeka na KSS.`);
    
    renderList(currentFilter);
}

// Uruchomienie listy przy starcie strony
window.onload = () => {
    renderList('all');
};
