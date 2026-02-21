let lastH, lastM, lastS;

function toggleMenu() {
document.getElementById('sidebar').classList.toggle('active');
document.getElementById('overlay').classList.toggle('active');
}

// Globalne zmienne do śledzenia czasu
let lastH, lastM, lastS;

function updateClock() {
const now = new Date();
const h = String(now.getHours()).padStart(2, '0');
const m = String(now.getMinutes()).padStart(2, '0');
const s = String(now.getSeconds()).padStart(2, '0');

    const hEl = document.getElementById('hours');
    const mEl = document.getElementById('minutes');
    const sEl = document.getElementById('seconds');
    handleFlip('hours-card', 'hours', h, lastH);
    handleFlip('minutes-card', 'minutes', m, lastM);
    handleFlip('seconds-card', 'seconds', s, lastS);

    // Animacja Godzin
    if (h !== lastH) {
        animateFlip('hours-card');
        hEl.innerText = h;
        lastH = h;
    }
    // Animacja Minut
    if (m !== lastM) {
        animateFlip('minutes-card');
        mEl.innerText = m;
        lastM = m;
    }
    // Animacja Sekund
    if (s !== lastS) {
        animateFlip('seconds-card');
        sEl.innerText = s;
        lastS = s;
    }
    lastH = h; lastM = m; lastS = s;
}

function animateFlip(cardId) {
    const card = document.getElementById(cardId);
    card.classList.remove('flip-animate');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('flip-animate');
function handleFlip(cardId, textId, newValue, oldValue) {
    if (newValue !== oldValue) {
        const card = document.getElementById(cardId);
        const front = card.querySelector('.flip-front');
        const back = card.querySelector('.flip-back');
        
        back.innerText = newValue;
        card.classList.add('animate');
        
        setTimeout(() => {
            front.innerText = newValue;
            card.classList.remove('animate');
        }, 600);
    }
}

setInterval(updateClock, 1000);
updateClock();

// Dodatkowy bajer: Powitanie w konsoli
console.log("%c MEDIA EXPERT DASHBOARD ", "background: #ffe800; color: #000; font-weight: bold; padding: 5px;");
