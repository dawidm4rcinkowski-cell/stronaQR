const months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
const dayNames = ["Niedz", "Pon", "Wt", "Śr", "Czw", "Pt", "Sob"];

const scheduleData = {
    1: ["", "", "", "", "", "", "", "", "", "", ""],
    2: ["10-18", "10-18", "", "10-20", "", "", "10-20", "10-20", "10-20", "12-20", ""],
    3: ["10-18", "10-18", "10-20", "", "10-20", "", "13-20", "10-18", "12-20", "10-18", "13-20"],
    4: ["", "13-20", "10-20", "10-20", "", "10-20", "10-18", "13-20", "12-20", "", "10-18"],
    5: ["10-18", "13-20", "13-20", "10-18", "12-20", "10-18", "10-18", "", "10-18", "", "13-20"],
    6: ["10-18", "13-20", "13-20", "10-18", "12-20", "13-20", "", "10-18", "", "10-20", "10-18"],
    7: ["10-18", "", "10-20", "10-20", "10-20", "10-20", "10-20", "10-20", "", "10-20", "10-20"],
    8: ["", "", "", "", "", "", "", "", "", "", ""],
    9: ["10-18", "12-20", "", "12-20", "U", "10-20", "13-20", "10-18", "10-18", "", "10-18"],
    10: ["", "12-20", "szk.", "10-20", "U", "10-18", "10-18", "13-20", "10-18", "13-20", "10-18"],
    11: ["szk.", "10-18", "szk.", "", "10-20", "13-20", "", "10-18", "13-20", "10-18", "13-20"],
    12: ["szk.", "10-18", "szk.", "10-20", "", "10-20", "10-18", "12-20", "13-20", "10-18", "13-20"],
    13: ["10-18", "", "10-20", "12-20", "U", "", "10-20", "10-20", "10-18", "13-20", "10-18"],
    14: ["10-18", "", "10-20", "10-20", "", "10-20", "10-20", "10-20", "10-20", "", "10-20"],
    15: ["", "", "", "", "", "", "", "", "", "", ""],
    16: ["U", "", "10-20", "U", "10-20", "10-20", "10-20", "", "12-20", "10-20", "U"],
    17: ["U", "10-20", "10-20", "", "10-20", "10-18", "12-20", "", "10-18", "12-20", "U"],
    18: ["U", "10-20", "10-20", "", "10-20", "13-20", "10-18", "13-20", "", "10-20", "U"],
    19: ["U", "10-20", "", "10-20", "13-20", "10-18", "13-20", "10-18", "10-20", "", "U"],
    20: ["U", "12-20", "10-20", "10-20", "", "13-20", "10-18", "12-20", "10-20", "10-18", "U"],
    21: ["", "10-20", "10-20", "", "10-20", "", "", "10-20", "10-20", "10-20", "10-20"],
    22: ["", "", "", "", "", "", "", "", "", "", ""],
    23: ["10-18", "13-20", "10-17", "13-20", "10-18", "U", "", "10-20", "10-18", "13-20", "10-20"],
    24: ["10-18", "", "", "13-20", "10-18", "U", "13-20", "10-18", "13-20", "10-18", "10-18"],
    25: ["10-18", "10-18", "10-20", "", "10-20", "U", "10-18", "13-20", "", "13-20", "10-20"],
    26: ["10-18", "13-20", "13-20", "10-18", "", "U", "12-20", "10-18", "13-20", "10-18", ""],
    27: ["10-18", "10-18", "12-20", "10-18", "13-20", "U", "", "10-20", "10-18", "12-20", "10-20"],
    28: ["", "10-20", "", "10-20", "10-20", "", "10-20", "", "10-20", "", "10-20"]
};

function toggleMenu() {
    const s = document.getElementById('sidebar'), o = document.getElementById('overlay');
    if(s && o) { s.classList.toggle('active'); o.classList.toggle('active'); }
}

function initDashboard() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = now.toLocaleDateString('pl-PL', options);
    const dateEl = document.getElementById('currentDateDisplay');
    if(dateEl) dateEl.innerText = dateStr;
    startClock();
    updateDashboardInfo(10);
}

function startClock() {
    setInterval(() => {
        const now = new Date();
        const h = document.getElementById('hours'), m = document.getElementById('minutes'), s = document.getElementById('seconds');
        if(h) h.innerText = now.getHours().toString().padStart(2, '0');
        if(m) m.innerText = now.getMinutes().toString().padStart(2, '0');
        if(s) s.innerText = now.getSeconds().toString().padStart(2, '0');
    }, 1000);
}

function updateDashboardInfo(personIndex) {
    const nextShiftEl = document.getElementById('nextShiftInfo');
    if (!nextShiftEl) return;
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    if (month === 1 && scheduleData[day]) {
        const shift = scheduleData[day][personIndex];
        nextShiftEl.innerText = shift ? `Dziś pracujesz: ${shift}` : "Dziś masz wolne!";
    } else {
        nextShiftEl.innerText = "Brak grafiku";
    }
}

function initMonths() {
    const sel = document.getElementById('monthSelect');
    if(!sel) return;
    sel.innerHTML = '';
    months.forEach((m, i) => {
        let opt = document.createElement('option');
        opt.value = i; opt.innerHTML = m + " 2026";
        if(i === 1) opt.selected = true;
        sel.appendChild(opt);
    });
}

function parseHours(val) {
    if (!val || val === "U" || val === "szk.") return 0;
    const parts = val.split('-');
    return parts.length === 2 ? (parseInt(parts[1]) - parseInt(parts[0])) : 0;
}

function changeTask(el, day, col) {
    const classes = ["", "task-social", "task-klucze", "task-dostawa"];
    let currentClass = "";
    classes.forEach(c => { if(el.classList.contains(c)) currentClass = c; });
    let nextIndex = (classes.indexOf(currentClass) + 1) % classes.length;
    el.classList.remove(...classes.filter(c => c !== ""));
    if(classes[nextIndex] !== "") el.classList.add(classes[nextIndex]);
    const m = document.getElementById('monthSelect').value;
    localStorage.setItem(`task_${m}_${day}_${col}`, classes[nextIndex]);
}

function generateTable() {
    const tbody = document.getElementById('tableBody');
    const sel = document.getElementById('monthSelect');
    if(!tbody || !sel) return;
    tbody.innerHTML = '';
    const m = parseInt(sel.value);
    const days = new Date(2026, m + 1, 0).getDate();
    const rT = new Date();
    let totalHours = Array(11).fill(0);

    for (let d = 1; d <= days; d++) {
        const dt = new Date(2026, m, d);
        const isToday = (d === rT.getDate() && m === rT.getMonth());
        const isSunday = (dt.getDay() === 0);
        const isWeekend = (dt.getDay() === 0 || dt.getDay() === 6);
        const dayData = (m === 1) ? (scheduleData[d] || Array(11).fill("")) : Array(11).fill("");

        let tr = document.createElement('tr');
        if(isToday) tr.classList.add('today-row');
        if(isSunday) tr.classList.add('is-sunday');
        
        let html = `<td class="date-col ${isWeekend ? 'is-weekend' : ''}">${d} ${months[m].substring(0,3)} (${dayNames[dt.getDay()]})</td>`;
        dayData.forEach((v, i) => {
            totalHours[i] += parseHours(v);
            const colIdx = i + 1;
            const savedTask = localStorage.getItem(`task_${m}_${d}_${colIdx}`) || "";
            const isSep = [0, 1, 2, 4, 8, 10].includes(i);
            html += `<td class="${isSep ? 'sep-left' : ''} ${savedTask}" 
                        onclick="changeTask(this, ${d}, ${colIdx})"
                        onmouseover="highlightCross(${colIdx})" onmouseout="clearHighlight()">
                        <input type="text" class="cell-data" value="${v}" readonly>
                     </td>`;
        });
        tr.innerHTML = html;
        tbody.appendChild(tr);
    }
    const fTr = document.createElement('tr');
    fTr.classList.add('total-row');
    let fHtml = `<td class="date-col">SUMA</td>`;
    totalHours.forEach((sum, i) => {
        fHtml += `<td class="${[0,1,2,4,8,10].includes(i) ? 'sep-left' : ''}"><input type="text" class="cell-data total-cell" value="${sum}h" readonly></td>`;
    });
    fTr.innerHTML = fHtml;
    tbody.appendChild(fTr);
}

function highlightCross(idx) {
    document.querySelectorAll('#tableBody tr').forEach(r => {
        const c = r.querySelectorAll('td')[idx];
        if(c) c.classList.add('highlight-col');
    });
}
function clearHighlight() {
    document.querySelectorAll('.highlight-col').forEach(c => c.classList.remove('highlight-col'));
}
