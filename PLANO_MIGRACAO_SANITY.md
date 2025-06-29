# Plano de Migração para o Sanity

## 1. Análise e Planejamento

### 1.1 Mapeamento de Conteúdo
- [ ] Identificar todas as seções e tipos de conteúdo atuais
- [ ] Mapear relacionamentos entre diferentes tipos de conteúdo
- [ ] Priorizar a migração baseada nas dependências

### 1.2 Estrutura do Sanity
- [ ] Revisar esquemas existentes no diretório `sanity/schemas/`
- [ ] Identificar esquemas que precisam ser criados ou modificados
- [ ] Planejar a estrutura de referências entre documentos

## 2. Configuração do Ambiente

### 2.1 Sanity Studio
- [ ] Verificar se o Sanity Studio está instalado e configurado corretamente
- [ ] Configurar variáveis de ambiente necessárias
- [ ] Configurar plugins do Sanity (se necessário)

### 2.2 Sanity Client
- [ ] Configurar cliente Sanity no frontend
- [ ] Criar hooks personalizados para consultas comuns
- [ ] Configurar visualização em tempo real

## 3. Migração de Dados

### 3.1 Esquemas
- [ ] Criar/atualizar esquemas no Sanity para:
  - [x] Seção Hero (já existe)
  - [ ] Seção Sobre
  - [ ] Seção de Programas
  - [ ] Instrutores
  - [ ] Eventos
  - [ ] FAQ
  - [ ] Configurações do Site
  - [ ] Outras seções identificadas

### 3.2 Migração de Conteúdo
- [ ] Criar scripts de migração para conteúdo estático
- [ ] Implementar validação de dados
- [ ] Testar a migração em um ambiente de desenvolvimento

## 4. Integração com o Frontend

### 4.1 Consultas GROQ
- [ ] Criar consultas para cada tipo de conteúdo
- [ ] Implementar paginação onde necessário
- [ ] Configurar pré-busca de dados

### 4.2 Componentes
- [ ] Atualizar componentes para consumir dados do Sanity
- [ ] Implementar fallbacks para conteúdo não encontrado
- [ ] Adicionar tipagem TypeScript para os dados do Sanity

## 5. Testes

### 5.1 Testes de Integração
- [ ] Testar consultas em diferentes cenários
- [ ] Verificar o carregamento de imagens e mídias
- [ ] Testar a validação de esquemas

### 5.2 Testes de Desempenho
- [ ] Medir tempos de carregamento
- [ ] Otimizar consultas conforme necessário
- [ ] Implementar cache onde apropriado

## 6. Implantação

### 6.1 Ambiente de Produção
- [ ] Configurar conjunto de dados de produção
- [ ] Configurar CORS e permissões
- [ ] Fazer backup dos dados

### 6.2 Documentação
- [ ] Documentar a estrutura do Sanity
- [ ] Criar guia para atualização de conteúdo
- [ ] Documentar fluxo de trabalho de publicação

## Próximos Passos Imediatos

1. **Revisar a estrutura atual de pastas e arquivos** para identificar todo o conteúdo que precisa ser migrado.
2. **Criar um ambiente de desenvolvimento isolado** para testar a migração.
3. **Começar pela migração de uma única seção** (por exemplo, a seção Hero) para validar o fluxo.

## Seções do Site a serem Migradas

Baseado no arquivo `home.tsx`, identificamos as seguintes seções que precisam ser migradas:

- [ ] `HeroSection` (parcialmente migrado)
- [ ] `SchedulingWidget`
- [ ] `EventsSection`
- [ ] `ProgramsSection`
- [ ] `VirtualTourSection`
- [ ] `CommunitySection`
- [ ] `AboutSection`
- [ ] `ContactSection`
- [ ] `FAQSection`
