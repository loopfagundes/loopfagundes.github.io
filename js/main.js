'use strict';

const sidebar    = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const overlay    = document.getElementById('overlay');
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('nav a');

// ACTIVE NAV ON SCROLL
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('active'));
    const match = document.querySelector(`nav a[href="#${entry.target.id}"]`);
    if (match) match.classList.add('active');
  });
}, { threshold: 0.3 });

sections.forEach(s => activeObserver.observe(s));

// FADE-IN ON SCROLL
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => fadeObserver.observe(s));

// MOBILE SIDEBAR
function openMenu() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden'; // impede scroll do body
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

function toggleMenu() {
  sidebar.classList.contains('open') ? closeMenu() : openMenu();
}

// Fecha ao clicar num link do nav
navLinks.forEach(a => a.addEventListener('click', closeMenu));

// Fecha ao clicar no overlay
if (overlay) overlay.addEventListener('click', closeMenu);

// Fecha ao pressionar ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});
