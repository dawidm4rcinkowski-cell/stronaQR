function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Funkcja ustawiająca powitanie w zależności od pory dnia
function setGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let message = "";

    if (hour >= 5 && hour < 12) {
        message = "Dzień dobry!";
    } else if (hour >= 12 && hour < 18) {
        message = "Cześć!";
    } else {
        message = "Dobry wieczór!";
    }

    greetingElement.innerText = message;
}

// Inicjalizacja po załadowaniu strony
window.onload = function() {
    setGreeting();
};
