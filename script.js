
/* WAVE — interações e funcionalidades */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MENU MOBILE
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = mainNav
    ? mainNav.querySelectorAll("a")
    : [];

  function closeMenu() {
    if (!mainNav || !menuToggle) return;

    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      const opened = mainNav.classList.toggle("open");

      menuToggle.classList.toggle("active", opened);
      menuToggle.setAttribute(
        "aria-expanded",
        String(opened)
      );
      menuToggle.setAttribute(
        "aria-label",
        opened ? "Fechar menu" : "Abrir menu"
      );
    });

    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

  }


  // ==========================================
  // CRONÔMETRO ATÉ O PRÓXIMO SÁBADO, ÀS 19H30
  // ==========================================

  const timeNodes = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const pad = value => String(value).padStart(2, "0");

  function nextSaturday() {
    const now = new Date();
    const target = new Date(now);

    const daysUntil = (6 - now.getDay() + 7) % 7;

    target.setDate(now.getDate() + daysUntil);
    target.setHours(19, 30, 0, 0);

    if (target <= now) {
      target.setDate(target.getDate() + 7);
    }

    return target;
  }

  function updateCountdown() {
    const now = new Date();
    const target = nextSaturday();

    let difference = Math.max(0, target - now);

    const days = Math.floor(difference / 86400000);
    difference %= 86400000;

    const hours = Math.floor(difference / 3600000);
    difference %= 3600000;

    const minutes = Math.floor(difference / 60000);
    difference %= 60000;

    const seconds = Math.floor(difference / 1000);

    if (timeNodes.days) {
      timeNodes.days.textContent = pad(days);
    }

    if (timeNodes.hours) {
      timeNodes.hours.textContent = pad(hours);
    }

    if (timeNodes.minutes) {
      timeNodes.minutes.textContent = pad(minutes);
    }

    if (timeNodes.seconds) {
      timeNodes.seconds.textContent = pad(seconds);
    }

    const nextServiceText =
      document.getElementById("nextServiceText");

    if (nextServiceText) {
      nextServiceText.textContent = "Sábado, às 19h30";
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // ==========================================
  // SELEÇÃO DOS DEPARTAMENTOS
  // CARD INTEIRO CLICÁVEL
  // ==========================================

  let selectedDepartment = "Mídia";

  const departmentCards =
    document.querySelectorAll(".department-card");

  const selectedDepartmentText =
    document.getElementById("selectedDepartment");

  const signupFeedback =
    document.getElementById("signupFeedback");

  function selectDepartment(card) {

    selectedDepartment = card.dataset.department;

    departmentCards.forEach(item => {

      item.classList.remove("selected");

      const button = item.querySelector("button");

      if (button) {
        button.textContent = "Selecionar";
      }

      item.setAttribute("aria-pressed", "false");

    });

    card.classList.add("selected");

    const selectedButton = card.querySelector("button");

    if (selectedButton) {
      selectedButton.textContent = "✓ Selecionado";
    }

    card.setAttribute("aria-pressed", "true");

    if (selectedDepartmentText) {
      selectedDepartmentText.textContent =
        selectedDepartment;
    }

    if (signupFeedback) {
      signupFeedback.textContent =
        `Departamento escolhido: ${selectedDepartment}. Preencha seus dados para continuar.`;
    }

  }

  // Clique em qualquer lugar do card

  departmentCards.forEach(card => {

    card.style.cursor = "pointer";

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", () => {
      selectDepartment(card);
    });

    // Acessibilidade: teclado

    card.addEventListener("keydown", event => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        event.preventDefault();
        selectDepartment(card);

      }

    });

  });


  // ==========================================
  // INSCRIÇÃO PARA OS DEPARTAMENTOS
  // João — líder WAVE
  // ==========================================

  const leaderWhatsApp = "5514998088321";

  const departmentForm =
    document.getElementById("departmentForm");

  if (departmentForm) {

    departmentForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const name =
          document.getElementById("fullName").value.trim();

        const phone =
          document.getElementById("phone").value.trim();

        if (!name || !phone) return;

        const message =
          `Olá! Quero me inscrever no departamento ${selectedDepartment} do WAVE.%0A%0ANome: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}`;

        const url = leaderWhatsApp
          ? `https://wa.me/${leaderWhatsApp}?text=${message}`
          : `https://wa.me/?text=${message}`;

        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

        if (signupFeedback) {
          signupFeedback.textContent =
            "Sua inscrição foi preparada no WhatsApp. Confira os dados e envie a mensagem!";
        }

      }
    );

  }


  // ==========================================
  // FAQ — PERGUNTAS FREQUENTES
  // ==========================================

  document.querySelectorAll(".faq-question").forEach(
    question => {

      question.addEventListener("click", () => {

        const item = question.closest(".faq-item");

        if (!item) return;

        const wasOpen = item.classList.contains("open");

        document.querySelectorAll(".faq-item").forEach(
          other => {

            other.classList.remove("open");

            const otherQuestion =
              other.querySelector(".faq-question");

            if (otherQuestion) {
              otherQuestion.setAttribute(
                "aria-expanded",
                "false"
              );
            }

          }
        );

        if (!wasOpen) {

          item.classList.add("open");

          question.setAttribute(
            "aria-expanded",
            "true"
          );

        }

      });

    }
  );


  // ==========================================
  // CAMISETA WAVE — FRENTE E COSTAS
  // CÓDIGO CORRIGIDO — SEM ASSETS
  // ==========================================

  const shirtImage =
    document.getElementById("shirtImage");

  const shirtTag =
    document.getElementById("shirtTag");

  const shirtButtons =
    document.querySelectorAll(".shirt-switch button");

  // Nomes exatos dos arquivos na pasta principal

  const shirtImages = {
    front: "camiseta-wave-frente.jpg",
    back: "camiseta-wave-costas.jpg"
  };

  if (shirtImage && shirtButtons.length > 0) {

    function changeShirt(view) {

      // Só permite frente ou costas
      if (view !== "front" && view !== "back") {
        return;
      }

      const isBack = view === "back";

      // Atualiza a imagem
      shirtImage.src = shirtImages[view];

      // Atualiza a descrição
      shirtImage.alt = isBack
        ? "Camiseta oficial WAVE, vista das costas"
        : "Camiseta oficial WAVE, vista frontal";

      // Atualiza a etiqueta
      if (shirtTag) {
        shirtTag.textContent = isBack
          ? "COSTAS"
          : "FRENTE";
      }

      // Atualiza o botão selecionado
      shirtButtons.forEach(button => {

        const isActive =
          button.dataset.view === view;

        button.classList.toggle("active", isActive);

      });

      // Mantém a imagem centralizada
      shirtImage.style.objectPosition = "center";
      shirtImage.style.filter = "none";

    }

    // Clique nos botões
    shirtButtons.forEach(button => {

      button.addEventListener("click", () => {

        const view = button.dataset.view;

        changeShirt(view);

      });

    });

    // Sincroniza a imagem inicial com o HTML
    const initialView =
      shirtImage.getAttribute("src") === shirtImages.back
        ? "back"
        : "front";

    changeShirt(initialView);

  }


  // ==========================================
  // FORMULÁRIO DE CONTATO
  // João — líder WAVE
  // ==========================================

  const contactWhatsApp = "5514998088321";

  const contactForm =
    document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const name =
          document.getElementById("contactName").value.trim();

        const phone =
          document.getElementById("contactPhone").value.trim();

        const messageText =
          document.getElementById("contactMessage").value.trim();

        const message =
          `Olá, equipe WAVE!%0A%0ANome: ${encodeURIComponent(name)}%0AWhatsApp: ${encodeURIComponent(phone)}%0AMensagem: ${encodeURIComponent(messageText)}`;

        const url = contactWhatsApp
          ? `https://wa.me/${contactWhatsApp}?text=${message}`
          : `https://wa.me/?text=${message}`;

        window.open(
          url,
          "_blank",
          "noopener,noreferrer"
        );

        const contactFeedback =
          document.getElementById("contactFeedback");

        if (contactFeedback) {
          contactFeedback.textContent =
            "Mensagem preparada! Finalize o envio pelo WhatsApp.";
        }

      }
    );

  }


  // ==========================================
  // BOTÃO VOLTAR AO TOPO
  // ==========================================

  const backToTop =
    document.getElementById("backToTop");

  if (backToTop) {

    window.addEventListener(
      "scroll",
      () => {

        backToTop.classList.toggle(
          "visible",
          window.scrollY > 500
        );

      },
      { passive: true }
    );

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // ==========================================
  // DESTAQUE DA NAVEGAÇÃO
  // CONFORME A SEÇÃO VISÍVEL
  // ==========================================

  const sections =
    document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {

            if (
              link.getAttribute("href") ===
              `#${entry.target.id}`
            ) {

              link.classList.add("current");

            } else {

              link.classList.remove("current");

            }

          });

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

  }


  // ==========================================
  // ANIMAÇÕES DE ENTRADA (REVEAL)
  // ==========================================

  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-copy, .about-cards, .schedule-card, " +
    ".department-card, .signup-panel, .playlist-card, .shirt-layout, " +
    ".community-panel, .location-card, .faq-item, .contact-layout, .footer-main"
  );

  revealTargets.forEach((element, index) => {

    element.classList.add("js-reveal");

    if (
      element.matches(
        ".schedule-card, .department-card, .faq-item"
      )
    ) {

      element.style.transitionDelay =
        `${(index % 5) * 65}ms`;

    }

  });

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealTargets.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealTargets.forEach(element => {
      element.classList.add("is-visible");
    });

  }


  // ==========================================
  // LUZ ROXA QUE SEGUE O PONTEIRO (DESKTOP)
  // ==========================================

  const cursorGlow =
    document.querySelector(".cursor-glow");

  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

  if (cursorGlow && finePointer.matches) {

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    let glowX = pointerX;
    let glowY = pointerY;

    let animationFrame = null;

    function animateGlow() {

      glowX += (pointerX - glowX) * 0.55;
      glowY += (pointerY - glowY) * 0.55;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      if (
        Math.abs(pointerX - glowX) > 0.5 ||
        Math.abs(pointerY - glowY) > 0.5
      ) {

        animationFrame =
          requestAnimationFrame(animateGlow);

      } else {

        animationFrame = null;

      }

    }

    window.addEventListener(
      "pointermove",
      event => {

        pointerX = event.clientX;
        pointerY = event.clientY;

        if (!animationFrame) {
          animationFrame =
            requestAnimationFrame(animateGlow);
        }

      },
      { passive: true }
    );

  }

});


// ==========================================
// IDENTIFICAR ELEMENTOS QUE SAEM DA TELA
// ==========================================

window.addEventListener("load", () => {

  const larguraTela =
    document.documentElement.clientWidth;

  document.querySelectorAll("body *").forEach(
    elemento => {

      const posicao =
        elemento.getBoundingClientRect();

      if (
        posicao.right > larguraTela + 2 ||
        posicao.left < -2
      ) {

        console.log(
          "Possível overflow:",
          elemento
        );

        console.log(
          "Posição:",
          posicao
        );

      }

    }
  );

});


// ==========================================
// WAVE — ANIMAÇÃO E FECHAMENTO DO MENU
// ==========================================

(() => {

  const botao =
    document.getElementById("menuToggle");

  const menu =
    document.getElementById("mainNav");

  if (!botao || !menu) return;

  // Sincroniza o X com o estado atual do menu

  const sincronizar = () => {

    const aberto =
      menu.classList.contains("open");

    botao.classList.toggle("active", aberto);

    botao.setAttribute(
      "aria-expanded",
      String(aberto)
    );

    botao.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );

  };

  // Fecha ao tocar fora do menu

  document.addEventListener("click", evento => {

    if (
      menu.classList.contains("open") &&
      !menu.contains(evento.target) &&
      !botao.contains(evento.target)
    ) {

      menu.classList.remove("open");
      sincronizar();

    }

  });

  // Sincroniza quando o menu fecha por outros meios

  const observador =
    new MutationObserver(sincronizar);

  observador.observe(menu, {
    attributes: true,
    attributeFilter: ["class"]
  });

  sincronizar();

})();


// ==========================================
// WAVE — LUZ QUE SEGUE O TOQUE
// ==========================================

(function () {

  const mobile = window.matchMedia(
    "(max-width: 780px) and (pointer: coarse)"
  );

  if (!mobile.matches) return;

  const glow = document.createElement("div");

  glow.className = "wave-touch-glow";

  document.body.appendChild(glow);

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  let targetX = x;
  let targetY = y;

  function atualizarPosicao(event) {

    targetX = event.clientX;
    targetY = event.clientY;

  }

  document.addEventListener(
    "pointerdown",
    atualizarPosicao,
    { passive: true }
  );

  document.addEventListener(
    "pointermove",
    function (event) {

      if (event.pointerType === "touch") {
        atualizarPosicao(event);
      }

    },
    { passive: true }
  );

  function animar() {

    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;

    glow.style.transform =
      `translate3d(${x - 140}px, ${y - 140}px, 0)`;

    requestAnimationFrame(animar);

  }

  animar();

})();
