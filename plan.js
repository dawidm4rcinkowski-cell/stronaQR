const employees = [
    {id: "pawel", name: "Paweł", dept: "KE"},
    {id: "michal", name: "Michał", dept: "KE"},
    {id: "natalia", name: "Natalia", dept: "POK"},
    {id: "magda", name: "Magda", dept: "POK"},
    {id: "jakub", name: "Jakub", dept: "IT"},
    {id: "adrian", name: "Adrian", dept: "IT"},
    {id: "dawid", name: "Dawid", dept: "IT"},
    {id: "darek", name: "Darek", dept: "IT"},
    {id: "lukasz", name: "Łukasz", dept: "AGD"},
    {id: "ilona", name: "Ilona", dept: "AGD"},
    {id: "ariel", name: "Ariel", dept: "RTV"}
];

let currentEditingId = null;
let selectedShiftType = "";

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function initPlan() {
    const tabsContainer = document.getElementById('monthSelector');
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    // Generowanie wszystkich 12 miesięcy roku 2026
    for (let m = 0; m < 12; m++) {
        const d = new Date(currentYear, m, 1);
        const monthLabel = d.toLocaleDateString('pl-PL', { month: 'long' }).toUpperCase();
        const value = `${currentYear}-${m}`;
        
        const tab = document.createElement('div');
        tab.className = `month-tab ${m === currentMonth ? 'active' : ''}`;
        tab.innerText = monthLabel;
        
        tab.onclick = () => {
            document.querySelectorAll('.month-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            generateTable(value);
        };
        tabsContainer.appendChild(tab);

        // Automatyczne przewinięcie do aktualnego miesiąca
        if (m === currentMonth) {
            setTimeout(() => {
                tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }, 100);
        }
    }

    // Nagłówki imion z awatarami w tabeli
    const nameRow = document.querySelector('.names-header');
    employees.forEach(emp => {
        const th = document.createElement('th');
        th.innerHTML = `
            <div class="header-avatar">${emp.name[0]}</div>
            <div class="name-label">${emp.name}</div>
        `;
        nameRow.appendChild(th);
    });

    generateTable(`${currentYear}-${currentMonth}`);
}

function generateTable(monthVal) {
    const tableBody = document.getElementById('tableBody');
    const [year, month] = monthVal.split('-').map(Number);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    tableBody.innerHTML = '';

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isSunday = date.getDay() === 0;
        const dayName = date.toLocaleDateString('pl-PL', { weekday: 'short' }).toUpperCase();
        
        const tr = document.createElement('tr');
        if (isSunday) tr.className = 'sun-row';

        let rowHtml = `<td class="sticky-col">${day} ${dayName}</td>`;
        
        employees.forEach(emp => {
            const cellId = `${emp.id}-${year}-${month}-${day}`;
            const saved = JSON.parse(localStorage.getItem(cellId)) || { text: '', task: '' };
            rowHtml += `<td id="${cellId}" class="${saved.task}" onclick="openEdit('${cellId}')">${saved.text}</td>`;
        });

        tr.innerHTML = rowHtml;
        tableBody.appendChild(tr);
    }
}

// MODAL LOGIC
function openEdit(id) {
    currentEditingId = id;
    const cell = document.getElementById(id);
    const modal = document.getElementById('editModal');
    const input = document.getElementById('shiftInput');
    
    selectedShiftType = cell.className;
    input.value = cell.innerText;
    modal.style.display = 'flex';
    input.focus();
}

function setShiftType(type) {
    // Resetuj wizualnie przyciski w modalu
    document.querySelectorAll('.type-selector button').forEach(btn => btn.style.borderColor = '#222');
    selectedShiftType = type;
    // Możesz dodać podświetlenie wybranego typu w modalu
}

function saveShift() {
    const text = document.getElementById('shiftInput').value;
    const cell = document.getElementById(currentEditingId);
    
    cell.innerText = text;
    cell.className = selectedShiftType;
    
    localStorage.setItem(currentEditingId, JSON.stringify({ text, task: selectedShiftType }));
    closeModal();
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

window.onload = initPlan;
