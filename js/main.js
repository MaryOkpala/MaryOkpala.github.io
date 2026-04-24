// ═══════════════════════════════════════
//  MARY OKPALA — PORTFOLIO v2
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── TYPED TITLE ──
  const titles = [
    'DevOps Engineer',
    'CI/CD Pipeline Architect',
    'Infrastructure as Code',
    'Kubernetes · GitOps',
    'Cloud Automation'
  ];

  let titleIdx = 0, charIdx = 0, deleting = false;
  const el = document.getElementById('typed-title');

  function typeLoop() {
    if (!el) return;
    const current = titles[titleIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 80);
  }
  typeLoop();

  // ── ACTIVE NAV ON SCROLL ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => navObserver.observe(s));

  // ── REVEAL ON SCROLL ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── SKILL BARS ANIMATE ──
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sb-fill').forEach(bar => {
          const w = bar.getAttribute('data-width');
          setTimeout(() => { bar.style.width = w + '%'; }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-cat').forEach(cat => skillObserver.observe(cat));

  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.querySelector('.nav-links');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
    });

    navLinksList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
      });
    });
  }

  // ── NAV SCROLL SHADOW ──
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('nav');
    if (nav) {
      nav.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(0,0,0,0.4)'
        : 'none';
    }
  });

  // ── CONTACT FORM ──
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('form-success');
      if (success) {
        success.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
          window.open('https://www.linkedin.com/in/mary-okpalaa', '_blank');
        }, 1500);
      }
    });
  }

  // ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
