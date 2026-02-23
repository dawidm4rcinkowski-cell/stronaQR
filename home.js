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

    employees.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'employee-card';
        card.innerHTML = `
            <div class="emp-avatar">${emp.name.charAt(0)}</div>
            <h3 style="font-weight:900; font-size:1rem;">${emp.name}</h3>
            <div class="emp-dept">${emp.dept}</div>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTeam();
    document.getElementById('overlay').addEventListener('click', toggleMenu);
});
