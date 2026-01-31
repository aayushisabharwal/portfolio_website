window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (!header) return;

  if (window.scrollY > 80) {
    header.style.opacity = "0";
    header.style.pointerEvents = "none"; 
  } else {
    header.style.opacity = "1";
    header.style.pointerEvents = "auto";
  }
});

const wrappers = document.querySelectorAll(".media-wrapper");

wrappers.forEach((wrapper) => {
  const video = wrapper.querySelector("video");
  const hoverSign = wrapper.querySelector(".hover-sign");

  wrapper.addEventListener("mouseenter", () => {
    video.play();
    hoverSign.classList.add("active");
  });

  wrapper.addEventListener("mouseleave", () => {
    video.pause();
    hoverSign.classList.remove("active");
  });
});

/* ================================
   Smooth scroll to Contact section
   ================================ */

document.addEventListener("DOMContentLoaded", () => {
  const contactSection = document.getElementById("contact");

  if (!contactSection) return;

  // Select ALL buttons or links that should go to contact
  const contactTriggers = document.querySelectorAll(
    'button, a'
  );

  contactTriggers.forEach(el => {
    const text = el.textContent.toLowerCase();

    // Match buttons/links that say "contact me"
    if (text.includes("contact me")) {
      el.addEventListener("click", (e) => {
        e.preventDefault();

        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.simple-form');
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector('.submit-btn');

  /* ---------- Message UI ---------- */
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = `
    margin-top: 15px;
    padding: 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    display: none;
    text-align: center;
  `;
  contactForm.appendChild(messageDiv);

  const showMessage = (text, isError = false) => {
    messageDiv.textContent = text;
    messageDiv.style.display = 'block';
    messageDiv.style.background = isError
      ? 'rgba(255,107,107,0.1)'
      : 'rgba(86,104,255,0.1)';
    messageDiv.style.color = isError ? '#ff6b6b' : '#5668ff';
    messageDiv.style.border = isError
      ? '1px solid rgba(255,107,107,0.3)'
      : '1px solid rgba(86,104,255,0.3)';
  };

  const hideMessage = () => {
    messageDiv.style.display = 'none';
  };

  /* ---------- Inputs ---------- */
  const nameInput = contactForm.querySelector('input[type="text"]');
  const emailInput = contactForm.querySelector('input[type="email"]');
  const messageInput = contactForm.querySelector('textarea');

  [nameInput, emailInput, messageInput].forEach(input => {
    input.required = true;
    input.addEventListener('input', hideMessage);
  });

  messageInput.setAttribute('minlength', '10');

  /* ---------- Submit ---------- */
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email address.', true);
      return;
    }

    if (message.length < 10) {
      showMessage('Message should be at least 10 characters.', true);
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Opening Email…`;
    submitBtn.disabled = true;

    const subject = `Portfolio Contact: ${name}`;
    const body = `Hello Aayushi,

You received a new message from your portfolio website:

Name: ${name}
Email: ${email}

Message:
${message}`;

    const mailtoLink =
      `mailto:aayushi.sabharwal@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    showMessage('✓ Opening your email client…');

    window.location.href = mailtoLink;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
});

