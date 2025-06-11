document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const password = document.getElementById('register-password').value;

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      alert('Регистрацията е успешна!');
      window.location.href = 'login.html';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      const storedUser = localStorage.getItem('username');
      const storedPass = localStorage.getItem('password');

      if (username === storedUser && password === storedPass) {
        alert('Успешен вход!');
        window.location.href = 'beginning.html';
      } else {
        alert('Грешно потребителско име или парола.');
      }
    });
  }
});