// --- OBSŁUGA MENU BOCZNEGO ---
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    // Dodajemy/usuwamy klasę 'active', która steruje animacją w CSS
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// --- DODATKOWA LOGIKA POWITANIA (Opcjonalnie) ---
function setGreeting() {
    const hour = new Date().getHours();
    const titleSpan = document.querySelector('.page-title span');
    
    // Możesz dynamicznie zmieniać napis "ZARZĄDZANIA" na powitanie zależne od pory dnia
    if (hour < 12) {
        console.log("Dzień dobry!");
    } else if (hour < 18) {
        console.log("Dobry wieczór!");
    }
}

// --- START SYSTEMU ---
window.onload = () => {
    // Inicjalizacja powitania lub sprawdzenie statusów z localStorage
    setGreeting();
    
    // Logika zamykania sidebar po kliknięciu w overlay
    document.getElementById('overlay').addEventListener('click', toggleMenu);
};

// --- EFEKT KLIKNIĘCIA W KAFELKI ---
// Dodaje małą wibrację (na telefonach) przy przechodzeniu między działami
document.querySelectorAll('.home-card').forEach(card => {
    card.addEventListener('click', () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(10);
        }
    });
});
