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

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
}[character]));

const renderPortfolio = (data) => {
  document.querySelector('.brand span:last-child').innerHTML = escapeHtml(data.brand).replace(' ', ' <em>') + '</em>';
  document.querySelector('.eyebrow').innerHTML = `<span class="status-dot"></span> ${escapeHtml(data.hero.eyebrow)}`;
  document.querySelector('.hero h1').innerHTML = `${escapeHtml(data.hero.titleLineOne)}<br /><span>${escapeHtml(data.hero.titleAccent)}</span> ${escapeHtml(data.hero.titleLineTwo)}`;
  document.querySelector('.hero-text').textContent = data.hero.description;
  document.querySelector('.hero-tech').innerHTML = `<span>Especializado en</span>${data.hero.specialties.map((item) => `<strong>${escapeHtml(item)}</strong>`).join('')}`;
  document.querySelector('.about h2').innerHTML = `${escapeHtml(data.about.title[0])}<br /><span>${escapeHtml(data.about.title[1])}</span><br />${escapeHtml(data.about.title[2])}`;
  document.querySelector('.about-copy').innerHTML = data.about.paragraphs.map((item) => `<p>${escapeHtml(item)}</p>`).join('');
  document.querySelector('.stats').innerHTML = data.stats.map((item) => `<div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>`).join('');
  document.querySelector('.timeline').innerHTML = data.experience.map((item, index) => `<article class="timeline-item${item.current ? ' current' : ''}"><div class="timeline-marker"></div><div class="timeline-meta"><span>${escapeHtml(item.period)}</span><b>${String(index + 1).padStart(2, '0')}</b></div><div class="timeline-content"><h3>${escapeHtml(item.role)}</h3><p class="company">${escapeHtml(item.company)}${item.client ? ` <span>â†’ ${escapeHtml(item.client)}</span>` : ''}</p><p>${escapeHtml(item.description)}</p><div class="tags">${item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div></div></article>`).join('');
  document.querySelector('.stack-grid').innerHTML = data.stack.map((item) => `<div class="stack-card"><span class="stack-icon">${escapeHtml(item.icon)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join('');
  document.querySelector('.contact-links a:nth-child(1)').href = `mailto:${data.contact.email}`;
  document.querySelector('.contact-links a:nth-child(2)').href = data.contact.github;
  document.querySelector('.contact-links a:nth-child(3)').href = data.contact.linkedin;
};

fetch('content.json?v=2').then((response) => response.json()).then(renderPortfolio).catch(() => {
  // The HTML contains a fallback version if content.json is unavailable.
});
