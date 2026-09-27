/* ===================================================
   RENTAL MOBIL DUA PUTRA CIKARANG — MAIN JS (WARM MINIMALIST)
   =================================================== */

'use strict';

// ── NAVBAR SCROLL EFFECT ──
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = current;
}, { passive: true });

// ── HAMBURGER MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMobileMenu(); });
}

// ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const noticeHeight = document.querySelector('.notice-bar')?.offsetHeight || 0;
      const navHeight = navbar?.offsetHeight || 0;
      const offset = noticeHeight + navHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── INTERSECTION OBSERVER (SCROLL REVEAL) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ── IMAGE ERROR HANDLING ──
function handleImageErrors() {
  // Car card images
  document.querySelectorAll('.car-card-img').forEach(img => {
    const wrapper = img.closest('.car-card-img-wrapper');
    const onError = () => {
      if (wrapper) wrapper.classList.add('img-error');
    };
    if (img.complete && img.naturalWidth === 0) {
      onError();
    } else {
      img.addEventListener('error', onError, { once: true });
    }
  });
}

handleImageErrors();

// ── ANIMATED COUNTER ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = (el.dataset.prefix || '') + Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── NOTICE BAR MARQUEE DUPLICATE ──
const noticeText = document.querySelector('.notice-text');
if (noticeText) {
  const clone = noticeText.cloneNode(true);
  noticeText.parentNode.appendChild(clone);
}

// ── ACTIVE NAV LINK ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── CONSOLE EASTER EGG ──
console.log('%c🚗 Rental Mobil Dua Putra Cikarang', 'color:#8D6E63;font-family:monospace;font-size:18px;font-weight:bold;');
console.log('%cWhatsApp Resmi: 0813-1526-0100', 'color:#333333;font-family:monospace;font-size:14px;');
console.log('%cJl. Kedasih XI No.1A, Mekarmukti, Cikarang Utara, Bekasi 17530', 'color:#777777;font-family:monospace;font-size:12px;');
