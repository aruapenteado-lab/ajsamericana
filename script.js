/* ==========================================================================
   AJS Americana — script.js
   JavaScript puro (sem frameworks/bibliotecas externas).
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1) DADOS — edite aqui para atualizar grupos e eventos do site.
     Não invente informações: preencha apenas com dados confirmados.
     Campos vazios ("") simplesmente não são exibidos no card.
     ------------------------------------------------------------------------ */

  // Cada grupo: name, ageRange, schedule, location, description, image, ctaUrl.
  // ctaUrl: link oficial de contato do grupo. Enquanto não houver um link
  // confirmado, mantenha "#" — o botão abre o modal com mais informações.
  const groups = [
    {
      name: "Coroinhas e Acólitos",
      ageRange: "A partir da 1ª Eucaristia",
      schedule: "Encontros mensais e retiros semestrais",
      location: "",
      description: "Grupo de coroinhas e acólitos da paróquia, com formação própria oferecida pelo grupo para servir no altar.",
      image: "./images/coroinhas-e-acolitos.webp",
      ctaUrl: "#"
    },
    {
      name: "Perseverança",
      ageRange: "12 a 15 anos",
      schedule: "Sábados, após a missa das 14h",
      location: "",
      description: "Grupo de crianças e adolescentes que se encontram aos sábados para crescer juntos na fé e na amizade.",
      image: "./images/perseveranca.webp",
      ctaUrl: "#"
    },
    {
      name: "Crisma",
      ageRange: "",
      schedule: "Sábados às 10h",
      location: "",
      description: "Para jovens que frequentam a catequese da Crisma e para todos que buscam viver os sacramentos.",
      image: "./images/crisma.webp",
      ctaUrl: "#"
    },
    {
      name: "JMS — Juventude Missionária Salesiana",
      ageRange: "Alunos do Ensino Médio",
      schedule: "",
      location: "Colégio Dom Bosco",
      description: "Grupo de jovens do Colégio Dom Bosco, aberto a quem está cursando o Ensino Médio na instituição.",
      image: "./images/jms.webp",
      ctaUrl: "#"
    },
    {
      name: "Jovem Líder",
      ageRange: "A partir de 16 anos",
      schedule: "Sábados, das 13h30 às 17h",
      location: "Oratório",
      description: "Grupo de voluntariado que forma jovens líderes para servir a comunidade no Oratório.",
      image: "./images/jovem-lider.webp",
      ctaUrl: "#"
    },
    {
      name: "GAM — Grupo de Animação Missionária",
      ageRange: "Acima de 18 anos",
      schedule: "",
      location: "",
      description: "Grupo de jovens da paróquia voltado à animação missionária.",
      image: "./images/gam.webp",
      ctaUrl: "#"
    },
    {
      name: "PDU — Pastoral da Universidade",
      ageRange: "Universitários",
      schedule: "",
      location: "Unisal",
      description: "Grupo de jovens universitários, para quem está cursando graduação no Unisal.",
      image: "./images/pdu.webp",
      ctaUrl: "#"
    },
    {
      name: "Obra Social",
      ageRange: "14 a 17 anos",
      schedule: "Segunda, quarta e sexta, das 16h às 18h",
      location: "Casa Dom Bosco",
      description: "Grupo de jovens da Obra Social, com encontros três vezes por semana na Casa Dom Bosco.",
      image: "./images/obra-social.webp",
      ctaUrl: "#"
    },
    {
      // Grupo ainda em formação. Quando as informações forem confirmadas,
      // preencha os campos abaixo e remova a linha "comingSoon: true".
      name: "Pós-Crisma",
      ageRange: "",
      schedule: "",
      location: "",
      description: "",
      image: "./images/pos-crisma.webp",
      comingSoon: true,
      ctaUrl: "#"
    }
  ];

  // Cada evento: title, description, location, time, date (formato "YYYY-MM-DD"),
  // image (opcional) e ctaUrl (opcional, link de inscrição/detalhes).
  // Para adicionar um novo evento, copie o modelo abaixo e ajuste os dados
  // (não invente informações — preencha apenas com dados confirmados):
  // {
  //   title: "Nome do evento",
  //   description: "Descrição curta do evento.",
  //   location: "Local do evento",
  //   time: "Horário do evento",
  //   date: "2026-11-08",
  //   image: "./images/eventos/evento-exemplo.webp",
  //   ctaUrl: "#"
  // }
  const events = [
    {
      title: "FEST",
      description: "Festival da Juventude Salesiana",
      location: "Santa Terezinha - São Paulo",
      time: "10h até as 21h",
      date: "2026-10-17",
      image: "./images/evento-exemplo.webp",
      ctaUrl: "#"
    }
  ];

  /* ------------------------------------------------------------------------
     2) UTILITÁRIOS
     ------------------------------------------------------------------------ */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const MONTH_NAMES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  const MONTH_SHORT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  function parseISODate(iso) {
    // Evita problemas de fuso horário ao interpretar "YYYY-MM-DD"
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  const ICONS = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M2.5 20c.7-3.4 3.4-5.5 6.5-5.5s5.8 2.1 6.5 5.5M16 8.2a3 3 0 110 5.9M21.5 20c-.4-2.2-1.7-3.9-3.5-4.8"/></svg>'
  };

  /* ------------------------------------------------------------------------
     3) MENU MOBILE
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    const toggle = $("#menuToggle");
    const nav = $("#navMobile");
    if (!toggle || !nav) return;

    function openMenu() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Fechar menu");
    }
    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menu");
    }

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    $$("#navMobile a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") &&
          !nav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4) DESTAQUE DA SEÇÃO ATIVA NO MENU
     ------------------------------------------------------------------------ */
  function initActiveSection() {
    const links = $$("[data-nav-link]");
    const sections = ["grupos", "eventos", "calendario", "historia"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ------------------------------------------------------------------------
     5) RENDERIZAÇÃO DOS GRUPOS
     ------------------------------------------------------------------------ */
  function metaListHtml(group) {
    let html = "";
    if (group.ageRange) {
      html += `<li>${ICONS.users}<span>${escapeHtml(group.ageRange)}</span></li>`;
    }
    if (group.schedule) {
      html += `<li>${ICONS.clock}<span>${escapeHtml(group.schedule)}</span></li>`;
    }
    if (group.location) {
      html += `<li>${ICONS.pin}<span>${escapeHtml(group.location)}</span></li>`;
    }
    return html;
  }

  function renderGroups() {
    const grid = $("#groupsGrid");
    if (!grid) return;

    grid.innerHTML = groups.map((group, index) => `
      <article class="group-card${group.comingSoon ? " is-coming-soon" : ""}" data-group-index="${index}" data-animate>
        <div class="group-photo">
          <img src="${group.image}" alt="Foto do grupo ${escapeHtml(group.name)}" loading="lazy" width="900" height="700">
          <span class="group-tag">${group.comingSoon ? "Em breve" : "Grupo juvenil"}</span>
        </div>
        <div class="group-body">
          <h3 class="group-name">${escapeHtml(group.name)}</h3>
          ${group.description ? `<p class="group-desc">${escapeHtml(group.description)}</p>` : ""}
          <ul class="group-meta">${metaListHtml(group)}</ul>
          ${group.comingSoon
            ? `<p class="group-soon-note">Grupo em formação. Em breve teremos mais informações.</p>`
            : `<button type="button" class="btn btn-outline-dark btn-sm group-cta" data-open-group="${index}">Quero conhecer</button>`}
        </div>
      </article>
    `).join("");

    // Anima os cards com IntersectionObserver
    if ("IntersectionObserver" in window) {
      const cardObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      $$(".group-card", grid).forEach((card) => cardObserver.observe(card));
    } else {
      $$(".group-card", grid).forEach((card) => card.classList.add("is-visible"));
    }

    $$("[data-open-group]", grid).forEach((btn) => {
      btn.addEventListener("click", () => openGroupModal(Number(btn.dataset.openGroup)));
    });
  }

  /* ------------------------------------------------------------------------
     6) MODAL DE GRUPO
     ------------------------------------------------------------------------ */
  let lastFocusedElement = null;

  function openGroupModal(index) {
    const group = groups[index];
    if (!group) return;

    const modal = $("#groupModal");
    $("#modalImage").src = group.image;
    $("#modalImage").alt = "Foto do grupo " + group.name;
    $("#modalTitle").textContent = group.name;
    $("#modalMeta").innerHTML = metaListHtml(group);
    const desc = $("#modalDesc");
    desc.textContent = group.description || "";
    desc.hidden = !group.description;

    const cta = $("#modalCta");
    if (group.ctaUrl && group.ctaUrl !== "#") {
      cta.href = group.ctaUrl;
      cta.removeAttribute("aria-disabled");
    } else {
      cta.href = "#eventos";
      cta.removeAttribute("target");
    }

    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function closeGroupModal() {
    const modal = $("#groupModal");
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; }, 200);
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function initModal() {
    const modal = $("#groupModal");
    if (!modal) return;

    $("#modalClose").addEventListener("click", closeGroupModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGroupModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeGroupModal();
    });

    // Prende o foco dentro do modal (acessibilidade)
    modal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = $$('button, a[href]', modal);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     7) RENDERIZAÇÃO DE EVENTOS (integrado ao calendário)
     ------------------------------------------------------------------------ */
  function getSortedFutureEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events
      .map((ev) => ({ ...ev, dateObj: parseISODate(ev.date) }))
      .filter((ev) => ev.dateObj >= today)
      .sort((a, b) => a.dateObj - b.dateObj);
  }

  function eventInfoListHtml(ev) {
    let html = "";
    if (ev.location) html += `<li>${ICONS.pin}<span>${escapeHtml(ev.location)}</span></li>`;
    if (ev.time) html += `<li>${ICONS.clock}<span>${escapeHtml(ev.time)}</span></li>`;
    return html;
  }

  function renderEvents() {
    const featuredWrap = $("#eventFeatured");
    const listWrap = $("#eventsList");
    const emptyWrap = $("#eventsEmpty");
    if (!featuredWrap || !listWrap || !emptyWrap) return;

    const upcoming = getSortedFutureEvents();

    if (upcoming.length === 0) {
      featuredWrap.innerHTML = "";
      listWrap.innerHTML = "";
      emptyWrap.hidden = false;
      return;
    }

    emptyWrap.hidden = true;
    const [featured, ...rest] = upcoming;

    featuredWrap.innerHTML = `
      <article class="event-featured" data-animate>
        ${featured.image ? `
        <div class="image-frame">
          <img src="${featured.image}" alt="${escapeHtml(featured.title)}" loading="lazy" width="900" height="600">
        </div>` : ""}
        <div class="event-featured-body">
          <span class="event-date-chip">
            <span class="day">${featured.dateObj.getDate()}</span>
            <span class="month">${MONTH_SHORT[featured.dateObj.getMonth()]}</span>
          </span>
          <h3>${escapeHtml(featured.title)}</h3>
          <p>${escapeHtml(featured.description || "")}</p>
          <ul class="event-info-list">${eventInfoListHtml(featured)}</ul>
          ${featured.ctaUrl ? `<a class="btn btn-accent btn-sm" href="${featured.ctaUrl}" target="_blank" rel="noopener noreferrer">Quero participar</a>` : ""}
        </div>
      </article>
    `;

    listWrap.innerHTML = rest.map((ev) => `
      <article class="event-card" data-animate>
        <span class="event-date-chip">
          <span class="day">${ev.dateObj.getDate()}</span>
          <span class="month">${MONTH_SHORT[ev.dateObj.getMonth()]}</span>
        </span>
        <div class="event-card-body">
          <h4>${escapeHtml(ev.title)}</h4>
          <p>${escapeHtml(ev.description || "")}</p>
          ${ev.ctaUrl ? `<a class="btn btn-outline-dark btn-sm" href="${ev.ctaUrl}" target="_blank" rel="noopener noreferrer">Ver detalhes</a>` : ""}
        </div>
      </article>
    `).join("");
  }

  /* ------------------------------------------------------------------------
     8) CALENDÁRIO MENSAL
     ------------------------------------------------------------------------ */
  let calendarViewDate = new Date();
  let selectedDate = null;

  function eventsOnDate(date) {
    return events.filter((ev) => isSameDay(parseISODate(ev.date), date));
  }

  function eventsInMonth(year, month) {
    return events
      .map((ev) => ({ ...ev, dateObj: parseISODate(ev.date) }))
      .filter((ev) => ev.dateObj.getFullYear() === year && ev.dateObj.getMonth() === month)
      .sort((a, b) => a.dateObj - b.dateObj);
  }

  function renderAgendaList(year, month, filterDate) {
    const list = $("#agendaList");
    const title = $("#agendaTitle");
    if (!list || !title) return;

    const monthEvents = eventsInMonth(year, month);
    const relevant = filterDate
      ? monthEvents.filter((ev) => isSameDay(ev.dateObj, filterDate))
      : monthEvents;

    title.textContent = filterDate
      ? `Eventos em ${filterDate.getDate()} de ${MONTH_NAMES[month]}`
      : `Agenda de ${MONTH_NAMES[month]}`;

    if (relevant.length === 0) {
      list.innerHTML = `<p class="agenda-empty">Nenhum evento cadastrado ${filterDate ? "para este dia" : "neste mês"} até o momento.</p>`;
      return;
    }

    list.innerHTML = relevant.map((ev) => `
      <div class="agenda-item">
        <span class="event-date-chip">
          <span class="day">${ev.dateObj.getDate()}</span>
          <span class="month">${MONTH_SHORT[ev.dateObj.getMonth()]}</span>
        </span>
        <div>
          <h4>${escapeHtml(ev.title)}</h4>
          <p>${escapeHtml([ev.time, ev.location].filter(Boolean).join(" · "))}</p>
        </div>
      </div>
    `).join("");
  }

  function renderCalendar() {
    const grid = $("#calendarGrid");
    const label = $("#calendarMonthLabel");
    if (!grid || !label) return;

    const year = calendarViewDate.getFullYear();
    const month = calendarViewDate.getMonth();
    const today = new Date();

    label.textContent = `${MONTH_NAMES[month]} de ${year}`;

    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let cellsHtml = "";
    for (let i = 0; i < startWeekday; i++) {
      cellsHtml += `<div class="calendar-day is-empty" aria-hidden="true"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day);
      const isToday = isSameDay(cellDate, today);
      const hasEvent = eventsOnDate(cellDate).length > 0;
      const isSelected = selectedDate && isSameDay(cellDate, selectedDate);

      const classes = ["calendar-day"];
      if (isToday) classes.push("is-today");
      if (hasEvent) classes.push("has-event");
      if (isSelected) classes.push("is-selected");

      cellsHtml += `<button type="button" class="${classes.join(" ")}" data-day="${day}" role="gridcell" aria-label="${day} de ${MONTH_NAMES[month]}${hasEvent ? ", com evento" : ""}">${day}</button>`;
    }

    grid.innerHTML = cellsHtml;

    $$(".calendar-day:not(.is-empty)", grid).forEach((btn) => {
      btn.addEventListener("click", () => {
        const day = Number(btn.dataset.day);
        const clicked = new Date(year, month, day);
        selectedDate = (selectedDate && isSameDay(selectedDate, clicked)) ? null : clicked;
        renderCalendar();
        renderAgendaList(year, month, selectedDate);
      });
    });

    if (!selectedDate || selectedDate.getMonth() !== month || selectedDate.getFullYear() !== year) {
      renderAgendaList(year, month, null);
    } else {
      renderAgendaList(year, month, selectedDate);
    }
  }

  function initCalendar() {
    const prevBtn = $("#prevMonth");
    const nextBtn = $("#nextMonth");
    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener("click", () => {
      calendarViewDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1);
      selectedDate = null;
      renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
      calendarViewDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1);
      selectedDate = null;
      renderCalendar();
    });

    renderCalendar();
  }

  /* ------------------------------------------------------------------------
     9) ANIMAÇÕES DE ENTRADA (seções gerais)
     ------------------------------------------------------------------------ */
  function initSectionAnimations() {
    const items = $$("[data-animate]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     10) BOTÃO VOLTAR AO TOPO
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener("click", () => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      window.scrollTo({ top: 0, behavior });
    });
  }

  /* ------------------------------------------------------------------------
     11) ANO AUTOMÁTICO NO RODAPÉ
     ------------------------------------------------------------------------ */
  function initFooterYear() {
    const el = $("#footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------------------
     INICIALIZAÇÃO
     ------------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initActiveSection();
    renderGroups();
    initModal();
    renderEvents();
    initCalendar();
    initSectionAnimations();
    initBackToTop();
    initFooterYear();
  });
})();
