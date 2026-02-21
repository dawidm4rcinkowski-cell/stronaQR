// Dane na podstawie Twojego arkusza Google
const inwaData = [
    { id: 1, name: "Myszki gamingowe", dept: "it", freq: "week" },
    { id: 2, name: "Słuchawki Truewireless", dept: "it", freq: "week" },
    { id: 3, name: "Smartfony", dept: "it", freq: "week" },
    { id: 4, name: "Słuchawki nauszne", dept: "it", freq: "2month" },
    { id: 5, name: "Konsole", dept: "rtv", freq: "2month" },
    { id: 6, name: "Android TV", dept: "rtv", freq: "2month" },
    { id: 7, name: "Tusze", dept: "it", freq: "month" },
    { id: 8, name: "Papier", dept: "it", freq: "month" },
    { id: 9, name: "Akcesoria do konsol", dept: "rtv", freq: "month" },
    { id: 10, name: "Akcesoria do golarek", dept: "agd", freq: "month" },
    { id: 11, name: "Depilatory świetlne", dept: "agd", freq: "month" },
    { id: 12, name: "Szczoteczki", dept: "agd", freq: "month" }
];

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function filterInwa(filter) {
    // Aktualizacja przycisków
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    renderList(filter);
}

function renderList(filter = 'all') {
    const container = document.getElementById('inwaList');
    container.innerHTML = '';

    const filtered = inwaData.filter(item => filter === 'all' || item.freq === filter);

    filtered.forEach(item => {
        const savedData = JSON.parse(localStorage.getItem(`inwa_${item.id}`)) || { done: false, date: '' };
        
        const card = document.createElement('div');
        card.className = `inwa-card ${item.dept} ${savedData.done ? 'done' : ''}`;
        card.onclick = () => toggleDone(item.id);

        card.innerHTML = `
            <div class="inwa-info">
                <h3>${item.name}</h3>
                <p>${item.freq.toUpperCase()} | ${savedData.date || 'NIEWYKONANO'}</p>
            </div>
            <div class="status-box"></div>
        `;
        container.appendChild(card);
    });
}

function toggleDone(id) {
    const savedData = JSON.parse(localStorage.getItem(`inwa_${id}`)) || { done: false, date: '' };
    const now = new Date();
    const dateStr = now.toLocaleDateString('pl-PL') + ' ' + now.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});

    const newData = {
        done: !savedData.done,
        date: !savedData.done ? dateStr : ''
    };

    localStorage.setItem(`inwa_${id}`, JSON.stringify(newData));
    renderList(document.querySelector('.filter-btn.active').innerText.toLowerCase().replace(' ', '')); // Odśwież widok
    
    // Mały trik, żeby odświeżanie filtrów działało poprawnie
    location.reload(); 
}

// Start
window.onload = () => renderList('all');
