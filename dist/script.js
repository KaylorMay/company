const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');
const progressBar = document.querySelector('.scroll-progress span');
const heroVisual = document.querySelector('.hero-visual');
const signalOrb = document.querySelector('.signal-orb');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

const capabilityItems = document.querySelectorAll('.capability-item');
const graphics = document.querySelectorAll('.stage-graphic');
const currentStep = document.querySelector('.current-step');

capabilityItems.forEach((item) => {
  item.addEventListener('click', () => {
    const selected = item.dataset.capability;
    capabilityItems.forEach((button) => button.classList.toggle('active', button === item));
    graphics.forEach((graphic) => graphic.classList.toggle('active', graphic.dataset.graphic === selected));
    if (currentStep) currentStep.textContent = String(Number(selected) + 1);
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  sectionLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('is-current', isCurrent);
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .2, .6] });

sections.forEach((section) => sectionObserver.observe(section));

const updateScrollUI = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  if (progressBar) progressBar.style.width = `${progress * 100}%`;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

if (heroVisual && signalOrb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 16;
    signalOrb.style.setProperty('--parallax-x', `${x.toFixed(2)}px`);
    signalOrb.style.setProperty('--parallax-y', `${y.toFixed(2)}px`);
  });

  heroVisual.addEventListener('pointerleave', () => {
    signalOrb.style.setProperty('--parallax-x', '0px');
    signalOrb.style.setProperty('--parallax-y', '0px');
  });
}

const statItems = document.querySelectorAll('.stat-item strong[data-count]');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const target = entry.target;
    const end = Number(target.dataset.count);
    const decimals = Number(target.dataset.decimals || 0);
    const startTime = performance.now();
    const duration = 1100;
    const textNode = target.firstChild;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (textNode) textNode.nodeValue = (end * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    observer.unobserve(target);
  });
}, { threshold: .7 });

statItems.forEach((item) => counterObserver.observe(item));

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formStatus) formStatus.textContent = '感谢你的留言，开心金融已收到这份关注。';
  contactForm.reset();
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
