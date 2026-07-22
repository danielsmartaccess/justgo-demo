/* ══════════════════════════════════════════════════
   JUST GO — Dashboard do Gestor Municipal
   Interações + gráfico SVG (substitui Recharts)
   ══════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ══════════ SIDEBAR ══════════ */
  var sidebar = $("#sidebar");
  var btnCollapse = $("#btnCollapse");

  btnCollapse.addEventListener("click", function () {
    var collapsed = sidebar.classList.toggle("is-collapsed");
    btnCollapse.setAttribute("aria-expanded", String(!collapsed));
    btnCollapse.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
    $("use", btnCollapse).setAttribute("href", collapsed ? "#i-chevron-right" : "#i-chevron-left");
    renderChart();
  });

  $$("#sideNav button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      $$("#sideNav button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
    });
  });

  /* ══════════ SINO DE NOTIFICAÇÕES ══════════ */
  var btnBell = $("#btnBell");
  var bellPop = $("#bellPop");

  function setBell(open) {
    bellPop.hidden = !open;
    btnBell.setAttribute("aria-expanded", String(open));
  }

  btnBell.addEventListener("click", function (e) {
    e.stopPropagation();
    setBell(bellPop.hidden);
  });
  document.addEventListener("click", function (e) {
    if (!bellPop.hidden && !bellPop.contains(e.target)) setBell(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !bellPop.hidden) { setBell(false); btnBell.focus(); }
  });

  /* ══════════ ALTERNAR ESTADO DA DEMO ══════════ */
  var viewDashboard = $("#viewDashboard");
  var viewEmpty = $("#viewEmpty");

  function setView(name) {
    var isDash = name === "dashboard";
    viewDashboard.hidden = !isDash;
    viewEmpty.hidden = isDash;
    $$("#viewToggle button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.view === name);
    });
    if (isDash) renderChart();
  }

  $$("#viewToggle button").forEach(function (btn) {
    btn.addEventListener("click", function () { setView(btn.dataset.view); });
  });
  $("#btnCreate").addEventListener("click", function () { setView("dashboard"); });

  /* ══════════ FEEDBACK DO BRIEFING ══════════ */
  $$(".fb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var on = btn.getAttribute("aria-pressed") === "true";
      $$(".fb").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", on ? "false" : "true");
    });
  });

  /* ══════════ TIMESTAMP AO VIVO ══════════ */
  var stamp = $("#liveStamp");
  var secs = 32;
  setInterval(function () {
    secs = secs >= 90 ? 1 : secs + 1;
    stamp.textContent = "atualizado há " + secs + "s";
  }, 1000);

  /* ══════════ ILUSTRAÇÃO DO ESTADO VAZIO ══════════ */
  (function buildEmptyDots() {
    var g = $("#emptyDots");
    if (!g) return;
    var NS = "http://www.w3.org/2000/svg";
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 4; row++) {
        var r = document.createElementNS(NS, "rect");
        r.setAttribute("x", String(42 + col * 12));
        r.setAttribute("y", String(76 + row * 12));
        r.setAttribute("width", "6");
        r.setAttribute("height", "6");
        r.setAttribute("rx", "1.5");
        r.setAttribute("fill", col === 3 && row === 1 ? "#00AEEF" : "#F0F4F8");
        g.appendChild(r);
      }
    }
  })();

  /* ══════════ GRÁFICO DE VENDAS POR ÁREA ══════════ */
  var CHART_DATA = [
    { area: "Palco Principal", alimentacao: 320, bebidas: 210, artesanato: 95 },
    { area: "Praça Central",   alimentacao: 280, bebidas: 190, artesanato: 140 },
    { area: "Setor Gastro",    alimentacao: 410, bebidas: 160, artesanato: 30 },
    { area: "Arena Kids",      alimentacao: 150, bebidas: 90,  artesanato: 200 },
    { area: "Boulevard",       alimentacao: 260, bebidas: 230, artesanato: 110 },
    { area: "Food Court",      alimentacao: 380, bebidas: 140, artesanato: 60 }
  ];

  var SERIES = [
    { key: "alimentacao", label: "Alimentação", color: "#00AEEF" },
    { key: "bebidas",     label: "Bebidas",     color: "#0D1B2A" },
    { key: "artesanato",  label: "Artesanato",  color: "#E6B64C" }
  ];

  var NS = "http://www.w3.org/2000/svg";
  var svg = $("#salesChart");
  var tip = $("#chartTip");
  var chartBox = svg.parentNode;

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, String(attrs[k]));
    return n;
  }

  /* Barra com o topo arredondado (equivalente ao radius=[4,4,0,0] do Recharts) */
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
    var html = "<b>" + row.area + "</b>";
    SERIES.forEach(function (s) {
      html += '<div class="tip-row"><i style="background:' + s.color + '"></i>' +
              "<em>" + s.label + ":</em><strong>" + row[s.key] + " itens</strong></div>";
    });
    tip.innerHTML = html;
    tip.hidden = false;

    /* Mantém o tooltip dentro da área visível do cartão */
    var boxW = chartBox.clientWidth;
    var tw = tip.offsetWidth;
    var left = Math.max(tw / 2 + 4, Math.min(cx, boxW - tw / 2 - 4));
    tip.style.left = left + "px";
    tip.style.top = Math.max(tip.offsetHeight + 4, topY - 8) + "px";
  }

  var lastW = 0;

  function renderChart() {
    if (!svg || viewDashboard.hidden) return;

    /* Largura fracionária, sem arredondar: o viewBox precisa bater exatamente
       com a largura em CSS px, senão o SVG escala o desenho inteiro. */
    var W = svg.getBoundingClientRect().width;
    if (!W) return;
    lastW = W;
    var H = 240;

    var mL = 40, mR = 8, mT = 10, mB = 26;
    var plotW = W - mL - mR;
    var plotH = H - mT - mB;
    if (plotW <= 0) return;

    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    hideTip();

    /* Escala Y arredondada para a centena superior */
    var max = 0;
    CHART_DATA.forEach(function (d) {
      SERIES.forEach(function (s) { if (d[s.key] > max) max = d[s.key]; });
    });
    var step = 100;
    var niceMax = Math.ceil(max / step) * step;
    var ticks = niceMax / step;
    var yOf = function (v) { return mT + plotH - (v / niceMax) * plotH; };

    /* Grade horizontal + rótulos do eixo Y */
    for (var t = 0; t <= ticks; t++) {
      var val = t * step;
      var y = yOf(val);
      svg.appendChild(el("line", {
        x1: mL, y1: y, x2: mL + plotW, y2: y,
        stroke: "#F0F4F8", "stroke-width": 1,
        "stroke-dasharray": t === 0 ? "0" : "3 3"
      }));
      var lbl = el("text", { x: mL - 8, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#9BAAB8" });
      lbl.textContent = String(val);
      svg.appendChild(lbl);
    }

    /* Barras agrupadas */
    var groupW = plotW / CHART_DATA.length;
    var barGap = 3;
    var usable = groupW * 0.7;
    var barW = Math.max(4, (usable - barGap * (SERIES.length - 1)) / SERIES.length);
    var groupInner = barW * SERIES.length + barGap * (SERIES.length - 1);

    CHART_DATA.forEach(function (row, i) {
      var gx = mL + i * groupW;
      var startX = gx + (groupW - groupInner) / 2;
      var minY = mT + plotH;

      SERIES.forEach(function (s, j) {
        var v = row[s.key];
        var bx = startX + j * (barW + barGap);
        var by = yOf(v);
        var bh = mT + plotH - by;
        if (by < minY) minY = by;
        svg.appendChild(el("path", { d: barPath(bx, by, barW, bh, 4), fill: s.color }));
      });

      /* Rótulo do eixo X */
      var xl = el("text", {
        x: gx + groupW / 2, y: mT + plotH + 17,
        "text-anchor": "middle", "font-size": 11, fill: "#9BAAB8"
      });
      xl.textContent = row.area;
      svg.appendChild(xl);

      /* Faixa de hover do grupo (cursor + tooltip) */
      var band = el("rect", {
        x: gx, y: mT, width: groupW, height: plotH,
        fill: "transparent", style: "cursor:pointer"
      });
      band.addEventListener("mouseenter", function () {
        band.setAttribute("fill", "rgba(0,174,239,0.04)");
        showTip(row, gx + groupW / 2 + 4, minY);
      });
      band.addEventListener("mouseleave", function () {
        band.setAttribute("fill", "transparent");
        hideTip();
      });
      svg.appendChild(band);
    });
  }

  /* Redesenha sempre que a largura útil mudar.
     O viewBox é fixado na largura medida (1 unidade = 1 px), então qualquer
     mudança de layout sem re-render esticaria o desenho. O ResizeObserver
     cobre o que o evento de resize da janela não pega: recolher a sidebar,
     alternar de view e reflows de container. */
  var rt;
  function scheduleRender() {
    clearTimeout(rt);
    rt = setTimeout(renderChart, 120);
  }

  window.addEventListener("resize", scheduleRender);

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function (entries) {
      var w = entries[0].contentRect.width;
      if (w && Math.abs(w - lastW) > 0.5) scheduleRender();
    }).observe(svg);
  }

  /* O primeiro render acontece antes de o layout assentar e antes de as
     webfonts trocarem as métricas, o que deixa o viewBox 1px fora da largura
     real. Redesenhar depois de cada um desses marcos zera a deriva. */
  renderChart();
  requestAnimationFrame(renderChart);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(renderChart);
})();
