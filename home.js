function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}
function updateClock() {
    const now = new Date();
    document.getElementById('hours').innerText = String(now.getHours()).padStart(2, '0');
    document.getElementById('minutes').innerText = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('seconds').innerText = String(now.getSeconds()).padStart(2, '0');
}
setInterval(updateClock, 1000);
updateClock();
