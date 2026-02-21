// --- MENU ---
function toggleMenu() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
}

// --- ZEGAR ---
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

    if(!order || !pin) return;

    const fullCode = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${order}" , "pin" : "${pin}" }`;

    navigator.clipboard.writeText(fullCode).then(() => {
        addToHistory(fullCode);
        
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
    row.innerHTML = `
        <span class="h-val-code">${fullJSON}</span>
        <span class="h-val-time">${time}</span>
        <span class="h-val-action"><button onclick="this.parentElement.parentElement.remove()">USUŃ</button></span>
    `;
    list.prepend(row);
    if(list.children.length > 10) list.removeChild(list.lastChild);
}

// --- PLAN PRACY (LOGIKA) ---
function highlightCross(idx) {
    document.querySelectorAll('#tableBody tr').forEach(r => {
        const c = r.querySelectorAll('td')[idx];
        if(c) c.classList.add('highlight-col');
    });
}

function clearHighlight() {
    document.querySelectorAll('.highlight-col').forEach(c => c.classList.remove('highlight-col'));
}

function changeTask(el, day, col) {
    const classes = ["", "task-social", "task-klucze", "task-dostawa"];
    let cur = "";
    classes.forEach(c => { if(el.classList.contains(c)) cur = c; });
    let next = classes[(classes.indexOf(cur) + 1) % classes.length];
    el.classList.remove(...classes.filter(c => c));
    if(next) el.classList.add(next);
}

// Inicjalizacja
window.onload = () => {
    startClock();
};
