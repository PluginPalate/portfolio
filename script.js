// Menü toggle (mobil)
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

btn.addEventListener('click', () => {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('hidden');
});

// Tema değişikliği (dark/light)
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function setTheme(theme) {
  if (theme === 'dark') {
    htmlEl.classList.add('dark');
    document.body.classList.replace('bg-gray-100', 'bg-gray-900');
    document.body.classList.replace('text-gray-900', 'text-gray-100');
    themeToggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    htmlEl.classList.remove('dark');
    document.body.classList.replace('bg-gray-900', 'bg-gray-100');
    document.body.classList.replace('text-gray-100', 'text-gray-900');
    themeToggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Sayfa yüklenince tercih edilen temayı uygula
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Scroll animasyonu için elemanları yakala
  const faders = document.querySelectorAll('.fade-in');

  function scrollFade() {
    faders.forEach(fader => {
      const rect = fader.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        fader.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', scrollFade);
  scrollFade();

  // Proje filtreleme
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Buton aktif stilini güncelle
      filterBtns.forEach(b => b.classList.replace('bg-indigo-500', 'bg-gray-700'));
      btn.classList.replace('bg-gray-700', 'bg-indigo-500');

      const filter = btn.getAttribute('data-filter');
      projects.forEach(project => {
        if (filter === 'all' || project.dataset.category.includes(filter)) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });
});
