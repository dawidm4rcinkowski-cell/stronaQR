// PEŁNE DANE ZGODNIE Z TWOIMI WYTYCZNYMI
const inwaData = [
    // --- DZIAŁ IT ---
    { id: 'it_s_n', name: 'Słuchawki nauszne', dept: 'IT', type: '2-tygodnie' },
    { id: 'it_tusz', name: 'Tusze', dept: 'IT', type: 'miesiac' },
    { id: 'it_pap', name: 'Papier', dept: 'IT', type: 'miesiac' },
    { id: 'it_glos', name: 'Głośniki mobilne', dept: 'IT', type: 'miesiac' },
    { id: 'it_sl_d', name: 'Słuchawki douszne', dept: 'IT', type: 'miesiac' },
    { id: 'it_band', name: 'Smartbandy', dept: 'IT', type: 'miesiac' },
    { id: 'it_watch', name: 'Smartwatche', dept: 'IT', type: 'miesiac' },
    { id: 'it_folia', name: 'Folie ochronne', dept: 'IT', type: 'miesiac' },
    { id: 'it_pssd', name: 'Dyski PSSD', dept: 'IT', type: 'miesiac' },
    { id: 'it_m2', name: 'Dyski SSD M.2 NVME', dept: 'IT', type: 'miesiac' },
    { id: 'it_sata', name: 'Dyski SSD SATA', dept: 'IT', type: 'miesiac' },
    { id: 'it_ext', name: 'Dyski zewnętrzne', dept: 'IT', type: 'miesiac' },
    { id: 'it_game', name: 'Słuchawki gamingowe', dept: 'IT', type: 'miesiac' },
    { id: 'it_log', name: 'Nośniki logistyczne', dept: 'IT', type: 'miesiac' },

    // --- DZIAŁ RTV ---
    { id: 'rtv_kon', name: 'Konsole', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_and', name: 'Android TV', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_alk', name: 'Alkomaty', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_wide', name: 'Wideorejestratory', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_akc', name: 'Akcesoria do konsol', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_kom', name: 'Komunikatory drogowe', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_spor', name: 'Kamery sportowe', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_naw', name: 'Nawigacje', dept: 'RTV', type: 'miesiac' },

    // --- DZIAŁ AGD (Tylko miesięczne) ---
    { id: 'agd_gol', name: 'Akcesoria do golarek', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_dep', name: 'Depilatory świetlne', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_szcz', name: 'Szczoteczki', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_trym', name: 'Trymery', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_twarz', name: 'Urządzenia do pielęgnacji twarzy i ciała', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_soda', name: 'Akcesoria do urządzeń SODASTREAM', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_kawa_z', name: 'Kawa ziarnista', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_kawa_k', name: 'Kawa w kapsułkach', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_syr', name: 'Syropy', dept: 'AGD', type: 'miesiac' }
];

let currentInwaDept = 'IT';

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('overlay');
    sb.classList.toggle('active');
    ov.classList.toggle('active');
}

function setDept(dept, btn) {
    currentInwaDept = dept;
    // Aktualizacja przycisków filtrów
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderInwentura();
}

function renderInwentura() {
    const container = document.getElementById('inwaList');
    if (!container) return;
    container.innerHTML = '';

    const filtered = inwaData.filter(item => item.dept === currentInwaDept);

    // Grupowanie w nagłówki (2-tygodniowe / Miesięczne)
    const types = ['2-tygodnie', 'miesiac'];
    
    types.forEach(type => {
        const itemsOfType = filtered.filter(i => i.type === type);
        
        if (itemsOfType.length > 0) {
            const header = document.createElement('div');
            header.className = 'time-group-header';
            header.innerText = type === '2-tygodnie' ? 'Inwentury 2-tygodniowe' : 'Inwentury miesięczne';
            container.appendChild(header);

            itemsOfType.forEach(item => {
                const saved = JSON.parse(localStorage.getItem(item.id)) || { status: 'none', time: '' };
                const card = document.createElement('div');
                card.className = `inwa-card ${saved.status === 'done' ? 'pending' : ''}`;
                
                card.innerHTML = `
                    <div class="inwa-info">
                        <h3>${item.name}</h3>
                        <p>${saved.status === 'done' ? '✅ WYKONANO: ' + saved.time : '🔴 DO SPRAWDZENIA'}</p>
                    </div>
                    <button class="done-btn" onclick="toggleInwaStatus('${item.id}')">
                        ${saved.status === 'done' ? 'WYCOFAJ' : 'ZATWIERDŹ'}
                    </button>
                `;
                container.appendChild(card);
            });
        }
    });
}

function toggleInwaStatus(id) {
    const saved = JSON.parse(localStorage.getItem(id)) || { status: 'none', time: '' };
    if (saved.status === 'done') {
        localStorage.removeItem(id);
    } else {
        const now = new Date();
        const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        localStorage.setItem(id, JSON.stringify({ status: 'done', time: timeStr }));
    }
    renderInwentura();
}

window.onload = renderInwentura;
