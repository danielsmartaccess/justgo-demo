# Backlog Inicial — Just Go Intelligence Platform

> Documento: `docs/11-backlog.md` · Versão 1.0 · Julho/2026
> Produto: plataforma de Decision Intelligence para prefeituras, eventos e turismo.

---

## 1. Como este backlog está organizado

- O backlog está dividido em **18 épicos**, cada um representando um módulo ou capacidade da plataforma.
- Cada épico possui objetivo, tabela de histórias de usuário, critérios de aceite resumidos, prioridade e estimativa.
- As histórias seguem o formato **"Como \<persona\>, quero \<ação\> para \<benefício\>"** e foram escritas para serem específicas e implementáveis em 1 sprint (ou fatiadas quando maiores).
- A ordem dos épicos reflete a ordem aproximada do roadmap, mas a priorização real é dada pela coluna **Prioridade** de cada história.

### Convenção de IDs

- Formato: `EPX-###`, onde `X` é o número do épico e `###` é o sequencial da história (ex.: `EP4-012`).
- IDs nunca são reutilizados; histórias canceladas mantêm o ID com status "cancelada" na ferramenta de gestão.

### Definition of Ready (DoR) — quando uma história pode entrar na sprint

1. História escrita no formato persona/ação/benefício e entendida pelo time.
2. Critérios de aceite claros e testáveis.
3. Dependências técnicas e de design identificadas (protótipo Figma quando envolver UI).
4. Estimada em Story Points pelo time.
5. Sem bloqueios externos conhecidos (acessos, contratos, dados).

### Definition of Done (DoD) — quando uma história está concluída

1. Código revisado (PR aprovado) e mergeado na branch principal.
2. Testes unitários e de integração cobrindo os critérios de aceite (cobertura mínima 80% no módulo).
3. Critérios de aceite validados pelo PO em ambiente de homologação.
4. Documentação técnica e de usuário atualizadas.
5. Sem regressões nos testes E2E do módulo; observabilidade (logs/métricas) instrumentada.
6. Requisitos de LGPD e segurança verificados quando a história tratar dados pessoais.

### Escala de estimativa (Fibonacci)

| SP | Significado |
|----|-------------|
| 1 | Trivial — ajuste pequeno, sem risco |
| 2 | Simples — escopo claro, pouca incerteza |
| 3 | Médio — 1 a 2 dias de trabalho de um dev |
| 5 | Considerável — envolve mais de uma camada (API + UI + dados) |
| 8 | Grande — incerteza técnica relevante; candidata a fatiamento |
| 13 | Muito grande — deve ser quebrada antes de entrar em sprint |

### Legenda de prioridade

| Prioridade | Significado |
|------------|-------------|
| **P0** | Necessária para o lançamento (MVP / Fase 1) |
| **P1** | Fase 2 — logo após o lançamento |
| **P2** | Fase 3 em diante — evolução e diferenciação |

---

## 2. Tabela-resumo dos épicos

| # | Épico | Módulo | Histórias | Fase do roadmap |
|---|-------|--------|-----------|-----------------|
| EP1 | Fundação da Plataforma: Autenticação, RBAC e Multi-tenant | Plataforma | 25 | Fase 1 |
| EP2 | GO Intelligence: IA Central e Agentes | IA | 28 | Fases 1–3 |
| EP3 | Dashboard do Gestor e Briefing Diário | Gestão | 18 | Fase 1 |
| EP4 | Go Survey: Pesquisas e Coleta em Campo | Pesquisa | 32 | Fase 1 |
| EP5 | Go Event: App do Visitante | Eventos | 28 | Fase 1 |
| EP6 | Go Pay: Carteira Cashless e Financeiro | Pagamentos | 32 | Fase 2 |
| EP7 | Go Analytics: KPIs, NPS e Impacto Econômico | Analytics | 26 | Fases 1–2 |
| EP8 | Go Expo: Gestão de Expositores | Eventos | 15 | Fase 2 |
| EP9 | Go Commerce: Cashback e Fidelidade Local | Comércio | 18 | Fase 3 |
| EP10 | Go City / Go Tourism: Cidade e Turismo | Turismo | 18 | Fase 3 |
| EP11 | Go Vision: Visão Computacional | IA | 12 | Fase 4 |
| EP12 | Go Maps: Mapas, Calor e Fluxo | Geo | 14 | Fase 2 |
| EP13 | GO AI Studio: Agentes No-code | IA | 14 | Fase 4 |
| EP14 | Marketplace, SDK e APIs Públicas | Ecossistema | 12 | Fase 5 |
| EP15 | Observabilidade e Confiabilidade | Plataforma | 15 | Fases 1–2 |
| EP16 | LGPD, Segurança e Auditoria | Plataforma | 18 | Fases 1–2 |
| EP17 | Billing SaaS e Gestão de Contratos | Plataforma | 12 | Fase 2 |
| EP18 | Onboarding, Educação e Suporte (Agente Professor) | Adoção | 12 | Fases 2–3 |
| — | **Total** | — | **349** | — |

---

## EP1 — Fundação da Plataforma: Autenticação, RBAC e Multi-tenant

**Objetivo:** garantir que cada prefeitura/organização opere em um tenant isolado, com autenticação segura, papéis e permissões granulares, base para todos os demais módulos.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP1-001 | Como Administrador da Plataforma, quero criar um novo tenant (prefeitura ou organizadora) com CNPJ, domínio e plano contratado para isolar dados e configurações de cada cliente | Tenant criado com slug único; dados isolados por `tenant_id` em todas as tabelas; validação de CNPJ na Receita | P0 | 8 |
| EP1-002 | Como Administrador da Plataforma, quero suspender e reativar um tenant inadimplente para bloquear o acesso sem apagar dados | Suspensão bloqueia login em até 5 min; dados preservados; banner informativo exibido; reativação imediata | P0 | 3 |
| EP1-003 | Como Gestor Municipal, quero fazer login com e-mail e senha com política de senha forte para proteger o acesso à conta da prefeitura | Mínimo 10 caracteres com maiúscula, número e símbolo; bloqueio após 5 tentativas; mensagem de erro genérica | P0 | 3 |
| EP1-004 | Como Gestor Municipal, quero ativar autenticação em dois fatores (TOTP) para adicionar camada extra de segurança ao meu acesso | QR code de setup; validação de código de 6 dígitos; 10 códigos de recuperação gerados; 2FA exigível por política do tenant | P0 | 5 |
| EP1-005 | Como Administrador da Plataforma, quero login via Google Workspace (SSO OIDC) para clientes que usam contas corporativas Google | Fluxo OIDC completo; vínculo por e-mail verificado; SSO configurável por tenant; fallback para senha desativável | P1 | 5 |
| EP1-006 | Como Administrador da Plataforma, quero definir papéis padrão (Admin do Tenant, Gestor, Organizador, Analista, Pesquisador, Operador, Leitura) para acelerar a configuração de novos clientes | 7 papéis pré-criados em todo tenant novo; permissões documentadas; papéis padrão não editáveis | P0 | 5 |
| EP1-007 | Como Administrador do Tenant, quero criar papéis customizados combinando permissões granulares por módulo para refletir a estrutura da secretaria | Permissões no padrão `modulo:recurso:ação`; papel customizado clonável de um padrão; máximo 50 papéis por tenant | P1 | 8 |
| EP1-008 | Como Administrador do Tenant, quero convidar usuários por e-mail com papel pré-atribuído para dar acesso à equipe sem cadastro manual | Convite expira em 72h; reenvio possível; usuário define senha no primeiro acesso; convite auditado | P0 | 3 |
| EP1-009 | Como Administrador do Tenant, quero desativar um usuário imediatamente (ex.: exoneração de servidor) para revogar acessos em situações sensíveis | Sessões ativas invalidadas em até 60s; tokens de API revogados; registro em log de auditoria | P0 | 3 |
| EP1-010 | Como Gestor Municipal, quero recuperar minha senha por link enviado ao e-mail para retomar o acesso sem abrir chamado | Link de uso único válido por 30 min; senha antiga invalidada; notificação de alteração enviada | P0 | 2 |
| EP1-011 | Como Administrador da Plataforma, quero que cada tenant tenha subdomínio próprio (ex.: gramado.justgo.app) para reforçar identidade e isolamento | Roteamento por subdomínio; certificado TLS automático; redirecionamento se usuário logar no subdomínio errado | P1 | 5 |
| EP1-012 | Como Administrador do Tenant, quero personalizar logotipo e cores do tenant para que o app do visitante reflita a marca da cidade/evento | Upload de logo (SVG/PNG); paleta primária/secundária; preview antes de publicar; aplicado em web e app | P1 | 5 |
| EP1-013 | Como Administrador do Tenant, quero restringir acesso de papéis por evento específico para que um organizador só veja o evento pelo qual é responsável | Escopo de permissão por `event_id`; listagens filtradas; tentativa de acesso fora do escopo retorna 403 auditado | P0 | 5 |
| EP1-014 | Como Desenvolvedor Integrador, quero autenticar chamadas de API com chaves por tenant e escopo para integrar sistemas da prefeitura com segurança | Chaves com prefixo identificável; escopos por módulo; rotação sem downtime; rate limit por chave | P1 | 5 |
| EP1-015 | Como Administrador do Tenant, quero visualizar todas as sessões ativas dos usuários do tenant para identificar acessos suspeitos | Lista com IP, dispositivo, localização aproximada e último acesso; encerramento remoto de sessão individual | P1 | 3 |
| EP1-016 | Como Gestor Municipal, quero alternar entre tenants quando participo de mais de uma organização (ex.: consórcio intermunicipal) para não manter contas duplicadas | Seletor de tenant no header; contexto trocado sem novo login; permissões recarregadas por tenant | P2 | 5 |
| EP1-017 | Como Administrador da Plataforma, quero um painel de saúde por tenant (usuários ativos, armazenamento, chamadas de API) para acompanhar consumo e engajamento | Métricas atualizadas a cada hora; exportação CSV; alerta quando tenant excede 80% do plano | P1 | 5 |
| EP1-018 | Como Administrador do Tenant, quero exigir troca de senha no primeiro acesso de usuários criados em lote para evitar senhas provisórias permanentes | Flag `must_change_password`; bloqueio de navegação até troca; senha provisória expira em 7 dias | P0 | 2 |
| EP1-019 | Como Administrador do Tenant, quero importar usuários via planilha CSV com validação linha a linha para migrar equipes grandes rapidamente | Template CSV disponível; relatório de erros por linha; importação parcial permitida; máximo 500 linhas por lote | P1 | 5 |
| EP1-020 | Como Administrador da Plataforma, quero definir políticas de sessão por tenant (timeout, IP allowlist) para atender requisitos de segurança de cada prefeitura | Timeout configurável 15min–24h; allowlist CIDR opcional; políticas aplicadas em web e API | P1 | 5 |
| EP1-021 | Como Gestor Municipal, quero visualizar meu perfil com foto, cargo e secretaria para que a equipe identifique quem é quem na plataforma | Edição de nome, foto e cargo; e-mail imutável pelo próprio usuário; foto redimensionada automaticamente | P0 | 2 |
| EP1-022 | Como Administrador do Tenant, quero um log de alterações de permissões (quem deu qual acesso a quem e quando) para prestar contas em auditorias internas | Evento imutável com autor, alvo, papel anterior e novo; retenção de 5 anos; filtro por período e usuário | P0 | 3 |
| EP1-023 | Como Visitante, quero criar conta no app com e-mail ou telefone com verificação por código para acessar recursos personalizados (favoritos, carteira) | OTP de 6 dígitos por e-mail/SMS; reenvio com cooldown de 60s; conta única por telefone no tenant | P0 | 5 |
| EP1-024 | Como Visitante, quero usar o app do evento sem criar conta (modo anônimo) para consultar programação e mapa sem fricção | Programação, mapa e emergência acessíveis sem login; ações que exigem conta mostram call-to-action de cadastro | P0 | 3 |
| EP1-025 | Como Administrador da Plataforma, quero ambiente de demonstração (tenant sandbox com dados fictícios) para apresentações comerciais sem expor dados reais | Tenant `demo` com seed realista; reset automático diário às 4h; marcado visualmente como demonstração | P1 | 5 |

---

## EP2 — GO Intelligence: IA Central e Agentes

**Objetivo:** entregar a camada de IA que orquestra os agentes (Concierge, Gestor, Analista, PO, Dev, Professor), responde em linguagem natural sobre os dados do tenant e gera recomendações acionáveis.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP2-001 | Como Gestor Municipal, quero perguntar em linguagem natural "quantas pessoas visitaram o evento ontem?" e receber resposta com o número e a fonte do dado para decidir sem depender de analista | Resposta em < 8s; cita fonte (módulo e período); responde "não sei" quando não há dado, sem inventar valores | P0 | 8 |
| EP2-002 | Como Gestor Municipal, quero que a IA responda somente com dados do meu tenant para garantir que informações de outra prefeitura jamais apareçam | Contexto restrito por `tenant_id` em toda consulta; teste automatizado de vazamento entre tenants no CI | P0 | 8 |
| EP2-003 | Como Analista de Dados, quero ver a consulta gerada (SQL/agregação) por trás de cada resposta da IA para validar a correção do número apresentado | Botão "ver como foi calculado"; consulta exibida com filtros aplicados; cópia em um clique | P0 | 5 |
| EP2-004 | Como Visitante, quero conversar com o agente Concierge no app para perguntar "onde tem show de jazz agora?" e receber sugestões da programação atual | Respostas baseadas na programação oficial; considera horário atual e localização; fallback educado quando não há resultado | P0 | 8 |
| EP2-005 | Como Visitante, quero que o Concierge responda em português, inglês e espanhol conforme o idioma do meu dispositivo para atender turistas estrangeiros | Detecção automática do idioma; troca manual disponível; qualidade validada por revisores nativos nas 3 línguas | P1 | 5 |
| EP2-006 | Como Organizador do Evento, quero que o agente Gestor me alerte proativamente quando a fila de um portão exceder padrão histórico para agir antes de reclamações | Alerta com portão, horário e comparação histórica; canal push e e-mail; limiar configurável | P1 | 8 |
| EP2-007 | Como Analista de Dados, quero pedir ao agente Analista "compare o NPS desta edição com a anterior por faixa etária" e receber tabela e gráfico para acelerar análises recorrentes | Comparação correta entre edições; gráfico exportável PNG; nota metodológica sobre bases pequenas (n < 30) | P1 | 8 |
| EP2-008 | Como Gestor Municipal, quero receber do agente Gestor 3 recomendações priorizadas por impacto após cada dia de evento para orientar o comitê da manhã seguinte | Recomendações vinculadas a dados citados; classificação de impacto alto/médio/baixo; feedback 👍/👎 registrado | P1 | 8 |
| EP2-009 | Como Administrador do Tenant, quero configurar tom de voz do Concierge (formal/informal) e nome exibido para alinhar a IA à comunicação da cidade | Configuração por tenant; preview de resposta; mudanças aplicadas sem deploy | P2 | 3 |
| EP2-010 | Como Administrador da Plataforma, quero registrar todas as conversas com agentes (prompt, resposta, custo em tokens) para auditoria e controle de custos | Log completo com `trace_id`; custo por tenant/dia visível; retenção configurável; dados pessoais mascarados no log | P0 | 5 |
| EP2-011 | Como Gestor Municipal, quero que a IA gere um resumo executivo semanal em PDF com principais indicadores e fatos relevantes para enviar ao gabinete | PDF gerado toda segunda 7h; seções fixas (público, receita, satisfação, alertas); linguagem executiva sem jargão | P1 | 8 |
| EP2-012 | Como Desenvolvedor Integrador, quero acessar o agente Dev que conhece a documentação das APIs da plataforma para tirar dúvidas de integração sem abrir ticket | Respostas citam endpoint e versão da doc; exemplos de código em Python e TypeScript; taxa de resolução medida | P2 | 8 |
| EP2-013 | Como Organizador do Evento, quero ditar por voz uma pergunta ao agente Gestor pelo celular durante a operação para consultar dados com as mãos ocupadas | Transcrição pt-BR com ruído de evento; confirmação do texto antes de enviar; resposta também em áudio opcional | P2 | 8 |
| EP2-014 | Como Administrador do Tenant, quero definir limites mensais de uso de IA por papel para controlar custos de tokens | Limite por papel em mensagens/mês; aviso em 80%; bloqueio suave com mensagem clara ao atingir 100% | P1 | 5 |
| EP2-015 | Como Analista de Dados, quero que a IA detecte anomalias diárias (queda de vendas, pico de reclamações) e explique a provável causa para investigar mais rápido | Detecção por desvio > 2σ da média móvel; explicação correlaciona eventos do dia (chuva, show, incidente); máx. 5 alertas/dia | P1 | 8 |
| EP2-016 | Como Gestor Municipal, quero avaliar cada resposta da IA com 👍/👎 e comentário para que o sistema melhore com o uso | Feedback vinculado à conversa; painel de qualidade com taxa de aprovação; revisão quinzenal das piores respostas | P0 | 3 |
| EP2-017 | Como Administrador da Plataforma, quero um mecanismo de fallback entre provedores de LLM para manter os agentes disponíveis se o provedor principal falhar | Failover automático em < 30s; ordem de fallback configurável; incidente registrado com provedor e duração | P1 | 8 |
| EP2-018 | Como Organizador do Evento, quero que o Concierge encaminhe automaticamente ao suporte humano quando o visitante relatar emergência ou reclamação grave para não deixar casos críticos com a IA | Classificador de intenção crítica; handoff com histórico completo; SLA de resposta humana exibido ao visitante | P0 | 5 |
| EP2-019 | Como Analista de Dados, quero fazer perguntas encadeadas mantendo contexto ("e no fim de semana?", "abra por bairro") para explorar dados como numa conversa | Contexto mantido por 20 turnos; botão "nova análise" limpa contexto; referências ambíguas pedem esclarecimento | P1 | 5 |
| EP2-020 | Como Gestor Municipal, quero que o agente PO transforme uma ideia ditada ("quero um passaporte digital de atrativos") em rascunho de escopo com objetivos e riscos para acelerar novas iniciativas | Rascunho com problema, público, MVP e riscos; editável antes de salvar; salvo como documento no workspace | P2 | 8 |
| EP2-021 | Como Administrador do Tenant, quero ativar/desativar agentes individualmente por módulo contratado para que usuários não vejam agentes de módulos não contratados | Toggle por agente; agentes ocultos não aparecem na UI nem respondem via API; refletido em < 5 min | P0 | 3 |
| EP2-022 | Como Visitante, quero que o Concierge me sugira um roteiro personalizado de 4 horas com base nos meus favoritos e localização para aproveitar melhor o evento | Roteiro considera distância a pé, horários e favoritos; recalcula se atração lotar; salvável como plano | P1 | 8 |
| EP2-023 | Como Administrador da Plataforma, quero testes de regressão de prompts (golden set de 100 perguntas) executados a cada mudança de modelo para evitar degradação silenciosa de qualidade | Suite roda no CI; score mínimo 90% para deploy; relatório de diffs de respostas | P1 | 8 |
| EP2-024 | Como Gestor Municipal, quero perguntar sobre séries históricas ("evolução do público nas últimas 5 edições") e receber gráfico de tendência para embasar planejamento plurianual | Gráfico de linha com as edições disponíveis; aviso quando há mudança metodológica entre edições | P1 | 5 |
| EP2-025 | Como Administrador do Tenant, quero uma lista de bloqueio de temas (ex.: política partidária) que os agentes devem recusar educadamente para proteger a imagem institucional | Temas configuráveis; recusa padrão educada; tentativas registradas para revisão | P0 | 5 |
| EP2-026 | Como Analista de Dados, quero exportar qualquer resposta da IA (tabela + interpretação) para o relatório em edição para não redigitar resultados | Botão "enviar para relatório"; formatação preservada; rastreio da origem (conversa e data) no relatório | P2 | 5 |
| EP2-027 | Como Organizador do Evento, quero simular cenários com a IA ("e se chover sábado, qual o impacto na praça de alimentação?") baseados em dados históricos para preparar planos de contingência | Simulação usa correlações históricas do tenant; apresenta intervalo (pessimista/otimista); disclaimer de estimativa | P2 | 13 |
| EP2-028 | Como Administrador da Plataforma, quero cache semântico de respostas frequentes do Concierge para reduzir custo e latência em perguntas repetidas ("que horas abre?") | Cache com similaridade configurável; invalidação quando programação muda; hit rate monitorado | P1 | 8 |

---

## EP3 — Dashboard do Gestor e Briefing Diário

**Objetivo:** dar ao gestor municipal e ao organizador uma visão única e diária da operação, com briefing gerado pela IA e indicadores em tempo quase real.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP3-001 | Como Gestor Municipal, quero abrir o dashboard e ver em até 3 segundos os 6 KPIs do dia (público, receita Go Pay, NPS parcial, incidentes, ocupação hoteleira, alertas) para começar o dia informado | Carregamento < 3s (p95); dados com timestamp de atualização; estado vazio explicativo quando módulo não contratado | P0 | 8 |
| EP3-002 | Como Gestor Municipal, quero receber às 7h um briefing diário gerado pela IA com o resumo de ontem e a agenda de hoje para preparar a reunião matinal | Briefing com 5 seções fixas; enviado por e-mail e exibido no dashboard; geração tolerante a dado faltante (indica lacuna) | P0 | 8 |
| EP3-003 | Como Organizador do Evento, quero filtrar todo o dashboard por evento e por dia para analisar cada edição separadamente | Filtro global persistente na sessão; todos os widgets respeitam o filtro; URL compartilhável com filtro aplicado | P0 | 5 |
| EP3-004 | Como Gestor Municipal, quero comparar o dia atual com o dia equivalente da edição anterior para saber se estamos acima ou abaixo do esperado | Comparativo percentual por KPI; tratamento de dias sem equivalente; seta e cor indicando direção | P1 | 5 |
| EP3-005 | Como Organizador do Evento, quero um painel de incidentes abertos (segurança, saúde, infraestrutura) com status e responsável para acompanhar a resolução em tempo real | Lista com severidade, tempo aberto e responsável; atualização a cada 60s; drill-down para detalhe do incidente | P0 | 5 |
| EP3-006 | Como Gestor Municipal, quero configurar quais widgets aparecem no meu dashboard e em que ordem para priorizar o que me interessa | Drag-and-drop de widgets; layout salvo por usuário; botão de restaurar padrão | P1 | 5 |
| EP3-007 | Como Gestor Municipal, quero acessar o dashboard pelo celular com layout adaptado para acompanhar o evento de qualquer lugar | Layout responsivo mobile-first; KPIs empilhados; gráficos legíveis em tela de 360px | P0 | 5 |
| EP3-008 | Como Organizador do Evento, quero ver a curva de entrada de público por hora em cada portão para dimensionar equipes de credenciamento | Gráfico por portão com atualização de 5 min; pico do dia destacado; export CSV | P0 | 5 |
| EP3-009 | Como Gestor Municipal, quero receber notificação push quando um KPI crítico sair da faixa configurada (ex.: incidentes > 10/h) para agir imediatamente | Limiares configuráveis por KPI; push e e-mail; supressão de alertas duplicados em janela de 30 min | P1 | 5 |
| EP3-010 | Como Administrador do Tenant, quero criar dashboards distintos por papel (gabinete vê visão executiva, operação vê visão tática) para cada público ver o que precisa | Templates de dashboard por papel; atribuição automática no primeiro login; edição restrita ao admin | P1 | 5 |
| EP3-011 | Como Gestor Municipal, quero um modo TV (tela cheia, rotação automática de painéis) para exibir o dashboard no telão do centro de operações | Rotação configurável 15–120s; fonte ampliada; auto-refresh sem expirar sessão | P1 | 3 |
| EP3-012 | Como Organizador do Evento, quero registrar anotações do dia (ex.: "chuva forte 16h–18h") vinculadas à data para contextualizar os números no futuro | Anotação com autor e hora; ícone no gráfico nos dias anotados; visível nas análises comparativas | P1 | 3 |
| EP3-013 | Como Gestor Municipal, quero exportar o briefing diário em PDF com identidade visual da prefeitura para distribuir ao secretariado | PDF com logo do tenant; geração < 15s; histórico de briefings acessível por 2 anos | P1 | 3 |
| EP3-014 | Como Analista de Dados, quero ver a definição de cálculo de cada KPI ao passar o mouse (tooltip metodológico) para evitar interpretações erradas | Tooltip com fórmula, fonte e periodicidade; link para documentação completa; conteúdo versionado | P0 | 2 |
| EP3-015 | Como Organizador do Evento, quero um contador de público presente estimado (entradas menos saídas) para monitorar lotação contra a capacidade licenciada | Cálculo em tempo quase real; alerta em 90% da capacidade; margem de erro exibida | P0 | 5 |
| EP3-016 | Como Gestor Municipal, quero ver no dashboard a previsão do tempo das próximas 48h integrada para antecipar impactos operacionais | Fonte meteorológica integrada; atualização 3x/dia; alerta destacado para chuva forte e vento | P1 | 3 |
| EP3-017 | Como Organizador do Evento, quero acompanhar em um funil as vendas de ingressos/credenciamentos por canal para ajustar campanhas durante a venda | Funil por canal (site, app, bilheteria física); conversão por etapa; atualização horária | P1 | 5 |
| EP3-018 | Como Gestor Municipal, quero acessar um histórico navegável de briefings anteriores com busca por palavra-chave para relembrar decisões e fatos de edições passadas | Busca full-text; filtro por período; briefings imutáveis após publicados | P2 | 3 |

---

## EP4 — Go Survey: Pesquisas e Coleta em Campo

**Objetivo:** permitir a criação, coleta (online e offline) e análise de pesquisas de satisfação, percepção e perfil de público, com rigor metodológico e operação de campo em parceria com a Foccus Pesquisas.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP4-001 | Como Analista de Dados, quero criar questionários com blocos e tipos de questão (única, múltipla, escala 0–10, NPS, matriz, aberta, data, numérica) para cobrir os formatos usados pela Foccus | 8 tipos de questão; reordenação drag-and-drop; pré-visualização idêntica ao app de coleta | P0 | 8 |
| EP4-002 | Como Analista de Dados, quero definir lógica de pulo condicional (ex.: se "não visitou", pular bloco de avaliação) para reduzir tempo de entrevista e erros | Regras por resposta ou combinação; validador detecta loops e questões inalcançáveis; teste de fluxo simulado | P0 | 8 |
| EP4-003 | Como Pesquisador de Campo, quero que respostas coletadas sem internet sejam salvas localmente com fila de sincronização para não perder entrevistas em áreas sem sinal | Armazenamento local criptografado; fila com retry exponencial; indicador visual de pendências; zero perda em teste de 72h offline | P0 | 13 |
| EP4-004 | Como Pesquisador de Campo, quero baixar o questionário e as quotas no início do dia para trabalhar o expediente inteiro sem depender de rede | Download completo em < 30s em 4G; versão do questionário exibida; aviso se houver versão mais nova ao sincronizar | P0 | 5 |
| EP4-005 | Como Analista de Dados, quero configurar quotas por sexo, faixa etária e região para garantir amostra representativa conforme o plano amostral | Quotas por cruzamento de variáveis; contador em tempo real (considerando offline pendente); bloqueio de entrevista quando quota cheia | P0 | 8 |
| EP4-006 | Como Pesquisador de Campo, quero ver quanto falta de cada quota no meu ponto de coleta para abordar os perfis certos | Painel de quotas do entrevistador; atualização ao sincronizar; distinção entre quota própria e da equipe | P0 | 5 |
| EP4-007 | Como Analista de Dados, quero capturar coordenadas GPS e horário de cada entrevista automaticamente para validar que a coleta ocorreu no local designado | Captura com consentimento no termo; precisão registrada; entrevistas fora do raio sinalizadas para supervisão | P0 | 5 |
| EP4-008 | Como Organizador do Evento, quero disparar pesquisas pós-evento por link (WhatsApp, e-mail, QR) para complementar a coleta presencial | Link único por canal para medir origem; limite de 1 resposta por dispositivo; página responsiva sem login | P0 | 5 |
| EP4-009 | Como Analista de Dados, quero acompanhar em tempo real o número de entrevistas por pesquisador, ponto e horário para gerenciar a produtividade do campo | Painel com meta vs. realizado; entrevistas offline aparecem como "pendentes de sincronização"; export CSV | P0 | 5 |
| EP4-010 | Como Analista de Dados, quero validação automática de qualidade (duração mínima, respostas em linha reta, duplicidade por GPS+horário) para identificar entrevistas suspeitas | Regras configuráveis; entrevistas suspeitas vão para fila de revisão, não são descartadas automaticamente; motivo da suspeita exibido | P0 | 8 |
| EP4-011 | Como Pesquisador de Campo, quero gravar trecho de áudio da entrevista (com consentimento registrado) para permitir verificação da supervisão | Gravação de trecho aleatório configurável; consentimento explícito na abertura; áudio criptografado e expurgado após 90 dias | P1 | 8 |
| EP4-012 | Como Analista de Dados, quero aplicar ponderação pós-estratificação por sexo, idade e escolaridade para corrigir desvios da amostra realizada | Pesos calculados contra população de referência informada; peso truncado configurável; relatório de eficiência amostral | P1 | 8 |
| EP4-013 | Como Analista de Dados, quero tabular resultados com cruzamentos (banner) e teste de significância entre colunas para produzir as tabelas padrão da Foccus | Banner com até 12 quebras; teste z com nível 95%; letras de significância nas colunas; export XLSX | P1 | 13 |
| EP4-014 | Como Gestor Municipal, quero ver os resultados da pesquisa em dashboard com gráficos simples e margem de erro visível para interpretar sem apoio técnico | Margem de erro e n exibidos em todo gráfico; leitura automática em 1 frase por gráfico; sem jargão estatístico | P0 | 5 |
| EP4-015 | Como Analista de Dados, quero que respostas abertas sejam categorizadas automaticamente pela IA com revisão humana para acelerar a análise qualitativa | Sugestão de categorias com % de confiança; revisão em lote; dicionário de categorias reaproveitável entre ondas | P1 | 8 |
| EP4-016 | Como Pesquisador de Campo, quero fazer login no app de coleta com PIN de 6 dígitos após o primeiro acesso para entrar rápido no campo sem digitar senha | PIN local com bloqueio após 5 erros; sessão expira em 12h; troca de dispositivo exige senha completa | P0 | 3 |
| EP4-017 | Como Analista de Dados, quero versionar questionários e impedir edição após o início da coleta para preservar a comparabilidade dos dados | Publicação congela versão; alterações criam nova versão com migração explícita; log de mudanças entre versões | P0 | 5 |
| EP4-018 | Como Administrador do Tenant, quero cadastrar equipes de campo com supervisor responsável e pontos de coleta georreferenciados para organizar a operação | Hierarquia supervisor-entrevistadores; pontos no mapa com raio de atuação; reatribuição sem perda de dados | P0 | 5 |
| EP4-019 | Como Pesquisador de Campo, quero um modo de treino com respostas descartáveis para praticar o questionário antes do campo valer | Respostas de treino marcadas e excluídas da base; modo visualmente distinto (banner colorido) | P1 | 3 |
| EP4-020 | Como Analista de Dados, quero exportar microdados anonimizados em CSV e SAV (SPSS) com dicionário de variáveis para análises externas | Export com labels e valores; dicionário PDF gerado automaticamente; dados pessoais removidos por padrão | P1 | 5 |
| EP4-021 | Como Gestor Municipal, quero comparar resultados entre ondas da mesma pesquisa (tracking) com gráfico de evolução para acompanhar tendências de percepção | Séries por onda com margem de erro; alerta de mudança metodológica; quebra por segmento | P1 | 5 |
| EP4-022 | Como Analista de Dados, quero sortear entrevistas para verificação telefônica (call-back) e registrar o resultado da checagem para cumprir o protocolo de qualidade da Foccus | Sorteio aleatório configurável (ex.: 20%); formulário de verificação; taxa de confirmação no relatório de qualidade | P1 | 5 |
| EP4-023 | Como Pesquisador de Campo, quero que o app funcione em aparelhos Android de entrada (2GB RAM, Android 10) para usar a frota existente de tablets | App < 60MB; funcional em 2GB RAM sem crash; testes em 3 aparelhos de referência de baixo custo | P0 | 8 |
| EP4-024 | Como Analista de Dados, quero clonar uma pesquisa anterior com questionário e configurações para lançar novas ondas em minutos | Clone completo (questões, quotas, lógicas); vínculo com pesquisa-mãe para tracking; ajustes antes de publicar | P1 | 3 |
| EP4-025 | Como Visitante, quero responder pesquisas rápidas de 3 perguntas no app do evento e ganhar um benefício (ex.: cupom Go Commerce) para ser recompensado pela opinião | Pesquisa in-app em < 60s; recompensa creditada automaticamente; limite de 1 resposta por pesquisa por conta | P1 | 5 |
| EP4-026 | Como Analista de Dados, quero definir o termo de consentimento LGPD exibido antes de cada entrevista com registro do aceite para conformidade legal | Texto configurável por pesquisa; aceite com timestamp vinculado à entrevista; recusa encerra sem coletar dados | P0 | 3 |
| EP4-027 | Como Administrador do Tenant, quero pausar uma pesquisa imediatamente em todos os dispositivos para reagir a erro grave no questionário | Pausa propagada online imediatamente e offline na próxima sincronização; entrevistas em andamento concluídas; motivo registrado | P1 | 3 |
| EP4-028 | Como Analista de Dados, quero um relatório automático de campo diário (produção, recusas, quotas, ocorrências) enviado ao supervisor para ajustar a operação do dia seguinte | E-mail às 20h; taxa de recusa por ponto; ocorrências registradas pelos entrevistadores | P1 | 5 |
| EP4-029 | Como Pesquisador de Campo, quero registrar recusas com motivo e perfil estimado para que a análise considere o viés de não-resposta | Registro em 3 toques; motivos padronizados; recusas entram no relatório de campo | P1 | 3 |
| EP4-030 | Como Analista de Dados, quero calcular e exibir a margem de erro e o intervalo de confiança do resultado geral e por segmento para reportar com rigor técnico | Cálculo considera desenho amostral e ponderação; aviso para segmentos com n < 30; texto metodológico padrão gerado | P0 | 5 |
| EP4-031 | Como Gestor Municipal, quero receber um sumário executivo da pesquisa gerado pela IA (5 destaques + 3 recomendações) revisável pelo analista antes do envio para agilizar a entrega | Rascunho gerado em < 60s; fluxo de revisão e aprovação do analista; marca "revisado por humano" no documento final | P1 | 5 |
| EP4-032 | Como Administrador do Tenant, quero perfis de acesso separados entre Foccus (metodologia e microdados) e prefeitura (resultados agregados) para proteger sigilo metodológico e dados brutos | Papéis distintos por pesquisa; prefeitura não acessa microdados por padrão; concessão explícita auditada | P0 | 5 |

---

## EP5 — Go Event: App do Visitante

**Objetivo:** evoluir a demo existente para o app oficial do visitante, com programação, mapa, favoritos, QR, emergência e experiência offline-first durante o evento.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP5-001 | Como Visitante, quero ver a programação completa por dia, palco e categoria com busca por nome de atração para planejar minha visita | Filtros combináveis; busca com tolerância a acento e erro de digitação; carregamento < 2s | P0 | 5 |
| EP5-002 | Como Visitante, quero favoritar atrações e receber lembrete push 15 minutos antes do início para não perder o que me interessa | Favorito sincronizado entre dispositivos logados; lembrete configurável (5/15/30 min); cancelável por item | P0 | 5 |
| EP5-003 | Como Visitante, quero ser avisado por push quando uma atração favoritada mudar de horário ou for cancelada para reorganizar meu roteiro | Notificação em até 2 min após alteração; destaque visual da mudança na programação; histórico de alterações | P0 | 5 |
| EP5-004 | Como Visitante, quero que programação e mapa funcionem offline após o primeiro acesso para usar o app mesmo com rede congestionada no evento | Cache local completo; banner "modo offline" com data da última atualização; sincronização automática ao voltar sinal | P0 | 8 |
| EP5-005 | Como Visitante, quero ver o mapa do evento com minha posição e os pontos de interesse (palcos, banheiros, água, saúde, saídas) para me localizar facilmente | Geolocalização com precisão exibida; camadas de POI ligáveis; funciona em modo retrato e paisagem | P0 | 8 |
| EP5-006 | Como Visitante, quero traçar rota a pé da minha posição até uma atração dentro do evento para chegar sem me perder | Rota respeita caminhos internos e bloqueios; tempo estimado a pé; recalcula ao desviar | P1 | 8 |
| EP5-007 | Como Visitante, quero um botão de emergência que mostre telefones úteis, minha localização atual e o posto de saúde mais próximo para agir rápido em incidentes | Acesso em 2 toques de qualquer tela; funciona offline com últimos dados; liga direto para o número escolhido | P0 | 5 |
| EP5-008 | Como Organizador do Evento, quero enviar comunicados de emergência georreferenciados (ex.: evacuação do setor norte) para alertar apenas quem está na área afetada | Segmentação por polígono no mapa; entrega push em < 60s; sobrepõe modo silencioso quando permitido pelo SO | P0 | 8 |
| EP5-009 | Como Visitante, quero apresentar meu ingresso como QR code no app com validação visual dinâmica para entrar sem imprimir nada | QR renovado periodicamente contra print; modo brilho máximo automático; acessível offline | P0 | 5 |
| EP5-010 | Como Organizador do Evento, quero validar ingressos por leitura de QR em modo online e offline nos portões para operar mesmo com rede instável | Leitura < 1s; lista de revogados sincronizada; detecção de QR já utilizado com alerta sonoro | P0 | 8 |
| EP5-011 | Como Visitante, quero escanear QR codes espalhados no evento (totens, obras, atrativos) para abrir conteúdo contextual (áudio-guia, história, promoções) | Scanner nativo no app; conteúdo carrega < 2s; métricas de leitura por totem para o organizador | P1 | 5 |
| EP5-012 | Como Visitante, quero montar "meu roteiro" arrastando favoritos para uma linha do tempo pessoal para organizar meu dia no evento | Detecção de conflito de horário; compartilhamento do roteiro por link; sugestão de encaixe pela IA | P1 | 5 |
| EP5-013 | Como Visitante, quero avaliar cada atração com estrelas e comentário logo após o término para registrar minha experiência | Prompt de avaliação 10 min após o fim; avaliação editável por 24h; moderação automática de linguagem ofensiva | P1 | 5 |
| EP5-014 | Como Organizador do Evento, quero publicar avisos gerais no feed do app (achados e perdidos, mudanças, dicas) para comunicar com todos os presentes | Editor com imagem e link; agendamento de publicação; fixar até 3 avisos no topo | P0 | 3 |
| EP5-015 | Como Visitante, quero ver tempo de fila estimado nas principais atrações e portões para decidir para onde ir agora | Estimativa atualizada a cada 5 min; semáforo verde/amarelo/vermelho; fonte da estimativa exibida | P1 | 8 |
| EP5-016 | Como Visitante com deficiência visual, quero que o app seja totalmente navegável por leitor de tela (TalkBack/VoiceOver) para usar todos os recursos com autonomia | 100% dos fluxos principais auditados; labels semânticos; contraste AA no mínimo | P0 | 8 |
| EP5-017 | Como Visitante, quero alternar o idioma do app entre português, inglês e espanhol para usá-lo como turista estrangeiro | Troca sem reiniciar; conteúdo editorial traduzido; fallback pt-BR quando tradução faltar (sinalizado) | P1 | 5 |
| EP5-018 | Como Visitante, quero cadastrar crianças sob minha responsabilidade com pulseira QR vinculada para acionar reencontro rápido caso se percam | Vínculo pulseira-responsável; fluxo "criança encontrada" para staff; dados da criança visíveis só para staff autorizado | P1 | 8 |
| EP5-019 | Como Organizador do Evento, quero gerenciar a programação (criar, editar, cancelar atrações) em painel web com publicação imediata no app para manter a informação sempre correta | Edição com preview; publicação < 2 min para todos os apps; trilha de alterações com autor | P0 | 5 |
| EP5-020 | Como Visitante, quero encontrar estacionamentos oficiais com vagas disponíveis e salvar onde estacionei para sair do evento sem estresse | Ocupação atualizada; pin manual "meu carro"; rota de volta ao carro | P2 | 5 |
| EP5-021 | Como Visitante, quero um passaporte digital que carimba (via QR/geofence) os pontos que visitei para ganhar recompensas por completar circuitos | Carimbo antifraude por localização; recompensa via Go Commerce; ranking opcional | P2 | 8 |
| EP5-022 | Como Organizador do Evento, quero ver métricas de uso do app (downloads, DAU, telas mais vistas, taxa de push aberto) para melhorar a comunicação com o público | Painel diário; funil de onboarding; opt-in de push segmentado por interesse | P1 | 5 |
| EP5-023 | Como Visitante, quero informar restrições alimentares e ver quais operações da praça de alimentação atendem (vegano, sem glúten, kosher) para escolher onde comer | Filtro por restrição; dados declarados pelo estabelecimento com selo "verificado"; busca por prato | P2 | 5 |
| EP5-024 | Como Visitante, quero achados e perdidos digital: registrar item perdido com foto e ser notificado quando algo compatível for encontrado para recuperar meus pertences | Matching por categoria e descrição; notificação push; fluxo de retirada com código de conferência | P2 | 5 |
| EP5-025 | Como Organizador do Evento, quero configurar o app de um novo evento a partir de template (cores, mapa, categorias) em menos de 1 dia para escalar para vários eventos por ano | Wizard de setup; clonagem de evento anterior; checklist de publicação | P1 | 8 |
| EP5-026 | Como Visitante, quero receber ao fim de cada dia um resumo "seu dia no evento" (atrações vistas, km andados, gasto Go Pay) para reviver e compartilhar a experiência | Card compartilhável em redes sociais; geração opt-in; dados apenas do próprio usuário | P2 | 5 |
| EP5-027 | Como Organizador do Evento, quero um modo credenciamento para staff e imprensa com QR diferenciado e zonas de acesso para controlar circulação em áreas restritas | Tipos de credencial com zonas; leitura indica permitido/negado por zona; relatório de acessos por zona | P1 | 8 |
| EP5-028 | Como Visitante, quero entrar na fila virtual de uma atração e ser chamado por push quando chegar minha vez para aproveitar o evento em vez de esperar em pé | Posição na fila em tempo real; tolerância de 10 min após chamada; no-show libera próximo da fila | P2 | 8 |

---

## EP6 — Go Pay: Carteira Cashless e Financeiro

**Objetivo:** operar pagamentos cashless de ponta a ponta (recarga Pix, pagamento QR, conciliação e repasse), com painel financeiro e controle total da gestão municipal sobre taxas e fluxo do dinheiro.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP6-001 | Como Visitante, quero criar minha carteira digital no app com verificação de CPF para pagar compras no evento sem dinheiro físico | Ativação < 1 min; validação de CPF; 1 carteira por CPF por tenant; termos de uso aceitos e registrados | P0 | 8 |
| EP6-002 | Como Visitante, quero recarregar a carteira via Pix com QR dinâmico e ver o saldo creditado em segundos para não pegar fila de recarga | Crédito em < 10s após confirmação do PSP; comprovante no app; valores mínimo/máximo configuráveis pelo tenant | P0 | 8 |
| EP6-003 | Como Visitante, quero pagar em qualquer ponto de venda aproximando ou lendo QR code com confirmação em uma tela para uma compra rápida e segura | Fluxo de pagamento < 5s; confirmação com valor e estabelecimento; recibo salvo no histórico | P0 | 8 |
| EP6-004 | Como Operador de Caixa/Recarga, quero um app PDV para cobrar informando valor e itens com geração de QR de cobrança para atender rápido no balcão | Cobrança em 3 toques; modo treinamento; cancelamento exige senha de supervisor | P0 | 8 |
| EP6-005 | Como Operador de Caixa/Recarga, quero registrar recargas em dinheiro no ponto físico com emissão de comprovante para atender quem não usa Pix | Registro vinculado ao operador e caixa; comprovante impresso ou por SMS; sangria e fechamento de caixa | P0 | 5 |
| EP6-006 | Como Visitante, quero ver o histórico completo de recargas e gastos com filtro por dia para controlar quanto gastei no evento | Lista com estabelecimento, valor e horário; saldo após cada transação; export PDF | P0 | 3 |
| EP6-007 | Como Visitante, quero solicitar o reembolso do saldo restante após o evento via Pix para não perder dinheiro não gasto | Janela de reembolso configurável; devolução para chave Pix do mesmo CPF; status acompanhável; prazo exibido | P0 | 8 |
| EP6-008 | Como Gestor Municipal, quero definir as taxas da operação (conveniência, MDR dos lojistas, taxa de reembolso) por evento para manter controle total da política financeira | Configuração por evento com vigência; simulador de receita; alterações auditadas e sem efeito retroativo | P0 | 5 |
| EP6-009 | Como Gestor Municipal, quero um painel financeiro com volume transacionado, ticket médio, receita de taxas e saldo em circulação em tempo real para acompanhar a saúde financeira do evento | Atualização < 1 min; quebra por dia, setor e estabelecimento; export XLSX | P0 | 8 |
| EP6-010 | Como Comerciante Local, quero acompanhar minhas vendas do dia em tempo real pelo celular para conferir o movimento sem esperar o fechamento | Painel do lojista com total, quantidade e ticket médio; atualização < 1 min; acesso restrito ao próprio CNPJ | P0 | 5 |
| EP6-011 | Como Analista de Dados, quero a conciliação automática diária entre transações da plataforma, extrato do PSP e vendas por estabelecimento para fechar o caixa sem planilhas manuais | Conciliação D+1 às 6h; divergências listadas com severidade; resolução com justificativa auditada | P0 | 13 |
| EP6-012 | Como Gestor Municipal, quero agendar repasses aos lojistas (D+1, D+7 ou data fixa) com desconto automático do MDR para cumprir o combinado com o comércio | Agenda por contrato; arquivo de pagamento gerado; comprovante de repasse por lojista | P0 | 8 |
| EP6-013 | Como Operador de Caixa/Recarga, quero que o PDV aceite pagamentos offline com limite de valor e sincronização posterior para não parar vendas em queda de rede | Limite offline configurável (ex.: R$ 50); fila local criptografada; reconciliação automática ao reconectar; risco exibido ao tenant | P1 | 13 |
| EP6-014 | Como Visitante, quero definir um PIN de pagamento exigido acima de valor configurável para me proteger em caso de perda do celular | PIN próprio da carteira; exigido acima do limiar definido pelo usuário; bloqueio após 5 erros com recuperação por identidade | P0 | 5 |
| EP6-015 | Como Visitante, quero bloquear minha carteira imediatamente pelo app ou pela central em caso de perda do aparelho para impedir uso indevido do saldo | Bloqueio < 30s; saldo preservado; desbloqueio com verificação de identidade; transferência para novo dispositivo | P0 | 5 |
| EP6-016 | Como Administrador da Plataforma, quero um motor antifraude com regras (velocidade de transações, valores atípicos, mesmo dispositivo em múltiplas contas) para reduzir perdas por fraude | Regras configuráveis com score; transação suspeita retida para revisão; falsos positivos monitorados | P1 | 13 |
| EP6-017 | Como Comerciante Local, quero cadastrar meu cardápio/itens com preço no PDV para registrar vendas por item e ver relatório do que mais vende | Catálogo por estabelecimento; venda por item opcional; relatório de mix de produtos | P1 | 5 |
| EP6-018 | Como Gestor Municipal, quero emitir cartões/pulseiras NFC pré-pagas para público sem smartphone para não excluir ninguém do cashless | Pulseira vinculada a CPF opcional; recarga e saldo consultáveis em totens; perda tratada com bloqueio e transferência | P1 | 13 |
| EP6-019 | Como Operador de Caixa/Recarga, quero abrir e fechar meu turno de caixa com conferência de valores (dinheiro vs. sistema) para prestar contas sem divergências | Abertura com fundo de troco; fechamento com diferença calculada; divergência exige justificativa e aprovação | P0 | 5 |
| EP6-020 | Como Gestor Municipal, quero relatório de arrecadação por setor do evento (praça de alimentação, bar, estacionamento) para avaliar a performance de cada área | Setorização configurável; comparativo entre dias e edições; export para apresentação | P1 | 5 |
| EP6-021 | Como Visitante, quero receber alerta de saldo baixo (abaixo de valor que eu definir) com atalho para recarga para não ser surpreendido na fila | Alerta push configurável; atalho abre recarga Pix com valor sugerido; frequência limitada a 1 por hora | P1 | 3 |
| EP6-022 | Como Administrador do Tenant, quero cadastrar estabelecimentos com dados bancários validados (micro-depósito ou chave Pix verificada) para garantir repasses sem devolução | Validação de titularidade CPF/CNPJ; status do cadastro (pendente/aprovado); reprovação com motivo | P0 | 5 |
| EP6-023 | Como Analista de Dados, quero exportar o razão completo de transações com filtros e paginação para auditorias e obrigações fiscais | Export assíncrono para grandes volumes; hash de integridade do arquivo; acesso restrito e auditado | P0 | 5 |
| EP6-024 | Como Gestor Municipal, quero configurar meia-entrada/subsídios (ex.: crédito social para famílias cadastradas) com regras de uso para políticas públicas no evento | Crédito com validade e categorias permitidas; não reembolsável; relatório de utilização por programa | P2 | 8 |
| EP6-025 | Como Comerciante Local, quero solicitar antecipação de recebíveis com taxa exibida antes da confirmação para ter capital de giro durante o evento | Simulação transparente da taxa; aprovação conforme política do tenant; contrato digital do adiantamento | P2 | 13 |
| EP6-026 | Como Operador de Caixa/Recarga, quero estornar uma transação errada dentro de janela configurável com aprovação do supervisor para corrigir enganos sem tumulto no caixa | Estorno total ou parcial; janela padrão 30 min; motivo obrigatório; devolução imediata ao saldo do visitante | P0 | 5 |
| EP6-027 | Como Gestor Municipal, quero um mapa de calor de gastos sobre a planta do evento para entender onde o dinheiro circula e otimizar a alocação de operações | Heatmap por hora e dia; cruzamento com fluxo de pessoas do Go Maps; export de imagem | P1 | 8 |
| EP6-028 | Como Administrador da Plataforma, quero reconciliar automaticamente webhooks perdidos do PSP (rechecagem ativa de pendências) para nenhuma recarga ficar sem crédito | Job de verificação a cada 5 min para pendências; crédito retroativo com notificação; alerta se pendência > 15 min | P0 | 8 |
| EP6-029 | Como Visitante, quero transferir saldo para outra carteira do meu grupo familiar (ex.: filho adolescente) com limite diário para gerenciar o gasto da família | Vínculo familiar autorizado; limite diário configurável; histórico separado por membro | P2 | 8 |
| EP6-030 | Como Gestor Municipal, quero um relatório de encerramento financeiro do evento (arrecadação, taxas, repasses, reembolsos, saldo residual) assinado digitalmente para prestação de contas oficial | Geração após fechamento; PDF com hash e assinatura digital; números batem com conciliação D+1 | P0 | 8 |
| EP6-031 | Como Administrador da Plataforma, quero monitorar a taxa de sucesso de pagamentos e recargas por minuto com alerta automático para detectar incidentes do PSP antes das reclamações | Alerta quando sucesso < 95% em janela de 5 min; dashboard de latência do PSP; runbook vinculado ao alerta | P0 | 5 |
| EP6-032 | Como Comerciante Local, quero receber um extrato semanal por e-mail com vendas, taxas e repasses para minha contabilidade | Envio toda segunda 8h; PDF + CSV; valores conferem com painel | P1 | 3 |

---

## EP7 — Go Analytics: KPIs, NPS e Impacto Econômico

**Objetivo:** consolidar dados de todos os módulos em indicadores confiáveis (NPS, CSAT, impacto econômico) e relatórios formais para gestão, imprensa e órgãos de controle.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP7-001 | Como Analista de Dados, quero um catálogo central de KPIs com fórmula, fonte, dono e periodicidade para padronizar definições em toda a plataforma | Catálogo versionado; KPI só entra em dashboard se catalogado; busca por nome e módulo | P0 | 5 |
| EP7-002 | Como Gestor Municipal, quero acompanhar o NPS do evento em tempo real durante a realização para corrigir problemas ainda com o público presente | NPS parcial com n e margem; quebra por dia e ponto de coleta; meta configurável com farol | P0 | 5 |
| EP7-003 | Como Analista de Dados, quero calcular CSAT e CES por ponto de contato (entrada, alimentação, banheiro, estacionamento) para identificar onde a experiência falha | Escalas padronizadas; ranking de pontos de contato; série histórica por edição | P1 | 5 |
| EP7-004 | Como Gestor Municipal, quero um relatório de impacto econômico (gasto médio do visitante, permanência, origem, ocupação hoteleira, empregos temporários) para justificar o investimento público no evento | Metodologia documentada no anexo; intervalo de confiança nos totais; comparativo com edições anteriores | P0 | 13 |
| EP7-005 | Como Gestor Municipal, quero gerar relatórios formais para órgãos de controle com dados de arrecadação, público e contrapartidas em formato padronizado para prestar contas com agilidade | Template oficial configurável; PDF com numeração de páginas e hash; trilha de quem gerou e enviou | P0 | 8 |
| EP7-006 | Como Analista de Dados, quero construir dashboards customizados arrastando métricas e dimensões do catálogo para responder perguntas novas sem depender de desenvolvedores | Builder drag-and-drop; 6 tipos de gráfico; salvar e compartilhar por papel | P1 | 13 |
| EP7-007 | Como Analista de Dados, quero agendar o envio automático de relatórios por e-mail (diário, semanal, mensal) para grupos de destinatários para manter todos informados sem trabalho manual | Agendamento com fuso correto; lista de distribuição por papel; log de envios com falhas | P1 | 5 |
| EP7-008 | Como Gestor Municipal, quero ver a origem dos visitantes (cidade/UF, distância percorrida) estimada a partir das pesquisas e dos cadastros para dimensionar o alcance turístico do evento | Mapa de origem; % de fora do município e do estado; fonte e método exibidos | P1 | 5 |
| EP7-009 | Como Analista de Dados, quero cruzar dados de módulos diferentes (ex.: NPS por faixa de gasto no Go Pay) para gerar insights que nenhum módulo isolado entrega | Join por chave anônima consistente; apenas dados agregados (k-anonimato mínimo 10); consultas salvas | P1 | 13 |
| EP7-010 | Como Gestor Municipal, quero metas por KPI (público, NPS, receita) com farol de atingimento para gerenciar o evento por objetivos | Metas por edição; farol verde/amarelo/vermelho; histórico de revisões de meta | P1 | 3 |
| EP7-011 | Como Analista de Dados, quero detectar e sinalizar automaticamente dados faltantes ou atrasados nas cargas (ex.: portão sem leituras há 2h) para garantir a confiabilidade dos indicadores | Monitor de frescor por fonte; alerta ao dono do dado; selo "dado incompleto" nos gráficos afetados | P0 | 5 |
| EP7-012 | Como Gestor Municipal, quero um comparador entre edições do evento com os 10 KPIs principais lado a lado para apresentar a evolução ao conselho da cidade | Tabela comparativa multi-edição; variação % e absoluta; export para slide (PNG/PPTX) | P1 | 5 |
| EP7-013 | Como Analista de Dados, quero acessar os dados via SQL somente-leitura em um endpoint dedicado para análises avançadas com minhas próprias ferramentas | Acesso read-only isolado da produção; limites de tempo e linhas por consulta; credencial individual auditada | P2 | 8 |
| EP7-014 | Como Organizador do Evento, quero o ranking de atrações por público estimado e avaliação média para negociar as próximas contratações com evidências | Ranking com as duas dimensões; filtro por dia e palco; export CSV | P1 | 3 |
| EP7-015 | Como Gestor Municipal, quero um relatório pós-evento completo gerado em até 72h (público, financeiro, satisfação, impacto, recomendações) para a coletiva de imprensa de encerramento | Template executivo com narrativa da IA revisável; gráficos prontos para imprensa; versão resumida de 2 páginas | P0 | 8 |
| EP7-016 | Como Analista de Dados, quero definir a taxonomia de segmentos padrão (faixa etária, origem, perfil de gasto) usada em todos os relatórios para consistência entre análises | Segmentos centralizados; mudança versionada com data de vigência; aplicada retroativamente apenas com aviso | P1 | 5 |
| EP7-017 | Como Gestor Municipal, quero indicadores de turismo contínuos fora do período de eventos (ocupação, fluxo em atrativos, sazonalidade) para gerir o destino o ano todo | Painel mensal; sazonalidade por atrativo; fontes integradas do Go City/Tourism | P2 | 8 |
| EP7-018 | Como Analista de Dados, quero anotar gráficos com comentários visíveis a quem acessa o dashboard para registrar interpretações junto do dado | Comentário ancorado ao ponto/período; menção a usuários com notificação; resolução de threads | P2 | 3 |
| EP7-019 | Como Gestor Municipal, quero receber projeção de público para os próximos dias do evento com base no realizado e no clima para planejar segurança e limpeza | Modelo com intervalo de confiança; acurácia monitorada por edição; premissas exibidas | P1 | 8 |
| EP7-020 | Como Analista de Dados, quero exportar qualquer visualização em PNG, CSV e XLSX com um clique para reutilizar em documentos externos | Export fiel ao visual; CSV com dados subjacentes; marca d'água opcional do tenant | P0 | 3 |
| EP7-021 | Como Administrador do Tenant, quero controlar quem vê dados financeiros vs. dados operacionais nos dashboards para segregar informações sensíveis | Permissão por categoria de KPI; dashboards ocultam widgets sem permissão; teste de acesso automatizado | P0 | 5 |
| EP7-022 | Como Gestor Municipal, quero um índice consolidado de satisfação do evento (composto de NPS, CSAT e avaliações do app) para comunicar um número único à população | Fórmula do índice documentada; componentes visíveis no drill-down; comparável entre edições | P2 | 5 |
| EP7-023 | Como Analista de Dados, quero linhagem de dados (de onde veio cada número até a fonte primária) para responder questionamentos de auditoria com rapidez | Grafo de linhagem por KPI; timestamps de cada transformação; export do rastro em PDF | P1 | 8 |
| EP7-024 | Como Organizador do Evento, quero medir o retorno dos patrocinadores (exposição de marca, leituras de QR, tráfego no estande) para renovar cotas com dados concretos | Relatório por patrocinador; métricas acordadas em contrato; envio direto ao patrocinador com marca do evento | P2 | 5 |
| EP7-025 | Como Analista de Dados, quero um data mart documentado com tabelas fato/dimensão por módulo para conectar Power BI sem engenharia reversa | Modelo estrela documentado; conector direto Power BI; atualização diária com SLA | P1 | 8 |
| EP7-026 | Como Gestor Municipal, quero que valores monetários em relatórios oficiais sejam sempre conciliados com o Go Pay (fonte única) para nunca divulgar números divergentes | Validação automática antes da publicação; divergência bloqueia geração com explicação; log da checagem | P0 | 5 |

---

## EP8 — Go Expo: Gestão de Expositores

**Objetivo:** digitalizar o ciclo do expositor: inscrição, contrato, credenciamento de equipe, operação do estande e avaliação de resultados.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP8-001 | Como Expositor, quero me inscrever online enviando documentos (CNPJ, contrato social, fotos do estande) para participar do evento sem processo em papel | Formulário com upload; checklist de documentos por categoria; status acompanhável | P1 | 5 |
| EP8-002 | Como Organizador do Evento, quero avaliar e aprovar inscrições de expositores com fila de análise e motivos padronizados de recusa para dar transparência ao processo | Fila com SLA visível; recusa notificada com motivo; recurso permitido em prazo configurável | P1 | 5 |
| EP8-003 | Como Expositor, quero escolher meu estande em um mapa interativo com lotes disponíveis e preços para garantir a melhor localização dentro do meu orçamento | Mapa com status em tempo real; reserva temporária de 30 min durante checkout; preço por zona | P1 | 8 |
| EP8-004 | Como Expositor, quero assinar o contrato digitalmente e pagar a cota via Pix ou boleto para confirmar minha participação sem cartório | Assinatura eletrônica válida; baixa automática do pagamento; contrato disponível no portal | P1 | 5 |
| EP8-005 | Como Expositor, quero credenciar minha equipe (nomes e CPFs) com QR individual para que todos acessem a área de montagem e o evento | Limite de credenciais por metragem; substituição de pessoa até véspera; leitura no portão diferenciada por tipo | P1 | 5 |
| EP8-006 | Como Organizador do Evento, quero agendar janelas de montagem e desmontagem por setor para evitar congestionamento de veículos no pátio | Agenda por doca/setor; confirmação do expositor; painel do dia para a equipe de pátio | P1 | 5 |
| EP8-007 | Como Expositor, quero registrar leads escaneando o QR do crachá dos visitantes que autorizarem para fazer follow-up comercial pós-evento | Consentimento explícito do visitante no ato; lead com nome, e-mail e interesse; export CSV ao fim do evento | P1 | 8 |
| EP8-008 | Como Expositor, quero ver um dashboard do meu estande (leads captados, leituras de QR, vendas Go Pay se aplicável) para medir meu retorno no evento | Métricas em tempo real; comparativo com média da categoria (anônima); export PDF | P1 | 5 |
| EP8-009 | Como Organizador do Evento, quero notificar todos os expositores por push/e-mail (ex.: mudança na janela de montagem) para comunicar mudanças operacionais rapidamente | Segmentação por setor e categoria; confirmação de leitura; histórico de comunicados | P1 | 3 |
| EP8-010 | Como Expositor, quero abrir chamados de infraestrutura (energia, limpeza, segurança) pelo portal com acompanhamento de status para resolver problemas do estande rapidamente | Categorias com SLA; foto anexável; avaliação do atendimento ao fechar | P1 | 5 |
| EP8-011 | Como Organizador do Evento, quero um checklist de vistoria de estande (segurança elétrica, extintor, acessibilidade) preenchido no local via app para liberar a operação com conformidade | Checklist digital com foto obrigatória por item; reprovação gera pendência com prazo; liberação assinada digitalmente | P1 | 5 |
| EP8-012 | Como Expositor, quero indicar produtos/serviços que serão vendidos com destaque no app do visitante para atrair público ao meu estande | Vitrine no perfil do expositor; busca de produtos no app; moderação do organizador | P2 | 5 |
| EP8-013 | Como Organizador do Evento, quero relatório de inadimplência de expositores com régua de cobrança automática para reduzir perdas de receita | Régua com e-mail/notificação em D-7, D0, D+3; bloqueio de credenciais configurável; relatório por status | P1 | 5 |
| EP8-014 | Como Expositor, quero responder a pesquisa de satisfação do expositor ao fim do evento para influenciar melhorias na próxima edição | Pesquisa via Go Survey; resultados no relatório pós-evento; comparativo entre edições | P2 | 2 |
| EP8-015 | Como Organizador do Evento, quero o mapa de ocupação comercial (vendido, reservado, disponível) com receita projetada para acompanhar a meta de comercialização | Receita projetada vs. meta; funil de vendas de estandes; atualização em tempo real | P1 | 5 |

---

## EP9 — Go Commerce: Cashback e Fidelidade no Comércio Local

**Objetivo:** conectar o público do evento ao comércio da cidade com cashback, vouchers e fidelidade, prolongando o impacto econômico para além do perímetro do evento.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP9-001 | Como Comerciante Local, quero me cadastrar no programa com CNPJ, endereço e fotos do estabelecimento para aparecer no app aos visitantes do evento | Validação de CNPJ ativo no município; aprovação do gestor; perfil publicado em < 48h | P2 | 5 |
| EP9-002 | Como Gestor Municipal, quero configurar campanhas de cashback (percentual, teto por transação, orçamento total, vigência) para estimular o consumo no comércio de bairro | Orçamento com corte automático ao esgotar; regras por categoria de comércio; simulação de custo antes de ativar | P2 | 8 |
| EP9-003 | Como Visitante, quero receber cashback na minha carteira Go Pay ao pagar em comércios participantes para ser incentivado a explorar a cidade | Crédito em < 1 min após pagamento; extrato identifica campanha; saldo de cashback com validade | P2 | 5 |
| EP9-004 | Como Comerciante Local, quero emitir vouchers promocionais (ex.: 10% no jantar) exibidos no app do evento para atrair o público do evento ao meu restaurante | Criação self-service com aprovação; limite de resgates; QR de resgate validado no caixa | P2 | 5 |
| EP9-005 | Como Visitante, quero descobrir comércios participantes próximos com filtro por categoria e benefício ativo para decidir onde usar meus benefícios | Mapa e lista; ordenação por distância; indicação de benefício vigente | P2 | 5 |
| EP9-006 | Como Gestor Municipal, quero medir o efeito das campanhas (transações incrementais, novos clientes por comércio, custo por real movimentado) para avaliar o retorno do subsídio | Painel por campanha; comparação com período-base; custo por real incremental calculado | P2 | 8 |
| EP9-007 | Como Comerciante Local, quero um programa de pontos simples (a cada R$ X, ganha Y pontos) resgatáveis em produtos para fidelizar clientes além do evento | Regra configurável por loja; resgate no caixa via QR; extrato de pontos do cliente | P2 | 8 |
| EP9-008 | Como Visitante, quero ver em um só lugar meus cashbacks, vouchers e pontos com validade para não perder nenhum benefício | Central de benefícios no app; alerta de expiração D-3; ordenação por validade | P2 | 3 |
| EP9-009 | Como Gestor Municipal, quero limitar campanhas por CPF (ex.: 1 cashback/dia por pessoa) para evitar abuso do orçamento público | Regras antifraude por CPF e dispositivo; tentativas bloqueadas registradas; painel de abusos | P2 | 5 |
| EP9-010 | Como Comerciante Local, quero relatório mensal do programa (clientes trazidos, receita via plataforma, custo de benefícios) para decidir se mantenho minha participação | PDF mensal automático; comparativo com mês anterior; recomendação simples gerada pela IA | P2 | 5 |
| EP9-011 | Como Visitante, quero indicar amigos e ganhar bônus quando o indicado fizer a primeira compra para ampliar minha rede de benefícios | Link de indicação único; bônus creditado após a primeira compra do indicado; teto mensal de bônus | P2 | 5 |
| EP9-012 | Como Gestor Municipal, quero criar circuitos temáticos (rota gastronômica, rota do artesanato) com selo e recompensa por completude para distribuir o fluxo turístico pela cidade | Circuito com check-ins via QR nos estabelecimentos; recompensa ao completar; mapa do circuito no app | P2 | 8 |
| EP9-013 | Como Comerciante Local, quero aceitar pagamento Go Pay na minha loja fora do evento com o mesmo app PDV para aproveitar a base de carteiras ativas | Mesmo PDV do evento; MDR específico de comércio local; repasse na agenda padrão | P2 | 5 |
| EP9-014 | Como Administrador do Tenant, quero aprovar/reprovar vouchers criados pelos comerciantes segundo diretrizes (sem álcool para menores, sem conteúdo enganoso) para proteger a imagem do programa | Fila de moderação com SLA de 24h; motivos padronizados; recurso do comerciante | P2 | 3 |
| EP9-015 | Como Analista de Dados, quero mapear o fluxo evento-comércio (onde o visitante do evento gastou na cidade) de forma agregada para orientar as próximas campanhas | Análise agregada com k-anonimato; mapa de dispersão de gasto; corte por dia e categoria | P2 | 8 |
| EP9-016 | Como Visitante, quero avaliar o comércio após usar um benefício para ajudar outros usuários e dar feedback ao lojista | Avaliação 1–5 com comentário; resposta do lojista; nota média no perfil | P2 | 3 |
| EP9-017 | Como Gestor Municipal, quero um leaderboard de engajamento dos comércios (resgates, avaliações, transações) para reconhecer publicamente os destaques do programa | Ranking mensal; selo digital para o top 10; critérios transparentes | P2 | 3 |
| EP9-018 | Como Comerciante Local, quero ser notificado quando um voucher meu estiver perto de esgotar os resgates para decidir se amplio a oferta | Notificação em 80% do limite; ampliação em 1 clique; histórico de performance do voucher | P2 | 2 |

---

## EP10 — Go City / Go Tourism: Cidade e Turismo

**Objetivo:** estender a plataforma para a gestão contínua do destino: inventário turístico, serviços urbanos, informações ao turista e inteligência de fluxo o ano inteiro.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP10-001 | Como Gestor Municipal, quero cadastrar o inventário turístico (atrativos, horários, ingressos, acessibilidade, fotos) para ter uma fonte oficial única sobre o destino | Ficha padrão por atrativo; campos de acessibilidade obrigatórios; fluxo de revisão anual com lembrete | P2 | 5 |
| EP10-002 | Como Visitante, quero explorar os atrativos da cidade no mesmo app do evento (aba Turismo) para estender minha estadia além do evento | Lista e mapa dos atrativos; aberto/fechado agora; rota até o atrativo | P2 | 5 |
| EP10-003 | Como Gestor Municipal, quero monitorar a ocupação hoteleira informada semanalmente pelos meios de hospedagem cadastrados para acompanhar a demanda turística | Portal de informe para hotéis; taxa de resposta monitorada; dado agregado sem expor hotel individual | P2 | 8 |
| EP10-004 | Como Visitante, quero avaliar atrativos turísticos e ver avaliações de outros visitantes para escolher melhor meus passeios | Avaliação verificada por check-in próximo ao local; moderação automática; nota média com volume | P2 | 5 |
| EP10-005 | Como Gestor Municipal, quero criar rotas turísticas oficiais (histórica, natureza, gastronômica) com narração e pontos georreferenciados para qualificar a experiência autônoma do turista | Editor de rotas com áudio; download offline; conclusões medidas por rota | P2 | 8 |
| EP10-006 | Como Visitante, quero um cartão do turista digital com benefícios em atrativos e transporte para comprar uma vez e usar em toda a cidade | Compra in-app via Go Pay; QR de uso por benefício; controle de utilização por atrativo | P2 | 8 |
| EP10-007 | Como Gestor Municipal, quero relatar à câmara municipal os indicadores anuais de turismo (fluxo, permanência média, gasto, sazonalidade) para embasar políticas e orçamento do setor | Relatório anual padronizado; séries de 5 anos quando disponíveis; metodologia anexa | P2 | 5 |
| EP10-008 | Como Visitante, quero reportar problemas urbanos que encontrei como turista (sinalização, iluminação, limpeza) com foto e localização para contribuir com a cidade | Registro em 3 toques; protocolo gerado; status acompanhável; encaminhamento à secretaria responsável | P2 | 5 |
| EP10-009 | Como Gestor Municipal, quero um painel de eventos da cidade (calendário anual consolidado) com estimativa de público e conflitos de data para coordenar a agenda municipal | Calendário multi-evento; detecção de conflito de datas/locais; visão pública opcional | P2 | 5 |
| EP10-010 | Como Analista de Dados, quero estimar o fluxo turístico mensal combinando dados de telefonia agregada, hotelaria e atrativos para medir a demanda sem censo | Modelo documentado com fontes; intervalo de estimativa; validação anual contra pesquisas | P2 | 13 |
| EP10-011 | Como Visitante, quero receber sugestões do que fazer hoje na cidade conforme clima, dia da semana e meu perfil para decidir rapidamente meu roteiro | Sugestões contextuais do Concierge; considera chuva/sol; feedback melhora recomendações | P2 | 5 |
| EP10-012 | Como Gestor Municipal, quero divulgar alertas oficiais ao turista (interdição de praia, obra na estrada, evento de rua) para reduzir frustrações e riscos | Publicação com vigência e área; push segmentado por localização; expiração automática | P2 | 5 |
| EP10-013 | Como Comerciante Local, quero aparecer nas rotas turísticas próximas ao meu estabelecimento (mediante adesão ao Go Commerce) para captar o fluxo de turistas | Vínculo rota-comércio aprovado pelo gestor; distância máxima da rota; sem poluir a experiência (máx. 3 por trecho) | P2 | 3 |
| EP10-014 | Como Gestor Municipal, quero medir permanência média e gasto médio do turista por perfil (lazer, negócios, eventos) via pesquisas contínuas Go Survey para segmentar a promoção do destino | Pesquisa contínua amostral; painéis por perfil; série histórica trimestral | P2 | 5 |
| EP10-015 | Como Visitante, quero acessar informações práticas da cidade (transporte, táxi/app, farmácias 24h, hospitais, delegacia de turismo) para resolver necessidades durante a viagem | Guia offline; telefones clicáveis; atualização trimestral com responsável definido | P2 | 3 |
| EP10-016 | Como Gestor Municipal, quero comparar meu destino com benchmarks anônimos de cidades similares na plataforma para saber onde estamos acima ou abaixo | Benchmark anonimizado por porte; opt-in do tenant; mínimo 5 cidades por grupo de comparação | P2 | 8 |
| EP10-017 | Como Administrador do Tenant, quero integrar o calendário e atrativos com o site oficial de turismo da cidade via API para publicar uma vez e distribuir em todos os canais | API pública read-only; webhooks de atualização; documentação com exemplos | P2 | 5 |
| EP10-018 | Como Gestor Municipal, quero um simulador de impacto para novos eventos (público estimado, receita, ocupação) baseado no histórico da plataforma para decidir apoios e patrocínios municipais | Modelo com premissas editáveis; cenários otimista/base/pessimista; disclaimer de estimativa | P2 | 8 |

---

## EP11 — Go Vision: Visão Computacional

**Objetivo:** aplicar visão computacional para contagem de público, leitura de placas em acessos e OCR de documentos, com privacidade por padrão.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP11-001 | Como Organizador do Evento, quero contagem automática de pessoas por câmera nos portões com precisão auditada para medir público sem catracas físicas | Erro < 5% validado contra contagem manual; funciona à noite; sem armazenamento de imagens identificáveis | P2 | 13 |
| EP11-002 | Como Organizador do Evento, quero estimativa de densidade de multidão por zona (pessoas/m²) com alerta de superlotação para prevenir incidentes de aglomeração | Alerta em limiar configurável; mapa de densidade atualizado a cada 2 min; log dos alertas para pós-análise | P2 | 13 |
| EP11-003 | Como Gestor Municipal, quero leitura automática de placas (LPR) nos acessos de estacionamento oficiais para medir origem dos veículos por UF/cidade de emplacamento de forma agregada | Placas convertidas em estatística agregada; placa bruta descartada após processamento; acurácia > 95% diurna | P2 | 13 |
| EP11-004 | Como Operador de Caixa/Recarga, quero OCR do documento de identidade no cadastro assistido de carteira para digitar menos e errar menos | Extração de nome, CPF e nascimento; confirmação manual obrigatória; imagem descartada após extração | P2 | 8 |
| EP11-005 | Como Organizador do Evento, quero detectar fluxo direcional (entrando/saindo) nas passagens principais para conhecer os caminhos preferidos do público | Contagem bidirecional; matriz origem-destino por hora; alimenta o Go Maps | P2 | 8 |
| EP11-006 | Como Administrador do Tenant, quero um painel de conformidade do Go Vision (câmeras ativas, tipo de processamento, retenção) para demonstrar que não fazemos identificação facial | Inventário de câmeras e finalidades; atestado de não-identificação; relatório para o encarregado de dados | P2 | 5 |
| EP11-007 | Como Organizador do Evento, quero contagem de público em shows por amostragem de imagens aéreas (drone autorizado) para estimar audiência de palco com metodologia defensável | Metodologia documentada; intervalo de estimativa; comparação com métodos alternativos | P2 | 13 |
| EP11-008 | Como Analista de Dados, quero que os dados do Go Vision entrem no Go Analytics como série temporal padrão para cruzar público com vendas e NPS | Ingestão via pipeline padrão; catálogo de KPI atualizado; latência < 5 min | P2 | 5 |
| EP11-009 | Como Organizador do Evento, quero detectar automaticamente objetos abandonados em áreas críticas com alerta à segurança para acelerar o protocolo de verificação | Detecção com foto do objeto (sem pessoas em destaque); alerta à central em < 30s; taxa de falso positivo monitorada | P2 | 13 |
| EP11-010 | Como Gestor Municipal, quero contagem de fluxo de pedestres em ruas turísticas fora de eventos (sensor fixo) para medir o efeito de intervenções urbanas | Série contínua por ponto; comparação antes/depois de intervenções; dado agregado por hora | P2 | 8 |
| EP11-011 | Como Administrador da Plataforma, quero processar vídeo na borda (edge) enviando apenas metadados numéricos ao servidor para reduzir banda e risco de privacidade | Nenhum frame sai do dispositivo em operação normal; telemetria de saúde do dispositivo; atualização remota de modelo | P2 | 13 |
| EP11-012 | Como Organizador do Evento, quero relatório de acurácia do Go Vision por câmera e condição (dia/noite/chuva) para saber quanto confiar em cada número | Auditorias amostrais mensais; acurácia por contexto; selo de confiabilidade nos dashboards | P2 | 5 |

---

## EP12 — Go Maps: Mapas, Calor e Fluxo

**Objetivo:** ser a camada geoespacial da plataforma: mapas operacionais, heatmaps de presença e análise de fluxo para decisões de layout e segurança.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP12-001 | Como Organizador do Evento, quero desenhar a planta do evento (palcos, estandes, rotas, áreas restritas) sobre o mapa base para ter a referência espacial usada por todos os módulos | Editor de polígonos e pontos; versões da planta por edição; publicação para o app do visitante | P0 | 8 |
| EP12-002 | Como Organizador do Evento, quero um heatmap de presença de público por hora (a partir de conexões wi-fi/app anonimizadas) para ver as zonas quentes e frias do evento | Dados anonimizados e agregados; replay do dia hora a hora; export de imagem | P1 | 13 |
| EP12-003 | Como Gestor Municipal, quero ver o fluxo entre zonas (matriz origem-destino agregada) para redesenhar o layout e reduzir gargalos na próxima edição | Fluxos com espessura proporcional; filtro por dia/horário; mínimo de agregação para privacidade | P1 | 13 |
| EP12-004 | Como Organizador do Evento, quero sobrepor camadas no mapa operacional (incidentes, vendas, densidade, equipes em campo) para comandar a operação com contexto espacial completo | Camadas ligáveis independentes; atualização < 1 min; modo tela cheia para o centro de operações | P1 | 8 |
| EP12-005 | Como Organizador do Evento, quero posicionar e acompanhar equipes de campo (segurança, limpeza, saúde) no mapa via app do staff para despachar o recurso mais próximo de cada ocorrência | Localização apenas em serviço com consentimento; despacho com rota; histórico de atendimento | P1 | 8 |
| EP12-006 | Como Visitante, quero que o mapa do app mostre lotação por área em cores para evitar as zonas mais cheias | Escala de 3 cores; atualização 5 min; legenda educativa | P1 | 5 |
| EP12-007 | Como Organizador do Evento, quero definir cercas virtuais (geofences) que disparam ações (push de boas-vindas, alerta de área restrita) para automatizar interações por localização | Editor de geofence; ações configuráveis; log de disparos; limite anti-spam por usuário | P1 | 8 |
| EP12-008 | Como Analista de Dados, quero exportar dados espaciais agregados (GeoJSON) por período para análises externas em ferramentas GIS | Export GeoJSON com metadados; agregação mínima garantida; documentação do esquema | P2 | 3 |
| EP12-009 | Como Organizador do Evento, quero comparar heatmaps entre dias e edições lado a lado para avaliar mudanças de layout | Visualização lado a lado sincronizada; mesma escala de cor; anotações sobre mudanças de layout | P1 | 5 |
| EP12-010 | Como Gestor Municipal, quero mapa de calor de gasto (Go Pay) sobreposto ao de presença para identificar zonas com público alto e venda baixa | Índice de conversão por zona; ranking de oportunidades; export para o relatório pós-evento | P1 | 8 |
| EP12-011 | Como Organizador do Evento, quero simular rotas de evacuação com capacidade de vazão por saída para dimensionar o plano de emergência aprovado pelos bombeiros | Cálculo de vazão por largura de saída; tempo estimado de evacuação por zona; relatório imprimível para o projeto de segurança | P2 | 13 |
| EP12-012 | Como Administrador do Tenant, quero mapas base offline (tiles auto-hospedados) para o centro de operações funcionar mesmo sem internet externa | Tiles servidos localmente; área do evento pré-baixada; fallback automático | P2 | 8 |
| EP12-013 | Como Organizador do Evento, quero medir tempo médio de deslocamento entre pontos-chave (portão-palco principal) por faixa horária para informar o público e planejar sinalização | Cálculo por dados anônimos de fluxo; publicação opcional no app; série por dia | P2 | 5 |
| EP12-014 | Como Visitante, quero buscar no mapa por serviço ("banheiro acessível", "água", "caixa de recarga") e ver o mais próximo com rota para resolver necessidades básicas rápido | Busca por categoria e nome; resultado ordenado por distância; funciona offline com última base | P0 | 5 |

---

## EP13 — GO AI Studio: Agentes No-code

**Objetivo:** permitir que equipes das prefeituras criem e publiquem seus próprios agentes de IA (base de conhecimento, comportamento, canais) sem escrever código, com governança central.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP13-001 | Como Administrador do Tenant, quero criar um agente novo a partir de template (atendimento, informações, FAQ) preenchendo nome, objetivo e tom de voz para ter um assistente no ar em minutos | Wizard de 4 passos; agente de teste imediato em sandbox; publicação separada da criação | P2 | 8 |
| EP13-002 | Como Administrador do Tenant, quero anexar documentos (PDF, DOCX, planilhas, URLs) à base de conhecimento do agente para que ele responda com as informações oficiais | Ingestão com status por documento; reindexação automática ao atualizar; fonte citada nas respostas | P2 | 8 |
| EP13-003 | Como Administrador do Tenant, quero testar o agente em um playground com perguntas de exemplo antes de publicar para garantir a qualidade das respostas | Playground isolado; conjunto de perguntas de teste salvo; comparação entre versões do agente | P2 | 5 |
| EP13-004 | Como Administrador do Tenant, quero definir regras de recusa e temas proibidos por agente para manter o assistente dentro do escopo institucional | Lista de temas bloqueados herdada do tenant + específicas do agente; resposta de recusa configurável; violações logadas | P2 | 5 |
| EP13-005 | Como Administrador do Tenant, quero publicar o agente em canais (app do evento, site via widget, WhatsApp) com um clique por canal para alcançar o cidadão onde ele está | Widget embedável com snippet; integração WhatsApp Business; canal desligável individualmente | P2 | 13 |
| EP13-006 | Como Administrador do Tenant, quero ver métricas do agente (conversas, resolução sem humano, temas mais perguntados, avaliações) para melhorar a base de conhecimento continuamente | Painel por agente; nuvem de temas; exportação das perguntas sem boa resposta | P2 | 5 |
| EP13-007 | Como Administrador do Tenant, quero configurar horário de atendimento e mensagem de transbordo para humano para não deixar o cidadão sem saída fora do escopo da IA | Transbordo por horário/tema/solicitação explícita; fila humana integrada ou e-mail; contexto da conversa vai junto | P2 | 5 |
| EP13-008 | Como Administrador da Plataforma, quero aprovar agentes criados pelos tenants antes da primeira publicação pública para prevenir usos fora dos termos da plataforma | Fila de aprovação com SLA; critérios publicados; republicações menores sem nova aprovação | P2 | 5 |
| EP13-009 | Como Administrador do Tenant, quero versionar o agente (rascunho, publicado, arquivado) com rollback em um clique para experimentar sem medo de quebrar o que funciona | Histórico de versões com diff de configuração; rollback imediato; rótulo de versão em cada conversa logada | P2 | 5 |
| EP13-010 | Como Administrador do Tenant, quero conectar o agente a dados dinâmicos da plataforma (programação, saldo, status de chamado) via conectores prontos para respostas em tempo real e não só documentos | Conectores com escopo de leitura definido; permissões do usuário final respeitadas; latência < 3s | P2 | 13 |
| EP13-011 | Como Administrador do Tenant, quero um relatório semanal de lacunas de conhecimento (perguntas frequentes sem resposta satisfatória) para saber exatamente o que adicionar à base | Clusterização de perguntas sem resposta; sugestão de documento a criar; evolução da taxa de resolução | P2 | 8 |
| EP13-012 | Como Administrador do Tenant, quero clonar um agente entre eventos ou secretarias para reaproveitar configuração comprovada | Clone com base de conhecimento opcional; revisão obrigatória antes de publicar; vínculo com o agente-origem | P2 | 3 |
| EP13-013 | Como Administrador da Plataforma, quero limites de recursos por agente (documentos, tokens/mês, canais) conforme o plano do tenant para manter o custo previsível | Limites por plano; medição por agente; upgrade sugerido ao atingir limite | P2 | 5 |
| EP13-014 | Como Administrador do Tenant, quero revisar amostras de conversas reais do agente (anonimizadas) com marcação de qualidade para treinar a equipe e ajustar o agente | Amostragem aleatória diária; rubrica de qualidade simples; dados pessoais mascarados na revisão | P2 | 5 |

---

## EP14 — Marketplace, SDK e APIs Públicas

**Objetivo:** abrir a plataforma para desenvolvedores e parceiros: APIs públicas documentadas, SDKs, webhooks e um marketplace de extensões aprovadas.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP14-001 | Como Desenvolvedor Integrador, quero um portal do desenvolvedor com documentação OpenAPI navegável e exemplos executáveis para integrar sem depender de suporte | Spec OpenAPI 3.1 publicada; "try it" com sandbox; changelog de versões da API | P2 | 8 |
| EP14-002 | Como Desenvolvedor Integrador, quero criar credenciais de API self-service com escopos mínimos e ambiente sandbox para desenvolver sem tocar dados reais | Sandbox com dados fictícios; escopos granulares; promoção para produção com aprovação do tenant | P2 | 5 |
| EP14-003 | Como Desenvolvedor Integrador, quero assinar webhooks de eventos da plataforma (venda, check-in, resposta de pesquisa) com assinatura HMAC para reagir em tempo real nos meus sistemas | Entrega com retry exponencial e DLQ; assinatura verificável; painel de entregas com replay | P2 | 8 |
| EP14-004 | Como Desenvolvedor Integrador, quero SDKs oficiais em Python e TypeScript com tipagem completa para acelerar a integração com menos erros | SDKs publicados em PyPI/npm; exemplos por módulo; testes cobrindo os fluxos principais | P2 | 8 |
| EP14-005 | Como Administrador da Plataforma, quero rate limiting por credencial com headers informativos e planos de cota para proteger a plataforma de abuso | Limites por plano; headers X-RateLimit; resposta 429 com retry-after; painel de consumo | P2 | 5 |
| EP14-006 | Como Desenvolvedor Integrador, quero publicar uma extensão no marketplace (descrição, permissões pedidas, preço) passando por revisão para distribuir minha solução aos tenants | Fluxo de submissão com checklist; revisão de segurança documentada; publicação com versionamento | P2 | 13 |
| EP14-007 | Como Administrador do Tenant, quero instalar extensões do marketplace vendo exatamente quais dados e permissões elas acessam para decidir com segurança | Tela de consentimento com escopos legíveis; instalação reversível; dados da extensão isolados ao desinstalar | P2 | 8 |
| EP14-008 | Como Administrador da Plataforma, quero suspender remotamente uma extensão com comportamento malicioso em todos os tenants para proteger o ecossistema | Kill switch global < 5 min; tenants notificados; processo de apelação documentado | P2 | 5 |
| EP14-009 | Como Desenvolvedor Integrador, quero um painel de saúde da minha integração (erros por endpoint, latência, quota) para operar minha solução com qualidade | Métricas por credencial; alertas configuráveis por e-mail; export das métricas | P2 | 5 |
| EP14-010 | Como Gestor Municipal, quero publicar dados abertos agregados do evento (público por dia, origem, avaliação) em API pública e CSV para transparência e imprensa | Dataset curado sem dados pessoais; licença de dados aberta; página pública por evento | P2 | 5 |
| EP14-011 | Como Desenvolvedor Integrador, quero versionamento estável da API (v1, v2) com política de depreciação de 12 meses para planejar manutenção sem surpresas | Política publicada; headers de sunset; avisos automáticos a consumidores de versões depreciadas | P2 | 3 |
| EP14-012 | Como Administrador da Plataforma, quero medir a adoção do ecossistema (apps instalados, chamadas por parceiro, receita de revenue share) para gerir o marketplace como produto | Painel de ecossistema; relatório mensal; cálculo de revenue share por parceiro | P2 | 5 |

---

## EP15 — Observabilidade e Confiabilidade

**Objetivo:** garantir operação estável nos picos de evento: monitoramento, alertas, resiliência, backups e capacidade — a plataforma não pode cair no sábado à noite do evento.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP15-001 | Como Administrador da Plataforma, quero logs estruturados centralizados com trace_id ponta a ponta (app, API, workers) para investigar qualquer incidente em minutos | Correlação por trace_id; retenção 90 dias quente; busca < 5s; dados pessoais mascarados nos logs | P0 | 8 |
| EP15-002 | Como Administrador da Plataforma, quero dashboards de golden signals (latência, tráfego, erros, saturação) por serviço para ver a saúde do sistema num relance | Painel por serviço com SLO; percentis p50/p95/p99; anotação de deploys no gráfico | P0 | 5 |
| EP15-003 | Como Administrador da Plataforma, quero alertas com escalonamento (on-call) integrados a plantão para incidentes críticos nunca ficarem sem resposta | Escalonamento em 3 níveis; alerta crítico aciona telefone; runbook linkado em cada alerta | P0 | 5 |
| EP15-004 | Como Administrador da Plataforma, quero SLOs definidos por módulo (ex.: Go Pay 99,95% em evento) com error budget visível para equilibrar velocidade e estabilidade | SLOs documentados; burn rate alertado; política de congelamento de deploy ao estourar budget | P1 | 5 |
| EP15-005 | Como Administrador da Plataforma, quero backups automáticos com teste de restauração mensal para garantir recuperação real, não teórica | Backup diário com retenção 35 dias; restauração testada em ambiente isolado; RPO 1h e RTO 4h documentados | P0 | 5 |
| EP15-006 | Como Administrador da Plataforma, quero testes de carga simulando o pico do maior evento (10x o tráfego normal) antes de cada temporada para dimensionar a infraestrutura com antecedência | Cenários de pico com perfis reais; relatório de gargalos; execução obrigatória pré-temporada | P0 | 8 |
| EP15-007 | Como Administrador da Plataforma, quero autoscaling com aquecimento programado para horários de pico previstos (abertura de portões, show principal) para não depender só de reação automática | Agenda de capacidade por evento; scale-up preventivo; custo do overprovisioning reportado | P1 | 5 |
| EP15-008 | Como Administrador da Plataforma, quero uma página de status pública por tenant com histórico de incidentes para comunicação transparente durante problemas | Status por módulo; atualização durante incidente; assinatura de notificações | P1 | 3 |
| EP15-009 | Como Administrador da Plataforma, quero feature flags para ativar/desativar funcionalidades por tenant sem deploy para lançar com segurança e desligar rápido o que der problema | Flags por tenant e %; mudança auditada; kill switch < 1 min | P0 | 5 |
| EP15-010 | Como Administrador da Plataforma, quero circuit breakers nas integrações externas (PSP, mapas, LLM, clima) para que falha de terceiro não derrube a plataforma | Fallback definido por integração; half-open automático; métricas de abertura por dependência | P0 | 5 |
| EP15-011 | Como Administrador da Plataforma, quero rastrear o custo de infraestrutura por tenant e por módulo para conhecer a margem real de cada contrato | Tagging de recursos; relatório mensal de custo/tenant; alerta de anomalia de custo | P1 | 8 |
| EP15-012 | Como Administrador da Plataforma, quero um processo de post-mortem sem culpados com ações rastreadas para cada incidente sev1/sev2 para aprender e não repetir | Template padrão; ações com dono e prazo; revisão mensal das pendentes | P1 | 2 |
| EP15-013 | Como Administrador da Plataforma, quero monitoramento sintético (transações-robô: login, recarga, pagamento, consulta de programação) a cada minuto para detectar quebras antes dos usuários | Sondas nas jornadas críticas; alerta em 2 falhas seguidas; execução de múltiplas regiões | P0 | 5 |
| EP15-014 | Como Administrador da Plataforma, quero deploy azul-verde com rollback automático em degradação de métricas para publicar durante a semana de evento sem risco | Rollback automático por gatilho de erro/latência; janela de observação 15 min; deploys registrados na timeline | P1 | 8 |
| EP15-015 | Como Organizador do Evento, quero um modo degradado documentado por módulo (o que funciona offline/parcial em pane) para a operação continuar segundo playbook mesmo em falha grave | Playbook por módulo; banner de modo degradado na UI; simulação de pane 1x por temporada | P1 | 5 |

---

## EP16 — LGPD, Segurança e Auditoria

**Objetivo:** conformidade com a LGPD e segurança de nível público: consentimento, direitos do titular, criptografia, trilha de auditoria imutável e gestão de acesso a dados pessoais.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP16-001 | Como Administrador do Tenant, quero um registro central de bases legais por finalidade de tratamento (consentimento, execução de contrato, interesse público) para fundamentar cada dado coletado | Mapa de dados por módulo; base legal atribuída por finalidade; relatório para o encarregado (DPO) | P0 | 5 |
| EP16-002 | Como Visitante, quero gerenciar meus consentimentos (marketing, localização, pesquisa) em uma tela única com efeito imediato para controlar o uso dos meus dados | Consentimentos granulares com histórico; revogação propaga em < 24h; linguagem simples validada | P0 | 5 |
| EP16-003 | Como Visitante, quero solicitar a exportação dos meus dados pessoais e recebê-los em formato legível para exercer meu direito de portabilidade | Solicitação in-app; pacote JSON+PDF em até 15 dias; identidade verificada antes da entrega | P0 | 5 |
| EP16-004 | Como Visitante, quero solicitar a exclusão da minha conta e dados pessoais com clareza sobre o que será retido por obrigação legal para exercer meu direito de eliminação | Exclusão lógica imediata e física em 30 dias; retenções legais (fiscais) explicadas; comprovante da solicitação | P0 | 8 |
| EP16-005 | Como Administrador da Plataforma, quero criptografia em repouso para dados pessoais e financeiros com gestão de chaves por tenant para limitar o impacto de qualquer vazamento | Chaves segregadas por tenant; rotação anual; campos sensíveis com criptografia de coluna | P0 | 8 |
| EP16-006 | Como Administrador do Tenant, quero uma trilha de auditoria imutável de acessos a dados pessoais (quem viu o quê e quando) para investigar qualquer suspeita de uso indevido | Log append-only com hash encadeado; consulta por titular; retenção 5 anos | P0 | 8 |
| EP16-007 | Como Administrador da Plataforma, quero mascaramento de dados pessoais por padrão nas telas administrativas (CPF parcial, e-mail parcial) com revelação sob justificativa para reduzir exposição cotidiana | Máscara padrão em listagens; revelação registra motivo e autor; relatório de revelações por usuário | P0 | 5 |
| EP16-008 | Como Administrador do Tenant, quero políticas de retenção configuráveis por categoria de dado (respostas de pesquisa, transações, logs de app) com expurgo automático para reter apenas o necessário | Política por categoria com mínimo legal; expurgo com relatório; simulação antes de ativar | P1 | 8 |
| EP16-009 | Como Administrador da Plataforma, quero um processo guiado de resposta a incidentes de dados (detecção, contenção, avaliação de risco, notificação ANPD/titulares) para cumprir prazos legais sob pressão | Playbook com prazos; template de notificação; simulação semestral registrada | P0 | 5 |
| EP16-010 | Como Administrador da Plataforma, quero varredura contínua de vulnerabilidades (dependências, imagens, endpoints) integrada ao CI para bloquear riscos conhecidos antes da produção | Bloqueio de CVE crítica no CI; SLA de correção por severidade; painel de vulnerabilidades aberto | P0 | 5 |
| EP16-011 | Como Administrador da Plataforma, quero pentest anual por terceiro com plano de correção rastreado para validar a segurança externamente antes da temporada de eventos | Escopo cobrindo módulos financeiros; achados com dono e prazo; retest documentado | P1 | 3 |
| EP16-012 | Como Analista de Dados, quero pseudonimização automática nas bases analíticas (troca de identificadores por tokens) para analisar comportamento sem expor identidade | Tokenização irreversível no data mart; re-identificação só por processo formal auditado; documentação da técnica | P0 | 8 |
| EP16-013 | Como Administrador do Tenant, quero relatórios de impacto (RIPD) semiestruturados por módulo ativado para documentar riscos de privacidade exigidos em contratos públicos | Template RIPD por módulo; riscos e mitigações editáveis; export PDF assinável | P1 | 5 |
| EP16-014 | Como Administrador do Tenant, quero aprovar formalmente (fluxo de duas pessoas) qualquer exportação em massa de dados pessoais para prevenir exfiltração por conta comprometida | Exportações > 1000 titulares exigem segunda aprovação; notificação ao DPO; log completo | P0 | 5 |
| EP16-015 | Como Administrador da Plataforma, quero detectar comportamento anômalo de usuários internos (acesso em massa, horário atípico, download incomum) para alertar sobre possíveis contas comprometidas | Regras + baseline por papel; alerta ao admin do tenant; falso positivo ajustável | P1 | 8 |
| EP16-016 | Como Visitante, quero uma política de privacidade em linguagem simples e por camadas (resumo + completa) dentro do app para entender o uso dos meus dados sem juridiquês | Versão resumida de 1 tela; versionamento com data; re-aceite quando houver mudança material | P0 | 3 |
| EP16-017 | Como Administrador do Tenant, quero gerenciar contratos de operador (DPA) com fornecedores conectados à plataforma para formalizar a cadeia de tratamento de dados | Registro de suboperadores por integração; alerta de DPA vencido; export da cadeia para auditoria | P1 | 5 |
| EP16-018 | Como Administrador da Plataforma, quero testes automatizados de isolamento entre tenants (tentativas de acesso cruzado) rodando em todo deploy para garantir que o multi-tenant nunca vaze | Suíte cobre API, exports e IA; deploy bloqueado em falha; evidência arquivada por release | P0 | 8 |

---

## EP17 — Billing SaaS e Gestão de Contratos

**Objetivo:** monetizar a plataforma com planos, medição de consumo, faturamento e a realidade contratual do setor público (empenho, nota de liquidação, vigência).

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP17-001 | Como Administrador da Plataforma, quero configurar planos (módulos incluídos, limites de usuários, eventos/ano, franquia de IA) para empacotar a oferta comercial | Catálogo de planos versionado; plano custom por contrato; mudanças não afetam contratos vigentes | P1 | 5 |
| EP17-002 | Como Administrador da Plataforma, quero medir consumo por tenant (transações Go Pay, entrevistas Go Survey, tokens de IA, armazenamento) para faturar excedentes com precisão | Medição diária idempotente; extrato de consumo no portal do tenant; divergência < 0,1% em auditoria | P1 | 8 |
| EP17-003 | Como Gestor Municipal, quero visualizar meu contrato (vigência, módulos, limites, aditivos) e o consumo atual no portal para gerenciar o contrato sem pedir planilhas | Painel contratual; alerta de 80% do limite; histórico de aditivos | P1 | 3 |
| EP17-004 | Como Administrador da Plataforma, quero emitir faturas mensais com quebra por módulo e excedentes, integrada à emissão de NFS-e, para formalizar a cobrança | Fatura detalhada PDF; NFS-e emitida automaticamente; ciclo de faturamento configurável por contrato | P1 | 8 |
| EP17-005 | Como Administrador da Plataforma, quero registrar dados de empenho e ordem de fornecimento por contrato público para alinhar o faturamento ao rito orçamentário municipal | Campos de empenho por fatura; bloqueio de fatura sem empenho quando exigido; relatório por exercício fiscal | P1 | 5 |
| EP17-006 | Como Administrador da Plataforma, quero uma régua de inadimplência específica para setor público (aviso, restrição parcial, suspensão) com prazos alongados para cobrar sem romper a relação institucional | Régua configurável por tipo de cliente; restrição parcial preserva dados e leitura; reativação imediata pós-pagamento | P1 | 5 |
| EP17-007 | Como Gestor Municipal, quero simular o custo de ativar um novo módulo ou evento extra antes de contratar para planejar o orçamento da secretaria | Simulador com preço vigente do contrato; export PDF para processo administrativo; validade da simulação | P1 | 3 |
| EP17-008 | Como Administrador da Plataforma, quero relatórios de receita (MRR, ARR, churn, expansão por módulo) para gerir o negócio SaaS com métricas padrão | Painel mensal; cohort por safra de contrato; export para o conselho | P1 | 5 |
| EP17-009 | Como Administrador da Plataforma, quero modo piloto/POC com prazo e limites reduzidos que converte em contrato sem migração de dados para acelerar vendas com baixo atrito | Tenant piloto com selo e expiração; conversão preserva todos os dados; lembretes de fim de piloto | P1 | 5 |
| EP17-010 | Como Administrador da Plataforma, quero precificação por evento avulso (white-label de um festival) além da assinatura anual para atender organizadores privados | Contrato por evento com período; encerramento arquiva o tenant com export garantido; preço por porte de público | P2 | 5 |
| EP17-011 | Como Gestor Municipal, quero exportar toda a documentação fiscal e de consumo do exercício em um pacote único para instruir a prestação de contas anual | Pacote ZIP com faturas, NFS-e e extratos; índice em PDF; geração em < 10 min | P1 | 3 |
| EP17-012 | Como Administrador da Plataforma, quero aplicar reajuste anual por índice (IPCA/IGP-M) conforme cláusula contratual com memória de cálculo para reajustar sem disputa | Índice configurável por contrato; memória de cálculo anexada à fatura; aviso prévio de 30 dias | P2 | 3 |

---

## EP18 — Onboarding, Educação e Suporte (Agente Professor)

**Objetivo:** garantir adoção real da plataforma: trilhas de capacitação por papel, agente Professor para dúvidas, certificação de operadores e suporte estruturado.

| ID | História | Critérios de aceite | Prioridade | SP |
|----|----------|---------------------|------------|----|
| EP18-001 | Como Gestor Municipal, quero um tour guiado interativo no primeiro acesso mostrando as 5 ações principais do meu papel para começar a usar sem treinamento formal | Tour por papel; pulável e retomável; conclusão medida por coorte | P1 | 5 |
| EP18-002 | Como Administrador do Tenant, quero trilhas de capacitação por papel (operador de caixa, pesquisador, organizador) com vídeos curtos e quiz para preparar equipes antes do evento | Trilhas de 30–60 min; quiz com nota mínima; progresso por pessoa visível ao admin | P1 | 8 |
| EP18-003 | Como Operador de Caixa/Recarga, quero obter um certificado digital após completar a trilha e o quiz para comprovar que estou apto a operar no evento | Certificado com QR de validação; validade por temporada; exigível para ativar credencial de operador | P1 | 5 |
| EP18-004 | Como Pesquisador de Campo, quero perguntar ao agente Professor "como registro uma recusa?" dentro do app de coleta para resolver dúvidas no campo sem ligar para o supervisor | Respostas baseadas no manual oficial; funciona com as dúvidas mais comuns offline (FAQ embarcada); escalada ao supervisor em 1 toque | P1 | 8 |
| EP18-005 | Como Administrador do Tenant, quero um checklist de prontidão pré-evento (equipe treinada, PDVs testados, questionários publicados, mapas atualizados) para saber se estamos prontos para abrir os portões | Checklist por módulo contratado; itens com evidência automática quando possível; relatório de prontidão D-3 | P1 | 5 |
| EP18-006 | Como Gestor Municipal, quero abrir chamados de suporte por severidade com SLA visível e acompanhamento para ter previsibilidade quando algo der errado | SLA por severidade e plano; timeline do chamado; pesquisa de satisfação pós-fechamento | P1 | 5 |
| EP18-007 | Como Administrador da Plataforma, quero que o agente Professor responda primeiro os chamados de dúvida (não-bug) com opção de escalar a humano para reduzir volume do suporte N1 | Classificação automática dúvida vs. problema; resolução medida; escalada mantém contexto | P1 | 8 |
| EP18-008 | Como Organizador do Evento, quero um simulador de operação (dados fictícios de um dia de evento) para treinar minha equipe em situações reais sem risco | Ambiente de simulação com cenários (pico, falha de rede, incidente); pontuação da equipe; reset ilimitado | P2 | 8 |
| EP18-009 | Como Administrador do Tenant, quero relatórios de adoção por módulo (usuários ativos, funcionalidades usadas, gaps de uso) para direcionar reforço de capacitação onde há subutilização | Score de adoção por módulo; comparação com benchmark de tenants similares; recomendações de trilha | P1 | 5 |
| EP18-010 | Como Gestor Municipal, quero uma central de novidades (release notes em linguagem simples com vídeo de 1 min) para minha equipe acompanhar as evoluções da plataforma | Notas por módulo contratado; marcação de lido; digest mensal por e-mail | P2 | 3 |
| EP18-011 | Como Pesquisador de Campo, quero acessar o manual de campo offline dentro do app (protocolos de abordagem, LGPD, segurança) para consultar padrões a qualquer momento | Manual versionado embarcado; busca por palavra; atualização junto com sincronização | P1 | 3 |
| EP18-012 | Como Administrador da Plataforma, quero medir tempo-até-primeiro-valor de cada tenant novo (dias até primeiro evento/pesquisa publicados) para melhorar continuamente o onboarding | Métrica por coorte; alerta de tenant travado no onboarding; playbook de intervenção do CS | P1 | 3 |

---

## Sprint 1 sugerida

Foco: fundação multi-tenant + esqueleto do fluxo de valor (login → evento → programação no app → primeira pesquisa). Capacidade estimada: ~50 SP (time de 5–6 devs).

| ID | História | SP |
|----|----------|----|
| EP1-001 | Criar tenant com CNPJ, domínio e plano | 8 |
| EP1-003 | Login com e-mail/senha e política de senha forte | 3 |
| EP1-006 | Papéis padrão pré-criados por tenant | 5 |
| EP1-008 | Convite de usuários por e-mail com papel | 3 |
| EP1-010 | Recuperação de senha por link | 2 |
| EP1-022 | Log de alterações de permissões | 3 |
| EP1-024 | App do visitante em modo anônimo (sem login) | 3 |
| EP5-001 | Programação por dia, palco e categoria com busca | 5 |
| EP5-019 | Painel web de gestão da programação com publicação imediata | 5 |
| EP12-001 | Editor da planta do evento (base espacial dos módulos) | 8 |
| EP15-001 | Logs estruturados centralizados com trace_id | 8 |
| EP16-016 | Política de privacidade em camadas no app | 3 |

Total: 12 histórias · 56 SP (ajustar ao velocity real; EP15-001 pode iniciar em paralelo pela squad de plataforma).

## Release plan — épicos por fase

| Fase | Janela alvo | Épicos (escopo principal) | Marco de negócio |
|------|-------------|---------------------------|------------------|
| **Fase 1 — MVP Lançamento** | T3–T4 2026 | EP1 (completo P0), EP3 (dashboard + briefing), EP4 (coleta offline + quotas + qualidade), EP5 (app do visitante P0), EP12 (planta + busca no mapa), EP15 (observabilidade P0), EP16 (LGPD P0), EP2 (Concierge + Q&A de dados P0), EP7 (KPIs núcleo + relatório para órgãos de controle) | Primeiro evento real operando com app, pesquisa de campo Foccus e briefing diário de IA |
| **Fase 2 — Dinheiro e Operação** | T1–T2 2027 | EP6 (Go Pay completo), EP8 (Go Expo), EP12 (heatmap e fluxo P1), EP7 (impacto econômico + builder), EP2 (agentes Gestor/Analista P1), EP15/EP16 (P1), EP17 (billing SaaS), EP18 (onboarding e certificação) | Evento 100% cashless com conciliação D+1 e painel financeiro do gestor |
| **Fase 3 — Cidade o ano inteiro** | T3–T4 2027 | EP9 (Go Commerce), EP10 (Go City / Go Tourism), EP4/EP7 (tracking contínuo e turismo), EP18 (simulador) | Plataforma ativa fora do calendário de eventos, gerando receita ao comércio local |
| **Fase 4 — Inteligência avançada** | T1–T2 2028 | EP11 (Go Vision), EP13 (GO AI Studio), EP2 (simulação de cenários e voz) | Prefeituras criando os próprios agentes; contagem de público automatizada |
| **Fase 5 — Ecossistema** | T3 2028+ | EP14 (Marketplace, SDK, APIs públicas, dados abertos), EP17 (precificação por evento avulso) | Terceiros desenvolvendo sobre a plataforma; dados abertos publicados |

---

*Documento vivo: revisado a cada Program Increment. Alterações de escopo passam pelo PO do módulo e são registradas no changelog da ferramenta de gestão.*
