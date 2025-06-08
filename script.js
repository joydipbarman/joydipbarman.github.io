```javascript name=script.js
// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setDarkMode(dark) {
  if (dark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fa fa-sun"></i>';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fa fa-moon"></i>';
  }
}

// Initial theme
(function() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    setDarkMode(true);
  } else if (storedTheme === 'light') {
    setDarkMode(false);
  } else if (prefersDarkScheme.matches) {
    setDarkMode(true);
  }
})();

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', function() {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form basic validation (optional, since Formspree does server validation)
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const email = contactForm.querySelector('input[name="email"]');
    const name = contactForm.querySelector('input[name="name"]');
    const message = contactForm.querySelector('textarea[name="message"]');
    if (!email.value || !name.value || !message.value) {
      e.preventDefault();
      alert('Please fill out all fields before submitting.');
    }
  });
}
```
