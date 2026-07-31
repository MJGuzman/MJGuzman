const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); themeToggle.textContent = document.body.classList.contains('dark') ? 'â˜¾' : 'â˜¼'; });
menuToggle.addEventListener('click', () => { const isOpen = mobileNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', isOpen); });
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => mobileNav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();
