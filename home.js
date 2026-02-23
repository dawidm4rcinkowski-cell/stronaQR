function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

const employees = [
    "Pawel - ME", "Michal - KSS", "Magdalena - POK", "Natalia - POK",
    "Dawid - IT", "Kuba - IT", "Adrian - IT", "Darek - IT",
    "Ilona - AGD", "Lukasz - AGD", "Ariel - RTV"
];

const daysInMonth = 28; // Luty 2026

function initPlan() {
    const headerRow = document.getElementById('headerRow');
    const scheduleBody = document.getElementById('scheduleBody');
    if (!headerRow || !scheduleBody) return;

    // Dodawanie numerów dni do nagłówka
    const sumTh = headerRow.querySelector('.sum-col');
    for (let i = 1; i <= daysInMonth; i++) {
        const th = document.createElement('th');
        th.innerText = i;
        headerRow.insertBefore(th, sumTh);
    }

    // Generowanie wierszy pracowników
    employees.forEach(emp => {
        const tr = document.createElement('tr');
        let rowHtml = `<td class="sticky-col">${emp}</td>`;
        
        for (let i = 1; i <= daysInMonth; i++) {
            const storageKey = `plan-${emp}-${i}`;
            const savedVal = localStorage.getItem(storageKey) || "";
            rowHtml += `<td><input type="text" value="${savedVal}" onchange="saveHour('${emp}', ${i}, this.value)"></td>`;
        }
        
        rowHtml += `<td class="sum-col" id="sum-${emp}">0</td>`;
        tr.innerHTML = rowHtml;
        scheduleBody.appendChild(tr);
        calculateSum(emp);
    });
}

function saveHour(emp, day, value) {
    localStorage.setItem(`plan-${emp}-${day}`, value);
    calculateSum(emp);
}

function calculateSum(emp) {
    let total = 0;
    for (let i = 1; i <= daysInMonth; i++) {
        const val = localStorage.getItem(`plan-${emp}-${i}`);
        if (val) {
            const num = parseFloat(val.replace(',', '.'));
            if (!isNaN(num)) total += num;
        }
    }
    const sumEl = document.getElementById(`sum-${emp}`);
    if (sumEl) sumEl.innerText = Math.round(total * 100) / 100;
}

window.onload = initPlan;
