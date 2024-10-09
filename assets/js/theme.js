/*
reNamso v2.0 is th new and modern Namso CCGEN.
RE-WRITED BY YAEL MASSIEU.
Instagram: @is.leay
Portfolio: https://yael.pages.dev/
*/
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
  
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggle.classList.replace('fa-moon', 'fa-sun');
    }
  
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const isLightMode = document.body.classList.contains('light-mode');
      themeToggle.classList.toggle('fa-moon', !isLightMode);
      themeToggle.classList.toggle('fa-sun', isLightMode);
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });
  });