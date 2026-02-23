function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function updateClock() {
    const now = new Date();
    updateFlipCard('hours', String(now.getHours()).padStart(2, '0'));
    updateFlipCard('minutes', String(now.getMinutes()).padStart(2, '0'));
    updateFlipCard('seconds', String(now.getSeconds()).padStart(2, '0'));
}

function updateFlipCard(id, value) {
    const card = document.getElementById(id);
    if (!card) return; // Jeśli nie znajdzie ID, nie wywala błędu

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

const teamMembers = [
    { name: "KAMIL", dept: "IT", initial: "K" },
    { name: "MAREK", dept: "RTV", initial: "M" },
    { name: "ANNA", dept: "AGD", initial: "A" }
];

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) {
        console.log("Błąd: Nie znaleziono kontenera teamGrid!");
        return;
    }

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

// Start wszystkiego po załadowaniu
window.onload = () => {
    console.log("Strona załadowana, home.js startuje...");
    setInterval(updateClock, 1000);
    updateClock();
    renderTeam();
};
