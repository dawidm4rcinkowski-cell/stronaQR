// --- OBSŁUGA SIDEBARU ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// --- ZEGAR FLIP (EFEKT 3D) ---
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    updateFlipCard('hours', hours);
    updateFlipCard('minutes', minutes);
    updateFlipCard('seconds', seconds);
}

function updateFlipCard(id, value) {
    const card = document.getElementById(id);
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

// --- DANE EKIPY (Przykładowe - możesz edytować) ---
const teamMembers = [
    { name: "Kamil", dept: "IT", initial: "K" },
    { name: "Marek", dept: "RTV", initial: "M" },
    { name: "Ania", dept: "AGD", initial: "A" },
    { name: "Piotr", dept: "IT", initial: "P" },
    { name: "Ewa", dept: "RTV", initial: "E" },
    { name: "Tomek", dept: "AGD", initial: "T" }
];

function renderTeam() {
    const teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return; // Jeśli nie ma tego elementu na danej podstronie, nie rób nic

    teamGrid.innerHTML = teamMembers.map(member => `
        <div class="member-card">
            <div class="avatar-placeholder">${member.initial}</div>
            <div class="m-info">
                <strong>${member.name}</strong>
                <span>${member.dept}</span>
            </div>
        </div>
    `).join('');
}

// --- INICJALIZACJA ---
window.onload = () => {
    // Uruchom zegar
    if (document.getElementById('hours')) {
        setInterval(updateClock, 1000);
        updateClock();
    }
    
    // Wyświetl ekipę
    renderTeam();
};
