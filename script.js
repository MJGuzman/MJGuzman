const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') document.body.classList.add('dark');
themeToggle.addEventListener('click', () => { document.body.classList.toggle('dark'); localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); themeToggle.textContent = document.body.classList.contains('dark') ? 'â˜¾' : 'â˜¼'; });
menuToggle.addEventListener('click', () => { const isOpen = mobileNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', isOpen); });
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => mobileNav.classList.remove('open')));
document.querySelector('#year').textContent = new Date().getFullYear();

// Repairs common UTF-8/Windows-1252 mojibake if it appears in the deployed page.
const mojibakeMap = {
  '\u00c3\u00a1': '\u00e1', '\u00c3\u00a9': '\u00e9', '\u00c3\u00ad': '\u00ed',
  '\u00c3\u00b3': '\u00f3', '\u00c3\u00ba': '\u00fa', '\u00c3\u00b1': '\u00f1',
  '\u00c3\u0081': '\u00c1', '\u00c3\u0089': '\u00c9', '\u00c3\u008d': '\u00cd',
  '\u00c3\u0093': '\u00d3', '\u00c3\u009a': '\u00da', '\u00c3\u0091': '\u00d1',
  '\u00c2\u00bf': '\u00bf', '\u00c2\u00a1': '\u00a1', '\u00c2\u00a9': '\u00a9'
};
const repairText = (node) => {
  let text = node.nodeValue;
  Object.entries(mojibakeMap).forEach(([broken, fixed]) => { text = text.split(broken).join(fixed); });
  node.nodeValue = text;
};
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (walker.nextNode()) repairText(walker.currentNode);
