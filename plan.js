const emps = ["pawel", "michal", "natalia", "magda", "jakub", "adrian", "dawid", "darek", "lukasz", "ilona", "ariel"];
function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }
function initMonths() {
    const s = document.getElementById('monthSelect');
    for(let i=-1; i<4; i++) {
        const d = new Date(new Date().getFullYear(), new Date().getMonth()+i, 1);
        const opt = new Option(d.toLocaleDateString('pl-PL',{month:'long',year:'numeric'}).toUpperCase(), `${d.getFullYear()}-${d.getMonth()}`);
        if(i===0) opt.selected = true;
        s.add(opt);
    }
}
function generateTable() {
    const tb = document.getElementById('tableBody');
    const [y, m] = document.getElementById('monthSelect').value.split('-').map(Number);
    const days = new Date(y, m + 1, 0).getDate();
    tb.innerHTML = '';
    for(let d=1; d<=days; d++) {
        const dt = new Date(y, m, d);
        const isSun = dt.getDay() === 0;
        const tr = document.createElement('tr');
        if(isSun) tr.classList.add('sun-row');
        let html = `<td style="text-align:left;${isSun?'color:red':''}"> ${d} (${dt.toLocaleDateString('pl-PL',{weekday:'short'})})</td>`;
        emps.forEach(e => {
            const id = `${e}-${y}-${m}-${d}`;
            const s = JSON.parse(localStorage.getItem(id)) || {text:'',task:''};
            html += `<td id="${id}" class="${s.task}" onclick="edit('${id}')">${s.text}</td>`;
        });
        tr.innerHTML = html;
        tb.appendChild(tr);
    }
}
function edit(id) {
    const c = document.getElementById(id);
    const txt = prompt("Godziny:", c.innerText);
    if(txt !== null) {
        let t = c.className === "" ? "socjal" : (c.className === "socjal" ? "klucze" : (c.className === "klucze" ? "dostawa" : ""));
        c.innerText = txt; c.className = t;
        localStorage.setItem(id, JSON.stringify({text:txt, task:t}));
    }
}
window.onload = () => { initMonths(); generateTable(); };
