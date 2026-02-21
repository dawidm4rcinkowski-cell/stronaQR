function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }
function cp() {
    const o = document.getElementById('o').value;
    const p = document.getElementById('p').value;
    const s = `{ "type" : "npws_order_received_qr_code" , "order_number" : "${o}" , "pin" : "${p}" }`;
    navigator.clipboard.writeText(s);
    alert("Skopiowano!");
}
