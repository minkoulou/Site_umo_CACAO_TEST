/* ══════════════════════════════════════════════
   UMO.PRO.CAO.E.SCOOPS — main.js (Dark Mode + Full Features)
══════════════════════════════════════════════ */

/* ── Dark Mode ── */
const html = document.documentElement;
const darkToggle = document.getElementById('dark-toggle');
const darkIcon   = document.getElementById('dark-icon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('umo-theme', theme);
  if (darkIcon) darkIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Init from saved preference or system
const saved = localStorage.getItem('umo-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
const isSubPage = window.location.pathname.includes('/pages/');

if (navbar) {
  if (isSubPage) { navbar.classList.add('page-nav', 'scrolled'); }
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 80;
    navbar.classList.toggle('scrolled', scrolled || isSubPage);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── Back to top ── */
if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Mobile menu ── */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');
let menuOpen = false;

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('hidden', !menuOpen);
    if (menuOpen) {
      bar1.style.transform = 'rotate(45deg) translate(4px, 5px)';
      bar2.style.opacity = '0';
      bar3.style.transform = 'rotate(-45deg) translate(4px, -5px)';
    } else {
      bar1.style.transform = '';
      bar2.style.opacity = '';
      bar3.style.transform = '';
    }
  });
}

/* ── Intersection Observer for reveal animations ── */
const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => observer.observe(el));

/* ── Animated counter ── */
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString('fr-FR');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString('fr-FR');
    }
  }, 16);
}
const counters = document.querySelectorAll('.counter[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ── Active nav link ── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.endsWith(currentPage)) {
    link.classList.add('text-forest-600', 'font-semibold');
    link.style.borderBottom = '2px solid #2d6330';
  }
});

/* ── Lightbox ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach(el => {
  el.addEventListener('click', () => {
    const src = el.getAttribute('data-lightbox');
    if (lightboxImg) lightboxImg.src = src;
    if (lightbox) lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── Contact form ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const successMsg = document.getElementById('form-success');
  const submitBtn  = document.getElementById('form-submit');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name  = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const msg   = document.getElementById('message')?.value.trim();
    if (!name || !email || !msg) { showFormError('Veuillez remplir tous les champs obligatoires.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFormError('Email invalide.'); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';
    await new Promise(r => setTimeout(r, 1200));
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer le message →';
    if (successMsg) { successMsg.classList.remove('hidden'); setTimeout(() => successMsg.classList.add('hidden'), 6000); }
  });
}
function showFormError(msg) {
  let err = document.getElementById('form-error');
  if (!err) { err = document.createElement('p'); err.id = 'form-error'; err.className = 'text-red-500 text-sm mt-2'; document.getElementById('contact-form')?.appendChild(err); }
  err.textContent = msg;
  setTimeout(() => { if (err) err.textContent = ''; }, 4000);
}

/* ── Newsletter ── */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    if (input && input.value) {
      const btn = newsletterForm.querySelector('button');
      if (btn) { btn.textContent = '✓ Inscrit !'; btn.disabled = true; }
      input.value = '';
      setTimeout(() => { if (btn) { btn.textContent = "S'inscrire"; btn.disabled = false; } }, 3000);
    }
  });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Blog search & filter ── */
const searchInput = document.getElementById('blog-search');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.blog-card').forEach(card => {
      card.parentElement.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });
}

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = !answer.classList.contains('hidden');
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
    document.querySelectorAll('.faq-icon').forEach(i => { i.textContent = '+'; });
    if (!isOpen) { answer.classList.remove('hidden'); btn.querySelector('.faq-icon').textContent = '−'; }
  });
});

/* ── Blog filter ── */
window.filterPosts = function(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('bg-forest-600','text-white');
    btn.classList.add('bg-forest-100','text-forest-700');
  });
  const activeBtn = document.querySelector(`[data-filter="${category}"]`);
  if (activeBtn) { activeBtn.classList.remove('bg-forest-100','text-forest-700'); activeBtn.classList.add('bg-forest-600','text-white'); }
  let visible = 0;
  document.querySelectorAll('.blog-card').forEach(article => {
    const show = category === 'all' || article.dataset.category === category;
    article.parentElement.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const noResults = document.getElementById('no-results');
  if (noResults) noResults.classList.toggle('hidden', visible > 0);
};

console.log('%c🌿 UMO.PRO.CAO.E.SCOOPS', 'color:#2d6330;font-size:1.2rem;font-weight:bold');
console.log('%cSite développé par NZ STUDIO Creative', 'color:#a96a30;font-size:0.9rem');

/* ── Image smooth load ── */
document.querySelectorAll('img').forEach(img => {
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

/* ── Scroll progress bar ── */
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  }, { passive: true });
}
