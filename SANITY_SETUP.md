# Configuração do Sanity CMS - Academia Boulder

## Passo 1: Criar Projeto no Sanity

1. Acesse [sanity.io](https://www.sanity.io/) e crie uma conta
2. Crie um novo projeto
3. Anote o **Project ID** do seu projeto
4. Crie um dataset (recomendado: `production`)

## Passo 2: Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Edite o arquivo `.env` com suas credenciais:
```
VITE_SANITY_PROJECT_ID=seu-project-id-aqui
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=seu-token-aqui
```

## Passo 3: Obter Token de API

1. No painel do Sanity, vá em **API** > **Tokens**
2. Crie um novo token com permissões de **Read**
3. Para operações de escrita, crie um token com permissões de **Editor**

## Passo 4: Inicializar Sanity Studio

1. Instale a CLI do Sanity:
```bash
npm install -g @sanity/cli
```

2. Faça login:
```bash
sanity login
```

3. Configure o studio (na raiz do projeto):
```bash
sanity init
```

4. Ou inicie o studio diretamente:
```bash
sanity dev
```

## Passo 5: Configurar CORS

1. No painel do Sanity, vá em **API** > **CORS Origins**
2. Adicione as seguintes origens:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seu-dominio.com` (produção)

## Estrutura de Conteúdo

O CMS está configurado com os seguintes tipos de conteúdo:

### Configurações Gerais
- **Site Settings**: Logo, informações de contato, redes sociais
- **Hero Section**: Título, subtítulo, botões de ação

### Conteúdo Principal
- **Programs**: Programas de escalada com detalhes, preços, instrutores
- **Events**: Eventos e competições
- **Instructors**: Perfis dos instrutores

### Seções da Página
- **About Section**: Sobre a academia, missão, visão, valores
- **Community Section**: Feed do Instagram, depoimentos
- **FAQ Section**: Perguntas frequentes
- **Contact Section**: Informações de contato

## Uso no Frontend

Os componentes já estão configurados para buscar dados do Sanity automaticamente. Caso não haja conteúdo no CMS, o site exibirá conteúdo padrão.

### Exemplo de Hook
```tsx
import { useHeroSection } from '@/hooks/useSanity'

const { data, isLoading } = useHeroSection()
```

## Comandos Úteis

```bash
# Iniciar Sanity Studio
sanity dev

# Deploy do Studio
sanity deploy

# Verificar configuração
sanity status
```