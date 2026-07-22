# Protótipos de Alta Fidelidade — Prompts para Figma Make

| Campo | Valor |
|---|---|
| Produto | Just Go Intelligence Platform |
| Objetivo | Gerar protótipos de alta fidelidade no Figma Make (IA do Figma) |
| Versão | 1.0 — Julho/2026 |
| Referência de design | `09-design-system.md` (Go DS) |

---

## 1. Como usar estes prompts

1. Abra o **Figma Make** (figma.com → New → Make) e cole **um prompt por vez** — cada prompt é autossuficiente, com marca, cores e tipografia embutidas.
2. Os prompts estão **em inglês** porque o Figma Make produz resultados mais consistentes nesse idioma; os **textos de interface pedidos dentro dos prompts são em pt-BR** (o produto é brasileiro).
3. Após a primeira geração, itere com comandos curtos ("make the KPI cards denser", "increase contrast of secondary text") em vez de regenerar do zero.
4. Confira sempre contra o Go DS: primária `#00AEEF`, navy `#0D1B2A`, dourado `#E6B64C` só no contexto dark do visitante, Inter para UI, Baloo 2 apenas para a marca, raios arredondados (10–16 px), foco visível.
5. Ao exportar para o time, nomeie os arquivos como `proto-[modulo]-v[n]` e vincule na página do módulo.
6. O que a IA gerar **não substitui** o Go DS: divergências se resolvem a favor do Design System.

Checklist de aceitação de cada protótipo:
- [ ] Cores exatas da marca (sem azuis/dourados "parecidos")
- [ ] Textos de UI em pt-BR sem erros
- [ ] Estados pedidos presentes (vazio, carregando, erro)
- [ ] Touch targets ≥ 44 px no mobile
- [ ] Números com alinhamento tabular nos KPIs e tabelas

---

## 2. Prompt A — Dashboard do Gestor Municipal (com briefing de IA)

```text
Design a high-fidelity SaaS dashboard for "Just Go Intelligence Platform", a Brazilian
decision-intelligence product for city governments managing public events. Desktop, 1440px,
light theme: page background #F7F9FB, white cards with 1px #DCE3EA borders, 10px radius,
Inter font. Brand: wordmark "Just Go" where "Just" is navy #0D1B2A and "Go" is bright blue
#00AEEF, rounded friendly font (Baloo 2 style) — logo only, all UI text in Inter. Primary
action color #00AEEF. All UI copy in Brazilian Portuguese.

Layout: collapsible left sidebar in dark navy #12283D with white icons and labels for modules:
Visão Geral, Go Survey, Go Event, Go Pay, Go Analytics, Go Report, GO Intelligence. Top bar
with event selector dropdown ("Festival Canaã Cidade Junina 2027"), a "atualizado há 32s"
live timestamp, alert bell, and user avatar.

Main content, three tiers: (1) a row of 5 KPI cards — Público estimado 48.200, Entrevistas
1.647, Satisfação 94%, Volume Go Pay R$ 2,4 mi, Ticket médio R$ 38,50 — each with label,
big tabular number, and a small green/red delta chip with arrow; (2) a prominent AI briefing
card with a purple #6E5BD9 left accent border, titled "Briefing do dia — GO Intelligence",
3 short executive bullet insights in Portuguese, buttons "Ver fontes" and thumbs up/down;
next to it an alerts panel with 2 warning items; (3) a bar chart of sales by area (blue
#00AEEF, navy #0D1B2A, gold #E6B64C series) and a data table of top vendors with right-
aligned numbers. Include one empty-state variant of the dashboard ("Nenhum evento ativo")
with a friendly illustration and a primary button "Criar evento".
```

---

## 3. Prompt B — App do Visitante (mobile, dark premium)

```text
Design a premium dark mobile app (390x844, iOS-style) for event visitors, called "Just Go",
for a Brazilian festival. Aesthetic: Apple/Stripe-level polish, dark and luxurious. Background
#07090D, cards #0E1319 with subtle #243040 borders, 16px radius, primary blue #00AEEF, gold
#E6B64C reserved for money/rewards, text #F2F5F8, secondary text #9FB0C0, Inter font. Brand
logo "Just Go" top left ("Just" white, "Go" in #00AEEF, rounded font). All copy in Brazilian
Portuguese. Bottom tab bar (64px, 4 tabs): Início, Programação, Carteira, Mapa.

Screens: (1) Home — greeting "Boa noite, Camila", a hero card for the headliner show tonight
with time and stage, a gold-accented wallet balance card showing "Saldo: R$ 120,00" with a
gold "Recarregar" button, quick actions row (Programação, Mapa, Pesquisa), and a live notice
banner "Show do palco principal atrasado em 20 min". (2) Programação — day selector chips
(Sex, Sáb, Dom), timeline list of shows by stage with favorite star toggles, one favorited
item showing a reminder bell. (3) Carteira — big gold balance, Pix recharge sheet with amount
presets (R$ 30, R$ 50, R$ 100), QR code payment screen with the visitor's QR centered on
dark background, transaction history list with tabular amounts. (4) Mapa — dark venue map
with colored pins (stages blue, recharge points gold, health red), legend, and a floating
"Você está aqui" indicator. Include loading skeleton state for Home and an offline banner
variant "Sem conexão — programação salva no aparelho".
```

---

## 4. Prompt C — GO Intelligence Chat (seleção de agentes)

```text
Design a high-fidelity AI chat workspace inside a SaaS platform, desktop 1440px, light theme
(#F7F9FB background, white surfaces, #DCE3EA borders, Inter font, primary blue #00AEEF, navy
#0D1B2A, AI accent purple #6E5BD9). Product: "GO Intelligence", the AI core of Just Go
Intelligence Platform, used by Brazilian city managers and event organizers. All UI copy in
Brazilian Portuguese.

Layout: left panel with conversation history list and a "Nova conversa" button. Top of the
chat area: an agent selector as a row of rounded chips with small icons — Concierge, Gestor,
Analista, Product Owner, Desenvolvedor, Professor — with "Analista" selected (filled purple
chip). Chat thread: (1) user message "Qual o perfil dos visitantes que mais gastaram no Go
Pay?"; (2) AI response card with streaming text, a small horizontal bar chart (blue #00AEEF
and navy series), and a mandatory source footer in smaller text: "Fonte: Go Pay transações ·
Festival Canaã 2027 · 14–16 jun" with a "Ver consulta" link; (3) below the response, three
suggested follow-up chips ("Comparar com 2026", "Segmentar por idade", "Exportar análise")
and thumbs up/down feedback icons. Persistent subtle disclaimer bar at the bottom of the
thread: "Conteúdo gerado por IA — confira as fontes antes de decisões oficiais." Composer
with attachment icon, input placeholder "Pergunte sobre seus dados…", and send button in
#00AEEF. Include a second state: agent switch dropdown open showing each agent with a one-
line role description in Portuguese, and an empty state for a new conversation with 4
example prompt cards.
```

---

## 5. Prompt D — Go Survey Builder + Coleta Offline

```text
Design two connected experiences for "Go Survey", the research module of a Brazilian SaaS
(Just Go Intelligence Platform). Inter font, primary blue #00AEEF, navy #0D1B2A. All copy in
Brazilian Portuguese.

Experience 1 — Survey Builder, desktop 1440px, light theme (#F7F9FB background, white cards,
#DCE3EA borders): three-column layout — left: question type palette (Escolha única, Múltipla,
Escala 0–10, NPS, Texto, Número, Data); center: the questionnaire canvas showing 4 built
questions with drag handles, one question expanded in edit mode with options and a skip-logic
rule ("Se resposta = Não → pular para P7"); right: settings panel with quota configuration
(Sexo: 50/50, Faixa etária with progress bars) and a "Publicar" primary button. Top bar with
survey title "Pesquisa de Satisfação — Festival Canaã 2027", autosave indicator "Rascunho
salvo", and preview toggle.

Experience 2 — Field Collection App, mobile 390x844, optimized for outdoor use: high contrast
light theme, extra-large touch targets (56px), one question per screen with big option
buttons, progress bar "Pergunta 4 de 12", and a persistent status strip showing sync state:
"Coletadas 23 · Sincronizadas 19 · Pendentes 4" with an amber offline badge "Sem sinal —
salvando no aparelho". Include: the quota counter screen the interviewer sees between
interviews (circular progress per quota), a sync-success state (green check, "Todas as
entrevistas sincronizadas"), and a blocking confirmation dialog when trying to exit with
pending interviews: "Você tem 4 entrevistas não sincronizadas".
```

---

## 6. Prompt E — Go Pay: Carteira e Painel Financeiro do Evento

```text
Design two linked financial interfaces for "Go Pay", the cashless module of Just Go
Intelligence Platform (Brazil). Inter font, tabular numbers everywhere, all copy in
Brazilian Portuguese.

Interface 1 — Visitor Wallet, mobile 390x844, premium dark theme: background #07090D,
cards #0E1319, borders #243040, text #F2F5F8, blue #00AEEF for actions, gold #E6B64C
exclusively for balance and rewards. Screens: wallet home with large gold balance
"R$ 84,50", buttons "Recarregar" (gold) and "Meu QR" (blue outline); Pix recharge flow with
amount presets and a Pix copy-paste code screen with countdown "Válido por 9:32"; payment
QR screen (bright QR on dark card, brightness boost hint); refund request screen "Resgatar
saldo restante" with Pix key input and confirmation state.

Interface 2 — Event Finance Panel for the municipal manager, desktop 1440px, light theme
(#F7F9FB, white cards, navy #12283D sidebar): top KPI row — Volume bruto R$ 2.412.380,
Recargas R$ 2.610.000, Saldo não consumido R$ 197.620, Ticket médio R$ 38,50; a line chart
of hourly transaction volume (blue #00AEEF); a breakdown table by vendor (Barraca do João,
Praça de Alimentação Norte…) with right-aligned currency columns and a status chip
"Conciliado" in green per row; a reconciliation banner "Conciliação de 15/jun fechada sem
divergências" with a shield icon; and an audit trail side panel listing timestamped actions
("Extrato exportado por M. Silva — 16/06 09:12"). Include one alert state: a red divergence
banner "Divergência de R$ 312,00 encontrada — ver detalhes".
```

---

## 7. Prompt F — GO AI Studio (criador de agentes no-code)

```text
Design a no-code AI agent builder called "GO AI Studio" inside Just Go Intelligence Platform,
desktop 1440px, light theme: background #F7F9FB, white cards, #DCE3EA borders, Inter font,
primary blue #00AEEF, navy #0D1B2A, AI purple #6E5BD9 accents. All copy in Brazilian
Portuguese. Audience: non-technical staff at Brazilian city halls creating custom AI agents.

Main screen — agent builder in three columns: (1) left: agent identity card with avatar
picker, name field "Agente de Turismo", role description textarea, and a personality/tone
selector (Formal, Consultivo, Didático); (2) center: capabilities configuration — a
"Instruções" card with a prompt textarea containing sample Portuguese instructions, a
"Fontes de conhecimento" card listing connected sources with toggles (Pesquisas Go Survey,
Transações Go Pay, Documentos enviados — with an upload dropzone), and a "Ferramentas
permitidas" card with permission toggles (Consultar dados, Gerar relatórios, Enviar alertas)
each with a small shield icon and guard-rail note "somente leitura"; (3) right: live test
chat panel titled "Testar agente" with a sample conversation in Portuguese and a purple
"Publicar agente" button with status badge "Rascunho".

Also include: the agents gallery screen — a grid of agent cards (name, role, status chip
Ativo/Rascunho, usage stat "234 conversas este mês", created-by), a "Criar agente" primary
card with plus icon, and template cards ("Atendimento ao turista", "Análise de pesquisa",
"Prestação de contas") marked with a template badge; and a publish-confirmation modal
summarizing permissions granted before going live.
```

---

## 8. Ordem sugerida de produção

| # | Protótipo | Uso principal | Prioridade |
|---|---|---|---|
| 1 | B — App do Visitante | Vendas (demo emocional) e evolução do demo atual | P0 |
| 2 | A — Dashboard do Gestor | Vendas para prefeituras, validação com piloto | P0 |
| 3 | D — Go Survey | Validação com equipe de campo da Foccus | P0 |
| 4 | E — Go Pay | Conversas com PSPs e cliente piloto | P1 |
| 5 | C — GO Intelligence Chat | Roadmap Fase 2, teasing comercial | P1 |
| 6 | F — GO AI Studio | Visão de longo prazo (Fase 5), pitch a investidores | P2 |
