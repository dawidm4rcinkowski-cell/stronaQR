let isCooldown = false;

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function updatePreview() {
    // Funkcja może być użyta do walidacji w czasie rzeczywistym
}

function copyCode() {
    if (isCooldown) return;

    const order = document.getElementById('orderNum').value || "123456";
    const pin = document.getElementById('pinNum').value || "123";
    const fullCode = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${order}" , "pin" : "${pin}" }`;

    // Kopiowanie do schowka
    navigator.clipboard.writeText(fullCode).then(() => {
        addToHistory(fullCode);
        startCooldown();
    });
}

function startCooldown() {
    isCooldown = true;
    const btn = document.getElementById('copyBtn');
    let timeLeft = 3;

    btn.classList.add('cooldown');
    btn.innerText = `SKOPIOWANO! (${timeLeft}s)`;

    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timer);
            btn.classList.remove('cooldown');
            btn.innerText = "KOPIUJ KOD";
            isCooldown = false;
        } else {
            btn.innerText = `SKOPIOWANO! (${timeLeft}s)`;
        }
    }, 1000);
}

function addToHistory(code) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
    const fullTime = `${dateStr} ${timeStr}`;

    const historyEntry = {
        id: Date.now(),
        code: code,
        time: fullTime
    };

    let history = JSON.parse(localStorage.getItem('qr_history')) || [];
    history.unshift(historyEntry); // Dodaj na początek
    localStorage.setItem('qr_history', JSON.stringify(history.slice(0, 10))); // Max 10 wpisów

    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('historyList');
    const history = JSON.parse(localStorage.getItem('qr_history')) || [];

    container.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="hist-code">${item.code}</div>
            <div class="hist-time">${item.time}</div>
            <button class="del-btn" onclick="deleteHistory(${item.id})">USUŃ</button>
        </div>
    `).join('');
}

function deleteHistory(id) {
    let history = JSON.parse(localStorage.getItem('qr_history')) || [];
    history = history.filter(item => item.id !== id);
    localStorage.setItem('qr_history', JSON.stringify(history));
    renderHistory();
}

// Inicjalizacja historii przy starcie
window.onload = renderHistory;
