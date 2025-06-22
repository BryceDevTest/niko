const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let W, H;
let columns;
const drops = [];
const fontSize = 16;
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
// You can add more characters or use Katakana only if preferred:
// const characters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";

function initializeMatrix() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    columns = Math.floor(W / fontSize);
    drops.length = 0; // Clear existing drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * H / fontSize); // Random starting position
    }
}

function drawMatrix() {
    // Semi-transparent black background for fading effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, W, H);

    // Green color for the falling characters
    ctx.fillStyle = '#0F0'; // Hacker green
    ctx.font = fontSize + 'px Orbitron, monospace'; // Use Orbitron if loaded, else monospace

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly or if it goes off screen
        if (drops[i] * fontSize > H && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Initialize and start animation
initializeMatrix();
let animationInterval = setInterval(drawMatrix, 35); // Adjust speed here (milliseconds)

// Re-initialize on window resize
window.addEventListener('resize', () => {
    clearInterval(animationInterval); // Stop existing animation
    initializeMatrix();
    animationInterval = setInterval(drawMatrix, 35);
});
