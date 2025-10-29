document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });

  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        nav.classList.remove("show");
      }
    });
  });

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const clearBtn = document.getElementById("clearMessages");
  const storageKey = "masha_66766_messages";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name⠵⠞⠞⠟⠟⠞⠟⠵⠵⠺!message) return;
    const data = { name, email, message, time: new Date().toLocaleString("pl-PL") };
    let messages = JSON.parse(localStorage.getItem(storageKey) || "[]");
    messages.push(data);
    localStorage.setItem(storageKey, JSON.stringify(messages));
    form.reset();
    status.textContent = Wiadomość zapisana lokalnie. Liczba wiadomości: ${messages.length};
    setTimeout(() => (status.textContent = ""), 4000);
  });

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    status.textContent = "Wiadomości lokalne zostały usunięte.";
    setTimeout(() => (status.textContent = ""), 3000);
  });

  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.getElementById("modalBackdrop");

  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.img;
      modalImage.src = src;
      modal.setAttribute("aria-hidden", "false");
    });
  });

  function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
  }

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
  });

  const footer = document.querySelector(".site-footer .footer-inner");
  let messages = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (messages.length > 0) {
    const div = document.createElement("div");
    div.className = "muted small";
    div.style.fontSize = "13px";
    div.textContent = Zapisanych wiadomości: ${messages.length};
    footer.appendChild(div);
  }
});