// Domino Effect Visualization - Game constraints cascading into AI failures
function initDominoViz() {
    const canvas = document.getElementById('dominoCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let phase = 0;
    let startTime = Date.now();

    const dominos = ['Rule', 'Logic', 'Context', 'Hallucinate', 'Confabulate', 'Break', 'Fail'];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
    }

    function draw() {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / 5, 1);
        const fallenCount = Math.floor(progress * dominos.length);

        if (progress >= 1) {
            startTime = Date.now();
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Label
        ctx.fillStyle = '#ff6b6b';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Constraint cascade', 20, 30);

        // Draw dominos
        const spacing = Math.min(80, (canvas.width - 100) / dominos.length);
        const startX = 50;
        const baseY = canvas.height - 100;

        dominos.forEach((label, i) => {
            const x = startX + i * spacing;
            const fallen = i < fallenCount;
            const angle = fallen ? Math.PI / 2 : 0;

            ctx.save();
            ctx.translate(x, baseY);
            ctx.rotate(angle);

            // Domino
            const color = fallen ? '#ff6b6b' : '#42affa';
            ctx.fillStyle = color;
            ctx.fillRect(-15, -40, 30, 60);
            ctx.strokeStyle = 'rgba(255,255,255,0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(-15, -40, 30, 60);

            // Label
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 9px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(label, 0, 0);

            ctx.restore();

            // Arrow
            if (fallen && i < dominos.length - 1) {
                const nextX = startX + (i + 1) * spacing;
                ctx.strokeStyle = '#ff6b6b80';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(x + 15, baseY);
                ctx.lineTo(nextX - 15, baseY);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });

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
