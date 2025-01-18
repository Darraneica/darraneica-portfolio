  // Loading animation
  window.addEventListener('load', () => {
    document.querySelector('.loading').style.display = 'none';
});

// Theme toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            const isDark = root.getAttribute('data-theme') === 'dark';
            root.setAttribute('data-theme', isDark ? 'light' : 'dark');
            themeToggle.textContent = isDark ? '🌙' : '☀️';
        });
    } else {
        console.error('Theme toggle button not found!');
    }
});



// Particle Animation
function initParticles() {
    const canvas = document.querySelector('.particles');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary')
                .trim();
            ctx.globalAlpha = 0.2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

// Custom Cursor
function initCustomCursor() {
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            document.querySelectorAll('.magnetic').forEach(el => {
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(mouseX - centerX, 2) + 
                    Math.pow(mouseY - centerY, 2)
                );
                
                if (distance < 100) {
                    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
                    const force = (100 - distance) / 100;
                    const moveX = Math.cos(angle) * force * 20;
                    const moveY = Math.sin(angle) * force * 20;
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
                } else {
                    el.style.transform = '';
                }
            });
        });

        function loop() {
            posX += (mouseX - posX) * 0.1;
            posY += (mouseY - posY) * 0.1;
            
            follower.style.transform = `translate(${posX}px, ${posY}px)`;
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            
            requestAnimationFrame(loop);
        }
        loop();

        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            follower.style.display = 'none';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            follower.style.display = 'block';
        });
    }
}

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.querySelector('.skill-progress')) {
                    const progress = entry.target.querySelector('.skill-progress');
                    progress.style.transform = `scaleX(${progress.dataset.progress / 100})`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .skill-card, .project-card').forEach(el => observer.observe(el));
}

// Project filtering
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category.includes(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Form validation and handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        if (name.value.length < 2) {
            document.querySelector('[for="name"] + input + .error-message').textContent = 'Name must be at least 2 characters';
            isValid = false;
        }
        
        if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            document.querySelector('[for="email"] + input + .error-message').textContent = 'Please enter a valid email';
            isValid = false;
        }
        
        if (message.value.length < 10) {
            document.querySelector('[for="message"] + textarea + .error-message').textContent = 'Message must be at least 10 characters';
            isValid = false;
        }
        
        if (isValid) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Sending...</span> 📨';
            submitButton.disabled = true;
            
            const formData = new FormData(form);
            
            try {
                // Send the form data to FormSubmit without redirecting
                const response = await fetch('https://formsubmit.co/ajax/c517c285e0f8e6fa3b7930f0eabc6ac9', {
                    method: 'POST',
                    body: formData,
                });
                
                const result = await response.json();
                
                if (result.success) {
                    alert('Thanks for your message! I\'ll get back to you soon.');
                    form.reset();
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            }
            
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}




// Smooth scroll initialization
function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
        });
    }
});
});
}

// Parallax effect initialization
function initParallax() {
const elements = document.querySelectorAll('.parallax-element');

window.addEventListener('mousemove', e => {
const { clientX, clientY } = e;
const x = (clientX - window.innerWidth / 2) / 20;
const y = (clientY - window.innerHeight / 2) / 20;

elements.forEach(el => {
    const speed = el.dataset.speed || 1;
    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
});
});
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCustomCursor();
    initScrollAnimations();
    initProjectFilters();
    initContactForm();
    initSmoothScroll();
    initParallax();

    // Initialize typing animation
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const text = typingElement.textContent;
        setTimeout(() => typeWriter(typingElement, text), 1000);
    }
});