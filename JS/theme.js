document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      toggleBtn.textContent = '☀️ Светъл режим';
    } else {
      toggleBtn.textContent = '🌙 Тъмен режим';
    }
  });
});