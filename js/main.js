// Scrolling nav — transparent over hero, white when scrolled
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Booking form submission
const form = document.getElementById('booking-form');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form),
    });
    const data = await res.json();
    if (data.success) {
      form.reset();
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      throw new Error('Submission failed');
    }
  } catch {
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none';
  } finally {
    submitBtn.textContent = 'Send Booking Request →';
    submitBtn.disabled = false;
  }
});

if (new URLSearchParams(window.location.search).get('booked') === 'true') {
  successMsg.style.display = 'block';
}
