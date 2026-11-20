const root = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.rail-nav');
const rail = document.querySelector('.rail');
const navLinks = document.querySelectorAll('.rail-nav a');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#08111f' : '#f8fafc');
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(dark));
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.innerHTML = `<i class="fa-regular fa-${dark ? 'sun' : 'moon'}"></i><span>${dark ? 'Light mode' : 'Dark mode'}</span>`;
  });
}

applyTheme(localStorage.getItem('portfolio-theme') || 'light');
themeButtons.forEach((button) => button.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
}));

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = rail.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('i').className = `fa-solid fa-${open ? 'xmark' : 'bars'}`;
  });
}

navLinks.forEach((link) => link.addEventListener('click', () => {
  navLinks.forEach((item) => item.classList.remove('active'));
  link.classList.add('active');
  rail?.classList.remove('is-open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.querySelector('i').className = 'fa-solid fa-bars';
}));

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = new Map(
  [...navLinks].map((link) => [link.getAttribute('href').slice(1), link]),
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach((link) => link.classList.remove('active'));
    sectionLinks.get(visibleSection.target.id)?.classList.add('active');
  },
  { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.2, 0.4] },
);

sections.forEach((section) => sectionObserver.observe(section));
