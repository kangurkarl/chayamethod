/* ============================================
   Chaya Method - Main JavaScript
   ============================================ */

(function () {
  'use strict';

  // ---- Scroll animations (Intersection Observer) ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.animate-in').forEach((el) => observer.observe(el));

  // ---- Navbar scroll state ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ---- Language toggle ----
  const langToggle = document.getElementById('langToggle');
  const enBtn = langToggle.querySelector('.lang-toggle__en');
  const thBtn = langToggle.querySelector('.lang-toggle__th');

  function setLang(lang) {
    if (lang === 'th') {
      document.body.classList.remove('thai-hidden');
      enBtn.classList.remove('active');
      thBtn.classList.add('active');
    } else {
      document.body.classList.add('thai-hidden');
      enBtn.classList.add('active');
      thBtn.classList.remove('active');
    }
    localStorage.setItem('chayamethod-lang', lang);
  }

  enBtn.addEventListener('click', () => setLang('en'));
  thBtn.addEventListener('click', () => setLang('th'));

  // Init language from localStorage
  const savedLang = localStorage.getItem('chayamethod-lang') || 'en';
  setLang(savedLang);

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth',
        });
      }
    });
  });
})();
