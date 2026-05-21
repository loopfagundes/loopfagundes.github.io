
// ── ACTIVE NAV ON SCROLL ────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(a => a.classList.remove('active'));

    const match = document.querySelector(`nav a[href="#${entry.target.id}"]`);
    if (match) match.classList.add('active');
  });
}, { threshold: 0.3 });

sections.forEach(s => activeObserver.observe(s));

// ── FADE-IN ON SCROLL ────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.1 });

sections.forEach(s => fadeObserver.observe(s));

// ── MOBILE SIDEBAR ───────────────────────────────
const sidebar   = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');

function toggleMenu() {
  sidebar.classList.toggle('open');
}

// Close sidebar when a nav link is clicked on mobile
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});

// Close sidebar when clicking outside (mobile)
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});
