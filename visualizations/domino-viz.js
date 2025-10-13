// Simple Domino Chain - Left to right cascade
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

    function draw() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const elapsed = (Date.now() - startTime) / 1000;
        const cycleDuration = 5;
        const progress = (elapsed % (cycleDuration + 1)) / cycleDuration;

        const numDominos = 20;
        const spacing = Math.min(60, canvas.width / (numDominos + 2));
        const startX = 40;
        const baseY = canvas.height / 2 + 20;
        const fallenCount = Math.floor(progress * numDominos);

        for (let i = 0; i < numDominos; i++) {
            const x = startX + i * spacing;
            const fallen = i < fallenCount;
            const isFalling = i === fallenCount - 1;

            ctx.save();
            ctx.translate(x, baseY);

            if (fallen) {
                const fallAngle = isFalling ?
                    ((progress * numDominos - i) * Math.PI / 2) :
                    (Math.PI / 2);
                ctx.rotate(fallAngle);
            }

            // Draw domino
            ctx.fillStyle = fallen ? '#ff6b6b' : '#42affa';
            ctx.fillRect(-10, -30, 20, 60);
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.strokeRect(-10, -30, 20, 60);

            // Dots
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(0, -12, 3, 0, Math.PI * 2);
            ctx.arc(0, 12, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

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
