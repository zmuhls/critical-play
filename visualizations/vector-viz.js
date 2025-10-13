// Simplified Vector Visualization - Word association game
function initVectorViz() {
    const canvas = document.getElementById('vectorCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let phase = 0;
    let startTime = Date.now();

    // Word sets with positions
    const words = [
        [
            { text: 'king', x: 0.5, y: 0.5, size: 18, color: '#42affa' },
            { text: 'queen', x: 0.3, y: 0.3, size: 14, color: '#4ecdc4' },
            { text: 'crown', x: 0.7, y: 0.4, size: 14, color: '#4ecdc4' }
        ],
        [
            { text: 'king', x: 0.5, y: 0.5, size: 18, color: '#42affa' },
            { text: 'chess', x: 0.4, y: 0.3, size: 14, color: '#ffeaa7' },
            { text: 'board', x: 0.6, y: 0.3, size: 14, color: '#ffeaa7' }
        ],
        [
            { text: 'king', x: 0.5, y: 0.5, size: 18, color: '#42affa' },
            { text: 'purple', x: 0.2, y: 0.7, size: 14, color: '#ff6b6b' },
            { text: 'Tuesday', x: 0.8, y: 0.7, size: 14, color: '#ff6b6b' }
        ]
    ];

    const labels = [
        'Normal associations',
        'Constrained prompt',
        'Semantic breakdown'
    ];

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
    }

    function draw() {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed > 3) {
            phase = (phase + 1) % 3;
            startTime = Date.now();
        }

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw label
        ctx.fillStyle = words[phase][1].color;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labels[phase], 20, 30);

        // Draw words
        words[phase].forEach((word, i) => {
            const x = word.x * canvas.width;
            const y = word.y * canvas.height;

            // Draw line from king to other words
            if (i > 0) {
                ctx.strokeStyle = word.color + '40';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(words[phase][0].x * canvas.width, words[phase][0].y * canvas.height);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Draw word
            ctx.fillStyle = word.color;
            ctx.font = `bold ${word.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(word.text, x, y);
        });

        animationId = requestAnimationFrame(draw);
    }

    resize();
    draw();

    // Cleanup on navigation
    return () => {
        if (animationId) cancelAnimationFrame(animationId);
    };
}

// Initialize with Reveal.js
if (typeof Reveal !== 'undefined') {
    Reveal.on('slidechanged', event => {
        if (event.currentSlide.querySelector('#vectorCanvas')) {
            initVectorViz();
        }
    });
} else {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVectorViz);
    } else {
        initVectorViz();
    }
}
