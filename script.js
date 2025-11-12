// ===========================
// Theme Toggle Functionality
// ===========================

const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to dark theme
const currentTheme = localStorage.getItem("theme") || "dark";
if (currentTheme === "light") {
  body.classList.add("light-theme");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  // Update icon
  if (body.classList.contains("light-theme")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "dark");
  }
});

// ===========================
// Mobile Navigation Toggle
// ===========================

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  const icon = navToggle.querySelector("i");

  if (navMenu.classList.contains("active")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const icon = navToggle.querySelector("i");
    icon.classList.replace("fa-times", "fa-bars");
  });
});

// ===========================
// Smooth Scrolling
// ===========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===========================
// Navbar Background on Scroll
// ===========================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = "0 4px 6px var(--shadow)";
  } else {
    navbar.style.boxShadow = "none";
  }
});

// ===========================
// Scroll Reveal Animation
// ===========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(
      `.nav-link[href="#${sectionId}"]`
    );

    if (correspondingLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        correspondingLink.classList.add("active");
      } else {
        correspondingLink.classList.remove("active");
      }
    }
  });
});

// ===========================
// EmailJS Configuration
// ===========================

// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
const EMAILJS_PUBLIC_KEY = "4lYa0rxEMQpyBjONq";
const EMAILJS_SERVICE_ID = "service_h7eqocf";
const EMAILJS_TEMPLATE_ID = "service_h7eqocf";

// Check if EmailJS is configured
const isEmailJSConfigured = () => {
  return (
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
    EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID"
  );
};

if (typeof emailjs !== "undefined" && isEmailJSConfigured()) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ===========================
// Contact Form Submission
// ===========================

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validate form
  if (!name || !email || !message) {
    showMessage("Please complete all fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  // Check if EmailJS is configured
  if (!isEmailJSConfigured()) {
    showMessage(
      "Contact form is not configured. Please email me directly.",
      "error"
    );
    return;
  }

  // Disable submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Roberto Martínez García",
      }
    );

    if (response.status === 200) {
      showMessage(
        "Message sent successfully! I will get back to you soon.",
        "success"
      );
      contactForm.reset();
    } else {
      throw new Error("Error sending email");
    }
  } catch (error) {
    console.error("Error:", error);
    showMessage(
      "There was an error sending your message. Please try again or contact me directly by email.",
      "error"
    );
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
    formMessage.className = "form-message";
  }, 5000);
}

// ===========================
// CV Download Modal Logic
// ===========================

const downloadCvBtn = document.getElementById("download-cv-btn");
const cvModal = document.getElementById("cv-modal");
const modalClose = cvModal ? cvModal.querySelector(".modal-close") : null;
const modalOverlay = cvModal ? cvModal.querySelector(".modal-overlay") : null;

function openCvModal() {
  if (!cvModal) return;
  cvModal.classList.remove("hidden");
  // set aria-expanded on the opener
  if (downloadCvBtn) downloadCvBtn.setAttribute("aria-expanded", "true");
  // save previously focused element
  cvModal._previouslyFocused = document.activeElement;
  // focus first focusable inside modal
  const focusable = cvModal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length) focusable[0].focus();
  document.addEventListener("focus", trapFocus, true);
}

function closeCvModal() {
  if (!cvModal) return;
  cvModal.classList.add("hidden");
  if (downloadCvBtn) downloadCvBtn.setAttribute("aria-expanded", "false");
  // restore focus
  if (cvModal._previouslyFocused) cvModal._previouslyFocused.focus();
  document.removeEventListener("focus", trapFocus, true);
}

// Simple focus trap: keep focus inside modal while open
function trapFocus(e) {
  if (!cvModal || cvModal.classList.contains("hidden")) return;
  if (!cvModal.contains(e.target)) {
    // redirect focus to first focusable
    const focusable = cvModal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) {
      e.stopPropagation();
      focusable[0].focus();
    }
  }
}

if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openCvModal();
  });
}

if (modalClose) {
  modalClose.addEventListener("click", () => closeCvModal());
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", () => closeCvModal());
}

// Also close modal if clicking on the modal backdrop area (cvModal itself)
if (cvModal) {
  cvModal.addEventListener("click", (e) => {
    if (e.target === cvModal) closeCvModal();
  });
}

// Close modal on Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCvModal();
});

// Handle flag button downloads
document.querySelectorAll(".flag-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const file = btn.getAttribute("data-file");
    if (!file) return;

    // Try fetching the file; if it exists, download it. If not, fall back to a small placeholder file.
    try {
      const res = await fetch(file, { method: "HEAD" });
      if (res && res.ok) {
        // download by creating a link to the URL
        const a = document.createElement("a");
        a.href = file;
        a.setAttribute("download", file.split("/").pop());
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        closeCvModal();
        return;
      }
    } catch (err) {
      // head request failed, we'll use fallback below
    }

    // Fallback: generate a tiny placeholder file (static-friendly)
    const isEnglish = file.toLowerCase().includes("en");
    const content = isEnglish
      ? "Robert Gost Montoliu - CV (English)\n\nThis is a placeholder file. Replace assets/cv_en.pdf with your real PDF."
      : "Robert Gost Montoliu - CV (Japanese)\n\nThis is a placeholder file. Replace assets/cv_jp.pdf with your real PDF.";

    const blob = new Blob([content], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", file.split("/").pop());
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    closeCvModal();
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

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero && scrolled < hero.offsetHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / hero.offsetHeight;
  }
});

// ===========================
// Skill Card Animation on Scroll
// ===========================

const skillCards = document.querySelectorAll(".skill-card");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 50);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

skillCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.5s ease";
  skillObserver.observe(card);
});

// ===========================
// Slide-in for Skills & Languages lists
// ===========================

const skillBoxes = document.querySelectorAll(".skill-box");

const skillBoxObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const box = entry.target;
        box.classList.add("in");
        // stop observing once animated
        skillBoxObserver.unobserve(box);
      }
    });
  },
  { threshold: 0.15 }
);

skillBoxes.forEach((box, i) => {
  // set starting side: even -> from left, odd -> from right
  if (i % 2 === 1) box.classList.add("from-right");
  skillBoxObserver.observe(box);
});

// ===========================
// Project Card Animation on Scroll
// ===========================

const projectCards = document.querySelectorAll(".project-card");

const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

projectCards.forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";
  projectObserver.observe(card);
});

// ===========================
// Console Welcome Message
// ===========================

console.log(
  "%cHello! 👋",
  "color: #00d4ff; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cInterested in the code? Visit my GitHub: https://github.com/robmg9655",
  "color: #7dd3c0; font-size: 14px;"
);
console.log(
  "%cIf you want to contact me, use the form on the page 😊",
  "color: #a1a1aa; font-size: 12px;"
);
