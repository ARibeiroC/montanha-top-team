# Montanha Top Team – Frontend

Aplicação frontend React da equipe Montanha Top Team. Foca em apresentar informações institucionais, cronogramas de treinos e fluxos de autenticação/registro com uma arquitetura modular, visualmente clara e desacoplada.

## Visão Geral
- Stack: React, React Router, styled-components, react-icons, Vite.
- Objetivos: páginas públicas (Home, Sobre, Horários), autenticação (Login), cadastro (Register), base para área do usuário/admin.
- Design System simples com tokens de cor e padrões de layout.

## Como Rodar
1. Requisitos: Node 18+.
2. Instalar dependências: `npm install`
3. Ambiente de desenvolvimento: `npm run dev`
4. Acesse: `http://localhost:5173/` (ou porta alternativa indicada pelo Vite)

## Scripts
- `npm run dev`: inicia o servidor Vite em modo desenvolvimento.
- `npm run build`: gera build de produção (se configurado no `package.json`).
- `npm run preview`: pré-visualiza o build de produção.

## Estrutura de Pastas
```
src/
├─ app/                  # Shell da aplicação (layout e container)
│  ├─ App.jsx            # Header + Outlet + Footer
│  └─ AppCSS.js          # Estilos do shell
├─ shared/               # Recursos reutilizáveis e agnósticos de feature
│  └─ ui/
│     ├─ Header/
│     │  ├─ Header.jsx
│     │  └─ HeaderCSS.js
│     ├─ Footer/
│     │  ├─ Footer.jsx
│     │  └─ FooterCSS.js
│     ├─ Belt/
│     │  ├─ Belt.jsx
│     │  └─ BeltCSS.js
│     └─ Nav/
│        ├─ Navigation.jsx
│        └─ NavCSS.js
├─ components/           # Componentes compartilhados legados (em migração)
│  └─ Form/
│     ├─ Form.jsx
│     ├─ FormCSS.js
│     ├─ FormCadUser/
│     │  ├─ FormCadUser.jsx
│     │  └─ FormCadUserCSS.js
│     └─ PasswordInput/
│        ├─ PasswordInput.jsx
│        └─ PasswordInputCSS.js
├─ routes/               # Páginas por rota
│  ├─ Login/
│  │  ├─ Login.jsx
│  │  └─ LoginCSS.js
│  ├─ Register/
│  │  ├─ Register.jsx
│  │  └─ RegisterCSS.js
│  ├─ Schedules/         # Tabela de horários
│  │  └─ SchedulesTable.jsx
│  ├─ WorkoutSchedules/  # Cronograma detalhado
│  │  └─ WorkoutSchedules.jsx
│  └─ About/             # Página institucional
│     ├─ About.jsx
│     └─ AboutCSS.js
├─ context/              # Contextos globais
│  └─ StateMenuContext.jsx
├─ assets/               # Imagens e ícones
├─ index.css             # Estilos globais
└─ main.jsx              # Bootstrap + router
```

## Arquitetura Modular (Feature-Based – proposta)
- Meta: “bater o olho e entender” responsabilidades por módulo.
- Recomendação de migração incremental para:
```
src/
├─ app/                 # Shell, providers, router (lazy-loading)
├─ shared/              # ui base, utils, lib/http, theme, assets
├─ entities/            # modelos e tipos (User, Schedule)
├─ features/
│  ├─ auth/             # login, logout, register (services, hooks, components)
│  ├─ register/         # formulário de cadastro
│  ├─ schedules/        # tabela/cronograma data-driven
│  └─ menu/             # navegação e estado do menu
└─ pages/               # composição de features por rota
```

## Padrões e Convenções
- Componentes
  - Responsabilidades pequenas, coesão alta, sem lógica de rede embutida.
  - Reutilizáveis em `shared/ui` (Header, Footer, Belt, Nav, overlays, campos).
- Estilos
  - `styled-components` com arquivos por componente.
  - Evitar regras globais que afetem elementos internos (ex.: `button {}`), preferir escopo local.
- Formulários e validação
  - `PasswordInput` com toggle de visibilidade consistente (ícone via `react-icons`).
  - Feedback visual de erro com `.field-error` apenas após envio inválido.
  - Validação de senha = confirmação no cadastro, usando `setCustomValidity` e estado de erro por campo.
- Navegação
  - `Header` + `Belt` + `Navigation` com visibilidade condicional na Home.
  - `Footer` fixo no rodapé via layout flex no `AppCSS`.

## Fluxos Principais
- Login
  - Formulário com `email` e `senha`, overlay de loading e destaque de erro por campo.
  - `PasswordInput` dentro do input de senha (ícone de olho).
- Cadastro
  - Coleta de dados do aluno, opção de estudante com fieldset condicional.
  - Validação de senha/confirmar senha; overlay de loading; navegação para `/login` em sucesso.
- Tabelas de Horários
  - Hoje markup estático; recomendada migração para data-driven com componentes como `ScheduleWeek` e `ScheduleRow` e fonte de dados única.

## Próximos Passos (Roadmap de Modularização)
1. `shared/lib/http.ts`: cliente HTTP único com interceptors (autenticação, erros).
2. `features/auth/services/authService.ts`: `login`/`register` e hooks (`useLogin`, `useRegister`).
3. `features/schedules/data`: fonte de dados e renderização via mapeamento (reduz repetição massiva de HTML).
4. `shared/theme`: tokens de cor e espaçamento tipados.
5. `shared/ui`: extrair `FormField`, `LoadingOverlay`, componentes básicos de layout.
6. Lazy-loading de rotas pesadas (schedules) para performance.

## Notas de Desenvolvimento
- Porta do dev server: Vite escolhe automaticamente se 5173 estiver ocupada.
- Imagens de background centralizadas em `assets/` e reaproveitadas entre páginas.
- Ícones: `react-icons` (preferir uso direto dentro do componente com tamanho definido).

## Licença
Este projeto é parte da Equipe Montanha Top Team. Direitos reservados.
<p style="font-size: 1.2rem;">Escola de jiu-jitsu para todas as idades.</p>


## ESCOPO DO PROJETO
- [ ] HEADER <!-- CABEÇALHO DO SITE -->
    - [X] MENU
      - [ ] DESTACAR MENU AO ROLAR A PÁGINA
    - [X] BELT
      - [X] ICONS DE CONTATOS
      - [ ] ROLAR PARA A SECTION "CONTACT"
- [ ] CONTENT
    - [X] SECTION HOME
      - [X] BACKGROUND VIDEO
      - [X] BANNERS
      - [ ] CONTENT
      - [ ] BUTTON "AGENDE UMA AULA"
    - [ ] SECTION ABOUT
      - [ ] DESCRIÇÃO SOBRE A ESCOLA
      - [ ] TIME DE PROFISSIONAIS
    - [ ] SECTION EQUIPE
    - [ ] SECTION EVENTOS
    - [ ] SECTION FILIAIS
    - [ ] SECTION HORARIOS
    - [ ] SECTION FAQ's