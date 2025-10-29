document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({behavior:'smooth', block:'start'});
          nav.classList.remove('show');
        }
      }
    });
  });

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const clearBtn = document.getElementById('clearMessages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      time: new Date().toLocaleString('pl-PL')
    };

    const key = 'masha_66766_messages';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(data);
    localStorage.setItem(key, JSON.stringify(existing));

    form.reset();
    status.textContent = Wiadomość zapisana lokalnie. Liczba wiadomości: ${existing.length}.;
    setTimeout(()=> status.textContent = '', 4500);
  });

  clearBtn.addEventListener('click', () => {
    const key = 'masha_66766_messages';
    localStorage.removeItem(key);
    status.textContent = 'Wiadomości lokalne zostały usunięte.';
    setTimeout(()=> status.textContent = '', 3000);
  });

  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.img;
      modalImage.src = src;
      modal.setAttribute('aria-hidden','false');
    });
  });

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modalImage.src = '';
  }
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.getAttribute('aria-hidden')==='false') closeModal();
  });

  const key = 'masha_66766_messages';
  const messages = JSON.parse(localStorage.getItem(key) || '[]');
  if(messages.length){
    const footer = document.querySelector('.site-footer .footer-inner');
    const span = document.createElement('div');
    span.className = 'muted small';
    span.style.fontSize='13px';
    span.textContent = Zapisanych wiadomości: ${messages.length};
    footer.appendChild(span);
  }
});