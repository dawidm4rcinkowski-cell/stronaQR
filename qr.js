let cooldownActive = false;

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function copyCode() {
    if (cooldownActive) return;

    const orderNum = document.getElementById('orderNum').value || "123456";
    const pinNum = document.getElementById('pinNum').value || "123";
    const fullJson = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${orderNum}" , "pin" : "${pinNum}" }`;

    navigator.clipboard.writeText(fullJson).then(() => {
        saveToLocalStorage(fullJson);
        runCooldown();
    });
}

function runCooldown() {
    cooldownActive = true;
    const btn = document.getElementById('copyBtn');
    let timeLeft = 3;
    btn.classList.add('wait');
    btn.innerText = `SKOPIOWANO! (${timeLeft}S)`;

    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            btn.innerText = `SKOPIOWANO! (${timeLeft}S)`;
        } else {
            clearInterval(countdown);
            btn.classList.remove('wait');
            btn.innerText = "KOPIUJ KOD";
            cooldownActive = false;
        }
    }, 1000);
}

function saveToLocalStorage(code) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    
    const newEntry = {
        id: Date.now(),
        code: code,
        timestamp: `${dateString} | ${timeString}`
    };

    let history = JSON.parse(localStorage.getItem('qr_history_expert')) || [];
    history.unshift(newEntry);
    if (history.length > 15) history.pop();
    localStorage.setItem('qr_history_expert', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const listContainer = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('qr_history_expert')) || [];

    if (history.length === 0) {
        listContainer.innerHTML = '<div style="padding: 30px; color: #333; font-weight: 900; font-size: 0.7rem;">BRAK HISTORII</div>';
        return;
    }

    listContainer.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="hist-code">${item.code}</div>
            <div class="hist-time">${item.timestamp}</div>
            <button class="btn-delete" onclick="deleteEntry(${item.id})">USUŃ</button>
        </div>
    `).join('');
}

function deleteEntry(id) {
    let history = JSON.parse(localStorage.getItem('qr_history_expert')) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem('qr_history_expert', JSON.stringify(history));
    renderHistory();
}

window.onload = renderHistory;
