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

    // Create elaborate domino path
    function createDominoPath() {
        const path = [];
        const h = canvas.height;
        const spacing = 35;

        // Segment 1: Left to right across bottom
        for (let i = 0; i < 15; i++) {
            path.push({
                x: 40 + i * spacing,
                y: h - 80,
                angle: 0
            });
        }

        // Segment 2: Curve up right side (smooth arc)
        const cornerX = 40 + 14 * spacing;
        const cornerStartY = h - 80;
        for (let i = 1; i <= 8; i++) {
            const progress = i / 8;
            const angle = progress * Math.PI / 2;
            path.push({
                x: cornerX + Math.sin(angle) * 60,
                y: cornerStartY - progress * 140,
                angle: -angle * 0.5
            });
        }

        // Segment 3: Right to left across top
        const topStartX = cornerX + 60;
        const topY = cornerStartY - 140;
        for (let i = 1; i < 15; i++) {
            path.push({
                x: topStartX - i * spacing,
                y: topY,
                angle: 0
            });
        }

        // Segment 4: Curve down left side
        const leftCornerX = topStartX - 14 * spacing;
        for (let i = 1; i <= 5; i++) {
            const progress = i / 5;
            const angle = progress * Math.PI / 2;
            path.push({
                x: leftCornerX - Math.sin(angle) * 50,
                y: topY + progress * 100,
                angle: angle * 0.5
            });
        }

        return path;
    }

    const dominoPath = createDominoPath();

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
