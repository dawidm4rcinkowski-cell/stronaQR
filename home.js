const inwaData = [
    // --- DZIAŁ IT ---
    { id: 'it_t1', name: 'Smartfony', dept: 'IT', type: 'tydzien' },
    { id: 'it_t2', name: 'Słuchawki TrueWireless', dept: 'IT', type: 'tydzien' },
    { id: 'it_t3', name: 'Myszki Gamingowe', dept: 'IT', type: 'tydzien' },
    { id: 'it_2t1', name: 'Słuchawki nauszne', dept: 'IT', type: '2-tygodnie' },
    { id: 'it_m1', name: 'Tusze', dept: 'IT', type: 'miesiac' },
    { id: 'it_m2', name: 'Papier', dept: 'IT', type: 'miesiac' },
    { id: 'it_m3', name: 'Głośniki mobilne', dept: 'IT', type: 'miesiac' },
    { id: 'it_m4', name: 'Słuchawki douszne', dept: 'IT', type: 'miesiac' },
    { id: 'it_m5', name: 'Smartbandy', dept: 'IT', type: 'miesiac' },
    { id: 'it_m6', name: 'Smartwatche', dept: 'IT', type: 'miesiac' },
    { id: 'it_m7', name: 'Folie ochronne', dept: 'IT', type: 'miesiac' },
    { id: 'it_m8', name: 'Dyski PSSD', dept: 'IT', type: 'miesiac' },
    { id: 'it_m9', name: 'Dyski SSD M.2 NVME', dept: 'IT', type: 'miesiac' },
    { id: 'it_m10', name: 'Dyski SSD SATA', dept: 'IT', type: 'miesiac' },
    { id: 'it_m11', name: 'Dyski zewnętrzne', dept: 'IT', type: 'miesiac' },
    { id: 'it_m12', name: 'Słuchawki gamingowe', dept: 'IT', type: 'miesiac' },
    { id: 'it_m13', name: 'Nośniki logistyczne', dept: 'IT', type: 'miesiac' },

    // --- DZIAŁ RTV ---
    { id: 'rtv_2t1', name: 'Konsole', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_2t2', name: 'Android TV', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_2t3', name: 'Alkomaty', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_2t4', name: 'Wideorejestratory', dept: 'RTV', type: '2-tygodnie' },
    { id: 'rtv_m1', name: 'Akcesoria do konsol', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_m2', name: 'Komunikatory drogowe', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_m3', name: 'Kamery sportowe', dept: 'RTV', type: 'miesiac' },
    { id: 'rtv_m4', name: 'Nawigacje', dept: 'RTV', type: 'miesiac' },

    // --- DZIAŁ AGD ---
    { id: 'agd_m1', name: 'Akcesoria do golarek', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m2', name: 'Depilatory świetlne', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m3', name: 'Szczoteczki', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m4', name: 'Trymery', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m5', name: 'Urządzenia do pielęgnacji twarzy i ciała', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m6', name: 'Akcesoria do urządzeń SODASTREAM', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m7', name: 'Kawa ziarnista', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m8', name: 'Kawa w kapsułkach', dept: 'AGD', type: 'miesiac' },
    { id: 'agd_m9', name: 'Syropy', dept: 'AGD', type: 'miesiac' }
];

let currentDept = 'IT';

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function setDept(dept, btn) {
    currentDept = dept;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderInwentura();
}

function renderInwentura() {
    const container = document.getElementById('inwaList');
    if (!container) return;
    container.innerHTML = '';

    const filtered = inwaData.filter(item => item.dept === currentDept);
    const groups = [
        { type: 'tydzien', label: 'Inwentury Cotygodniowe' },
        { type: '2-tygodnie', label: 'Inwentury 2-Tygodniowe' },
        { type: 'miesiac', label: 'Inwentury Miesięczne' }
    ];

    groups.forEach(group => {
        const items = filtered.filter(i => i.type === group.type);
        if (items.length > 0) {
            // Nagłówek Sekcji
            const header = document.createElement('div');
            header.className = 'time-group-header';
            header.innerHTML = `<span></span> ${group.label}`;
            container.appendChild(header);

            // Siatka kafelków
            const grid = document.createElement('div');
            grid.className = 'inwa-grid-inner';

            items.forEach(item => {
                const saved = JSON.parse(localStorage.getItem(item.id)) || { status: 'none', time: '' };
                const card = document.createElement('div');
                card.className = `inwa-card ${saved.status === 'done' ? 'pending' : ''}`;
                card.innerHTML = `
                    <div class="inwa-info">
                        <h3>${item.name}</h3>
                        <p>${saved.status === 'done' ? '✅ WYKONANO: ' + saved.time : '🔴 DO ZROBIENIA'}</p>
                    </div>
                    <button class="done-btn" onclick="toggleStatus('${item.id}')">
                        ${saved.status === 'done' ? 'WYCOFAJ' : 'WYKONAŁEM'}
                    </button>
                `;
                grid.appendChild(card);
            });
            container.appendChild(grid);
        }
    });
}

function toggleStatus(id) {
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
