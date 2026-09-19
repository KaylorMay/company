const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

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

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (formStatus) formStatus.textContent = '感谢你的留言，xx 已收到这份关注。';
  contactForm.reset();
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
