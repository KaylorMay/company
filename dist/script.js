const root = document.documentElement;
const body = document.body;
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a')];
const progressBar = document.querySelector('.scroll-progress span');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const setMenu = (isOpen) => {
  menuToggle?.classList.toggle('is-open', isOpen);
  menuToggle?.setAttribute('aria-expanded', String(isOpen));
  menuToggle?.setAttribute('aria-label', isOpen ? '关闭导航菜单' : '打开导航菜单');
  mainNav?.classList.toggle('is-open', isOpen);
  body.classList.toggle('menu-open', isOpen);
};

menuToggle?.addEventListener('click', () => setMenu(!mainNav?.classList.contains('is-open')));
navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const searchButton = document.querySelector('.search-button');
const searchPanel = document.querySelector('.search-panel');
const searchInput = document.querySelector('#site-search');
searchButton?.addEventListener('click', () => {
  const isOpen = searchPanel?.classList.toggle('is-open');
  searchButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
  searchPanel?.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) window.setTimeout(() => searchInput?.focus(), 80);
});

const updateScrollUI = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  if (progressBar) progressBar.style.width = `${progress * 100}%`;
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroDots = [...document.querySelectorAll('[data-slide-to]')];
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
const hero = document.querySelector('.hero');
let currentSlide = 0;
let carouselTimer;

const showSlide = (index) => {
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentSlide;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });
  heroDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-selected', String(isActive));
  });
  body.dataset.heroSlide = String(currentSlide);
};

const stopCarousel = () => window.clearInterval(carouselTimer);
const startCarousel = () => {
  stopCarousel();
  if (!reducedMotion.matches) carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 6500);
};

heroPrev?.addEventListener('click', () => { showSlide(currentSlide - 1); startCarousel(); });
heroNext?.addEventListener('click', () => { showSlide(currentSlide + 1); startCarousel(); });
heroDots.forEach((dot) => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slideTo)); startCarousel(); }));
hero?.addEventListener('mouseenter', stopCarousel);
hero?.addEventListener('mouseleave', startCarousel);
hero?.addEventListener('focusin', stopCarousel);
hero?.addEventListener('focusout', (event) => {
  if (!hero.contains(event.relatedTarget)) startCarousel();
});
showSlide(0);
startCarousel();

const revealItems = [...document.querySelectorAll('.reveal')];
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('.form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (formStatus) formStatus.textContent = '感谢留言，演示站点已记录你的需求。正式接入后，这里将连接业务团队。';
  form.reset();
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const anchorTarget = document.querySelector('.anchor-target');
if (anchorTarget) anchorTarget.style.scrollMarginTop = '100px';

root.style.setProperty('--page-loaded', '1');
