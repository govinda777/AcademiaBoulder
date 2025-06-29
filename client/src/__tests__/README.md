# Testes Automatizados

Este diretório contém os testes automatizados para o projeto AcademiaBoulder.

## Estrutura de Diretórios

- `__tests__/`: Testes unitários e de integração
  - `hooks/`: Testes para hooks personalizados
  - `components/`: Testes para componentes React
  - `utils/`: Testes para funções utilitárias

## Como Executar os Testes

### Executar Todos os Testes

```bash
npm test
```

### Executar Testes em Modo Watch

```bash
npm test -- --watch
```

### Executar Testes com Cobertura

```bash
npm run test:coverage
```

### Executar um Arquivo de Teste Específico

```bash
npm test -- src/__tests__/caminho/para/o/arquivo.test.tsx
```

## Convenções de Nomenclatura

- Arquivos de teste devem ter o sufixo `.test.ts` ou `.test.tsx`
- Nomes de testes devem ser descritivos e em português
- Use `describe` para agrupar testes relacionados
- Use `it` ou `test` para casos de teste individuais

## Boas Práticas

- Teste comportamentos, não implementações
- Mantenha os testes isolados e independentes
- Use mocks para dependências externas
- Escreva testes que falhem primeiro (TDD)
- Mantenha os testes simples e legíveis

## Dependências de Teste

- `@testing-library/react`: Para testar componentes React
- `@testing-library/user-event`: Para simular interações do usuário
- `@testing-library/jest-dom`: Para adicionar matchers personalizados do Jest para o DOM
- `vitest`: Framework de testes
- `@vitest/ui`: Interface de usuário para o Vitest
- `jsdom`: Ambiente de teste para o navegador

## Configuração

A configuração dos testes está no arquivo `vitest.config.ts` na raiz do projeto.
