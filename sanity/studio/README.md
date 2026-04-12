# Academia Boulder - Sanity Studio

Este é o Sanity Studio para o projeto Academia Boulder, um CMS (Content Management System) que permite gerenciar todo o conteúdo do site.

## Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm (gerenciador de pacotes do Node.js)
- Uma conta no [Sanity.io](https://www.sanity.io)

## Configuração Inicial

1. **Clone o repositório (caso ainda não tenha feito)**
   ```bash
   git clone <url-do-repositorio>
   cd sanity/studio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto studio
   ```env
   SANITY_STUDIO_PROJECT_ID="seu-project-id"
   SANITY_STUDIO_DATASET="production"
   ```

## Desenvolvimento Local

1. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```
   O studio estará disponível em `http://localhost:3333`

2. **Faça login no Sanity**
   - Ao abrir o studio pela primeira vez, você será solicitado a fazer login
   - Use sua conta Sanity ou faça login com Google/GitHub

## Deploy

### Método 1: Deploy Nativo do Sanity (Recomendado)

1. **Faça o build e deploy**
   ```bash
   npm run deploy
   ```
   ou
   ```bash
   npx sanity deploy
   ```

2. **Configure o hostname**
   - Durante o deploy, você será solicitado a escolher um hostname único
   - Exemplo: `academia-boulder.sanity.studio`
   - Este será o URL público do seu studio

### Método 2: Deploy Manual (Opcional)

1. **Gere o build**
   ```bash
   npm run build
   ```
   Os arquivos serão gerados na pasta `dist`

2. **Deploy dos arquivos**
   - Faça upload dos arquivos da pasta `dist` para seu servidor web
   - Configure o servidor para redirecionar todas as rotas para `index.html` (necessário para SPA)

## Configurações Adicionais

### CORS (Cross-Origin Resource Sharing)

1. Acesse o [Painel de Gerenciamento do Sanity](https://www.sanity.io/manage)
2. Selecione seu projeto
3. Vá para a seção "API"
4. Em "CORS Origins", adicione:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-dominio.com` (produção)

### Gerenciamento de Usuários

1. No [Painel de Gerenciamento](https://www.sanity.io/manage)
2. Vá para "Membros do Projeto"
3. Adicione novos membros usando seus emails
4. Configure as permissões apropriadas:
   - `Administrator`: Acesso total
   - `Editor`: Pode editar conteúdo
   - `Viewer`: Apenas visualização

## Estrutura de Schemas

Os schemas do projeto estão localizados em `schemas/`. Cada arquivo representa um tipo de conteúdo diferente:

- `aboutSection.ts`: Seção Sobre
- `communitySection.ts`: Seção Comunidade
- `contactSection.ts`: Seção Contato
- `event.ts`: Eventos
- `faqSection.ts`: Seção FAQ
- `heroSection.ts`: Seção Hero
- `program.ts`: Programas
- `schedulingSection.ts`: Seção de Agendamento
- `siteSettings.ts`: Configurações do Site

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev         # Inicia servidor de desenvolvimento
npm run build      # Gera build de produção
npm run deploy     # Faz build e deploy para Sanity
npm run start      # Inicia servidor de produção local

# Gerenciamento de Dataset
npx sanity dataset export   # Exporta dataset
npx sanity dataset import   # Importa dataset
```

## Links Úteis

- [Documentação do Sanity](https://www.sanity.io/docs)
- [Guia de Schemas](https://www.sanity.io/docs/schema-types)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Comunidade Sanity](https://www.sanity.io/community/join)

## Suporte

Para questões relacionadas ao projeto, abra uma issue no repositório ou entre em contato com a equipe de desenvolvimento.
