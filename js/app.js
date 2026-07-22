/* ══════════════════════════════════════════════════
   JUST GO — Landing-Demo · Lógica da aplicação
   Sem dependências externas. Vanilla JS.
   ══════════════════════════════════════════════════ */
"use strict";

/* ─────────── Navbar ─────────── */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 8);
});
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", () => navLinks.classList.remove("open"));

/* ─────────── Scroll reveal ─────────── */
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

/* ─────────── Contadores animados ─────────── */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  const dur = 1600;
  const t0 = performance.now();
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent =
      val.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCount(e.target);
        countObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObs.observe(el));

/* ══════════════════════════════════════════════════
   APP DEMO — aplicativo simulado do festival
   ══════════════════════════════════════════════════ */
const shows = [
  { hora: "19h00", nome: "Quadrilha Mirim Sol Nascente", local: "Arena Junina", now: false },
  { hora: "21h00", nome: "Forró da Lua", local: "Palco Principal", now: true },
  { hora: "22h15", nome: "Quadrilha Estrela do Norte", local: "Arena Junina", now: false },
  { hora: "23h30", nome: "Trio Pé de Serra", local: "Palco Principal", now: false },
];
const comidas = [
  { ico: "🍢", nome: "Espetinho do Zé", desc: "Churrasco · R$ 12", id: "c1" },
  { ico: "🥗", nome: "Sabor da Terra", desc: "Vegetariano · ponto G7", id: "c2" },
  { ico: "🌽", nome: "Milho da Vovó", desc: "Típicos juninos · R$ 8", id: "c3" },
  { ico: "🧁", nome: "Doces da Maria", desc: "Bolos e doces · R$ 6", id: "c4" },
];
const expositores = [
  { ico: "🧵", nome: "Artesanato Canaã", desc: "Setor A · estande 12" },
  { ico: "🍯", nome: "Mel do Carajás", desc: "Setor B · estande 04" },
  { ico: "👕", nome: "Moda Regional", desc: "Setor A · estande 21" },
  { ico: "🪵", nome: "Madeira & Arte", desc: "Setor C · estande 02" },
];
const favoritos = new Set();

const mapPins = [
  { x: 60, y: 52, ico: "🎤", label: "Palco Principal — show ao vivo agora" },
  { x: 165, y: 90, ico: "🍔", label: "Praça de Alimentação — 14 barracas" },
  { x: 110, y: 150, ico: "🚻", label: "Banheiros — bloco central" },
  { x: 205, y: 45, ico: "🚑", label: "Posto médico — equipe 24h" },
  { x: 32, y: 140, ico: "🚘", label: "Estacionamento Norte — 34% ocupado" },
  { x: 200, y: 155, ico: "🛍️", label: "Setor de Expositores — A, B e C" },
];

function favButton(id) {
  const on = favoritos.has(id);
  return `<button class="fav-btn ${on ? "on" : ""}" data-fav="${id}" aria-label="Favoritar">❤️</button>`;
}

const screens = {
  home: () => `
    <div class="app-screen-inner">
      <div class="ps-header"><small>Boa noite 👋</small><h4>Festival Canaã Cidade Junina</h4></div>
      <div class="ps-now"><span class="live-pill">● AO VIVO</span><strong>Forró da Lua</strong><small>Palco Principal · 21h00</small></div>
      <div class="app-section-title">Acesso rápido</div>
      <div class="ps-tiles">
        <div>🎫<span>QR Code</span></div>
        <div>⭐<span>Favoritos (<b id="favCount">${favoritos.size}</b>)</span></div>
        <div>🚑<span>Emergência</span></div>
        <div>❤️<span>Avaliar</span></div>
      </div>
      <div class="app-section-title" style="margin-top:14px">Próximos shows</div>
      ${shows.slice(1, 3).map(s => `
        <div class="app-list-item"><span class="ico">🎤</span>
          <div class="grow"><strong>${s.nome}</strong><small>${s.local}</small></div>
          ${s.now ? '<span class="badge-now">AGORA</span>' : `<span class="badge-time">${s.hora}</span>`}
        </div>`).join("")}
    </div>`,

  agenda: () => `
    <div class="app-screen-inner">
      <div class="app-section-title">📅 Programação · Sábado</div>
      ${shows.map(s => `
        <div class="app-list-item"><span class="ico">🎤</span>
          <div class="grow"><strong>${s.nome}</strong><small>${s.local}</small></div>
          ${s.now ? '<span class="badge-now">AGORA</span>' : `<span class="badge-time">${s.hora}</span>`}
        </div>`).join("")}
    </div>`,

  mapa: () => `
    <div class="app-screen-inner">
      <div class="app-section-title">🗺️ Mapa do evento</div>
      <div class="app-map">
        <svg viewBox="0 0 240 190" role="img" aria-label="Mapa do festival com pontos de interesse">
          <rect width="240" height="190" fill="#eef6ee"/>
          <path d="M0 105 Q 70 85 120 105 T 240 100" stroke="#cbd5e1" stroke-width="10" fill="none"/>
          <path d="M118 0 L 122 190" stroke="#cbd5e1" stroke-width="8"/>
          <rect x="18" y="20" width="76" height="58" rx="8" fill="#dbeafe"/>
          <rect x="146" y="120" width="76" height="52" rx="8" fill="#fde9d0"/>
          <rect x="20" y="122" width="60" height="46" rx="8" fill="#DCE3EA"/>
          ${mapPins.map((p, i) => `
            <g class="map-pin" data-pin="${i}" transform="translate(${p.x},${p.y})">
              <circle r="13" fill="white" stroke="#00AEEF" stroke-width="1.5"/>
              <text y="5" text-anchor="middle" font-size="13">${p.ico}</text>
            </g>`).join("")}
        </svg>
      </div>
      <div class="map-info" id="mapInfo"><strong>Toque em um ponto</strong> para ver detalhes.</div>
    </div>`,

  comida: () => `
    <div class="app-screen-inner">
      <div class="app-section-title">🍔 Gastronomia</div>
      ${comidas.map(c => `
        <div class="app-list-item"><span class="ico">${c.ico}</span>
          <div class="grow"><strong>${c.nome}</strong><small>${c.desc}</small></div>
          ${favButton(c.id)}
        </div>`).join("")}
    </div>`,

  expo: () => `
    <div class="app-screen-inner">
      <div class="app-section-title">🛍️ Expositores</div>
      ${expositores.map(e => `
        <div class="app-list-item"><span class="ico">${e.ico}</span>
          <div class="grow"><strong>${e.nome}</strong><small>${e.desc}</small></div>
        </div>`).join("")}
    </div>`,
};

const appScreen = document.getElementById("appScreen");
const appTabbar = document.getElementById("appTabbar");

function renderScreen(name) {
  appScreen.innerHTML = screens[name]();
}
renderScreen("home");

appTabbar.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-screen]");
  if (!btn) return;
  appTabbar.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderScreen(btn.dataset.screen);
});

appScreen.addEventListener("click", (e) => {
  const fav = e.target.closest("[data-fav]");
  if (fav) {
    const id = fav.dataset.fav;
    favoritos.has(id) ? favoritos.delete(id) : favoritos.add(id);
    fav.classList.toggle("on");
    return;
  }
  const pin = e.target.closest("[data-pin]");
  if (pin) {
    const p = mapPins[parseInt(pin.dataset.pin, 10)];
    const info = document.getElementById("mapInfo");
    if (info) info.innerHTML = `<strong>${p.ico} ${p.label.split("—")[0].trim()}</strong> — ${p.label.split("—")[1].trim()}`;
  }
});

/* ══════════════════════════════════════════════════
   DASHBOARD — tempo real simulado
   ══════════════════════════════════════════════════ */
let visitors = 5843;
const visitorHistory = Array.from({ length: 24 }, (_, i) => 5600 + Math.round(240 * Math.sin(i / 3)) + i * 8);

function drawSpark() {
  const svg = document.getElementById("sparkVisitors");
  const min = Math.min(...visitorHistory);
  const max = Math.max(...visitorHistory);
  const pts = visitorHistory
    .map((v, i) => {
      const x = (i / (visitorHistory.length - 1)) * 200;
      const y = 44 - ((v - min) / (max - min || 1)) * 38;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  svg.innerHTML = `
    <polyline points="${pts}" fill="none" stroke="#00AEEF" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <polygon points="0,48 ${pts} 200,48" fill="rgba(0,174,239,.10)" stroke="none"/>`;
}

function buildHeatmap() {
  const hm = document.getElementById("heatmap");
  hm.innerHTML = Array.from({ length: 18 }, () => `<i style="opacity:${(0.15 + Math.random() * 0.85).toFixed(2)}"></i>`).join("");
}

function tickDashboard() {
  const delta = Math.round((Math.random() - 0.42) * 60);
  visitors = Math.max(4800, visitors + delta);
  visitorHistory.push(visitors);
  visitorHistory.shift();
  document.getElementById("dashVisitors").textContent = visitors.toLocaleString("pt-BR");
  const hero = document.getElementById("heroLive");
  if (hero) hero.textContent = visitors.toLocaleString("pt-BR");
  const trend = document.getElementById("dashTrend");
  trend.textContent = delta >= 0 ? `▲ +${delta} no último minuto` : `▼ ${delta} no último minuto`;
  trend.classList.toggle("up", delta >= 0);
  drawSpark();
  document.querySelectorAll("#heatmap i").forEach((cell) => {
    if (Math.random() < 0.4) cell.style.opacity = (0.15 + Math.random() * 0.85).toFixed(2);
  });
}
drawSpark();
buildHeatmap();
setInterval(tickDashboard, 2500);

/* ══════════════════════════════════════════════════
   GO AI — chat demonstrativo
   ══════════════════════════════════════════════════ */
const chatBody = document.getElementById("chatBody");
const chatForm = document.getElementById("chatForm");
const chatText = document.getElementById("chatText");
const chatChips = document.getElementById("chatChips");

const respostasVisitante = [
  { k: ["banheiro", "toalete", "wc"], r: "🚻 O banheiro mais próximo fica ao lado do Palco Principal, a cerca de 80 m. Há outro bloco junto à Praça de Alimentação — este costuma ter fila menor agora." },
  { k: ["show", "agora", "palco", "música", "musica", "atração", "atracao"], r: "🎤 <strong>Agora:</strong> Forró da Lua no Palco Principal (começou às 21h00).<br/>⏭️ <strong>Próximo:</strong> Quadrilha Estrela do Norte, 22h15, na Arena Junina." },
  { k: ["vegetarian", "vegan", "salada"], r: "🥗 A barraca <strong>Sabor da Terra</strong> (ponto G7, Praça de Alimentação) é 100% vegetariana. O Milho da Vovó também tem opções sem carne. Quer que eu trace a rota?" },
  { k: ["estacionamento", "carro", "vaga", "estacionar"], r: "🚘 O <strong>Estacionamento Norte</strong> está com apenas 34% de ocupação — é a melhor opção agora. O Sul está com 87%." },
  { k: ["comida", "comer", "fome", "lanche", "barraca"], r: "🍔 A Praça de Alimentação tem 14 barracas abertas. Destaques: Espetinho do Zé (R$ 12), Milho da Vovó (R$ 8) e Sabor da Terra (vegetariana). Toque em Gastronomia no app para ver todas." },
  { k: ["emergência", "emergencia", "médico", "medico", "ajuda", "socorro"], r: "🚑 O posto médico fica próximo à entrada leste, com equipe 24h. Em caso de emergência, use o botão <strong>Emergência</strong> no app — sua localização é enviada automaticamente." },
  { k: ["mapa", "onde fica", "localiza"], r: "🗺️ Abra a aba <strong>Mapa</strong> no app do visitante — todos os palcos, banheiros, barracas e estacionamentos estão marcados com navegação em tempo real." },
  { k: ["preço", "preco", "quanto custa", "valor", "plano"], r: "💼 A plataforma Just Go tem planos Start, Professional e Enterprise, dimensionados pelo porte do evento. Toque em <strong>Agendar Demonstração</strong> e nossa equipe apresenta a proposta ideal." },
];

const AGENTS = {
  visitante: {
    nome: "Go AI", desc: "Assistente do Festival · online",
    intro: "Olá! 👋 Sou a Go AI. Posso ajudar com shows, comida, banheiros, estacionamento e muito mais. Pergunte algo!",
    chips: ["Qual show começa agora?", "Onde está o banheiro mais próximo?", "Qual barraca vende comida vegetariana?", "Qual estacionamento está mais vazio?"],
    kb: respostasVisitante,
    fallback: "🤖 Boa pergunta! Nesta demo eu respondo sobre <strong>shows, comida, banheiros, estacionamento e mapa</strong>. Na versão completa, sou treinada com todos os dados do seu evento.",
  },
  concierge: {
    nome: "Agente Concierge", desc: "Turismo e hospedagem · online",
    intro: "🤵 Bem-vindo! Sou o Concierge da Just Go. Posso encontrar hotel, restaurante, passeios e transporte na cidade durante o festival.",
    chips: ["Reserve um hotel para hoje", "Onde jantar depois do show?", "Passeios para amanhã de manhã", "Como voltar para Parauapebas?"],
    kb: [
      { k: ["hotel", "hosped", "pousada", "reserv", "dormir"], r: "🏨 Encontrei 3 opções perto do evento para hoje:<br/>• <strong>Hotel Serra dos Carajás</strong> — R$ 280 · 1,2 km · ⭐ 4,6<br/>• <strong>Pousada Cidade Junina</strong> — R$ 160 · 800 m · ⭐ 4,3<br/>• <strong>Canaã Palace</strong> — R$ 340 · 2 km · ⭐ 4,8<br/>Quer que eu inicie a reserva? <em>(na versão completa, integro com Booking e Airbnb)</em>" },
      { k: ["jantar", "restaurante", "comer fora", "janta"], r: "🍽️ Depois do show, recomendo: <strong>Sabor do Pará</strong> (regional, aberto até 1h, a 900 m) ou a própria <strong>Praça de Alimentação</strong> do festival, com 14 barracas até 0h. Posso reservar mesa no primeiro." },
      { k: ["passeio", "turismo", "amanhã", "amanha", "conhecer"], r: "🌄 Para amanhã de manhã: trilha do <strong>Parque Nacional dos Campos Ferruginosos</strong> (saída 7h), city tour histórico de Canaã (9h) ou feira de artesanato regional no centro. Quer os contatos dos guias credenciados?" },
      { k: ["voltar", "transporte", "taxi", "táxi", "uber", "ônibus", "onibus", "transfer"], r: "🚌 Para Parauapebas: transfer oficial do evento às 23h30 e 1h00 (R$ 25, saída do Estacionamento Norte) ou aplicativos de transporte — tempo estimado agora: 52 min." },
    ],
    fallback: "🤵 Como Concierge, cuido de <strong>hotéis, restaurantes, passeios e transporte</strong>. Na versão completa, faço reservas de verdade integrando Booking, Airbnb e parceiros locais.",
  },
  gestor: {
    nome: "Agente Gestor", desc: "Operação do evento · tempo real",
    intro: "📊 Central de operações na linha. Pergunte sobre ocupação, fluxo, equipes e receita — respondo com os dados ao vivo do evento.",
    chips: ["Ocupação dos estacionamentos", "Quantos visitantes agora?", "Receita Go Pay de hoje", "Situação das equipes de campo"],
    kb: [
      { k: ["estacionamento", "ocupação", "ocupacao", "vaga"], r: "🚘 Ocupação agora: <strong>Norte 34%</strong> · <strong>Sul 87%</strong> · <strong>Leste 61%</strong>.<br/>📈 Previsão de lotação do Sul: 22h30. <strong>Recomendo</strong> redirecionar a sinalização para o Norte agora — quer que eu acione a equipe de tráfego?" },
      { k: ["visitante", "público", "publico", "quantas pessoas", "fluxo"], r: "🧍 <strong>5.843 visitantes</strong> no recinto neste momento (+12% vs mesmo horário ontem). Pico previsto: <strong>7.900 às 22h10</strong>, puxado pelo show principal. Portões operando com fila média de 4 min." },
      { k: ["receita", "go pay", "gopay", "faturamento", "vendas", "caixa"], r: "💳 Receita Go Pay hoje: <strong>R$ 412.300</strong> (68% alimentação, 22% expositores, 10% recargas). Ticket médio: R$ 41,20. Conciliação automática em dia — nenhuma pendência." },
      { k: ["equipe", "segurança", "seguranca", "campo", "ocorrência", "ocorrencia", "médic"], r: "🎧 Equipes: 12 seguranças ativos, 4 brigadistas, 2 ambulâncias de prontidão. <strong>3 ocorrências abertas</strong> no setor G4 (som alto em barraca) — supervisor já acionado, SLA em 8 min." },
    ],
    fallback: "📊 Como Gestor, monitoro <strong>ocupação, fluxo, receita, equipes e ocorrências</strong> em tempo real. Na versão completa, também executo ações: acionar equipes, abrir portões e disparar avisos no app.",
  },
  analista: {
    nome: "Agente Analista", desc: "Inteligência e relatórios",
    intro: "📈 Sou o Analista da plataforma. Pergunte sobre resultados, indicadores e relatórios — trabalho com os dados da pesquisa do Festival Canaã.",
    chips: ["Como foi o Festival Canaã?", "Qual foi o NPS do evento?", "Impacto no comércio local", "Gere o relatório executivo"],
    kb: [
      { k: ["como foi", "festival", "canaã", "canaa", "resultado", "balanço", "balanco"], r: "📊 <strong>Festival Canaã Cidade Junina — síntese:</strong><br/>• 1.647 entrevistas digitais (530 visitantes, 413 moradores, 253 comerciantes, 118 expositores)<br/>• Impacto econômico: <strong>R$ 8,2 mi</strong><br/>• Satisfação: <strong>94%</strong> · NPS 72<br/>• 46% do público de fora da cidade<br/>Quer o detalhamento por segmento ou o relatório executivo?" },
      { k: ["nps", "satisfação", "satisfacao", "csat"], r: "⭐ <strong>NPS 72</strong> (zona de excelência) e <strong>CSAT 94%</strong>. Destaques positivos: programação (96%) e segurança (93%). Ponto de atenção: banheiros (81%) — recomendo +2 blocos no setor sul na próxima edição." },
      { k: ["comércio", "comercio", "impacto", "econôm", "econom", "vendas"], r: "🏪 O comércio local reportou <strong>+38% de faturamento</strong> na semana do evento vs média do mês. 82% dos 253 comerciantes entrevistados avaliaram o impacto como positivo; hotelaria operou a 97% de ocupação. Isso sustenta a prestação de contas do investimento público." },
      { k: ["relatório", "relatorio", "gere", "executivo", "slides", "apresentação", "apresentacao"], r: "📄 Gerando… pronto! <strong>Relatório Executivo (24 páginas)</strong>: metodologia, indicadores, SWOT, impacto econômico, satisfação por segmento e recomendações para a próxima edição — com anexo de evidências para os órgãos de controle. <em>(na versão completa, exporto em PDF e Power BI)</em>" },
    ],
    fallback: "📈 Como Analista, respondo com <strong>indicadores da pesquisa Canaã</strong> e gero relatórios. Na versão completa, cruzo qualquer base: pesquisas, Go Pay, fluxo e séries históricas.",
  },
};
let currentAgent = "visitante";

function setAgent(key) {
  currentAgent = key;
  const a = AGENTS[key];
  document.getElementById("agentName").textContent = a.nome;
  document.getElementById("agentDesc").textContent = a.desc;
  chatChips.innerHTML = a.chips.map((c) => `<button>${c}</button>`).join("");
  document.querySelectorAll("#agentPicker button").forEach((b) => b.classList.toggle("active", b.dataset.agent === key));
  addMsg(a.intro, "bot");
}

document.getElementById("agentPicker").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-agent]");
  if (btn && btn.dataset.agent !== currentAgent) setAgent(btn.dataset.agent);
});

function addMsg(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.innerHTML = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

function botReply(question) {
  const agent = AGENTS[currentAgent];
  const typing = addMsg(`${agent.nome} está digitando…`, "bot typing");
  const q = question.toLowerCase();
  const found = agent.kb.find((r) => r.k.some((k) => q.includes(k)));
  const answer = found ? found.r : agent.fallback;
  setTimeout(() => {
    typing.remove();
    addMsg(answer, "bot");
  }, 900 + Math.random() * 600);
}

function askAI(text) {
  if (!text.trim()) return;
  addMsg(text, "user");
  botReply(text);
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  askAI(chatText.value);
  chatText.value = "";
});
chatChips.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") askAI(e.target.textContent);
});

/* ══════════════════════════════════════════════════
   ANALYTICS — gráficos SVG com tooltip
   ══════════════════════════════════════════════════ */
const tip = document.getElementById("chartTip");
function showTip(evt, html) {
  tip.innerHTML = html;
  tip.hidden = false;
  tip.style.left = evt.clientX + "px";
  tip.style.top = evt.clientY + "px";
}
function hideTip() { tip.hidden = true; }

const NS = "http://www.w3.org/2000/svg";
const flowData = {
  sex: { hours: ["17h", "18h", "19h", "20h", "21h", "22h", "23h"], vals: [1200, 2600, 4100, 5200, 5900, 5400, 3800] },
  sab: { hours: ["17h", "18h", "19h", "20h", "21h", "22h", "23h"], vals: [1800, 3400, 5300, 6800, 7600, 7100, 5200] },
  dom: { hours: ["17h", "18h", "19h", "20h", "21h", "22h", "23h"], vals: [1500, 2900, 4600, 5700, 6200, 5000, 3100] },
};

function drawFlowChart(day) {
  const svg = document.getElementById("flowChart");
  const { hours, vals } = flowData[day];
  const W = 560, H = 260, padL = 52, padR = 16, padT = 18, padB = 34;
  const maxV = 8000;
  const x = (i) => padL + (i / (vals.length - 1)) * (W - padL - padR);
  const y = (v) => padT + (1 - v / maxV) * (H - padT - padB);
  svg.innerHTML = "";

  // grid + eixo Y
  [0, 2000, 4000, 6000, 8000].forEach((v) => {
    const gy = y(v);
    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", padL); line.setAttribute("x2", W - padR);
    line.setAttribute("y1", gy); line.setAttribute("y2", gy);
    line.setAttribute("stroke", "#eef2f7"); line.setAttribute("stroke-width", "1");
    svg.appendChild(line);
    const lbl = document.createElementNS(NS, "text");
    lbl.setAttribute("x", padL - 8); lbl.setAttribute("y", gy + 4);
    lbl.setAttribute("text-anchor", "end"); lbl.setAttribute("font-size", "11");
    lbl.setAttribute("fill", "#9BAAB8");
    lbl.textContent = v >= 1000 ? v / 1000 + " mil" : v;
    svg.appendChild(lbl);
  });

  // área + linha
  const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area = document.createElementNS(NS, "polygon");
  area.setAttribute("points", `${padL},${y(0)} ${pts} ${x(vals.length - 1)},${y(0)}`);
  area.setAttribute("fill", "rgba(0,174,239,.08)");
  svg.appendChild(area);
  const line = document.createElementNS(NS, "polyline");
  line.setAttribute("points", pts);
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", "#00AEEF");
  line.setAttribute("stroke-width", "2.5");
  line.setAttribute("stroke-linejoin", "round");
  line.setAttribute("stroke-linecap", "round");
  svg.appendChild(line);

  // pontos + eixo X + hover
  vals.forEach((v, i) => {
    const lbl = document.createElementNS(NS, "text");
    lbl.setAttribute("x", x(i)); lbl.setAttribute("y", H - 10);
    lbl.setAttribute("text-anchor", "middle"); lbl.setAttribute("font-size", "11.5");
    lbl.setAttribute("fill", "#6B7A8D");
    lbl.textContent = hours[i];
    svg.appendChild(lbl);

    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", x(i)); dot.setAttribute("cy", y(v)); dot.setAttribute("r", "4.5");
    dot.setAttribute("fill", "#fff"); dot.setAttribute("stroke", "#00AEEF"); dot.setAttribute("stroke-width", "2");
    svg.appendChild(dot);

    const hit = document.createElementNS(NS, "circle");
    hit.setAttribute("cx", x(i)); hit.setAttribute("cy", y(v)); hit.setAttribute("r", "16");
    hit.setAttribute("fill", "transparent"); hit.style.cursor = "pointer";
    hit.addEventListener("mousemove", (e) => showTip(e, `${hours[i]} · <strong>${v.toLocaleString("pt-BR")}</strong> visitantes`));
    hit.addEventListener("mouseleave", hideTip);
    svg.appendChild(hit);
  });
}

const originData = [
  { label: "Canaã dos Carajás", pct: 46 },
  { label: "Parauapebas", pct: 22 },
  { label: "Marabá", pct: 12 },
  { label: "Xinguara", pct: 8 },
  { label: "Outras cidades", pct: 12 },
];

function drawOriginChart() {
  const svg = document.getElementById("originChart");
  const W = 560, H = 260, padL = 150, padR = 66, rowH = 42, padT = 22;
  svg.innerHTML = "";
  const maxPct = 50;
  originData.forEach((d, i) => {
    const yy = padT + i * rowH;
    const bw = (d.pct / maxPct) * (W - padL - padR);

    const lbl = document.createElementNS(NS, "text");
    lbl.setAttribute("x", padL - 12); lbl.setAttribute("y", yy + 17);
    lbl.setAttribute("text-anchor", "end"); lbl.setAttribute("font-size", "12.5");
    lbl.setAttribute("fill", "#334155"); lbl.setAttribute("font-weight", "500");
    lbl.textContent = d.label;
    svg.appendChild(lbl);

    const bar = document.createElementNS(NS, "rect");
    bar.setAttribute("x", padL); bar.setAttribute("y", yy);
    bar.setAttribute("width", Math.max(bw, 4)); bar.setAttribute("height", 24);
    bar.setAttribute("rx", 4);
    bar.setAttribute("fill", i === 0 ? "#00AEEF" : "#8ADCF5");
    bar.style.cursor = "pointer";
    bar.addEventListener("mousemove", (e) => showTip(e, `${d.label}: <strong>${d.pct}%</strong> dos visitantes`));
    bar.addEventListener("mouseleave", hideTip);
    svg.appendChild(bar);

    const val = document.createElementNS(NS, "text");
    val.setAttribute("x", padL + bw + 10); val.setAttribute("y", yy + 17);
    val.setAttribute("font-size", "12.5"); val.setAttribute("font-weight", "700");
    val.setAttribute("fill", "#0D1B2A");
    val.textContent = d.pct + "%";
    svg.appendChild(val);
  });
}

drawFlowChart("sab");
drawOriginChart();

document.getElementById("flowFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-day]");
  if (!btn) return;
  document.querySelectorAll("#flowFilters button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  drawFlowChart(btn.dataset.day);
});

/* ─────────── Formulário (demo) ─────────── */
document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formOk").hidden = false;
  e.target.querySelectorAll("input").forEach((i) => (i.value = ""));
});
