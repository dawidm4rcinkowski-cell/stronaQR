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

const teamMembers = [
    { name: "PAWEŁ", dept: "ME", initial: "P" },
    { name: "MICHAŁ", dept: "KSS", initial: "M" },
    { name: "MAGDALENA", dept: "POK", initial: "M" },
    { name: "NATALIA", dept: "POK", initial: "N" },
    { name: "DAWID", dept: "IT", initial: "D" },
    { name: "KUBA", dept: "IT", initial: "K" },
    { name: "ADRIAN", dept: "IT", initial: "A" },
    { name: "DAREK", dept: "IT", initial: "D" },
    { name: "ILONA", dept: "AGD", initial: "I" },
    { name: "ŁUKASZ", dept: "AGD", initial: "Ł" },
    { name: "ARIEL", dept: "RTV", initial: "A" }
];

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    grid.innerHTML = teamMembers.map(m => `
        <div class="member-card">
            <div class="avatar-circle">${m.initial}</div>
            <div class="m-info">
                <strong>${m.name}</strong>
                <span>${m.dept}</span>
            </div>
        </div>
    `).join('');
}

window.onload = () => {
    setInterval(updateClock, 1000);
    updateClock();
    renderTeam();
};
