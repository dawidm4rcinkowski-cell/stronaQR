const employees = [
    { name: "Pawel", dept: "ME" },
    { name: "Michal", dept: "KSS" },
    { name: "Magdalena", dept: "POK" },
    { name: "Natalia", dept: "POK" },
    { name: "Dawid", dept: "IT" },
    { name: "Kuba", dept: "IT" },
    { name: "Adrian", dept: "IT" },
    { name: "Darek", dept: "IT" },
    { name: "Ilona", dept: "AGD" },
    { name: "Lukasz", dept: "AGD" },
    { name: "Ariel", dept: "RTV" }
];

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (!grid) return;
    grid.innerHTML = '';

    employees.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        
        // Pobieramy pierwszą literę imienia do "avatara"
        const initial = emp.name.charAt(0);

        card.innerHTML = `
            <div class="emp-avatar">${initial}</div>
            <h3>${emp.name}</h3>
            <div class="emp-dept">${emp.dept}</div>
            <div class="emp-status">KLIKNIJ ABY ZOBACZYĆ PLAN</div>
        `;

        // Kliknięcie w pracownika przenosi do planu pracy
        card.onclick = () => window.location.href = 'plan.html';
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTeam();
    document.getElementById('overlay').addEventListener('click', toggleMenu);
});
