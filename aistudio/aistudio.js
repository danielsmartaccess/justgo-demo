/* ══════════════════════════════════════════════════
   JUST GO — GO AI STUDIO
   Troca de telas, builder e modal de publicação
   ══════════════════════════════════════════════════ */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ══════════ TROCA DE TELAS ══════════ */
  var screens = { gallery: $("#screenGallery"), builder: $("#screenBuilder") };
  var subhead = $("#subhead");

  function setScreen(name) {
    screens.gallery.hidden = name !== "gallery";
    screens.builder.hidden = name !== "builder";
    subhead.hidden = name !== "builder";
    $$("#tnTabs button").forEach(function (b) { b.classList.toggle("active", b.dataset.screen === name); });
    var target = screens[name];
    if (target) target.scrollTop = 0;
  }

  /* Qualquer elemento com data-screen troca de tela */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-screen]");
    if (t) setScreen(t.dataset.screen);
  });

  /* ══════════ AVATAR ══════════ */
  var avaBig = $("#avaBig");
  $$("#avaGrid button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#avaGrid button").forEach(function (x) { x.classList.toggle("on", x === b); });
      avaBig.textContent = b.dataset.emoji;
      avaBig.style.background = "rgba(" + b.dataset.color + ",.145)";
      /* O avatar escolhido acompanha o agente nas outras superfícies.
         `.m-ava` cobre tanto o modal quanto os balões já enviados no chat. */
      $$(".sh-ava, .cb-ava, .m-ava").forEach(function (n) { n.textContent = b.dataset.emoji; });
    });
  });

  /* ══════════ NOME DO AGENTE ══════════ */
  var agName = $("#agName");
  agName.addEventListener("input", function () {
    var v = agName.value.trim() || "Agente sem nome";
    $("#shName").textContent = v;
    $(".cb-name").textContent = v;
    $(".m-ag-name").textContent = v;
  });

  /* ══════════ TOM / PERSONALIDADE ══════════ */
  $$("#tones button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$("#tones button").forEach(function (x) { x.classList.toggle("on", x === b); });
      $("#cbTone").textContent = b.dataset.tone;
      $("#mTone").textContent = b.dataset.tone;
    });
  });

  /* ══════════ INTERRUPTORES ══════════ */
  $$(".tgl").forEach(function (t) {
    t.addEventListener("click", function () {
      var on = t.classList.toggle("on");
      t.setAttribute("aria-checked", String(on));
    });
  });

  /* ══════════ ÁREA DE UPLOAD ══════════ */
  var drop = $("#dropzone");
  ["dragenter", "dragover"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add("dragging"); });
  });
  ["dragleave", "drop"].forEach(function (ev) {
    drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove("dragging"); });
  });

  /* ══════════ CHAT DE TESTE ══════════ */
  var msgs = $("#msgs");
  var chatInput = $("#chatInput");
  var replyTimer = null;

  function addMessage(role, text) {
    var wrap = document.createElement("div");
    wrap.className = "msg " + role;
    var emoji = $("#avaGrid button.on").dataset.emoji;
    wrap.innerHTML = (role === "agent" ? '<span class="m-ava">' + emoji + "</span>" : "") +
                     '<div class="bubble"></div>';
    wrap.querySelector(".bubble").textContent = text;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendMessage() {
    var text = chatInput.value.trim();
    if (!text) return;
    addMessage("user", text);
    chatInput.value = "";
    clearTimeout(replyTimer);
    replyTimer = setTimeout(function () {
      addMessage("agent", "Entendi sua dúvida! Estou processando com base nos documentos municipais disponíveis. Há mais alguma informação que posso ajudar?");
    }, 1000);
  }

  $("#btnSend").addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", function (e) { if (e.key === "Enter") sendMessage(); });

  /* ══════════ MODAL DE PUBLICAÇÃO ══════════ */
  var overlay = $("#overlay");
  var mConfirm = $("#mConfirm");
  var lastFocus = null;
  var pubTimer = null;

  function resetModal() {
    clearTimeout(pubTimer);
    mConfirm.disabled = false;
    mConfirm.classList.remove("done");
    mConfirm.innerHTML = '<svg class="ic ic-15"><use href="#i-zap"/></svg><span>Confirmar publicação</span>';
  }

  function openModal() {
    lastFocus = document.activeElement;
    resetModal();
    overlay.hidden = false;
    $("#mCancel").focus();
  }

  function closeModal() {
    overlay.hidden = true;
    resetModal();
    if (lastFocus) lastFocus.focus();
  }

  $$("[data-publish]").forEach(function (b) { b.addEventListener("click", openModal); });
  $("#mClose").addEventListener("click", closeModal);
  $("#mCancel").addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) closeModal(); });

  mConfirm.addEventListener("click", function () {
    if (mConfirm.disabled || mConfirm.classList.contains("done")) return;
    mConfirm.disabled = true;
    mConfirm.innerHTML = '<span class="spinner"></span>Publicando…';
    pubTimer = setTimeout(function () {
      mConfirm.classList.add("done");
      mConfirm.innerHTML = '<svg class="ic ic-16"><use href="#i-check-circle"/></svg>Publicado!';
    }, 1800);
  });
})();
