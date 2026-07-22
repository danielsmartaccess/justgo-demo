/* ══════════════════════════════════════════════════
   JUST GO — GO PAY
   Navegação da carteira, painel financeiro e gráfico SVG
   (substitui recharts LineChart)
   ══════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var NS = "http://www.w3.org/2000/svg";

  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, String(attrs[k]));
    return n;
  }

  /* ══════════ ALTERNAR CARTEIRA / PAINEL ══════════ */
  var viewWallet = $("#viewWallet");
  var viewPanel = $("#viewPanel");
  var screenPicker = $("#screenPicker");

  function setView(name) {
    var wallet = name === "wallet";
    viewWallet.hidden = !wallet;
    viewPanel.hidden = wallet;
    screenPicker.hidden = !wallet;
    $$("#viewToggle button").forEach(function (b) { b.classList.toggle("active", b.dataset.view === name); });
    if (!wallet) renderHourChart();
  }

  $$("#viewToggle button").forEach(function (b) {
    b.addEventListener("click", function () { setView(b.dataset.view); });
  });

  /* ══════════ NAVEGAÇÃO DA CARTEIRA ══════════ */
  var NAV_SCREENS = ["home", "qrpay"]; /* telas que exibem a bottom nav */
  var bottomnav = $("#bottomnav");

  function goScreen(name) {
    $$(".scr").forEach(function (s) { s.hidden = s.dataset.scr !== name; });
    $$("#screenPicker button").forEach(function (b) { b.classList.toggle("active", b.dataset.screen === name); });
    $$("#bottomnav button").forEach(function (b) { b.classList.toggle("on", b.dataset.go === name); });
    bottomnav.hidden = NAV_SCREENS.indexOf(name) === -1;
    $(".screens").scrollTop = 0;
    if (name === "pixcode") startCountdown();
    if (name === "refund_ok") $("#okKey").textContent = ($("#pixKey").value || "").trim() || "—";
  }

  $$("#screenPicker button").forEach(function (b) {
    b.addEventListener("click", function () { goScreen(b.dataset.screen); });
  });

  /* Qualquer elemento com data-go navega, exceto os botões desabilitados */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-go]");
    if (!t || t.disabled || t.closest("#screenPicker")) return;
    goScreen(t.dataset.go);
  });

  /* ══════════ RECARGA: VALORES ══════════ */
  var amount = 50;
  var customWrap = $("#customAmt");
  var btnGenPix = $("#btnGenPix");

  function syncGenButton() {
    var ok = amount === -1 ? !!(customWrap.querySelector("input").value.trim()) : amount > 0;
    btnGenPix.disabled = !ok;
  }

  $$("#presets button").forEach(function (b) {
    b.addEventListener("click", function () {
      amount = parseInt(b.dataset.amt, 10);
      $$("#presets button").forEach(function (x) { x.classList.toggle("on", x === b); });
      customWrap.hidden = amount !== -1;
      if (amount > 0) $("#pixAmt").textContent = String(amount);
      syncGenButton();
    });
  });
  customWrap.querySelector("input").addEventListener("input", syncGenButton);
  syncGenButton();

  /* ══════════ CÓDIGO PIX: CONTAGEM + COPIAR ══════════ */
  var PIX_CODE = "00020126580014BR.GOV.BCB.PIX01368a3b4c5d-6e7f-8901-abcd-ef1234567890520400005303986540584.505802BR5913JUST GO LTDA6009SAO PAULO62070503***6304A1B2";
  $("#pixCode").textContent = PIX_CODE.slice(0, 88) + "…";

  var cdTimer = null;
  function startCountdown() {
    var left = 9 * 60 + 32;
    var out = $("#countdown");
    var sub = $("#countdownSub");
    clearInterval(cdTimer);
    var paint = function () {
      var m = Math.floor(left / 60);
      var s = left % 60;
      var txt = m + ":" + (s < 10 ? "0" : "") + s;
      out.textContent = txt;
      sub.textContent = "Válido por " + txt;
    };
    paint();
    cdTimer = setInterval(function () {
      left = left > 0 ? left - 1 : 0;
      paint();
      if (left === 0) clearInterval(cdTimer);
    }, 1000);
  }

  var btnCopy = $("#btnCopy");
  var copyTimer = null;
  btnCopy.addEventListener("click", function () {
    var label = btnCopy.querySelector("span");
    var icon = btnCopy.querySelector("use");
    var done = function () {
      btnCopy.classList.add("copied");
      icon.setAttribute("href", "#i-check");
      label.textContent = "Copiado!";
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () {
        btnCopy.classList.remove("copied");
        icon.setAttribute("href", "#i-copy");
        label.textContent = "Copiar código";
      }, 3000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(PIX_CODE).then(done, done);
    } else {
      done();
    }
  });

  /* ══════════ RESGATE: TIPO DE CHAVE ══════════ */
  var KEY_META = {
    cpf: { label: "CPF", ph: "000.000.000-00" },
    email: { label: "E-mail", ph: "seu@email.com" },
    tel: { label: "Telefone", ph: "(11) 99999-9999" },
    random: { label: "Aleatória", ph: "Chave aleatória" }
  };
  var pixKeyInput = $("#pixKey");
  var btnRefund = $("#btnRefund");

  function syncRefund() { btnRefund.disabled = !pixKeyInput.value.trim(); }

  $$("#keyTypes button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#keyTypes button").forEach(function (x) { x.classList.toggle("on", x === b); });
      var meta = KEY_META[b.dataset.key];
      $("#keyLabel").textContent = meta.label;
      pixKeyInput.placeholder = meta.ph;
    });
  });
  pixKeyInput.addEventListener("input", syncRefund);
  syncRefund();

  /* ══════════ QR CODE (matriz fixa da demo) ══════════ */
  (function buildQR() {
    var rows = [
      "1111111011010111111110", "1000001010101100000110", "1011101001011010111010",
      "1011101011000010111010", "1011101100110010111010", "1000001001000100000110",
      "1111111010101011111110", "0000000011010100000000", "1011011100010110110110",
      "0110100010010010001010", "1001111101001001101010", "0100000010101100100110",
      "1010111101100011011010", "0001000010001010000100", "1111111000110100101010",
      "1000001010001010010110", "1011101011101000110100", "1011101010001000001110",
      "1011101001100010101000", "1000001010010100101110", "1111111001101001010010"
    ];
    var svg = $("#qrSvg");
    var size = 184;
    var n = rows[0].length;
    var cell = size / n;
    svg.appendChild(el("rect", { width: size, height: size, fill: "#fff" }));
    rows.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row[x] === "1") {
          svg.appendChild(el("rect", { x: x * cell, y: y * cell, width: cell, height: cell, fill: "#0A0A0A" }));
        }
      }
    });
  })();

  /* ══════════ PAINEL: NAV, BANNER, TABELA, AUDITORIA ══════════ */
  $$("#pNav button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#pNav button").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
    });
  });

  $("#dismissDiv").addEventListener("click", function () { $("#divBanner").hidden = true; });

  var VENDORS = [
    ["Barraca do João", "Alimentação", "R$ 312.450", "R$ 298.200", "R$ 14.250", "Conciliado"],
    ["Praça de Alimentação Norte", "Alimentação", "R$ 487.890", "R$ 451.340", "R$ 36.550", "Conciliado"],
    ["Bar da Praia", "Bebidas", "R$ 198.670", "R$ 187.120", "R$ 11.550", "Conciliado"],
    ["Artesanato Nordestino", "Artesanato", "R$ 89.340", "R$ 84.890", "R$ 4.450", "Conciliado"],
    ["Food Truck Gourmet", "Alimentação", "R$ 267.120", "R$ 241.680", "R$ 25.440", "Divergência"],
    ["Loja de Souvenirs", "Varejo", "R$ 143.780", "R$ 138.920", "R$ 4.860", "Conciliado"],
    ["Sorveteria Tropical", "Alimentação", "R$ 98.450", "R$ 94.230", "R$ 4.220", "Conciliado"]
  ];

  (function buildVendors() {
    var tb = $("#vendorRows");
    VENDORS.forEach(function (v) {
      var ok = v[5] === "Conciliado";
      var tr = document.createElement("tr");
      if (!ok) tr.className = "diverg";
      tr.innerHTML =
        '<td class="td-name">' + v[0] + "</td>" +
        '<td class="td-cat">' + v[1] + "</td>" +
        '<td class="td-num">' + v[2] + "</td>" +
        '<td class="td-num">' + v[3] + "</td>" +
        '<td class="td-saldo">' + v[4] + "</td>" +
        '<td><span class="status ' + (ok ? "ok" : "bad") + '"><i></i>' + v[5] + "</span></td>";
      tb.appendChild(tr);
    });
  })();

  var AUDIT = [
    ["Extrato exportado por M. Silva", "16/06 09:12", "export", "#i-download"],
    ["Conciliação aprovada por A. Santos", "16/06 08:45", "ok", "#i-check"],
    ["Relatório gerado por M. Silva", "15/06 23:58", "file", "#i-file"],
    ["Divergência detectada — Food Truck", "15/06 22:31", "alert", "#i-warning"],
    ["Encerramento de caixa iniciado", "15/06 22:00", "clock", "#i-clock"],
    ["Recarga em lote aprovada — R$ 50k", "15/06 18:34", "ok", "#i-check"],
    ["Acesso de J. Pereira registrado", "15/06 14:20", "user", "#i-users"],
    ["Backup de dados realizado", "15/06 12:00", "ok", "#i-check"]
  ];

  (function buildAudit() {
    var list = $("#auditList");
    AUDIT.forEach(function (a) {
      var d = document.createElement("div");
      d.className = "p-audit-item";
      d.innerHTML =
        '<span class="p-audit-ico ' + a[2] + '"><svg class="ic"><use href="' + a[3] + '"/></svg></span>' +
        '<div><p class="p-audit-t">' + a[0] + '</p><p class="p-audit-ts">' + a[1] + "</p></div>";
      list.appendChild(d);
    });
  })();

  /* ══════════ GRÁFICO: VOLUME POR HORA ══════════ */
  var HOURLY = [
    { h: "08h", v: 12400 }, { h: "09h", v: 31200 }, { h: "10h", v: 48700 },
    { h: "11h", v: 72500 }, { h: "12h", v: 138900 }, { h: "13h", v: 196400 },
    { h: "14h", v: 162100 }, { h: "15h", v: 148700 }, { h: "16h", v: 183200 },
    { h: "17h", v: 219600 }, { h: "18h", v: 291400 }, { h: "19h", v: 347800 },
    { h: "20h", v: 295100 }, { h: "21h", v: 201300 }, { h: "22h", v: 148900 },
    { h: "23h", v: 92400 }
  ];

  var chart = $("#hourChart");
  var chartTip = $("#hourTip");
  var lastW = 0;

  /* Interpolação cúbica monotônica (Fritsch–Carlson) — mesma curva do
     `type="monotone"` do Recharts: suaviza sem ultrapassar os pontos,
     o que importa aqui porque a série tem picos acentuados. */
  function monotonePath(pts) {
    var n = pts.length;
    if (n < 2) return "";
    var dx = [], dy = [], m = [], i;
    for (i = 0; i < n - 1; i++) {
      dx.push(pts[i + 1].x - pts[i].x);
      dy.push(pts[i + 1].y - pts[i].y);
    }
    var slope = dy.map(function (d, k) { return d / dx[k]; });
    m.push(slope[0]);
    for (i = 1; i < n - 1; i++) {
      if (slope[i - 1] * slope[i] <= 0) m.push(0);
      else {
        var w1 = 2 * dx[i] + dx[i - 1], w2 = dx[i] + 2 * dx[i - 1];
        m.push((w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]));
      }
    }
    m.push(slope[n - 2]);

    var d = "M" + pts[0].x + "," + pts[0].y;
    for (i = 0; i < n - 1; i++) {
      var c1x = pts[i].x + dx[i] / 3, c1y = pts[i].y + m[i] * dx[i] / 3;
      var c2x = pts[i + 1].x - dx[i] / 3, c2y = pts[i + 1].y - m[i + 1] * dx[i] / 3;
      d += "C" + c1x + "," + c1y + " " + c2x + "," + c2y + " " + pts[i + 1].x + "," + pts[i + 1].y;
    }
    return d;
  }

  function renderHourChart() {
    if (!chart || viewPanel.hidden) return;
    var W = chart.getBoundingClientRect().width;
    if (!W) return;
    lastW = W;
    var H = 196;
    var mL = 34, mR = 6, mT = 6, mB = 20;
    var plotW = W - mL - mR, plotH = H - mT - mB;
    if (plotW <= 0) return;

    while (chart.firstChild) chart.removeChild(chart.firstChild);
    chart.setAttribute("viewBox", "0 0 " + W + " " + H);
    chartTip.hidden = true;

    var max = 0;
    HOURLY.forEach(function (d) { if (d.v > max) max = d.v; });
    var step = 100000;
    var niceMax = Math.ceil(max / step) * step;
    var yOf = function (v) { return mT + plotH - (v / niceMax) * plotH; };
    var xOf = function (i) { return mL + (plotW * i) / (HOURLY.length - 1); };

    /* Grade + eixo Y */
    for (var t = 0; t <= niceMax / step; t++) {
      var val = t * step, y = yOf(val);
      chart.appendChild(el("line", {
        x1: mL, y1: y, x2: mL + plotW, y2: y,
        stroke: "rgba(18,40,61,0.05)", "stroke-width": 1, "stroke-dasharray": "3 3"
      }));
      var lb = el("text", { x: mL - 7, y: y + 3.5, "text-anchor": "end", "font-size": 10, fill: "#8BA3BC" });
      lb.textContent = (val / 1000).toFixed(0) + "k";
      chart.appendChild(lb);
    }

    var pts = HOURLY.map(function (d, i) { return { x: xOf(i), y: yOf(d.v) }; });
    var line = monotonePath(pts);

    /* Área sob a curva */
    var grad = el("linearGradient", { id: "hourGrad", x1: "0", y1: "0", x2: "0", y2: "1" });
    grad.appendChild(el("stop", { offset: "0%", "stop-color": "#00AEEF", "stop-opacity": ".15" }));
    grad.appendChild(el("stop", { offset: "100%", "stop-color": "#00AEEF", "stop-opacity": "0" }));
    var defs = el("defs", {});
    defs.appendChild(grad);
    chart.appendChild(defs);
    chart.appendChild(el("path", {
      d: line + "L" + pts[pts.length - 1].x + "," + (mT + plotH) + "L" + pts[0].x + "," + (mT + plotH) + "Z",
      fill: "url(#hourGrad)"
    }));

    /* Linha */
    chart.appendChild(el("path", { d: line, fill: "none", stroke: "#00AEEF", "stroke-width": 2.5, "stroke-linecap": "round", "stroke-linejoin": "round" }));

    /* Rótulos do eixo X */
    HOURLY.forEach(function (d, i) {
      var tx = el("text", { x: xOf(i), y: mT + plotH + 14, "text-anchor": "middle", "font-size": 10, fill: "#8BA3BC" });
      tx.textContent = d.h;
      chart.appendChild(tx);
    });

    /* Cursor + ponto ativo + tooltip */
    var cursor = el("line", { x1: 0, y1: mT, x2: 0, y2: mT + plotH, stroke: "rgba(0,174,239,0.3)", "stroke-width": 1, opacity: 0 });
    var dot = el("circle", { r: 5, fill: "#00AEEF", opacity: 0 });
    chart.appendChild(cursor);
    chart.appendChild(dot);

    var half = plotW / (HOURLY.length - 1) / 2;
    HOURLY.forEach(function (d, i) {
      var band = el("rect", {
        x: Math.max(mL, xOf(i) - half), y: mT,
        width: Math.min(half * 2, plotW), height: plotH,
        fill: "transparent", style: "cursor:crosshair"
      });
      band.addEventListener("mouseenter", function () {
        cursor.setAttribute("x1", xOf(i)); cursor.setAttribute("x2", xOf(i)); cursor.setAttribute("opacity", 1);
        dot.setAttribute("cx", xOf(i)); dot.setAttribute("cy", yOf(d.v)); dot.setAttribute("opacity", 1);
        chartTip.innerHTML = "<b>" + d.h + "</b>Volume: R$ " + d.v.toLocaleString("pt-BR");
        chartTip.hidden = false;
        var boxW = chart.parentNode.clientWidth;
        var tw = chartTip.offsetWidth;
        chartTip.style.left = Math.max(tw / 2, Math.min(xOf(i), boxW - tw / 2)) + "px";
        chartTip.style.top = Math.max(chartTip.offsetHeight, yOf(d.v) - 10) + "px";
      });
      band.addEventListener("mouseleave", function () {
        cursor.setAttribute("opacity", 0);
        dot.setAttribute("opacity", 0);
        chartTip.hidden = true;
      });
      chart.appendChild(band);
    });
  }

  var rt;
  function scheduleRender() { clearTimeout(rt); rt = setTimeout(renderHourChart, 120); }
  window.addEventListener("resize", scheduleRender);
  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function (e) {
      var w = e[0].contentRect.width;
      if (w && Math.abs(w - lastW) > 0.5) scheduleRender();
    }).observe(chart);
  }
})();
