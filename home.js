// --- OBSŁUGA MENU BOCZNEGO (SIDEBAR) ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

// --- LOGIKA ZEGARA FLIP (EFEKT 3D) ---
function updateClock() {
    const now = new Date();
    updateFlipCard('hours', String(now.getHours()).padStart(2, '0'));
    updateFlipCard('minutes', String(now.getMinutes()).padStart(2, '0'));
    updateFlipCard('seconds', String(now.getSeconds()).padStart(2, '0'));
}

function updateFlipCard(id, value) {
    const card = document.getElementById(id);
    if (!card) return;

    const front = card.querySelector('.flip-front');
    const back = card.querySelector('.flip-back');
    
    if (front.innerText !== value) {
        back.innerText = value;
        card.classList.add('animate');
        
        setTimeout(() => {
            front.innerText = value;
            card.classList.remove('animate');
        }, 600);
    }
}

// --- SEKTY EKIPY (DZIAŁY IT / RTV / AGD) ---
const teamMembers = [
    { name: "KAMIL", dept: "IT", initial: "K" },
    { name: "MAREK", dept: "RTV", initial: "M" },
    { name: "ANNA", dept: "AGD", initial: "A" }
];

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return; // Zabezpieczenie, jeśli elementu nie ma na stronie

    grid.innerHTML = teamMembers.map(m => `
        <div class="member-card">
            <div class="avatar-placeholder">${m.initial}</div>
            <div class="m-info">
                <strong>${m.name}</strong>
                <span>${m.dept}</span>
            </div>
        </div>
    `).join('');
}

// --- INICJALIZACJA PO ZAŁADOWANIU STRONY ---
window.onload = () => {
    // Uruchom zegar co sekundę
    setInterval(updateClock, 1000);
    updateClock();
    
    // Wyświetl listę pracowników
    renderTeam();
};
