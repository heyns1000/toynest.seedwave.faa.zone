// ToyNest™ / Fruitful Smart Toys™ — landing page behaviour

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('is-open');
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.classList.remove('is-open'));
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Contact form — client-side only, no backend
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[data-required]').forEach((field) => {
        const row = field.closest('.form-row');
        const filled = field.value.trim().length > 0;
        row.classList.toggle('invalid', !filled);
        if (!filled) valid = false;
      });

      const emailField = form.querySelector('#contactEmail');
      if (emailField && emailField.value.trim()) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim());
        emailField.closest('.form-row').classList.toggle('invalid', !emailOk);
        if (!emailOk) valid = false;
      }

      if (!valid) return;

      form.reset();
      if (successBox) {
        successBox.classList.add('is-visible');
        setTimeout(() => successBox.classList.remove('is-visible'), 6000);
      }
    });
  }
});
