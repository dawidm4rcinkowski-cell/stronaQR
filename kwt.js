const kwtData = [
    // --- DZIAŁ IT ---
    { id: "kwt_it_1", name: "Drukarki atramentowe", dept: "it" },
    { id: "kwt_it_2", name: "Słuchawki Douszne", dept: "it" },
    { id: "kwt_it_3", name: "Słuchawki Truewirless", dept: "it" },
    { id: "kwt_it_4", name: "Głośniki mobilne", dept: "it" },
    { id: "kwt_it_5", name: "Smartfony", dept: "it" },
    { id: "kwt_it_6", name: "Smartwatche i smartbandy", dept: "it" },
    { id: "kwt_it_7", name: "Ładowarki sieciowe", dept: "it" },
    { id: "kwt_it_8", name: "Słuchawki nauszne i uniwersalne", dept: "it" },
    { id: "kwt_it_9", name: "Urządzenia wielofunkcyjne atramentowe", dept: "it" },
    { id: "kwt_it_10", name: "Notebooki uniwersalne", dept: "it" },
    { id: "kwt_it_11", name: "Notebooki gamingowe", dept: "it" },
    { id: "kwt_it_12", name: "Tablety", dept: "it" },
    { id: "kwt_it_13", name: "Myszki standardowe", dept: "it" },
    { id: "kwt_it_14", name: "Myszki gamingowe", dept: "it" },
    { id: "kwt_it_15", name: "Klawiatury gamingowe", dept: "it" },
    { id: "kwt_it_16", name: "Klawiatury standardowe", dept: "it" },
    { id: "kwt_it_17", name: "Słuchawki gamingowe", dept: "it" },
    { id: "kwt_it_18", name: "Kable GSM", dept: "it" },
    { id: "kwt_it_19", name: "Ładowarki przenośne", dept: "it" },
    { id: "kwt_it_20", name: "Ładowarki indukcyjne", dept: "it" },
    { id: "kwt_it_21", name: "Urządzenia wielofunkcyjne laserowe", dept: "it" },
    { id: "kwt_it_22", name: "Urządzenia wielofunkcyjne CISS", dept: "it" },

    // --- DZIAŁ RTV ---
    { id: "kwt_rtv_1", name: "Klocki", dept: "rtv" },
    { id: "kwt_rtv_2", name: "Akcesoria do konsol", dept: "rtv" },
    { id: "kwt_rtv_3", name: "Konsole", dept: "rtv" },
    { id: "kwt_rtv_4", name: "Nawigacje", dept: "rtv" },
    { id: "kwt_rtv_5", name: "Kamery sportowe", dept: "rtv" },
    { id: "kwt_rtv_6", name: "Wideorejestratory", dept: "rtv" },

    // --- DZIAŁ AGD ---
    { id: "kwt_agd_1", name: "Ekspresy Automatyczne", dept: "agd" },
    { id: "kwt_agd_2", name: "Depilatory Świetlne", dept: "agd" },
    { id: "kwt_agd_3", name: "Szczoteczki", dept: "agd" },
    { id: "kwt_agd_4", name: "Grile", dept: "agd" },
    { id: "kwt_agd_5", name: "Odkurzacze pionowe", dept: "agd" },
    { id: "kwt_agd_6", name: "Odkurzacze automatyczne", dept: "agd" },
    { id: "kwt_agd_7", name: "Urządzenia SODASTREAM", dept: "agd" },
    { id: "kwt_agd_8", name: "Żelazka", dept: "agd" },
    { id: "kwt_agd_9", name: "Czajniki", dept: "agd" },
    { id: "kwt_agd_10", name: "Trymery", dept: "agd" },
    { id: "kwt_agd_11", name: "Gofrownice", dept: "agd" },
    { id: "kwt_agd_12", name: "Ekspresy przelewowe", dept: "agd" },
    { id: "kwt_agd_13", name: "Maszynki i wkłady do golenia", dept: "agd" },
    { id: "kwt_agd_14", name: "Myjki do okien", dept: "agd" },
    { id: "kwt_agd_15", name: "Odkurzacze akumulatorowe", dept: "agd" },
    { id: "kwt_agd_16", name: "Pojemniki kuchenne", dept: "agd" },
    { id: "kwt_agd_17", name: "Steamery", dept: "agd" },
    { id: "kwt_agd_18", name: "Frytkownice", dept: "agd" },
    { id: "kwt_agd_19", name: "Irygatory", dept: "agd" },
    { id: "kwt_agd_20", name: "Mopy parowe i elektryczne", dept: "agd" },
    { id: "kwt_agd_21", name: "Odkurzacze standardowe", dept: "agd" },
    { id: "kwt_agd_22", name: "Prostownice", dept: "agd" },
    { id: "kwt_agd_23", name: "Termoroboty", dept: "agd" },
    { id: "kwt_agd_24", name: "Wyciskarki wolnoobrotowe", dept: "agd" },
    { id: "kwt_agd_25", name: "Suszarki", dept: "agd" },
    { id: "kwt_agd_26", name: "Suszarko-lokówki", dept: "agd" },
    { id: "kwt_agd_27", name: "Golarki", dept: "agd" },
    { id: "kwt_agd_28", name: "Air fryery", dept: "agd" },
    { id: "kwt_agd_29", name: "Ekspresy kapsułowe", dept: "agd" },
    { id: "kwt_agd_30", name: "Garnki", dept: "agd" },
    { id: "kwt_agd_31", name: "Lokówki", dept: "agd" },
    { id: "kwt_agd_32", name: "Multicookery i szybkowary", dept: "agd" },
    { id: "kwt_agd_33", name: "Nawilżacze powietrza", dept: "agd" },
    { id: "kwt_agd_34", name: "Patelnie", dept: "agd" },
    { id: "kwt_agd_35", name: "Roboty wieloczynnościowe", dept: "agd" },
    { id: "kwt_agd_36", name: "Depilatory tradycyjne", dept: "agd" },
    { id: "kwt_agd_37", name: "Ekspresy kolbowe", dept: "agd" },
    { id: "kwt_agd_38", name: "Generatory pary", dept: "agd" },
    { id: "kwt_agd_39", name: "Myjki ciśnieniowe", dept: "agd" },
    { id: "kwt_agd_40", name: "Oczyszczacze powietrza", dept: "agd" },
    { id: "kwt_agd_41", name: "Pojemniki do przechowywania", dept: "agd" },
    { id: "kwt_agd_42", name: "Sandwicze", dept: "agd" },
    { id: "kwt_agd_43", name: "Tostery", dept: "agd" },
    { id: "kwt_agd_44", name: "Urządzenia grzewcze", dept: "agd" }
];

let currentKwtDept = 'it';

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function filterKwtDept(dept, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentKwtDept = dept;
    renderKWT();
}

function renderKWT() {
    const container = document.getElementById('kwtList');
    if (!container) return;
    container.innerHTML = '';

    const filteredItems = kwtData.filter(item => item.dept === currentKwtDept);

    filteredItems.forEach(item => {
        const saved = JSON.parse(localStorage.getItem(item.id)) || { status: 'none', time: '' };
        
        const card = document.createElement('div');
        card.className = `inwa-card ${saved.status === 'done' ? 'pending' : ''}`;
        card.innerHTML = `
            <div class="inwa-info">
                <h3>${item.name}</h3>
                <p>${saved.status === 'done' ? '✅ ZESKANOWANO: ' + saved.time : '🔴 DO SPRAWDZENIA'}</p>
            </div>
            <button class="done-btn" onclick="toggleKWT('${item.id}')">
                ${saved.status === 'done' ? 'WYCOFAJ' : 'ZATWIERDŹ'}
            </button>
        `;
        container.appendChild(card);
    });
}

function toggleKWT(id) {
    const saved = JSON.parse(localStorage.getItem(id)) || { status: 'none', time: '' };
    
    if (saved.status === 'done') {
        if (confirm("Czy na pewno chcesz wycofać zatwierdzenie skanowania dla tej grupy?")) {
            localStorage.removeItem(id);
            renderKWT();
        }
        return;
    }

    const now = new Date();
    const timeStr = now.toLocaleDateString('pl-PL') + ' ' + now.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});
    
    localStorage.setItem(id, JSON.stringify({ status: 'done', time: timeStr }));
    renderKWT();
}

window.onload = renderKWT;
