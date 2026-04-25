// Copy Email Functionality
function copyEmail() {
    const emailText = document.getElementById('email-text').innerText;
    
    // Copy to clipboard
    navigator.clipboard.writeText(emailText).then(() => {
        const tooltip = document.getElementById('copy-tooltip');
        tooltip.classList.add('show');
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

// Canvas Starfield Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 150; // Adjust for more or less stars

// Setup canvas dimensions
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

// Initialize canvas
resizeCanvas();

// Star Object
class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random size between 0.5 and 2
        this.size = Math.random() * 1.5 + 0.5;
        // Brightness / Opacity
        this.baseAlpha = Math.random() * 0.5 + 0.1;
        this.alpha = this.baseAlpha;
        // Drift speed
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        // For twinkling
        this.blinkSpeed = (Math.random() * 0.02) + 0.005;
        this.blinkDir = Math.random() > 0.5 ? 1 : -1;
        
        // Optional: Some stars can have a slight reddish tint to match theme
        this.color = Math.random() > 0.95 ? '255, 51, 68' : '255, 255, 255';
    }

    update() {
        // Move star
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Twinkle effect
        this.alpha += this.blinkSpeed * this.blinkDir;
        if (this.alpha <= 0.1) {
            this.blinkDir = 1;
        } else if (this.alpha >= 0.8) {
            this.blinkDir = -1;
        }
        
        // Optional subtle mouse parallax
        this.x += (mouseX - width/2) * 0.0001;
        this.y += (mouseY - height/2) * 0.0001;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        
        // Add subtle glow
        if (this.size > 1.2) {
            ctx.shadowBlur = 4;
            ctx.shadowColor = `rgba(${this.color}, ${this.alpha})`;
        } else {
            ctx.shadowBlur = 0;
        }
        
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

initStars();

// Mouse tracking for subtle parallax
let mouseX = width / 2;
let mouseY = height / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animation loop
function animate() {
    // Clear canvas with dark color
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

animate();

// --- Image Modal Logic ---
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("modalCaption");
const closeModal = document.querySelector(".close-modal");
const certCards = document.querySelectorAll(".cert-card");

if (modal && certCards.length > 0) {
    certCards.forEach(card => {
        card.addEventListener("click", function() {
            const img = this.querySelector("img");
            const title = this.querySelector(".cert-title").innerText;
            
            modal.style.display = "flex";
            // Small delay to allow display:flex to apply before adding class for transition
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
            
            modalImg.src = img.src;
            captionText.innerText = title;
        });
    });

    function hideModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // match CSS transition duration
    }

    closeModal.addEventListener("click", hideModal);

    // Close on clicking outside the image
    modal.addEventListener("click", function(e) {
        if (e.target !== modalImg && e.target !== captionText) {
            hideModal();
        }
    });
}

// --- Text Modal Logic for Class Logs ---
const textModal = document.getElementById("textModal");
const textModalTitle = document.getElementById("textModalTitle");
const textModalBody = document.getElementById("textModalBody");
const closeTextModal = document.querySelector(".close-text-modal");
const logCards = document.querySelectorAll(".log-card");

if (textModal && logCards.length > 0) {
    logCards.forEach(card => {
        card.addEventListener("click", function() {
            const day = this.querySelector(".log-day").innerText;
            const title = this.querySelector(".log-date").innerText;
            const contentHTML = this.querySelector(".log-content").innerHTML;
            
            textModalTitle.innerText = `${day} - ${title}`;
            textModalBody.innerHTML = contentHTML;
            
            textModal.style.display = "flex";
            // Small delay to allow display:flex to apply before adding class for transition
            setTimeout(() => {
                textModal.classList.add("show");
            }, 10);
        });
    });

    function hideTextModal() {
        textModal.classList.remove("show");
        
        // Pause any playing videos immediately
        const videos = textModalBody.querySelectorAll("video");
        videos.forEach(video => video.pause());
        
        setTimeout(() => {
            textModal.style.display = "none";
            textModalBody.innerHTML = ""; // Clear content to fully reset state
        }, 300); // match CSS transition duration
    }

    closeTextModal.addEventListener("click", hideTextModal);

    // Close on clicking outside the content area
    textModal.addEventListener("click", function(e) {
        if (e.target === textModal) {
            hideTextModal();
        }
    });
}
