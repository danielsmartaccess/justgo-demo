/* ══════════════════════════════════════════════════
   JUST GO — GO INTELLIGENCE CHAT
   Interações da conversa + gráfico SVG (substitui Recharts)
   ══════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ══════════ ESTADO DA TELA ══════════ */
  /* viewState: "chat" | "empty" — espelha o estado do protótipo React. */
  var viewChat = $("#viewChat");
  var viewEmpty = $("#viewEmpty");
  var headTitle = $("#headTitle");
  var compInput = $("#compInput");

  /* O título do cabeçalho acompanha a conversa selecionada.
     A fonte fixa "Perfil de visitantes Go Pay" para qualquer conversa aberta —
     descuido do protótipo que, numa demo, faz o cabeçalho contradizer a barra
     lateral. O dado correto já existe em cada botão (data-title). */
  function setView(name, title) {
    var isChat = name === "chat";
    viewChat.hidden = !isChat;
    viewEmpty.hidden = isChat;
    headTitle.textContent = isChat ? (title || "Perfil de visitantes Go Pay") : "Nova conversa";
    if (isChat) renderChart();
  }

  /* ══════════ CONVERSAS ══════════ */
  var convList = $("#convList");

  function setActiveConv(id) {
    $$(".conv", convList).forEach(function (b) {
      b.classList.toggle("is-active", b.dataset.conv === id);
    });
  }

  $$(".conv", convList).forEach(function (btn) {
    btn.addEventListener("click", function () {
      setActiveConv(btn.dataset.conv);
      setView("chat", btn.dataset.title);
      closeSidebar();
    });
  });

  /* Nova conversa: abre o estado vazio e desmarca a conversa ativa. */
  $("#btnNew").addEventListener("click", function () {
    setView("empty");
    setActiveConv("");
    closeSidebar();
  });

  /* ══════════ BUSCA DE CONVERSAS ══════════ */
  /* Filtro local — a fonte traz o campo sem comportamento; aqui ele funciona. */
  var convSearch = $("#convSearch");
  var convsNone = $("#convsNone");

  convSearch.addEventListener("input", function () {
    var q = convSearch.value.trim().toLowerCase();
    var visible = 0;
    $$(".conv", convList).forEach(function (b) {
      var hit = !q || (b.dataset.title || "").toLowerCase().indexOf(q) !== -1;
      b.hidden = !hit;
      if (hit) visible++;
    });
    convsNone.hidden = visible > 0;
  });

  /* ══════════ SELEÇÃO DE AGENTE ══════════ */
  var ddBtn = $("#ddBtn");
  var ddMenu = $("#ddMenu");
  var ddIco = $("#ddIco");
  var ddLabel = $("#ddLabel");

  function setAgent(id) {
    var opt = $('.dd-item[data-agent="' + id + '"]', ddMenu);
    if (!opt) return;

    $$(".dd-item", ddMenu).forEach(function (b) {
      var on = b === opt;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-checked", String(on));
    });
    $$(".chip").forEach(function (c) {
      c.classList.toggle("is-on", c.dataset.agent === id);
    });

    ddLabel.textContent = opt.dataset.label;
    ddIco.style.color = opt.dataset.color;
    ddIco.innerHTML = '<svg viewBox="0 0 24 24" class="ic ic-14"><use href="#' + opt.dataset.icon + '"/></svg>';

    /* O título do estado vazio acompanha o agente escolhido. Na fonte ele é
       fixo em "Analista", o que contradiz o agente destacado logo acima. */
    var tituloVazio = $("#emptyTitle");
    if (tituloVazio) tituloVazio.textContent = "Nova conversa com " + opt.dataset.label;
  }

  function setDropdown(open) {
    ddMenu.hidden = !open;
    ddBtn.setAttribute("aria-expanded", String(open));
  }

  ddBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    setDropdown(ddMenu.hidden);
    if (!ddMenu.hidden) {
      var current = $(".dd-item.is-on", ddMenu) || $(".dd-item", ddMenu);
      current.focus();
    }
  });

  $$(".dd-item", ddMenu).forEach(function (item, i, all) {
    item.addEventListener("click", function () {
      setAgent(item.dataset.agent);
      setDropdown(false);
      ddBtn.focus();
    });
    /* Navegação por teclado dentro do menu */
    item.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowDown") next = all[(i + 1) % all.length];
      else if (e.key === "ArrowUp") next = all[(i - 1 + all.length) % all.length];
      else if (e.key === "Home") next = all[0];
      else if (e.key === "End") next = all[all.length - 1];
      if (next) { e.preventDefault(); next.focus(); }
    });
  });

  $$(".chip").forEach(function (chip) {
    chip.addEventListener("click", function () { setAgent(chip.dataset.agent); });
  });

  /* Fecha o menu ao clicar fora ou com Escape */
  document.addEventListener("mousedown", function (e) {
    if (!ddMenu.hidden && !ddMenu.contains(e.target) && !ddBtn.contains(e.target)) setDropdown(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!ddMenu.hidden) { setDropdown(false); ddBtn.focus(); return; }
    if (side.classList.contains("is-open")) closeSidebar();
  });

  /* ══════════ GAVETA LATERAL (telas estreitas) ══════════ */
  var side = $("#side");
  var scrim = $("#scrim");
  var btnSideOpen = $("#btnSideOpen");

  function openSidebar() {
    side.classList.add("is-open");
    scrim.hidden = false;
    btnSideOpen.setAttribute("aria-expanded", "true");
    $("#btnSideClose").focus();
  }

  function closeSidebar() {
    if (!side.classList.contains("is-open")) return;
    side.classList.remove("is-open");
    scrim.hidden = true;
    btnSideOpen.setAttribute("aria-expanded", "false");
    btnSideOpen.focus();
  }

  btnSideOpen.addEventListener("click", openSidebar);
  $("#btnSideClose").addEventListener("click", closeSidebar);
  scrim.addEventListener("click", closeSidebar);

  /* ══════════ SUGESTÕES E EXEMPLOS ══════════ */
  /* Preenchem o campo de composição e devolvem o foco a ele. */
  function useSuggestion(text) {
    compInput.value = text;
    syncSend();
    compInput.focus();
  }

  $$("[data-prompt]").forEach(function (btn) {
    btn.addEventListener("click", function () { useSuggestion(btn.dataset.prompt); });
  });

  /* ══════════ AVALIAÇÃO DA RESPOSTA ══════════ */
  var fbUp = $("#fbUp");
  var fbDown = $("#fbDown");

  function setFeedback(kind) {
    fbUp.setAttribute("aria-pressed", String(kind === "up"));
    fbDown.setAttribute("aria-pressed", String(kind === "down"));
  }

  fbUp.addEventListener("click", function () { setFeedback("up"); });
  fbDown.addEventListener("click", function () { setFeedback("down"); });

  /* ══════════ CAMPO DE COMPOSIÇÃO ══════════ */
  var btnSend = $("#btnSend");

  function syncSend() { btnSend.disabled = !compInput.value.trim(); }

  function handleSend() {
    if (!compInput.value.trim()) return;
    /* Se houver conversa selecionada, o cabeçalho mantém o título dela. */
    var ativa = $(".conv.is-active", convList);
    setView("chat", ativa && ativa.dataset.title);
    compInput.value = "";
    syncSend();
  }

  compInput.addEventListener("input", syncSend);
  compInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  btnSend.addEventListener("click", handleSend);
  syncSend();

  /* ══════════════════════════════════════════════════
     GRÁFICO — Gasto médio por faixa etária
     Substitui o BarChart do Recharts por SVG desenhado à mão.
     ══════════════════════════════════════════════════ */
  var CHART_DATA = [
    { faixa: "25–34", valor2027: 4820, valor2026: 3910 },
    { faixa: "35–44", valor2027: 6340, valor2026: 5120 },
    { faixa: "45–54", valor2027: 3890, valor2026: 3200 },
    { faixa: "18–24", valor2027: 2760, valor2026: 2490 },
    { faixa: "55+",   valor2027: 1540, valor2026: 1280 }
  ];

  var SERIES = [
    { key: "valor2027", label: "2027", color: "#00AEEF", opacity: 1 },
    { key: "valor2026", label: "2026", color: "#0D1B2A", opacity: .5 }
  ];

  var NS = "http://www.w3.org/2000/svg";
  var svg = $("#ageChart");
  var tip = $("#chartTip");
  var chartBox = svg.parentNode;

  /* Escala do eixo Y equivalente à que o Recharts geraria para o domínio
     [0, 6340] com 5 marcações: passo 2.000 até 8.000. */
  var Y_STEP = 2000;
  var Y_MAX = 8000;

  var BAR_SIZE = 14;   /* barSize do protótipo */
  var BAR_GAP = 3;     /* barGap do protótipo  */

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, String(attrs[k]));
    return n;
  }

  /* Milhar com ponto, no formato pt-BR */
  function fmtBR(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

  /* Rótulo do eixo Y: 2000 → "2k" */
  function fmtTick(v) { return v >= 1000 ? (v / 1000).toFixed(0) + "k" : String(v); }

  /* Barra com o topo arredondado (equivalente a radius=[3,3,0,0] no Recharts) */
  function barPath(x, y, w, h, r) {
    if (h <= 0) return "";
    r = Math.min(r, h, w / 2);
    return "M" + x + "," + (y + h) +
           "L" + x + "," + (y + r) +
           "Q" + x + "," + y + " " + (x + r) + "," + y +
           "L" + (x + w - r) + "," + y +
           "Q" + (x + w) + "," + y + " " + (x + w) + "," + (y + r) +
           "L" + (x + w) + "," + (y + h) + "Z";
  }

  function hideTip() { tip.hidden = true; }

  function showTip(row, cx, topY) {
    var html = '<p class="tt-title">' + row.faixa + " anos</p>";
    SERIES.forEach(function (s) {
      html += '<p class="tt-row" style="color:' + s.color + '">' + s.label +
              ": <strong>R$ " + fmtBR(row[s.key]) + "</strong></p>";
    });
    tip.innerHTML = html;
    tip.hidden = false;

    /* Mantém o balão dentro da área visível do cartão */
    var boxW = chartBox.clientWidth;
    var tw = tip.offsetWidth;
    var left = Math.max(tw / 2 + 2, Math.min(cx, boxW - tw / 2 - 2));
    tip.style.left = left + "px";
    tip.style.top = Math.max(tip.offsetHeight + 4, topY - 8) + "px";
  }

  var lastW = 0;

  function renderChart() {
    if (!svg || viewChat.hidden) return;

    /* Largura fracionária, sem arredondar: o viewBox precisa bater exatamente
       com a largura em CSS px, senão o SVG estica o desenho inteiro. */
    var W = svg.getBoundingClientRect().width;
    if (!W) return;
    lastW = W;

    var H = 176;                                  /* h-44 do protótipo */
    var mL = 50, mR = 0, mT = 0, mB = 30;         /* eixo Y (60) + margin.left (-10); eixo X (30) */
    var plotW = W - mL - mR;
    var plotH = H - mT - mB;
    if (plotW <= 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    hideTip();

    var yOf = function (v) { return mT + plotH - (v / Y_MAX) * plotH; };

    /* Grade horizontal tracejada + rótulos do eixo Y */
    for (var v = 0; v <= Y_MAX; v += Y_STEP) {
      var y = yOf(v);
      svg.appendChild(el("line", {
        x1: mL, y1: y, x2: mL + plotW, y2: y,
        stroke: "#DCE3EA", "stroke-width": 1, "stroke-dasharray": "3 3"
      }));
      var lbl = el("text", {
        x: mL - 8, y: y + 3.5, "text-anchor": "end",
        "font-size": 10, fill: "#6B7A8D"
      });
      lbl.textContent = fmtTick(v);
      svg.appendChild(lbl);
    }

    /* Barras agrupadas — largura fixa (barSize), centradas na faixa */
    var bandW = plotW / CHART_DATA.length;
    var groupW = BAR_SIZE * SERIES.length + BAR_GAP * (SERIES.length - 1);

    /* Cursor de leitura, criado ANTES das barras.
       SVG pinta na ordem do documento: se o realce fosse desenhado depois,
       ficaria por cima das barras e lavaria as cores. O Recharts renderiza o
       cursor abaixo das barras — este retângulo reproduz isso.
       O alvo de eventos é outro retângulo, transparente, criado no fim: se o
       próprio cursor ficasse embaixo, as barras interceptariam o mouse e o
       hover nunca dispararia. */
    var cursor = el("rect", {
      x: 0, y: mT, width: 0, height: plotH,
      fill: "rgba(204,204,204,.2)", opacity: 0, "pointer-events": "none"
    });
    svg.appendChild(cursor);

    CHART_DATA.forEach(function (row, i) {
      var bandX = mL + i * bandW;
      var startX = bandX + (bandW - groupW) / 2;
      var minY = mT + plotH;

      SERIES.forEach(function (s, j) {
        var by = yOf(row[s.key]);
        var bh = mT + plotH - by;
        if (by < minY) minY = by;
        svg.appendChild(el("path", {
          d: barPath(startX + j * (BAR_SIZE + BAR_GAP), by, BAR_SIZE, bh, 3),
          fill: s.color, "fill-opacity": s.opacity
        }));
      });

      /* Rótulo do eixo X */
      var xl = el("text", {
        x: bandX + bandW / 2, y: mT + plotH + 16,
        "text-anchor": "middle", "font-size": 11, fill: "#6B7A8D"
      });
      xl.textContent = row.faixa;
      svg.appendChild(xl);

      /* Alvo de eventos: transparente e por cima de tudo, para que passar o
         mouse sobre uma barra também conte como estar sobre a faixa. */
      var band = el("rect", {
        x: bandX, y: mT, width: bandW, height: plotH,
        fill: "transparent", style: "cursor:pointer"
      });
      band.addEventListener("mouseenter", function () {
        cursor.setAttribute("x", bandX);
        cursor.setAttribute("width", bandW);
        cursor.setAttribute("opacity", 1);
        showTip(row, bandX + bandW / 2, minY);
      });
      band.addEventListener("mouseleave", function () {
        cursor.setAttribute("opacity", 0);
        hideTip();
      });
      svg.appendChild(band);
    });
  }

  /* Redesenha sempre que a largura útil mudar.
     O viewBox é fixado na largura medida (1 unidade = 1 px), então qualquer
     mudança de layout sem re-render esticaria o desenho. O ResizeObserver
     cobre o que o resize da janela não pega: troca de estado, abertura da
     gaveta lateral e reflows do contêiner. */
  var rt;
  function scheduleRender() {
    clearTimeout(rt);
    rt = setTimeout(renderChart, 120);
  }

  window.addEventListener("resize", scheduleRender);

  /* Abas em segundo plano congelam ResizeObserver e requestAnimationFrame:
     se a janela mudar de tamanho enquanto a aba está oculta, o viewBox fica
     preso na largura antiga. Redesenha ao voltar para a aba. */
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) scheduleRender();
  });

  /* O alvo observado é o contêiner <div>, que é sempre uma caixa de bloco comum
     — alvo mais previsível para o ResizeObserver do que o próprio <svg>.
     A largura conferida é a do SVG, medida na hora. */
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function () {
      var w = svg.getBoundingClientRect().width;
      if (w && Math.abs(w - lastW) > 0.5) scheduleRender();
    }).observe(chartBox);
  }

  /* O primeiro render acontece antes de o layout assentar e antes de as
     webfonts trocarem as métricas, o que deixa o viewBox fora da largura real.
     Redesenhar depois de cada marco zera a deriva. */
  renderChart();
  requestAnimationFrame(renderChart);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderChart);
})();
