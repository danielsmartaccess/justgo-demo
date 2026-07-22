# Go DS — Design System da Just Go Intelligence Platform

| Campo | Valor |
|---|---|
| Nome | Go DS |
| Versão | 1.0.0 |
| Data | Julho/2026 |
| Escopo | Web institucional, plataforma SaaS (dashboards), app do visitante (PWA), documentos gerados |
| Stack de referência | Next.js + Tailwind CSS (tokens via CSS variables), Figma (biblioteca espelhada) |

---

## 1. Princípios

1. **Confiança antes de brilho.** Vendemos prestação de contas auditável: cada tela deve parecer precisa, verificável e sóbria. Nada de dado decorativo.
2. **Dois mundos, uma marca.** O gestor trabalha em interfaces claras e institucionais; o visitante vive uma experiência dark premium (preto/azul/dourado). Os dois contextos compartilham os mesmos tokens de marca.
3. **Tempo real com calma.** Dados mudam a cada minuto, mas a interface não pode parecer um pregão. Movimento sutil, hierarquia estável.
4. **Acessível por padrão.** WCAG 2.1 AA não é checklist final, é restrição de design desde o primeiro rascunho.
5. **Premium sem frieza.** Referências: Apple (materialidade), Stripe (clareza técnica), Linear (densidade elegante). Tom brasileiro: direto e caloroso.

---

## 2. Fundações

### 2.1 Cor — tokens de marca

| Token | Hex | Uso |
|---|---|---|
| `brand.navy` | `#0D1B2A` | "Just" da marca, títulos institucionais, fundos de destaque no contexto claro |
| `brand.blue` | `#00AEEF` | "Go" da marca, ação primária, links, foco, dados de destaque |
| `brand.gold` | `#E6B64C` | Acento premium (exclusivo do contexto dark/visitante e de selos de destaque) |
| `brand.black` | `#07090D` | Fundo base do app do visitante |
| `brand.white` | `#FFFFFF` | Fundo base do contexto claro |

### 2.2 Paleta primária e neutros

| Token | Hex | Notas |
|---|---|---|
| `blue.50` | `#E6F7FE` | Fundos de destaque suaves |
| `blue.100` | `#B8EAFB` | Hover de itens selecionados |
| `blue.300` | `#5CCDF6` | Ícones informativos |
| `blue.500` | `#00AEEF` | **Primária.** Botões, links |
| `blue.600` | `#0090C7` | Hover da primária |
| `blue.700` | `#00719C` | Active/pressed; texto azul sobre claro (AA) |
| `navy.500` | `#1B3A57` | Cabeçalhos secundários |
| `navy.700` | `#12283D` | Sidebar do dashboard |
| `navy.900` | `#0D1B2A` | Navy da marca |
| `gold.300` | `#F0CE85` | Dourado suave (dark) |
| `gold.500` | `#E6B64C` | Dourado padrão |
| `gold.700` | `#B98F2F` | Dourado sobre fundos claros (AA) |
| `neutral.0` | `#FFFFFF` | Branco |
| `neutral.50` | `#F7F9FB` | Fundo de página (claro) |
| `neutral.100` | `#EDF1F5` | Fundo de cards secundários |
| `neutral.200` | `#DCE3EA` | Bordas |
| `neutral.400` | `#9AA7B4` | Texto desabilitado, placeholders |
| `neutral.600` | `#5A6B7B` | Texto secundário (claro) |
| `neutral.800` | `#22303D` | Texto primário (claro) |
| `dark.bg` | `#07090D` | Fundo base (dark) |
| `dark.surface` | `#0E1319` | Cards (dark) |
| `dark.surface2` | `#161D26` | Cards elevados, modais (dark) |
| `dark.border` | `#243040` | Bordas (dark) |
| `dark.text` | `#F2F5F8` | Texto primário (dark) |
| `dark.textSec` | `#9FB0C0` | Texto secundário (dark) |

### 2.3 Cores semânticas

| Token | Claro | Dark | Uso |
|---|---|---|---|
| `semantic.success` | `#1E8E5A` | `#3DCC8E` | Confirmações, sincronizado, conciliado |
| `semantic.warning` | `#B97A0F` | `#F0B429` | Atenção, pendências, cota próxima do limite |
| `semantic.danger` | `#C43D3D` | `#F26D6D` | Erros, falha de pagamento, alerta crítico |
| `semantic.info` | `#0071A4` | `#5CCDF6` | Informações neutras, dicas da IA |
| `semantic.ai` | `#6E5BD9` | `#9D8DF2` | Exclusiva para conteúdo gerado por IA (briefing, respostas de agentes) — nunca usada para outra finalidade |

### 2.4 Os dois contextos

**Contexto A — Web institucional e plataforma do gestor (claro):**
fundo `neutral.50`, superfícies brancas, texto `neutral.800`, primária `blue.500`, navy para navegação. Dourado apenas em selos ("Caso auditado", "Certificado").

**Contexto B — App operacional do visitante (dark premium):**
fundo `brand.black #07090D`, superfícies `dark.surface`, texto `dark.text`, primária `blue.500`, **dourado `gold.500` para valor e recompensa** (saldo da carteira, VIP, cupons). Regra: dourado nunca em botões de ação destrutiva ou estados de erro.

O dashboard do gestor oferece dark mode opcional usando os tokens `dark.*` sem o dourado (dourado é assinatura do visitante).

### 2.5 Tipografia

| Papel | Fonte | Peso |
|---|---|---|
| Marca / display | **Baloo 2** | 600–700 |
| UI / corpo / dados | **Inter** | 400–700 |
| Numérico tabular | Inter (feature `tnum`) | 500–600 |

Escala modular (base 16 px, razão ~1,25):

| Token | Tamanho / linha | Uso |
|---|---|---|
| `font.display` | 40/48, Baloo 2 700 | Hero institucional |
| `font.h1` | 32/40, Inter 700 | Título de página |
| `font.h2` | 24/32, Inter 600 | Seções |
| `font.h3` | 20/28, Inter 600 | Cards, modais |
| `font.body-lg` | 18/28, Inter 400 | Texto institucional |
| `font.body` | 16/24, Inter 400 | Padrão de UI |
| `font.body-sm` | 14/20, Inter 400 | Tabelas, apoio |
| `font.caption` | 12/16, Inter 500 | Legendas, timestamps |
| `font.kpi` | 32/36, Inter 700 `tnum` | Números de KPI |

Regras: Baloo 2 só para marca e display de marketing — nunca em dados ou UI operacional. Números financeiros e de pesquisa sempre com `tnum` (alinhamento tabular).

### 2.6 Espaçamento, raios, sombras, elevação

**Espaçamento — grade de 4 px:** `space.1`=4, `space.2`=8, `space.3`=12, `space.4`=16, `space.5`=20, `space.6`=24, `space.8`=32, `space.10`=40, `space.12`=48, `space.16`=64. Padding interno de card: 24. Gap padrão de grid de dashboard: 16.

**Raios:** `radius.sm`=6 (chips, inputs), `radius.md`=10 (botões, cards), `radius.lg`=16 (modais, cards hero), `radius.full`=999 (avatares, pills). A marca é arredondada — nunca usar raio 0.

**Sombras/elevação (contexto claro):**

| Token | Valor | Uso |
|---|---|---|
| `elevation.0` | none + borda `neutral.200` | Cards padrão (preferir borda a sombra) |
| `elevation.1` | `0 1px 3px rgba(13,27,42,.08)` | Dropdowns, hover de card |
| `elevation.2` | `0 8px 24px rgba(13,27,42,.12)` | Modais, popovers |

No dark, elevação é comunicada por cor de superfície (`dark.surface` → `dark.surface2`) + borda `dark.border`, não por sombra.

### 2.7 Motion

| Token | Duração | Easing | Uso |
|---|---|---|---|
| `motion.fast` | 120 ms | `cubic-bezier(0.2, 0, 0, 1)` | Hover, toggles, foco |
| `motion.base` | 200 ms | `cubic-bezier(0.2, 0, 0, 1)` | Abertura de dropdown, chips |
| `motion.slow` | 320 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Modais, painéis laterais |
| `motion.data` | 600 ms | `ease-out` | Entrada de gráficos e contadores de KPI (uma vez, sem loop) |

Regras: respeitar `prefers-reduced-motion` (desligar contadores animados e transições de gráfico); atualização de dado em tempo real usa fade sutil de 200 ms no valor, nunca piscar a cor do card inteiro; streaming de resposta da IA aparece por digitação natural, sem cursor piscante agressivo.

---

## 3. Componentes

### 3.1 Botões

| Variante | Claro | Dark | Uso |
|---|---|---|---|
| Primário | fundo `blue.500`, texto branco; hover `blue.600` | idem | 1 por tela/região |
| Secundário | borda `neutral.200`, texto `neutral.800` | borda `dark.border`, texto `dark.text` | Ações de apoio |
| Ghost | texto `blue.700` | texto `blue.300` | Ações terciárias, tabelas |
| Destrutivo | fundo `semantic.danger`, texto branco | idem | Sempre com confirmação |
| Dourado (só dark/visitante) | fundo `gold.500`, texto `#07090D` | — | Recarga, resgate, upgrade |

Alturas: 40 px (padrão), 48 px (mobile/touch), 32 px (denso em tabela). Estados obrigatórios em Figma e código: default, hover, active, focus-visible (anel 2 px `blue.500` com offset 2 px), loading (spinner substitui rótulo mantendo largura), disabled (60% opacidade, sem hover).

### 3.2 Inputs e formulários

- Altura 40/48 px, raio `sm`, borda `neutral.200`/`dark.border`, foco com anel azul.
- Rótulo sempre visível acima (nunca placeholder como rótulo).
- Erro: borda + mensagem `semantic.danger` com ícone, `aria-describedby` ligado.
- Máscaras pt-BR nativas: CPF, CNPJ, CEP, telefone, moeda (R$ 1.234,56), data (dd/mm/aaaa).
- Suporte a modo "luva/campo": variante extra-grande (56 px) para o app de coleta em campo.

### 3.3 Cards

- Card padrão: superfície + borda, raio `md`, padding 24.
- **Card de KPI:** rótulo (`caption`), valor (`font.kpi` `tnum`), variação vs. período (chip verde/vermelho com seta e texto — nunca só cor), sparkline opcional.
- **Card de briefing da IA:** borda esquerda 3 px `semantic.ai`, ícone do agente, timestamp, ações "ver fontes" e avaliação útil/não útil.

### 3.4 Chips, navegação, tabelas

- **Chips:** raio `full`, altura 28 px; variantes filtro (selecionável), status (semânticas) e agente (cor `semantic.ai`).
- **Navegação plataforma:** sidebar navy (`navy.700`) colapsável com módulos Go; topo com seletor de tenant/evento e sino de alertas. **Navegação visitante:** tab bar inferior de 4 itens, altura 64 px, ícones + rótulo.
- **Tabelas:** linhas de 44 px (48 touch), cabeçalho `body-sm` 600, zebra opcional `neutral.50`, números à direita com `tnum`, ordenação com indicador acessível, paginação ou scroll virtual acima de 100 linhas, coluna de ações fixa à direita.

### 3.5 Toasts e modais

- **Toasts:** canto superior direito (web) / topo (mobile); auto-dismiss 5 s exceto erro (persistente com botão fechar); máximo 3 empilhados; sempre com `role="status"`/`role="alert"`.
- **Modais:** raio `lg`, `elevation.2`, título `h3`, ações à direita (primária na ponta), fechamento por ESC e overlay; confirmação destrutiva exige nome da ação no botão ("Excluir questionário", nunca "OK"). Foco preso dentro do modal (focus trap) e devolvido ao gatilho ao fechar.

### 3.6 Gráficos (dataviz)

Ordem categórica acessível (segura para daltonismo, testada em deuteranopia/protanopia):

| Ordem | Token | Hex (claro) |
|---|---|---|
| 1 | `viz.1` | `#00AEEF` |
| 2 | `viz.2` | `#0D1B2A` (dark: `#9FB0C0`) |
| 3 | `viz.3` | `#E6B64C` |
| 4 | `viz.4` | `#6E5BD9` |
| 5 | `viz.5` | `#1E8E5A` |
| 6 | `viz.6` | `#C43D3D` |

Regras: máximo 6 séries (acima disso, agrupar em "Outros"); nunca distinguir séries só por cor — usar rótulo direto na série ou marcadores de forma; sequencial = escala de azuis (`blue.50` → `navy.900`); divergente = azul ↔ dourado com neutro central; NPS sempre com faixas fixas (detrator/neutro/promotor) nas cores semânticas; eixo Y começa em zero para barras (sem exceção em relatório oficial); todo gráfico exporta com título, período, fonte e n amostral (exigência de auditabilidade).

### 3.7 Estados vazios

Todo módulo tem estado vazio com: ilustração leve (traço, 1 cor de marca), título direto ("Nenhuma entrevista ainda"), texto de 1 linha com o porquê/próximo passo e ação primária ("Criar questionário"). Estados vazios de erro e de "sem permissão" são distintos do vazio de "sem dados".

---

## 4. Padrões

### 4.1 Formulários
Uma coluna sempre; agrupamento por seções com títulos `h3`; validação no blur + resumo de erros no submit com âncoras; salvamento automático de rascunho em builders (Go Survey); botão primário fixo no rodapé em fluxos longos (mobile).

### 4.2 Dashboards
Hierarquia em 3 alturas: (1) faixa de KPIs (4–6 cards), (2) briefing da IA + alertas, (3) gráficos e tabelas detalhadas. Timestamp global "atualizado há Xs" no topo. Skeleton loaders (nunca spinner de página inteira). Todo número clicável leva ao detalhe que o gerou (drill-down = auditabilidade).

### 4.3 Chat de IA
Seletor de agente visível no topo (chips com nome e papel); resposta em streaming; blocos de números sempre com rodapé "Fonte: [dataset] · [filtro] · [período]" e link "ver consulta"; ações rápidas sugeridas como chips abaixo da resposta; aviso permanente discreto: "Conteúdo gerado por IA — confira as fontes antes de decisões oficiais."

### 4.4 Mapas
Estilo escuro no app do visitante e claro na plataforma; pins com as cores semânticas por categoria (saúde = danger, recarga = gold, palco = blue); cluster acima de 12 pins; legenda sempre visível em telas de gestão.

---

## 5. Acessibilidade

| Requisito | Regra |
|---|---|
| Contraste | Texto normal ≥ 4,5:1; texto grande e ícones informativos ≥ 3:1. `blue.500` sobre branco falha para texto → usar `blue.700` para links/textos; `blue.500` reservado para superfícies e elementos grandes. `gold.500` sobre branco falha → usar `gold.700` no claro. |
| Foco | `focus-visible` em 100% dos interativos: anel 2 px `blue.500`, offset 2 px, nunca removido. |
| Touch targets | Mínimo 44×44 px (visitante e coleta em campo: preferir 48). |
| Teclado | Toda jornada crítica (criar pesquisa, aprovar relatório, pagar) completável só por teclado. |
| Leitores de tela | Landmarks, `aria-live="polite"` para KPIs em tempo real, `role="alert"` só para crítico. |
| Cor | Nenhuma informação transmitida apenas por cor (usar ícone + texto). |
| Movimento | `prefers-reduced-motion` respeitado globalmente. |

---

## 6. Tom de voz (PT-BR)

- **Direto e respeitoso:** "Não foi possível sincronizar 3 entrevistas. Elas estão salvas no aparelho." — nunca "Ops! Algo deu errado :(".
- **Você**, nunca "tu" nem "o usuário". Sem gerúndio corporativo ("estaremos enviando" → "enviaremos").
- Números por extenso até dez em texto corrido; formato brasileiro sempre (R$ 8,2 mi; 1.647; 94%).
- IA fala com confiança calibrada: "Os dados indicam…", "Recomendo verificar…" — nunca "com certeza" sobre inferências.
- Erros dizem o que aconteceu, o impacto e o próximo passo — nesta ordem.
- Termos fixos do produto: "entrevista" (não "resposta de survey"), "carteira" (não "wallet"), "briefing" (mantido em inglês, já incorporado), "órgãos de controle" (terminologia institucional padrão).

---

## 7. Governança e versionamento de tokens

- **Fonte da verdade:** repositório `go-ds` com tokens em JSON (padrão W3C Design Tokens), transformados via Style Dictionary para CSS variables (web), Tailwind config e Figma Variables (sincronização via plugin).
- **Versionamento semântico:** MAJOR = quebra visual ou remoção de token; MINOR = novo token/componente; PATCH = ajuste de valor sem quebra. Changelog obrigatório.
- **Fluxo de mudança:** proposta via PR com screenshot antes/depois → revisão de design + 1 eng → checagem automática de contraste no CI → publicação.
- **Depreciação:** tokens removidos passam 1 versão MINOR marcados `deprecated` com alias para o substituto.

Exemplo de arquivo de tokens (`tokens/color.json`):

```json
{
  "$schema": "https://design-tokens.org/schema.json",
  "color": {
    "brand": {
      "navy":  { "$value": "#0D1B2A", "$type": "color" },
      "blue":  { "$value": "#00AEEF", "$type": "color" },
      "gold":  { "$value": "#E6B64C", "$type": "color" },
      "black": { "$value": "#07090D", "$type": "color" }
    },
    "action": {
      "primary":        { "$value": "{color.brand.blue}", "$type": "color" },
      "primary-hover":  { "$value": "#0090C7", "$type": "color" },
      "link":           { "$value": "#00719C", "$type": "color",
                          "$description": "blue.700 — AA sobre fundo claro" }
    },
    "semantic": {
      "success": { "$value": "#1E8E5A", "$type": "color" },
      "warning": { "$value": "#B97A0F", "$type": "color" },
      "danger":  { "$value": "#C43D3D", "$type": "color" },
      "ai":      { "$value": "#6E5BD9", "$type": "color",
                   "$description": "Exclusivo para conteúdo gerado por IA" }
    }
  },
  "radius": {
    "sm": { "$value": "6px", "$type": "dimension" },
    "md": { "$value": "10px", "$type": "dimension" },
    "lg": { "$value": "16px", "$type": "dimension" }
  },
  "motion": {
    "fast": { "$value": { "duration": "120ms", "easing": "cubic-bezier(0.2,0,0,1)" }, "$type": "transition" },
    "base": { "$value": { "duration": "200ms", "easing": "cubic-bezier(0.2,0,0,1)" }, "$type": "transition" }
  }
}
```

**Donos:** Design Lead (aprovação visual), Tech Lead front (aprovação técnica). Revisão trimestral de aderência (auditoria de telas em produção vs. Go DS).
