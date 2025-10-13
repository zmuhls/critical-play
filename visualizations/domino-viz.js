// Domino Chain Effect Visualization - Elaborate domino cascade
function initDominoViz() {
    const canvas = document.getElementById('dominoCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let startTime = Date.now();

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
    }

    // Create elaborate domino path (left to right, curves, etc)
    const dominoPath = [];
    const w = canvas.offsetWidth;
    const h = 300;

    // Segment 1: Left to right across bottom
    for (let i = 0; i < 12; i++) {
        dominoPath.push({
            x: 50 + i * 45,
            y: h - 60,
            angle: 0
        });
    }

    // Segment 2: Curve up the right side
    for (let i = 0; i < 6; i++) {
        dominoPath.push({
            x: 50 + 11 * 45 + Math.cos(i * 0.3) * 30,
            y: h - 60 - i * 35,
            angle: -i * 0.15
        });
    }

    // Segment 3: Right to left across top
    for (let i = 0; i < 10; i++) {
        dominoPath.push({
            x: w - 100 - i * 45,
            y: 80,
            angle: 0
        });
    }

    // Segment 4: Curve down to center
    for (let i = 0; i < 5; i++) {
        dominoPath.push({
            x: w - 100 - 10 * 45 - i * 40,
            y: 80 + i * 30,
            angle: i * 0.2
        });
    }

    function drawDomino(x, y, angle, fallen, fallProgress) {
        ctx.save();
        ctx.translate(x, y);

        if (fallen) {
            // Animate the fall
            ctx.rotate(angle + fallProgress * Math.PI / 2);
        } else {
            ctx.rotate(angle);
        }

        // Domino body
        const gradient = ctx.createLinearGradient(-8, -25, 8, 25);
        gradient.addColorStop(0, fallen ? '#ff6b6b' : '#42affa');
        gradient.addColorStop(1, fallen ? '#ff9999' : '#6fc3ff');
        ctx.fillStyle = gradient;
        ctx.fillRect(-8, -25, 16, 50);

        // Border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.strokeRect(-8, -25, 16, 50);

        // Domino dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(0, -10, 2, 0, Math.PI * 2);
        ctx.arc(0, 10, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    function draw() {
        const elapsed = (Date.now() - startTime) / 1000;
        const totalDuration = 8;
        const progress = (elapsed % (totalDuration + 2)) / totalDuration;
        const fallenCount = Math.floor(progress * dominoPath.length);

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw path line (subtle)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        dominoPath.forEach((d, i) => {
            if (i === 0) ctx.moveTo(d.x, d.y);
            else ctx.lineTo(d.x, d.y);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw dominos
        dominoPath.forEach((domino, i) => {
            const fallen = i < fallenCount;
            const isFalling = i === fallenCount - 1;
            const fallProgress = isFalling ? ((progress * dominoPath.length) % 1) : (fallen ? 1 : 0);

            drawDomino(domino.x, domino.y, domino.angle, fallen, fallProgress);
        });

        // Label
        ctx.fillStyle = '#42affa';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Constraint cascade effect', 20, 25);

        animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    return () => {
        if (animationId) cancelAnimationFrame(animationId);
    };
}

// Initialize with Reveal.js
if (typeof Reveal !== 'undefined') {
    Reveal.on('slidechanged', event => {
        if (event.currentSlide.querySelector('#dominoCanvas')) {
            initDominoViz();
        }
    });
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDominoViz);
    } else {
        initDominoViz();
    }
}
