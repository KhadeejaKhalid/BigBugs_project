const canvas = document.getElementById("glassCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

const cracks = [];
const glassSound = new Audio("glass.mp3"); // glass sound file

function drawGlass() {
    ctx.fillStyle = "rgba(200, 200, 255, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Create large scattered shards
function createCrack(x, y) {
    // Play sound
    glassSound.currentTime = 0; // reset so it plays even if spam clicked
    glassSound.play();

    const shards = 6; // fewer = bigger pieces
    for (let i = 0; i < shards; i++) {
        let angle = Math.random() * Math.PI * 2;
        let length = Math.random() * 200 + 100; // bigger shards

        cracks.push({
            x, y,
            length,
            angle,
            alpha: 1,
            width: Math.random() * 3 + 2 // thicker for big glass edges
        });

        // Random extra lines to simulate broken edges
        let fragments = Math.floor(Math.random() * 3);
        for (let j = 0; j < fragments; j++) {
            cracks.push({
                x: x + Math.cos(angle) * (length * Math.random()),
                y: y + Math.sin(angle) * (length * Math.random()),
                length: Math.random() * 50 + 30,
                angle: angle + (Math.random() - 0.5) * Math.PI / 2,
                alpha: 1,
                width: Math.random() * 2 + 1
            });
        }
    }
}

function drawCracks() {
    for (let i = cracks.length - 1; i >= 0; i--) {
        const c = cracks[i];
        ctx.strokeStyle = `rgba(255,255,255,${c.alpha})`;
        ctx.lineWidth = c.width;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(
            c.x + Math.cos(c.angle) * c.length,
            c.y + Math.sin(c.angle) * c.length
        );
        ctx.stroke();

        // Fade effect
        c.alpha -= 0.008; // slower fade
        if (c.alpha <= 0) {
            cracks.splice(i, 1);
        }
    }
}

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    createCrack(x, y);
});

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {
    cracks.length = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGlass();
});

function loop() {
    drawGlass();
    drawCracks();
    requestAnimationFrame(loop);
}

loop();
