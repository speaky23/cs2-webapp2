const tg = window.Telegram.WebApp;
tg.expand();

let currentSkin = null;

function searchSkin() {
    const query = document.getElementById('searchInput').value;
    if (!query) return;
    tg.sendData(JSON.stringify({ action: 'search', query: query }));
}

function buySkin() {
    if (!currentSkin) return;
    tg.sendData(JSON.stringify({ action: 'buy', name: currentSkin.name, price: currentSkin.price }));
}

let currentRotation = 0;

function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const slices = 10;
    const angle = (2 * Math.PI) / slices;
    for (let i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.fillStyle = i % 2 === 0 ? '#ffd700' : '#1a1a1a';
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 150, i * angle, (i + 1) * angle);
        ctx.fill();
        ctx.stroke();
    }
}

function spinWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    currentRotation += 1440 + Math.random() * 360;
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    setTimeout(() => {
        tg.sendData(JSON.stringify({ action: 'spin_wheel' }));
    }, 1000);
}

if (document.getElementById('wheelCanvas')) {
    drawWheel();
}