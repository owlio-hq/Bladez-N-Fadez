/* ============================================================
   BLADEZ N FADEZ — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Custom Cursor ──
  const cursorDot  = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0,  ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top  = mouseY + 'px';
    }
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactables = document.querySelectorAll('a, button, .service-card, .review-card, .barber-chip');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorRing) { cursorRing.style.width = '44px'; cursorRing.style.height = '44px'; }
      if (cursorDot)  { cursorDot.style.transform = 'translate(-50%,-50%) scale(1.6)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cursorRing) { cursorRing.style.width = '28px'; cursorRing.style.height = '28px'; }
      if (cursorDot)  { cursorDot.style.transform = 'translate(-50%,-50%) scale(1)'; }
    });
  });

  // ── Navbar Scroll Shadow ──
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }
    // Scroll to top visibility
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  // ── Mobile Hamburger / Drawer ──
  const hamburger    = document.querySelector('.hamburger');
  const navDrawer    = document.querySelector('.nav-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    hamburger && hamburger.classList.add('open');
    navDrawer && navDrawer.classList.add('open');
    drawerOverlay && drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    hamburger && hamburger.classList.remove('open');
    navDrawer && navDrawer.classList.remove('open');
    drawerOverlay && drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  drawerOverlay && drawerOverlay.addEventListener('click', closeDrawer);
  navDrawer && navDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // ── Active Nav Link ──
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const pageName = href.split('/').pop();
    if (pageName === currentPath ||
        (currentPath === '' && pageName === 'index.html') ||
        (currentPath === 'index.html' && pageName === 'index.html')) {
      if (!a.classList.contains('nav-book')) a.classList.add('active');
    }
  });

  // ── Scroll-to-Top ──
  const scrollTopBtn = document.querySelector('.scroll-top');
  scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── IntersectionObserver: Reveal on Scroll ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealEls.length) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObs.observe(el));
  }

  // ── Stagger children reveal ──
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = container.children;
    Array.from(children).forEach((child, i) => {
      child.dataset.delay = i * 120;
      child.classList.add('reveal');
    });
  });

  // ── Hero page-load animation ──
  const heroItems = document.querySelectorAll('.hero-animate');
  heroItems.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 160);
  });

});
