function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
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

function copyQR() {
    const order = document.getElementById('ord_input').value;
    const pin = document.getElementById('pin_input').value;
    const btn = document.getElementById('copyBtn');

    if(!order || !pin) { alert("Uzupełnij dane!"); return; }

    const fullCode = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${order}" , "pin" : "${pin}" }`;

    navigator.clipboard.writeText(fullCode).then(() => {
        addToHistory(fullCode);
        
        // Timer 3 sekundy
        let sec = 3;
        btn.disabled = true;
        const oldText = "KOPIUJ KOD";
        btn.innerText = `CZEKAJ (${sec}s)`;

        const countdown = setInterval(() => {
            sec--;
            btn.innerText = `CZEKAJ (${sec}s)`;
            if(sec <= 0) {
                clearInterval(countdown);
                btn.disabled = false;
                btn.innerText = oldText;
            }
        }, 1000);
    });
}

function addToHistory(text) {
    const list = document.getElementById('history-list');
    if(!list) return;
    const time = new Date().toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});
    const row = document.createElement('div');
    row.className = 'history-row';
    row.innerHTML = `
        <div class="h-code">${text}</div>
        <div class="h-time">${time}</div>
        <div class="h-btn"><button onclick="this.parentElement.parentElement.remove()">USUŃ</button></div>
    `;
    list.prepend(row);
}

window.onload = () => { startClock(); };
