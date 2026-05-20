/* ═══════════════════════════════════
   CURSEUR PERSONNALISÉ
═══════════════════════════════════ */
const cur = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
  setTimeout(() => {
    trail.style.left = mx + 'px';
    trail.style.top = my + 'px';
  }, 80);
});

/* ═══════════════════════════════════
   PARTICULES ANIMÉES
═══════════════════════════════════ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function makePts() {
  pts = [];
  for (let i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4,
      r: Math.random() * 1.5 + .3,
      c: Math.random() > .5 ? 'rgba(0,245,255,' : 'rgba(255,45,120,'
    });
  }
}
makePts();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c + '.7)';
    ctx.shadowColor = p.c + '1)';
    ctx.shadowBlur = 6;
    ctx.fill();

    pts.forEach(q => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = p.c + (1 - d / 120) * .12 + ')';
        ctx.lineWidth = .5;
        ctx.shadowBlur = 0;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ═══════════════════════════════════
   MENU MOBILE
═══════════════════════════════════ */
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

/* ═══════════════════════════════════
   NAVBAR ACTIVE AU SCROLL
═══════════════════════════════════ */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

/* ═══════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => observer.observe(el));

/* ═══════════════════════════════════
   BARRES DE COMPÉTENCES ANIMÉES
═══════════════════════════════════ */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = e.target.getAttribute('data-width');
      setTimeout(() => { e.target.style.width = target + '%'; }, 300);
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => barObserver.observe(b));
