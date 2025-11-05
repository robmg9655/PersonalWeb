// ===========================
// Theme Toggle Functionality
// ===========================

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Update icon
    if (body.classList.contains('light-theme')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ===========================
// Mobile Navigation Toggle
// ===========================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
    });
});

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Background on Scroll
// ===========================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 6px var(--shadow)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===========================
// Scroll Reveal Animation
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active');
            } else {
                correspondingLink.classList.remove('active');
            }
        }
    });
});

// ===========================
// EmailJS Configuration
// ===========================

// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

// Check if EmailJS is configured
const isEmailJSConfigured = () => {
    return EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' 
        && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' 
        && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID';
};

if (typeof emailjs !== 'undefined' && isEmailJSConfigured()) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===========================
// Contact Form Submission
// ===========================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
        showMessage('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor, introduce un email válido.', 'error');
        return;
    }
    
    // Check if EmailJS is configured
    if (!isEmailJSConfigured()) {
        showMessage('El formulario de contacto aún no está configurado. Por favor, contáctame directamente por email.', 'error');
        return;
    }
    
    // Disable submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Roberto Martínez García'
            }
        );
        
        if (response.status === 200) {
            showMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Error sending email');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctame directamente por email.', 'error');
    } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Show form message
function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ===========================
// Profile Image Fallback
// ===========================

const profileImg = document.getElementById('profile-img');

// Create a placeholder profile image if the actual image doesn't load
profileImg.addEventListener('error', function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23131842"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="80" fill="%2300d4ff"%3ERM%3C/text%3E%3C/svg%3E';
});

// ===========================
// Project Image Placeholders
// ===========================

const projectImages = document.querySelectorAll('.project-image img');

projectImages.forEach((img, index) => {
    img.addEventListener('error', function() {
        const colors = ['%2300d4ff', '%237dd3c0', '%2300b8e6'];
        const color = colors[index % colors.length];
        this.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23131842"/%3E%3Ccircle cx="200" cy="150" r="50" fill="${color}" opacity="0.3"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" fill="${color}"%3EProyecto ${index + 1}%3C/text%3E%3C/svg%3E`;
    });
});

// ===========================
// Typing Effect for Hero Subtitle (Optional Enhancement)
// ===========================
// To enable the typing effect, uncomment the code below and call initTypingEffect()

// function initTypingEffect() {
//     const heroSubtitle = document.querySelector('.hero-subtitle');
//     const subtitleText = heroSubtitle.textContent;
//     let charIndex = 0;
//     
//     function typeEffect() {
//         if (charIndex < subtitleText.length) {
//             heroSubtitle.textContent = subtitleText.substring(0, charIndex + 1);
//             charIndex++;
//             setTimeout(typeEffect, 50);
//         }
//     }
//     
//     heroSubtitle.textContent = '';
//     setTimeout(typeEffect, 1000);
// }

// ===========================
// Parallax Effect for Hero Section
// ===========================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / hero.offsetHeight;
    }
});

// ===========================
// Skill Card Animation on Scroll
// ===========================

const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}, {
    threshold: 0.1
});

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    skillObserver.observe(card);
});

// ===========================
// Project Card Animation on Scroll
// ===========================

const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
});

// ===========================
// Console Welcome Message
// ===========================

console.log(
    '%c¡Hola! 👋',
    'color: #00d4ff; font-size: 24px; font-weight: bold;'
);
console.log(
    '%c¿Interesado en el código? Visita mi GitHub: https://github.com/robmg9655',
    'color: #7dd3c0; font-size: 14px;'
);
console.log(
    '%cSi quieres contactarme, usa el formulario de la página 😊',
    'color: #a1a1aa; font-size: 12px;'
);
