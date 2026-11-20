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
