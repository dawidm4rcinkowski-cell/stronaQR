// --- DANE I ZMIENNE ---
const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];

const scheduleData = {
    1: ["", "", "", "", "", "", "", "", "", "", ""],
    2: ["10-18", "10-18", "", "10-20", "", "", "10-20", "10-20", "10-20", "12-20", ""],
    3: ["10-18", "10-18", "10-20", "", "10-20", "", "13-20", "10-18", "12-20", "10-18", "13-20"],
    4: ["", "13-20", "10-20", "10-20", "", "10-20", "10-18", "13-20", "12-20", "", "10-18"],
    5: ["10-18", "13-20", "13-20", "10-18", "12-20", "10-18", "10-18", "", "10-18", "", "13-20"],
    6: ["10-18", "13-20", "13-20", "10-18", "12-20", "13-20", "", "10-18", "", "10-20", "10-18"],
    7: ["10-18", "", "10-20", "10-20", "10-20", "10-20", "10-20", "10-20", "", "10-20", "10-20"],
    8: ["", "", "", "", "", "", "", "", "", "", ""],
    9: ["10-18", "12-20", "", "12-20", "U", "10-20", "13-20", "10-18", "10-18", "", "10-18"],
    10: ["", "12-20", "szk.", "10-20", "U", "10-18", "10-18", "13-20", "10-18", "13-20", "10-18"],
    11: ["szk.", "10-18", "szk.", "", "10-20", "13-20", "", "10-18", "13-20", "10-18", "13-20"],
    12: ["szk.", "10-18", "szk.", "10-20", "", "10-20", "10-18", "12-20", "13-20", "10-18", "13-20"],
    13: ["10-18", "", "10-20", "12-20", "U", "", "10-20", "10-20", "10-18", "13-20", "10-18"],
    14: ["10-18", "", "10-20", "10-20", "", "10-20", "10-20", "10-20", "10-20", "", "10-20"],
    15: ["", "", "", "", "", "", "", "", "", "", ""],
    16: ["U", "", "10-20", "U", "10-20", "10-20", "10-20", "", "12-20", "10-20", "U"],
    17: ["U", "10-20", "10-20", "", "10-20", "10-18", "12-20", "", "10-18", "12-20", "U"],
    18: ["U", "10-20", "10-20", "", "10-20", "13-20", "10-18", "13-20", "", "10-20", "U"],
    19: ["U", "10-20", "", "10-20", "13-20", "10-18", "13-20", "10-18", "10-20", "", "U"],
    20: ["U", "12-20", "10-20", "10-20", "", "13-20", "10-18", "12-20", "10-20", "10-18", "U"],
    21: ["", "10-20", "10-20", "", "10-20", "", "", "10-20", "10-20", "10-20", "10-20"],
    22: ["", "", "", "", "", "", "", "", "", "", ""],
    23: ["10-18", "13-20", "10-17", "13-20", "10-18", "U", "", "10-20", "10-18", "13-20", "10-20"],
    24: ["10-18", "", "", "13-20", "10-18", "U", "13-20", "10-18", "13-20", "10-18", "10-18"],
    25: ["10-18", "10-18", "10-20", "", "10-20", "U", "10-18", "13-20", "", "13-20", "10-20"],
    26: ["10-18", "13-20", "13-20", "10-18", "", "U", "12-20", "10-18", "13-20", "10-18", ""],
    27: ["10-18", "10-18", "12-20", "10-18", "13-20", "U", "", "10-20", "10-18", "12-20", "10-20"],
    28: ["", "10-20", "", "10-20", "10-20", "", "10-20", "", "10-20", "", "10-20"]
};

// --- FUNKCJE OGÓLNE ---
function toggleMenu() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
}

function startClock() {
    setInterval(() => {
        const d = new Date();
        const h = document.getElementById('hours'), m = document.getElementById('minutes'), s = document.getElementById('seconds');
        if(h) h.innerText = d.getHours().toString().padStart(2, '0');
        if(m) m.innerText = d.getMinutes().toString().padStart(2, '0');
        if(s) s.innerText = d.getSeconds().toString().padStart(2, '0');
    }, 1000);
}

// --- GENERATOR QR ---
function copyQR() {
    const order = document.getElementById('ord_input').value;
    const pin = document.getElementById('pin_input').value;
    const btn = document.getElementById('copyBtn');

    if(!order || !pin) { alert("Wpisz dane!"); return; }

    const fullCode = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${order}" , "pin" : "${pin}" }`;

    navigator.clipboard.writeText(fullCode).then(() => {
        addToHistory(fullCode);
        
        // Timer 3s
        let timeLeft = 3;
        btn.disabled = true;
        const originalText = "KOPIUJ KOD";
        
        const timer = setInterval(() => {
            btn.innerText = `CZEKAJ (${timeLeft}s)`;
            timeLeft--;
            if(timeLeft < 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.innerText = originalText;
            }
        }, 1000);
    });
}

function addToHistory(fullJSON) {
    const list = document.getElementById('qr-history-list');
    if(!list) return;
    const time = new Date().toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});
    const row = document.createElement('div');
    row.className = 'history-row';
    row.innerHTML = `<span class="h-val-code">${fullJSON}</span><span class="h-val-time">${time}</span><span class="h-val-action"><button onclick="this.parentElement.parentElement.remove()">X</button></span>`;
    list.prepend(row);
    if(list.children.length > 10) list.removeChild(list.lastChild);
}

// --- PLAN PRACY ---
function initMonths() {
    const sel = document.getElementById('monthSelect');
    if(!sel) return;
    months.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i; opt.innerHTML = m + " 2026";
        if(i === 1) opt.selected = true;
        sel.appendChild(opt);
    });
}

function generateTable() {
    const tbody = document.getElementById('tableBody');
    const sel = document.getElementById('monthSelect');
    if(!tbody || !sel) return;
    tbody.innerHTML = '';
    const m = parseInt(sel.value);
    const days = new Date(2026, m + 1, 0).getDate();

    for (let d = 1; d <= days; d++) {
        const dt = new Date(2026, m, d);
        const dayData = (m === 1) ? (scheduleData[d] || Array(11).fill("")) : Array(11).fill("");
        let tr = document.createElement('tr');
        
        let html = `<td class="date-col">${d} ${months[m].substring(0,3)} (${dayNames[dt.getDay()]})</td>`;
        dayData.forEach((v, i) => {
            const colIdx = i + 1;
            const savedTask = localStorage.getItem(`task_${m}_${d}_${colIdx}`) || "";
            html += `<td class="${savedTask}" onclick="changeTask(this, ${d}, ${colIdx})" onmouseover="highlightCross(${colIdx})" onmouseout="clearHighlight()">
                        <input type="text" class="cell-data" value="${v}" readonly>
                     </td>`;
        });
        tr.innerHTML = html;
        tbody.appendChild(tr);
    }
}

function changeTask(el, day, col) {
    const classes = ["", "task-social", "task-klucze", "task-dostawa"];
    let cur = "";
    classes.forEach(c => { if(el.classList.contains(c)) cur = c; });
    let next = classes[(classes.indexOf(cur) + 1) % classes.length];
    el.classList.remove(...classes.filter(c => c));
    if(next) el.classList.add(next);
    localStorage.setItem(`task_${document.getElementById('monthSelect').value}_${day}_${col}`, next);
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

window.onload = () => {
    startClock();
    if(document.getElementById('monthSelect')) { initMonths(); generateTable(); }
};
