let lastH, lastM, lastS;

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    handleFlip('hours-card', 'hours', h, lastH);
    handleFlip('minutes-card', 'minutes', m, lastM);
    handleFlip('seconds-card', 'seconds', s, lastS);

    lastH = h; lastM = m; lastS = s;
}

function handleFlip(cardId, textId, newValue, oldValue) {
    if (newValue !== oldValue) {
        const card = document.getElementById(cardId);
        if (!card) return;
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
