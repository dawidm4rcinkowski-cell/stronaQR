// --- ZMIENNE GLOBALNE ---
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];

// --- OBSŁUGA MENU ---
function toggleMenu() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
}

// --- ZEGAR I DASHBOARD ---
function initDashboard() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateEl = document.getElementById('currentDateDisplay');
    if(dateEl) dateEl.innerText = now.toLocaleDateString('pl-PL', options);
    
    setInterval(() => {
        const d = new Date();
        const h = document.getElementById('hours'), m = document.getElementById('minutes'), s = document.getElementById('seconds');
        if(h) h.innerText = d.getHours().toString().padStart(2, '0');
        if(m) m.innerText = d.getMinutes().toString().padStart(2, '0');
        if(s) s.innerText = d.getSeconds().toString().padStart(2, '0');
    }, 1000);
}

// --- LOGIKA GENERATORA KODU QR ---
function copyQR() {
    const order = document.getElementById('ord_input').value;
    const pin = document.getElementById('pin_input').value;
    const status = document.getElementById('copy-status');

    if(!order || !pin) {
        alert("Wpisz numer zamówienia i PIN!");
        return;
    }

    // Tworzenie finalnego ciągu tekstowego
    const finalString = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${order}" , "pin" : "${pin}" }`;

    // Kopiowanie do schowka
    navigator.clipboard.writeText(finalString).then(() => {
        status.innerText = "SKOPIOWANO DO SCHOWKA!";
        addToHistory(order);
        
        // Czyszczenie komunikatu po 3 sekundach
        setTimeout(() => { status.innerText = ""; }, 3000);
    });
}

function addToHistory(orderNum) {
    const historyList = document.getElementById('qr-history-list');
    if(!historyList) return;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');

    const row = document.createElement('div');
    row.className = 'history-row';
    row.innerHTML = `
        <span class="h-val-code">${orderNum}</span>
        <span class="h-val-time">${timeStr}</span>
        <span class="h-val-action"><button onclick="this.parentElement.parentElement.remove()">USUŃ</button></span>
    `;

    // Dodaj na górę listy
    historyList.prepend(row);

    // Ograniczenie historii do 5 wpisów
    if(historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// --- LOGIKA PLANU PRACY ---
function initMonths() {
    const sel = document.getElementById('monthSelect');
    if(!sel) return;
    sel.innerHTML = '';
    months.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i; opt.innerHTML = m + " 2026";
        if(i === 1) opt.selected = true;
        sel.appendChild(opt);
    });
}

function changeTask(el, day, col) {
    const classes = ["", "task-social", "task-klucze", "task-dostawa"];
    let currentClass = "";
    classes.forEach(c => { if(el.classList.contains(c)) currentClass = c; });
    let nextIndex = (classes.indexOf(currentClass) + 1) % classes.length;
    el.classList.remove(...classes;
    if(classes[nextIndex] !== "") el.classList.add(classes[nextIndex]);
}

function highlightCross(idx) {
    document.querySelectorAll('#tableBody tr').forEach(r => {
        const c = r.querySelectorAll('td')[idx];
        if(c) c.classList.add('highlight-col');
    });
}

function clearHighlight() {
    document.querySelectorAll('.highlight-col').forEach(c => c.classList.remove('highlight-col'));
}

// Pozostałe funkcje planu pracy (generateTable itp.) powinny zostać takie, jakie masz, 
// ponieważ skupiliśmy się tutaj na obsłudze nowej zakładki QR.
