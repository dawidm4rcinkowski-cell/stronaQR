// --- OBSŁUGA MENU ---
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// --- TWOJA AKTUALNA LISTA PRACOWNIKÓW ---
const employees = [
    "Pawel - ME",
    "Michal - KSS",
    "Magdalena - POK",
    "Natalia - POK",
    "Dawid - IT",
    "Kuba - IT",
    "Adrian - IT",
    "Darek - IT",
    "Ilona - AGD",
    "Lukasz - AGD",
    "Ariel - RTV"
];

const daysInMonth = 28; // Luty 2026

function initPlan() {
    const headerRow = document.getElementById('headerRow');
    const scheduleBody = document.getElementById('scheduleBody');
    if (!headerRow || !scheduleBody) return;

    // 1. Generowanie nagłówków dni (1-28)
    const sumTh = headerRow.querySelector('.sum-col');
    // Czyścimy stare nagłówki jeśli istnieją (poza Pracownikiem i Sumą)
    const existingDays = headerRow.querySelectorAll('th:not(.sticky-col):not(.sum-col)');
    existingDays.forEach(day => day.remove());

    for (let i = 1; i <= daysInMonth; i++) {
        const th = document.createElement('th');
        th.innerText = i;
        headerRow.insertBefore(th, sumTh);
    }

    // 2. Generowanie wierszy dla Twojego zespołu
    scheduleBody.innerHTML = ''; // Czyścimy tabelę przed generowaniem
    employees.forEach(emp => {
        const tr = document.createElement('tr');
        
        // Kolumna z imieniem i działem (Sticky)
        let rowHtml = `<td class="sticky-col">${emp}</td>`;
        
        // Komórki na godziny
        for (let i = 1; i <= daysInMonth; i++) {
            const storageKey = `plan-${emp}-${i}`;
            const savedVal = localStorage.getItem(storageKey) || "";
            rowHtml += `
                <td>
                    <input type="text" 
                           value="${savedVal}" 
                           placeholder="-"
                           onchange="saveHour('${emp}', ${i}, this.value)">
                </td>`;
        }
        
        // Kolumna sumy
        rowHtml += `<td class="sum-col" id="sum-${emp}">0</td>`;
        
        tr.innerHTML = rowHtml;
        scheduleBody.appendChild(tr);
        calculateSum(emp);
    });
}

// --- LOGIKA ZAPISU I LICZENIA ---
function saveHour(emp, day, value) {
    localStorage.setItem(`plan-${emp}-${day}`, value);
    calculateSum(emp);
}

function calculateSum(emp) {
    let total = 0;
    for (let i = 1; i <= daysInMonth; i++) {
        const val = localStorage.getItem(`plan-${emp}-${i}`);
        if (val) {
            // Zamiana przecinka na kropkę dla poprawnych obliczeń (np. 7,5 -> 7.5)
            const num = parseFloat(val.replace(',', '.'));
            if (!isNaN(num)) total += num;
        }
    }
    const sumElement = document.getElementById(`sum-${emp}`);
    if (sumElement) {
        // Zaokrąglamy do 2 miejsc po przecinku, żeby nie było błędów typu 15.000000002
        sumElement.innerText = Math.round(total * 100) / 100;
    }
}

// Inicjalizacja przy ładowaniu strony
window.onload = initPlan;
