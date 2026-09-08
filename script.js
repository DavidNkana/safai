(() => {
  const nav = document.getElementById('nav');
  const navMenu = document.getElementById('navMenu');
  const navMobile = document.getElementById('navMobile');

  // Sticky nav background on scroll
  const onScroll = () => {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (navMenu) {
    navMenu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navMenu.setAttribute('aria-expanded', String(open));
    });
  }

  // Close mobile menu when a link is tapped
  navMobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navMenu?.setAttribute('aria-expanded', 'false');
    });
  });

  // Reveal on scroll — only animate elements that start below the fold
  const targets = document.querySelectorAll(
    '.section__head, .stat, .ecosystem__copy, .ecosystem__diagram, .project, .pillar, .cta__copy, .footer__col, .footer__brand'
  );
  const fold = window.innerHeight * 0.9;
  const animate = [];
  targets.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top > fold) {
      el.classList.add('reveal');
      animate.push(el);
    }
  });

  if ('IntersectionObserver' in window && animate.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    animate.forEach(el => io.observe(el));
  } else {
    animate.forEach(el => el.classList.add('is-in'));
  }

  // Smooth in-page anchors (CSS handles this but we offset for fixed nav)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
