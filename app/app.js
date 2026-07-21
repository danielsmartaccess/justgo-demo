/* ══════════════════════════════════════════════════
   JUST GO · App do Visitante — lógica
   Festival Canaã Cidade Junina (dados demo)
   ══════════════════════════════════════════════════ */
"use strict";

/* ─────────── Dados ─────────── */
const DATA = {
  shows: {
    sex: [
      { hora: "19h00", nome: "Abertura Oficial", local: "Palco Principal" },
      { hora: "20h30", nome: "Quadrilha Flor do Sertão", local: "Arena Junina" },
      { hora: "22h00", nome: "Banda Xote & Baião", local: "Palco Principal" },
    ],
    sab: [
      { hora: "19h00", nome: "Quadrilha Mirim Sol Nascente", local: "Arena Junina" },
      { hora: "21h00", nome: "Forró da Lua", local: "Palco Principal", now: true },
      { hora: "22h15", nome: "Quadrilha Estrela do Norte", local: "Arena Junina" },
      { hora: "23h30", nome: "Trio Pé de Serra", local: "Palco Principal" },
    ],
    dom: [
      { hora: "18h30", nome: "Festival de Prêmios", local: "Arena Junina" },
      { hora: "20h00", nome: "Grande Final das Quadrilhas", local: "Arena Junina" },
      { hora: "22h00", nome: "Show de Encerramento", local: "Palco Principal" },
    ],
  },
  comidas: [
    { ico: "🍢", nome: "Espetinho do Zé", desc: "Churrasco · setor G2", preco: "R$ 12", stars: 5, id: "c1" },
    { ico: "🥗", nome: "Sabor da Terra", desc: "Vegetariano · setor G7", preco: "R$ 15", stars: 5, id: "c2" },
    { ico: "🌽", nome: "Milho da Vovó", desc: "Típicos juninos · G4", preco: "R$ 8", stars: 4, id: "c3" },
    { ico: "🧁", nome: "Doces da Maria", desc: "Bolos e doces · G9", preco: "R$ 6", stars: 5, id: "c4" },
    { ico: "🍹", nome: "Caldos & Cia", desc: "Caldos e bebidas · G1", preco: "R$ 10", stars: 4, id: "c5" },
  ],
  expo: [
    { ico: "🧵", nome: "Artesanato Canaã", desc: "Setor A · estande 12", id: "e1" },
    { ico: "🍯", nome: "Mel do Carajás", desc: "Setor B · estande 04", id: "e2" },
    { ico: "👕", nome: "Moda Regional", desc: "Setor A · estande 21", id: "e3" },
    { ico: "🪵", nome: "Madeira & Arte", desc: "Setor C · estande 02", id: "e4" },
    { ico: "🌱", nome: "Agro Familiar", desc: "Setor B · estande 11", id: "e5" },
  ],
  pins: [
    { x: 62, y: 55, ico: "🎤", nome: "Palco Principal", info: "Forró da Lua ao vivo agora", cat: "shows" },
    { x: 168, y: 92, ico: "🍔", nome: "Praça de Alimentação", info: "14 barracas abertas", cat: "comida" },
    { x: 112, y: 152, ico: "🚻", nome: "Banheiros", info: "Bloco central · fila baixa", cat: "servicos" },
    { x: 208, y: 47, ico: "🚑", nome: "Posto Médico", info: "Equipe 24h · entrada leste", cat: "servicos" },
    { x: 34, y: 142, ico: "🚘", nome: "Estacionamento Norte", info: "34% ocupado · melhor opção", cat: "servicos" },
    { x: 202, y: 158, ico: "🛍️", nome: "Expositores", info: "Setores A, B e C", cat: "expo" },
    { x: 120, y: 98, ico: "🎡", nome: "Parque de Diversões", info: "Aberto até 0h", cat: "shows" },
  ],
  ai: [
    { k: ["banheiro", "toalete", "wc"], r: "🚻 O banheiro mais próximo fica ao lado do Palco Principal, a ~80 m. O bloco da Praça de Alimentação está com fila menor agora." },
    { k: ["show", "agora", "palco", "música", "musica", "atração", "atracao"], r: "🎤 <strong>Agora:</strong> Forró da Lua no Palco Principal.<br/>⏭️ <strong>Próximo:</strong> Quadrilha Estrela do Norte às 22h15 na Arena Junina." },
    { k: ["vegetarian", "vegan", "salada"], r: "🥗 A barraca <strong>Sabor da Terra</strong> (setor G7) é 100% vegetariana — avaliação ⭐ 4,9. O Milho da Vovó também tem opções sem carne." },
    { k: ["estacionamento", "carro", "vaga", "estacionar"], r: "🚘 O <strong>Estacionamento Norte</strong> está com 34% de ocupação — melhor opção agora. O Sul está com 87%." },
    { k: ["comida", "comer", "fome", "lanche", "barraca", "doce"], r: "🍔 São 14 barracas abertas! Destaques de hoje: Espetinho do Zé (⭐ 4,8), Sabor da Terra (vegetariana) e Doces da Maria. Veja tudo em 🍔 Gastronomia." },
    { k: ["emergência", "emergencia", "médico", "medico", "socorro", "ajuda"], r: "🚑 O Posto Médico fica na entrada leste (24h). Se precisar, use o botão <strong>Emergência</strong> no Perfil — sua localização é enviada na hora." },
    { k: ["mapa", "onde fica", "localiza", "chegar"], r: "🗺️ Toque na aba <strong>Mapa</strong> — todos os palcos, banheiros, barracas e estacionamentos estão marcados. Toque em um pin para detalhes." },
    { k: ["quadrilha", "final"], r: "💃 A <strong>Grande Final das Quadrilhas</strong> é domingo às 20h00 na Arena Junina. Garanta lugar com antecedência — é o momento mais disputado!" },
    { k: ["qr", "ingresso", "entrada"], r: "🎫 Seu QR Code de acesso está no <strong>Perfil</strong>. Apresente na entrada e nas barracas parceiras para vantagens exclusivas." },
  ],
};

const state = {
  screen: "home",
  day: "sab",
  favs: new Set(JSON.parse(localStorage.getItem("jg_favs") || "[]")),
  rating: 0,
  mapCat: "todos",
  chat: [{ who: "bot", text: "E aí! 👋 Sou a <strong>Go AI</strong>, sua guia no festival. Pergunte sobre shows, comida, banheiros, estacionamento…" }],
};
const saveFavs = () => localStorage.setItem("jg_favs", JSON.stringify([...state.favs]));

/* ─────────── Helpers ─────────── */
const $ = (s) => document.querySelector(s);
const screens = $("#screens");
const starStr = (n) => "★".repeat(n) + "☆".repeat(5 - n);

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(t._h);
  t._h = setTimeout(() => (t.hidden = true), 2200);
}

function favBtn(id) {
  return `<button class="fav ${state.favs.has(id) ? "on" : ""}" data-fav="${id}" aria-label="Favoritar">❤️</button>`;
}

/* ─────────── QR fake (determinístico) ─────────── */
function qrSvg() {
  let cells = "";
  let seed = 42;
  const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      const border = x === 0 || y === 0 || x === 6 || y === 6 || x === 14 || y === 20 || x === 20 || y === 14;
      let on;
      if (finder) {
        const lx = x % 14, ly = y % 14;
        const cx = Math.min(lx, 6), cy = Math.min(ly, 6);
        on = cx === 0 || cy === 0 || cx === 6 || cy === 6 || (cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4);
      } else on = rnd() > 0.52;
      if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
  return `<svg viewBox="0 0 21 21" class="qr" shape-rendering="crispEdges" fill="#0b0d10">${cells}</svg>`;
}

/* ─────────── Telas ─────────── */
const VIEW = {
  home: () => {
    const next = DATA.shows.sab.filter((s) => !s.now).slice(1, 3);
    return `
    <div class="screen">
      <div class="h-greet">Boa noite, visitante 👋</div>
      <div class="h-title">Festival Canaã <span class="gold">Cidade Junina</span></div>

      <div class="live-card">
        <span class="live-pill">AO VIVO</span>
        <h3>Forró da Lua</h3>
        <small>🎤 Palco Principal · começou às 21h00</small>
        <div class="live-progress">
          <div class="bar"><i id="liveBar" style="width:45%"></i></div>
          <small><span>21h00</span><span>22h00</span></small>
        </div>
      </div>

      <div class="tiles">
        <button class="tile" data-go="agenda">📅<span>Agenda</span></button>
        <button class="tile" data-go="mapa">🗺️<span>Mapa</span></button>
        <button class="tile" data-go="comida">🍔<span>Comida</span></button>
        <button class="tile" data-go="expo">🛍️<span>Expo</span></button>
        <button class="tile gold" data-go="perfil">🎫<span>QR Code</span></button>
        <button class="tile" data-go="favoritos">⭐<span>Favoritos</span></button>
        <button class="tile" data-go="ia">🤖<span>Go AI</span></button>
        <button class="tile" data-sos>🚑<span>Emergência</span></button>
      </div>

      <div class="sec-title">Próximos shows <a href="#" data-go="agenda">ver agenda →</a></div>
      ${next.map((s) => `
        <div class="list-item">
          <div class="li-ico blue">🎤</div>
          <div class="li-body"><strong>${s.nome}</strong><small>${s.local}</small></div>
          <div class="li-right"><span class="chip-time">${s.hora}</span></div>
        </div>`).join("")}

      <div class="sec-title">Destaques da gastronomia <a href="#" data-go="comida">ver tudo →</a></div>
      ${DATA.comidas.slice(0, 2).map((c) => `
        <div class="list-item">
          <div class="li-ico gold">${c.ico}</div>
          <div class="li-body"><strong>${c.nome}</strong><small>${c.desc}</small></div>
          <div class="li-right"><span class="stars">${starStr(c.stars)}</span>${favBtn(c.id)}</div>
        </div>`).join("")}
    </div>`;
  },

  agenda: () => `
    <div class="screen">
      <div class="h-title">📅 Programação</div>
      <div class="chips" id="dayChips">
        <button data-day="sex" class="${state.day === "sex" ? "active" : ""}">Sexta</button>
        <button data-day="sab" class="${state.day === "sab" ? "active" : ""}">Sábado</button>
        <button data-day="dom" class="${state.day === "dom" ? "active" : ""}">Domingo</button>
      </div>
      <div style="height:12px"></div>
      ${DATA.shows[state.day].map((s, i) => `
        <div class="list-item">
          <div class="li-ico ${s.now ? "gold" : "blue"}">🎤</div>
          <div class="li-body"><strong>${s.nome}</strong><small>${s.local}</small></div>
          <div class="li-right">
            ${s.now ? '<span class="chip-now">AGORA</span>' : `<span class="chip-time">${s.hora}</span>`}
            ${favBtn("s_" + state.day + i)}
          </div>
        </div>`).join("")}
    </div>`,

  mapa: () => {
    const cats = [["todos", "Todos"], ["shows", "🎤 Shows"], ["comida", "🍔 Comida"], ["servicos", "🚻 Serviços"], ["expo", "🛍️ Expo"]];
    const pins = DATA.pins.filter((p) => state.mapCat === "todos" || p.cat === state.mapCat);
    return `
    <div class="screen">
      <div class="h-title">🗺️ Mapa do evento</div>
      <div class="chips" id="mapChips">
        ${cats.map(([k, l]) => `<button data-cat="${k}" class="${state.mapCat === k ? "active" : ""}">${l}</button>`).join("")}
      </div>
      <div style="height:12px"></div>
      <div class="map-box">
        <svg viewBox="0 0 240 195">
          <rect width="240" height="195" fill="#0a0f18"/>
          <path d="M0 108 Q 70 88 120 108 T 240 103" stroke="#1b2434" stroke-width="11" fill="none"/>
          <path d="M118 0 L 122 195" stroke="#1b2434" stroke-width="9"/>
          <rect x="18" y="20" width="78" height="60" rx="9" fill="rgba(0,174,239,.10)" stroke="rgba(0,174,239,.35)" stroke-width="1"/>
          <text x="57" y="14" text-anchor="middle" font-size="7.5" fill="#5b6b82">PALCO / ARENA</text>
          <rect x="146" y="122" width="78" height="54" rx="9" fill="rgba(230,182,76,.09)" stroke="rgba(230,182,76,.35)" stroke-width="1"/>
          <text x="185" y="187" text-anchor="middle" font-size="7.5" fill="#8a7439">EXPOSITORES</text>
          <rect x="20" y="124" width="62" height="48" rx="9" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.14)" stroke-width="1"/>
          ${pins.map((p, i) => `
            <g class="map-pin" data-pin="${DATA.pins.indexOf(p)}" transform="translate(${p.x},${p.y})">
              <circle r="13.5" fill="#121722" stroke="#00aeef" stroke-width="1.6"/>
              <text y="4.5" text-anchor="middle" font-size="12.5">${p.ico}</text>
            </g>`).join("")}
        </svg>
      </div>
      <div class="map-sheet" id="mapSheet">
        <span style="font-size:22px">👆</span>
        <div><strong>Toque em um pin</strong>para ver detalhes e traçar rota.</div>
      </div>
    </div>`;
  },

  comida: () => `
    <div class="screen">
      <div class="h-title">🍔 Gastronomia</div>
      ${DATA.comidas.map((c) => `
        <div class="list-item">
          <div class="li-ico gold">${c.ico}</div>
          <div class="li-body"><strong>${c.nome}</strong><small>${c.desc} · <span class="stars">${starStr(c.stars)}</span></small></div>
          <div class="li-right"><span class="price">${c.preco}</span>${favBtn(c.id)}</div>
        </div>`).join("")}
    </div>`,

  expo: () => `
    <div class="screen">
      <div class="h-title">🛍️ Expositores</div>
      ${DATA.expo.map((e) => `
        <div class="list-item">
          <div class="li-ico blue">${e.ico}</div>
          <div class="li-body"><strong>${e.nome}</strong><small>${e.desc}</small></div>
          <div class="li-right">${favBtn(e.id)}</div>
        </div>`).join("")}
    </div>`,

  favoritos: () => {
    const diaNome = { sex: "Sexta", sab: "Sábado", dom: "Domingo" };
    const showsFav = Object.entries(DATA.shows).flatMap(([dia, list]) =>
      list.map((s, i) => ({ ico: "🎤", nome: s.nome, desc: `${diaNome[dia]} · ${s.hora} · ${s.local}`, id: "s_" + dia + i, tipo: "Show", cls: "blue" }))
    );
    const all = [
      ...showsFav,
      ...DATA.comidas.map((c) => ({ ...c, desc: c.desc, tipo: "Gastronomia", cls: "gold" })),
      ...DATA.expo.map((e) => ({ ...e, tipo: "Expositor", cls: "blue" })),
    ].filter((x) => state.favs.has(x.id));
    return `
    <div class="screen">
      <div class="h-title">⭐ Meus favoritos</div>
      ${all.length ? all.map((x) => `
        <div class="list-item">
          <div class="li-ico ${x.cls}">${x.ico}</div>
          <div class="li-body"><strong>${x.nome}</strong><small>${x.tipo} · ${x.desc}</small></div>
          <div class="li-right">${favBtn(x.id)}</div>
        </div>`).join("")
      : `<div class="list-item"><div class="li-ico">🤍</div><div class="li-body"><strong>Nada por aqui ainda</strong><small>Toque no ❤️ em barracas e shows para montar seu roteiro.</small></div></div>`}
    </div>`;
  },

  ia: () => `
    <div class="screen">
      <div class="ai-head">
        <div class="ai-avatar">AI</div>
        <div><strong>Go AI</strong><br/><small>✦ assistente oficial do festival</small></div>
      </div>
      <div class="chat-box" id="chatBox">
        ${state.chat.map((m) => `<div class="msg ${m.who}">${m.text}</div>`).join("")}
      </div>
      <div class="ai-chips" id="aiChips">
        <button>Qual show começa agora?</button>
        <button>Onde tem comida vegetariana?</button>
        <button>Banheiro mais próximo?</button>
        <button>Estacionamento vazio?</button>
      </div>
      <form class="ai-input" id="aiForm">
        <input id="aiText" placeholder="Pergunte à Go AI…" autocomplete="off" />
        <button type="submit" aria-label="Enviar">➤</button>
      </form>
    </div>`,

  perfil: () => `
    <div class="screen">
      <div class="h-title">👤 Meu perfil</div>
      <div class="vip-card">
        ${qrSvg()}
        <div class="vip-info">
          <small>PASSAPORTE DIGITAL</small>
          <h3>Visitante Just Go</h3>
          <p>Apresente este QR na entrada e nas barracas parceiras.</p>
          <span class="vip-badge">★ ACESSO GOLD</span>
        </div>
      </div>
      <div class="stat-row">
        <div class="stat"><strong>${state.favs.size}</strong><span>Favoritos</span></div>
        <div class="stat"><strong>3</strong><span>Check-ins</span></div>
        <div class="stat"><strong>120</strong><span>Pontos Go</span></div>
      </div>
      <div class="sec-title">Avalie sua experiência</div>
      <div class="rate-row" id="rateRow">
        ${[1, 2, 3, 4, 5].map((n) => `<button data-rate="${n}" class="${state.rating >= n ? "on" : ""}">⭐</button>`).join("")}
      </div>
      <p class="rate-hint" id="rateHint">${state.rating ? "Obrigado! Sua avaliação vira indicador em tempo real. ✨" : "Toque nas estrelas para avaliar o festival."}</p>
      <button class="btn-sos" data-sos>🚑 &nbsp;Emergência — chamar equipe</button>
    </div>`,
};

/* ─────────── Render / navegação ─────────── */
function render() {
  screens.innerHTML = VIEW[state.screen]();
  document.querySelectorAll("#bottomnav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.go === state.screen ||
      (b.dataset.go === "home" && ["comida", "expo", "favoritos"].includes(state.screen)));
  });
  if (state.screen === "ia") {
    const box = $("#chatBox");
    box.scrollTop = box.scrollHeight;
  }
}

function go(name) {
  state.screen = name;
  render();
  screens.scrollTop = 0;
}

/* ─────────── Eventos globais (delegação) ─────────── */
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-go]");
  if (nav) { e.preventDefault(); go(nav.dataset.go); return; }

  const sos = e.target.closest("[data-sos]");
  if (sos) { $("#modalSos").hidden = false; return; }
  if (e.target.closest("[data-close]")) { $("#modalSos").hidden = true; return; }

  const fav = e.target.closest("[data-fav]");
  if (fav) {
    const id = fav.dataset.fav;
    if (state.favs.has(id)) { state.favs.delete(id); fav.classList.remove("on"); toast("Removido dos favoritos"); }
    else { state.favs.add(id); fav.classList.add("on"); toast("❤️ Adicionado aos favoritos"); }
    saveFavs();
    if (state.screen === "favoritos") render();
    return;
  }

  const day = e.target.closest("#dayChips [data-day]");
  if (day) { state.day = day.dataset.day; render(); return; }

  const cat = e.target.closest("#mapChips [data-cat]");
  if (cat) { state.mapCat = cat.dataset.cat; render(); return; }

  const pin = e.target.closest("[data-pin]");
  if (pin) {
    document.querySelectorAll(".map-pin").forEach((p) => p.classList.remove("sel"));
    pin.classList.add("sel");
    const p = DATA.pins[+pin.dataset.pin];
    $("#mapSheet").innerHTML = `
      <span style="font-size:24px">${p.ico}</span>
      <div><strong>${p.nome}</strong>${p.info}</div>
      <button class="go" data-rota="${p.nome}">Traçar rota</button>`;
    return;
  }
  const rota = e.target.closest("[data-rota]");
  if (rota) { toast(`📍 Rota traçada até ${rota.dataset.rota}`); return; }

  const rate = e.target.closest("#rateRow [data-rate]");
  if (rate) { state.rating = +rate.dataset.rate; render(); return; }

  const chip = e.target.closest("#aiChips button");
  if (chip) { ask(chip.textContent); return; }

  if (e.target.closest("#sosConfirm")) {
    $("#modalSos").hidden = true;
    toast("🚑 Equipe acionada! Sua localização foi enviada.");
    return;
  }
  if (e.target.closest("#btnBell")) { toast("🔔 Grande Final das Quadrilhas: domingo, 20h!"); return; }
  if (e.target.closest("#btnSearch")) { go("ia"); return; }
});

document.addEventListener("submit", (e) => {
  if (e.target.id === "aiForm") {
    e.preventDefault();
    const v = $("#aiText").value.trim();
    if (v) ask(v);
    $("#aiText").value = "";
  }
});

/* ─────────── Go AI ─────────── */
function ask(q) {
  state.chat.push({ who: "user", text: q });
  render();
  const box = $("#chatBox");
  const typing = document.createElement("div");
  typing.className = "msg bot typing";
  typing.textContent = "Go AI está digitando…";
  box.appendChild(typing);
  box.scrollTop = box.scrollHeight;
  const ql = q.toLowerCase();
  const found = DATA.ai.find((r) => r.k.some((k) => ql.includes(k)));
  const ans = found ? found.r
    : "✨ Boa! Nesta demo respondo sobre <strong>shows, comida, banheiros, estacionamento, mapa, QR e emergências</strong>. Na versão completa, sou treinada com todos os dados do seu evento.";
  setTimeout(() => {
    state.chat.push({ who: "bot", text: ans });
    if (state.screen === "ia") render();
  }, 900 + Math.random() * 500);
}

/* ─────────── Relógio + progresso do show ─────────── */
function clock() {
  const d = new Date();
  $("#clock").textContent = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
clock();
setInterval(clock, 30000);
setInterval(() => {
  const bar = document.getElementById("liveBar");
  if (bar) {
    const w = Math.min(96, parseFloat(bar.style.width) + 1.5);
    bar.style.width = w + "%";
  }
}, 4000);

/* ─────────── Boot ─────────── */
render();
setTimeout(() => $("#splash").classList.add("out"), 2200);
