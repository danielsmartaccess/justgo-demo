/* ══════════════════════════════════════════════════
   JUST GO — GO SURVEY
   Alternador de experiência, sanfona do construtor,
   navegação do app de campo e medidores circulares SVG
   ══════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var NS = "http://www.w3.org/2000/svg";

  /* ══════════ ALTERNADOR DE EXPERIÊNCIA ══════════ */
  var surfaces = {
    builder: $("#surfBuilder"),
    field: $("#surfField")
  };

  function setExperience(name) {
    if (!surfaces[name]) return;
    surfaces.builder.hidden = name !== "builder";
    surfaces.field.hidden = name !== "field";

    /* A nota de rodapé muda de cor: o palco do app de campo é escuro. */
    document.body.classList.toggle("exp-field", name === "field");

    $$("#expToggle button").forEach(function (b) {
      var on = b.dataset.exp === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  $$("#expToggle button").forEach(function (b) {
    b.addEventListener("click", function () { setExperience(b.dataset.exp); });
  });

  /* ══════════════════════════════════════════════════
     SURVEY BUILDER
     ══════════════════════════════════════════════════ */

  /* ══════════ SANFONA DAS PERGUNTAS ══════════ */
  /* Só um cartão fica aberto por vez; clicar no cartão aberto o fecha
     (mesmo comportamento do estado `expandedQ` do protótipo). */
  var cards = $$(".qcard");

  function setCard(card, open) {
    var head = $(".qc-head", card);
    var body = $(".qc-body", card);
    card.classList.toggle("is-open", open);
    body.hidden = !open;
    head.setAttribute("aria-expanded", String(open));
    $(".qc-toggle use", head).setAttribute("href", open ? "#i-chevron-up" : "#i-chevron-down");
  }

  function toggleCard(card) {
    var willOpen = !card.classList.contains("is-open");
    cards.forEach(function (c) { setCard(c, c === card && willOpen); });
  }

  cards.forEach(function (card) {
    var head = $(".qc-head", card);
    head.addEventListener("click", function () { toggleCard(card); });
    head.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleCard(card);
      }
    });
  });

  /* ══════════ INTERRUPTORES DE CONFIGURAÇÃO ══════════ */
  $$(".tgl").forEach(function (t) {
    t.addEventListener("click", function () {
      var on = t.classList.toggle("on");
      t.setAttribute("aria-checked", String(on));
    });
  });

  /* ══════════════════════════════════════════════════
     APP DE COLETA EM CAMPO
     ══════════════════════════════════════════════════ */

  /* ══════════ TROCA DE TELAS DO APARELHO ══════════ */
  var fieldScreens = {
    question: $("#fsQuestion"),
    quota: $("#fsQuota"),
    sync: $("#fsSync"),
    exit: $("#fsExit")
  };

  function setFieldScreen(name) {
    if (!fieldScreens[name]) return;
    Object.keys(fieldScreens).forEach(function (key) {
      fieldScreens[key].hidden = key !== name;
    });
    $$("#fieldTabs button").forEach(function (b) {
      var on = b.dataset.screen === name;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    /* Cada tela reinicia no topo, como um push de navegação nativo. */
    var scroller = $(".f-scroll, .q-body, .sync-body, .exit-body", fieldScreens[name]);
    if (scroller) scroller.scrollTop = 0;
  }

  $$("#fieldTabs button").forEach(function (b) {
    b.addEventListener("click", function () { setFieldScreen(b.dataset.screen); });
  });

  /* Botões internos do app que navegam entre telas (Próxima, Sinc., Sair…) */
  $$("[data-goto]").forEach(function (b) {
    b.addEventListener("click", function () { setFieldScreen(b.dataset.goto); });
  });

  /* ══════════ SELEÇÃO DE RESPOSTA ══════════ */
  /* Fidelidade ao protótipo: apesar do rótulo "Pode marcar mais de uma",
     o estado da fonte guarda uma única opção (`selected: string | null`),
     então marcar outra desmarca a anterior e reclicar limpa a seleção. */
  var qOpts = $$("#qOpts .q-opt");
  qOpts.forEach(function (opt) {
    opt.setAttribute("aria-pressed", "false");
    opt.addEventListener("click", function () {
      var wasOn = opt.classList.contains("on");
      qOpts.forEach(function (o) {
        var on = o === opt && !wasOn;
        o.classList.toggle("on", on);
        o.setAttribute("aria-pressed", String(on));
      });
    });
  });

  /* ══════════════════════════════════════════════════
     MEDIDORES CIRCULARES (substitui o CircleProgress React)
     ══════════════════════════════════════════════════ */

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, String(attrs[k]));
    }
    return n;
  }

  /* O SVG recebe width/height explícitos iguais ao viewBox (1 unidade = 1 px),
     e o CSS não o estica — a escala é exatamente 1:1 sem precisar medir o
     container nem observar redimensionamento. */
  function buildCircle(box) {
    var pct = Number(box.dataset.pct) || 0;
    var size = Number(box.dataset.size) || 80;
    var stroke = Number(box.dataset.stroke) || 7;
    var color = box.dataset.color || "#00AEEF";

    var r = (size - stroke) / 2;
    var circ = 2 * Math.PI * r;
    var dash = (pct / 100) * circ;
    var c = size / 2;

    var svg = el("svg", {
      width: size, height: size,
      viewBox: "0 0 " + size + " " + size,
      role: "img",
      "aria-label": box.dataset.label + ": " + pct + "% — " + box.dataset.current + " de " + box.dataset.target
    });

    /* Trilho */
    svg.appendChild(el("circle", {
      cx: c, cy: c, r: r, fill: "none", stroke: "#DCE3EA", "stroke-width": stroke
    }));

    /* Arco preenchido, começando no topo (12h) */
    svg.appendChild(el("circle", {
      cx: c, cy: c, r: r, fill: "none", stroke: color, "stroke-width": stroke,
      "stroke-dasharray": dash + " " + circ,
      "stroke-linecap": "round",
      transform: "rotate(-90 " + c + " " + c + ")"
    }));

    var txt = el("text", {
      x: "50%", y: "50%",
      "dominant-baseline": "middle", "text-anchor": "middle",
      "font-size": 14, "font-weight": 700, fill: "#0D1B2A",
      "font-family": "Inter,sans-serif"
    });
    txt.textContent = pct + "%";
    svg.appendChild(txt);

    var label = document.createElement("p");
    label.className = "cp-label";
    label.textContent = box.dataset.label;

    var value = document.createElement("p");
    value.className = "cp-value";
    value.textContent = box.dataset.current + "/" + box.dataset.target;

    box.appendChild(svg);
    box.appendChild(label);
    box.appendChild(value);
  }

  $$(".cp").forEach(buildCircle);

  /* ══════════ ESTADO INICIAL ══════════ */
  setExperience("builder");
  setFieldScreen("question");
})();
