# Just Go — Landing-Demo · Event Intelligence

Landing page **funcional** (MVP) da plataforma **Just Go**, posicionada como solução de *Smart Events / Event Intelligence*. Mais do que uma landing institucional, é uma **demonstração de produto**: o visitante navega por um aplicativo simulado do Festival Canaã Cidade Junina, acompanha um dashboard em tempo real, conversa com a **Go AI** e explora analytics reais da pesquisa.

## ✨ Funcionalidades da demo

| Módulo | O que faz |
|---|---|
| **Hero animado** | Headline em cascata, mockup de celular, cards flutuantes (glassmorphism) com visitantes ao vivo |
| **App do Visitante** | Celular **navegável**: Home, Agenda, Mapa (pins clicáveis), Gastronomia (com favoritos ❤️) e Expositores |
| **Dashboard tempo real** | Visitantes online com sparkline ao vivo, mapa de calor animado, impacto econômico e anel de satisfação |
| **Go Survey** | Fluxo Questionário → Coleta Offline → Sincronização → Dashboard → Relatório → IA |
| **Go AI (chat)** | Chat funcional com respostas sobre shows, comida, banheiros, estacionamento e emergências |
| **Go Analytics** | KPIs (NPS, CSAT, tempo médio), gráfico de fluxo por hora **com filtro Sex/Sáb/Dom** e origem dos visitantes — tooltips interativos |
| **Números Canaã** | Contadores animados: 530 visitantes, 413 moradores, 253 comerciantes, 118 expositores, 1.647 entrevistas |
| **Ecossistema** | Go Event · Go Survey · Go Analytics · Go AI · Go Expo · Go Tourism |
| **CTA / Lead** | Formulário de agendamento de demonstração (demo, sem backend) |

## 📱 App do Visitante (`/app`)

Aplicativo completo do visitante em **tela cheia**, com a identidade visual da marca (preto · azul · branco · dourado) e a logomarca Just Go (SVG vetorial + [assets/logo-justgo.avif](assets/logo-justgo.avif)):

- **Splash screen** animada com a logo e anel dourado de carregamento
- **Home**: card AO VIVO com barra de progresso do show, atalhos e destaques
- **Agenda** com filtro Sexta/Sábado/Domingo e favoritos
- **Mapa** escuro com pins filtráveis por categoria e traçado de rota
- **Go AI**: botão central flutuante, chat com respostas do festival
- **Perfil**: passaporte digital com QR Code, pontos Go, avaliação por estrelas
- **Emergência**: modal com acionamento da equipe médica
- Favoritos persistidos em `localStorage`; moldura de celular no desktop

Acesse em `/app/` ou pelo botão "Abrir o app completo em tela cheia" na landing.

## 🛠️ Stack

- **HTML5 + CSS3 + JavaScript (vanilla)** — zero dependências, zero build.
- Gráficos em **SVG puro** gerados via JS, com tooltips e filtros.
- Scroll reveal com `IntersectionObserver`; contadores com `requestAnimationFrame`.
- Totalmente **responsivo** (desktop, tablet e mobile).

> A escolha por vanilla foi deliberada para o MVP: publica direto no GitHub Pages, sem pipeline de build. A evolução natural (roadmap) é migrar para **React + Vite + TypeScript + Tailwind + Framer Motion**, adicionando PWA e dark mode.

## 🚀 Rodar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta:

```bash
npx serve .
```

## 📦 Publicar no GitHub Pages (conta `danielsmartaccess`)

```bash
git init
git add .
git commit -m "feat: landing-demo Just Go (MVP)"
git branch -M main
git remote add origin https://github.com/danielsmartaccess/justgo-demo.git
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root**.
A página ficará disponível em `https://danielsmartaccess.github.io/justgo-demo/`.

## 🗺️ Roadmap (pós-MVP)

- [ ] Migração para React + Vite + TypeScript + TailwindCSS
- [ ] PWA (instalável, offline-first) e Dark Mode
- [ ] Mapa real com Leaflet e dados georreferenciados
- [ ] Go AI conectada a LLM (API Claude) com dados reais do evento
- [ ] Backend de leads (formulário → CRM)
- [ ] Substituir foto ilustrativa do caso Canaã por imagem aérea real

---

© 2026 **Just Go Smart Access** · Demo de produto — dados ilustrativos baseados na pesquisa do Festival Canaã Cidade Junina.
