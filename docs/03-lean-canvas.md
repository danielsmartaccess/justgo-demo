# Lean Canvas — Just Go Event Intelligence (MVP / Cunha de Entrada)

**Empresa:** Just Go Smart Access | **Fundador:** Daniel Steinbruch
**Escopo deste canvas:** o MVP atual — **Event Intelligence para prefeituras** — como cunha de entrada da Just Go Intelligence Platform.
**Versão:** 1.0 | **Data:** Julho/2026
**Demo pública:** https://danielsmartaccess.github.io/justgo-demo/

> Diferença de escopo: o Business Model Canvas (doc. 02) descreve o negócio completo; este Lean Canvas foca **apenas na cunha validável nos próximos 12 meses**, com hipóteses e experimentos.

---

## Canvas em uma tabela

| Bloco | Conteúdo |
| --- | --- |
| **1. Problema** | Prefeituras gastam com eventos sem medir impacto; órgãos de controle cobram prestação de contas; dinheiro circula sem rastreabilidade |
| **2. Segmento de Clientes** | Prefeituras de 20-500 mil hab. com eventos anuais relevantes; early adopter: secretário de turismo/cultura com evento nos próximos 6 meses e pressão por prestação de contas |
| **3. Proposta de Valor Única** | "O único sistema que transforma seu evento em evidência auditável: impacto econômico, satisfação e arrecadação, prontos para os órgãos de controle" |
| **4. Solução** | Pacote Event Intelligence: Go Event + Go Survey (campo com Foccus) + Go Pay + Go Analytics + Go Report (dossiê executivo) |
| **5. Canais** | Venda direta do fundador; rede Foccus; caso Canaã como peça comercial; demo pública |
| **6. Fontes de Receita** | Implantação R$ 18-80 mil (Start/Professional); pesquisa ~R$ 18 mil; relatório ~R$ 15 mil; SaaS R$ 990-2.490/mês pós-evento |
| **7. Estrutura de Custos** | Time enxuto, cloud baixa (offline-first/estático), campo variável repassado, deslocamento comercial |
| **8. Métricas-Chave** | Propostas emitidas, taxa de fechamento, eventos medidos, R$ de impacto reportado, conversão implantação→SaaS, NPS do gestor |
| **9. Vantagem Injusta** | Caso real Canaã (1.647 entrevistas, R$ 8,2 mi, 94% satisfação) + parceria exclusiva Foccus + domínio do rito público |

---

## 1. Problema

**Top 3 problemas do cliente-alvo (secretário/prefeito):**

1. **Não consegue provar o retorno do evento.** Investe R$ 500 mil - 3 mi por edição e responde "achismo" quando questionado sobre resultado.
2. **Pressão dos órgãos de controle.** A prestação de contas de gastos com eventos exige, cada vez mais, justificativa técnica — e não existe evidência estruturada.
3. **Cegueira operacional e financeira.** Não sabe quanto o evento movimentou no comércio, quem veio, de onde, nem o que melhorar.

**Alternativas existentes (concorrência real do MVP):**

- Não fazer nada (status quo dominante);
- Contratar pesquisa tradicional pontual (cara, lenta, sem plataforma, sem série histórica);
- Relatório interno da própria secretaria (sem credibilidade metodológica perante terceiros).

## 2. Segmento de Clientes

- **Alvo:** prefeituras de 20 mil a 500 mil habitantes com pelo menos 1 evento anual de porte (festa junina, festival, aniversário da cidade).
- **Early adopter (perfil de compra rápida):**
  - tem evento confirmado nos próximos 4-6 meses;
  - sofreu questionamento recente de órgão de controle ou da câmara sobre gastos com eventos;
  - secretário com perfil técnico/dados ou prefeito em busca de narrativa de gestão eficiente;
  - orçamento acessível via **dispensa por valor** (abaixo do teto legal) — elimina licitação no primeiro contrato.
- **Usuários (não pagantes) que precisam amar o produto:** entrevistadores da Foccus, equipe da secretaria, visitantes do app.

## 3. Proposta de Valor Única

> **"Transformamos seu evento em evidência: impacto econômico, satisfação e arrecadação medidos e auditáveis — o dossiê que sua gestão apresenta aos órgãos de controle e à população."**

**Conceito high-level:** *"Raio-X econômico do evento + prestação de contas pronta"*.

## 4. Solução

| Problema | Solução no MVP | Estado |
| --- | --- | --- |
| Provar retorno | Medição de impacto econômico com metodologia declarada (Go Survey + Foccus + Go Analytics) | Validado no Canaã |
| Prestação de contas | Go Report: dossiê executivo com metodologia, amostra e limitações | Validado (artesanal; automatizar) |
| Cegueira financeira | Go Pay cashless centralizado: visibilidade total da economia do evento | Em piloto — próxima prioridade |
| Experiência do público | Go Event (app do visitante: mapa, programação, serviços) | Publicado na demo |

**O que fica explicitamente FORA do MVP** (disciplina de escopo): Go City, Go Vision, Go Access, GO AI Studio, Marketplace — entram apenas após 20+ clientes na cunha.

## 5. Canais

1. **Venda direta consultiva** (fundador) — canal principal nos primeiros 12 meses.
2. **Rede Foccus** — prefeituras onde a Foccus já tem relacionamento e credibilidade.
3. **Caso Canaã** — relatório-vitrine apresentado em reuniões; cada novo evento medido vira nova peça.
4. **Demo pública** — qualificação de leads e prova de existência do produto.
5. *(teste no ano 1)* Encontros de secretários de turismo e associações municipalistas regionais.

## 6. Fontes de Receita (MVP)

| Item | Preço | Observação |
| --- | --- | --- |
| Implantação Start (até 5 mil visitantes) | R$ 18-30 mil | Porta de entrada; cabe em dispensa por valor |
| Implantação Professional (até 20 mil) | R$ 45-80 mil | Ticket-alvo do early adopter |
| Pesquisa avulsa (com Foccus) | ~R$ 18 mil | Pode ser vendida isolada como "primeiro sim" |
| Relatório executivo | ~R$ 15 mil | Upsell natural da pesquisa |
| SaaS Starter/Business pós-evento | R$ 990 / R$ 2.490 por mês | Conversão após o primeiro evento medido |

**Pedido mínimo viável:** pesquisa + relatório (~R$ 33 mil) — abaixo do teto de dispensa, ciclo de venda curto, gera o caso que puxa a implantação completa na edição seguinte.

## 7. Estrutura de Custos (MVP)

- Time: fundador + 1-2 devs + apoio comercial/CS (contratação progressiva);
- Cloud: mínima (MVP estático + Firebase); cresce com multi-tenant;
- Campo: custo variável dentro do preço da pesquisa (split com Foccus);
- Comercial: deslocamentos e material; ciclo B2G de 2-6 meses na dispensa por valor;
- Jurídico/administrativo: contratos públicos.

**Break-even operacional estimado do MVP:** ~R$ 45-60 mil/mês de receita média (premissa: custo fixo mensal de R$ 40-50 mil com time enxuto a partir do mês 6).

## 8. Métricas-Chave (funil pirata adaptado a B2G)

| Etapa | Métrica | Meta 12 meses |
| --- | --- | --- |
| Aquisição | Reuniões qualificadas com decisor | 60+ |
| Ativação | Propostas emitidas / taxa de fechamento | 25+ / ≥ 30% |
| Receita | Contratos assinados; receita reconhecida | 8-12 clientes; R$ 900 mil - 1,4 mi |
| Retenção | Conversão implantação → SaaS; renovação para edição seguinte | ≥ 50%; ≥ 70% |
| Indicação | NPS do gestor; indicações espontâneas entre municípios | ≥ 70; ≥ 3 |
| Prova de valor | Eventos medidos; impacto econômico total reportado | 10+; R$ 50 mi+ acumulado |

## 9. Vantagem Injusta

- **Caso Canaã**: 1.647 entrevistas, R$ 8,2 mi de impacto medido, 94% de satisfação — prova social que nenhum entrante tem;
- **Exclusividade Foccus**: capacidade de campo real, não replicável por SaaS puro;
- **Domínio do rito público**: saber vender por dispensa por valor, ata e licitação encurta ciclos que travam concorrentes;
- **Base de dados acumulada**: cada evento medido melhora benchmarks — vantagem composta com o tempo.

---

## Hipóteses Priorizadas e Experimentos de Validação

> Priorização por risco: primeiro as hipóteses que, se falsas, invalidam o negócio (deal-breakers), depois as de otimização.

### H1 — Hipótese de problema/comprador (CRÍTICA)

**"Secretários/prefeitos pagam R$ 30-80 mil para ter evidência auditável do evento, motivados pela prestação de contas aos órgãos de controle."**

- **Experimento:** 20 reuniões de diagnóstico com decisores em 90 dias (jul-out/2026), apresentando o dossiê Canaã e proposta padrão.
- **Métrica de validação:** ≥ 6 propostas aceitas ou intenções formais (carta/empenho) — taxa ≥ 30%.
- **Se falhar:** testar reposicionamento da mensagem (economia/turismo em vez de controle) e o segmento privado como cunha.

### H2 — Hipótese de canal (CRÍTICA)

**"A rede de relacionamento da Foccus + caso Canaã gera pipeline suficiente sem mídia paga."**

- **Experimento:** mapear 40 municípios-alvo na região de atuação da Foccus; medir origem de cada reunião obtida em 90 dias.
- **Métrica:** ≥ 50% das reuniões originadas por indicação Foccus/caso; custo por reunião ≤ R$ 500.
- **Se falhar:** ativar canal de associações municipalistas e prospecção direta estruturada.

### H3 — Hipótese de recorrência (ALTA)

**"Após o primeiro evento medido, o município converte para SaaS (série histórica + próximos eventos)."**

- **Experimento:** oferta de conversão padrão (3 meses de Starter incluídos na implantação) aos primeiros 6 clientes.
- **Métrica:** ≥ 50% ativos no SaaS 4 meses após o evento; churn mensal < 3%.
- **Se falhar:** repackaging como "assinatura anual do calendário de eventos" (venda por safra, não por mês).

### H4 — Hipótese do Go Pay (ALTA)

**"Organizador e prefeitura aceitam cashless centralizado, e o take-rate é viável com parceiro licenciado."**

- **Experimento:** 2 pilotos de Go Pay até dez/2026 em eventos de clientes já contratados, com instituição de pagamento parceira.
- **Métrica:** ≥ 60% do consumo do evento via cashless; margem líquida ≥ 0,6% do GMV após split; zero incidentes de liquidação.
- **Se falhar:** manter Go Pay como integração de leitura de dados (conciliação) e adiar a receita transacional.

### H5 — Hipótese de escala de entrega (MÉDIA)

**"A implantação pode ser executada sem o fundador em campo, preservando qualidade."**

- **Experimento:** documentar playbook na 3ª implantação; 4ª implantação conduzida por equipe (fundador só remoto).
- **Métrica:** NPS do gestor ≥ 70 na implantação sem fundador; desvio de cronograma ≤ 15%.
- **Se falhar:** rever modelo de entrega (certificar a Foccus ou parceiro local como implantador).

### H6 — Hipótese de preço (MÉDIA)

**"O pacote mínimo (~R$ 33 mil: pesquisa + relatório) cabe em dispensa por valor e destrava o primeiro contrato em < 90 dias."**

- **Experimento:** ofertar o pacote mínimo em 10 negociações; medir tempo proposta→empenho.
- **Métrica:** ciclo mediano ≤ 90 dias; ≥ 4 fechamentos.
- **Se falhar:** criar oferta de entrada menor (diagnóstico pago ~R$ 8-10 mil) ou buscar guarda-chuva via ata de registro de preços.

### Quadro de aprendizado

| Hipótese | Risco se falsa | Prazo do experimento | Decisão gatilhada |
| --- | --- | --- | --- |
| H1 comprador | Invalida a cunha B2G | Out/2026 | Pivô de segmento ou mensagem |
| H2 canal | CAC inviável | Out/2026 | Novo canal |
| H3 recorrência | Vira consultoria, não SaaS | Fev/2027 | Repackaging anual |
| H4 Go Pay | Perde receita transacional | Dez/2026 | Adiar monetização Pay |
| H5 entrega | Não escala além do fundador | Mar/2027 | Modelo de implantador parceiro |
| H6 preço | Ciclo longo demais | Dez/2026 | Oferta de entrada menor |

---

*Documento elaborado pela Just Go Smart Access — julho/2026. Metas e estimativas dependem das premissas declaradas; revisar após cada ciclo de experimentos.*
