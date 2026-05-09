# Mapa de Refatoração - Academia Boulder

Este documento detalha os pontos de melhoria identificados no projeto, focando na simplificação do schema do Sanity, migração de conteúdo Hard Coded e padronização da UI.

---

## 1. Sanity CMS: Simplificação e Limpeza

### Campos Não Utilizados (Remover do Schema)
Os seguintes campos estão definidos nos schemas do Sanity mas não são renderizados em nenhum componente do frontend:

*   **`heroSection`**:
    *   `ctaButtons`: Os botões na `HeroSection.tsx` estão fixos no código.
*   **`instructor`**:
    *   `specialties`: Não exibido.
    *   `certifications`: Não exibido.
    *   `experience`: Não exibido.
*   **`aboutSection`**:
    *   `mainSection.mainImage`: A seção "Sobre" utiliza apenas cores de fundo e círculos decorativos CSS, não a imagem.
*   **`contactSection`**:
    *   `mapEmbed`: O componente `ContactSection.tsx` gera o link do mapa dinamicamente via URL baseada no endereço, ignorando este campo de embed.

### Consolidação de Dados
*   **Informações de Contato**: Existem campos de contato duplicados ou similares em `siteSettings` e `contactSection`. Devemos centralizar tudo em `siteSettings` e fazer o `ContactSection` consumir de lá para evitar inconsistências.

---

## 2. Conteúdo Hard Coded (Migrar para Sanity)

Existem diversos textos e configurações que estão "chumbados" no código e deveriam ser editáveis via CMS:

### Hero Section
*   **Botões de CTA**: Os textos ("COMECE AGORA", "SAIBA MAIS") e seus respectivos links devem vir do campo `ctaButtons` (que hoje não é usado).
*   **Grip Labels**: As etiquetas nos agarras decorativos ("V8", "V3", "V0") poderiam ser configuráveis.

### Seção Sobre
*   **Ícones dos Pilares**: A escolha dos ícones ('target', 'eye', 'heart') está fixa no componente.
*   **Cores de Fundo**: Os gradientes decorativos estão fixos no CSS/Tailwind.

### Seção de Programas
*   **Paleta de Cores dos Cards**: As cores dos cards (`#0F1116`, `#1E88E5`, `#FFD700`, `#FAFAF7`) estão em um array fixo.
*   **Textos do Modal**: "Resumo & Detalhes", "O que está incluso", "Dúvidas? Fale Conosco" e "Começar Agora".

### Seção de Equipe
*   **Labels**: "Ficha Técnica", "COACH · 0X", "Trajetória e Expertise".

### Seção de Contato
*   **Interesses do Formulário**: A lista `['Aula Aberta (Grátis)', 'Cross Training', 'Escalada', 'Outro']`.
*   **Labels de Coluna**: "01 · Social", "02 · Envie uma mensagem", "03 · Unidade".

---

## 3. UI: Padronização de Componentes

Quase todas as seções seguem o mesmo padrão visual que deve ser extraído para componentes globais:

### `SectionHeader`
Componente para padronizar o rótulo superior com a linha horizontal e o número do capítulo:
```tsx
// Exemplo de padrão a ser extraído
<div className="flex items-center gap-4">
  <span className="font-mono text-[11px] tracking-[0.4em] opacity-30 uppercase">Cap / {chapter}</span>
  <div className="w-8 h-px bg-[var(--ink)]/20" />
  <span className="font-mono text-[11px] tracking-[0.3em] opacity-70 uppercase">{label}</span>
</div>
```

### `SectionTitle`
Componente para padronizar os títulos grandes com partes em itálico/serifado:
```tsx
// Exemplo de padrão a ser extraído
<h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(32px,5vw,72px)]">
  <span className="block uppercase">{mainTitle}</span>
  <span className="block">
    <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces'}}>
      {highlightedTitle}
    </span>
  </span>
</h2>
```

### `SectionContainer`
Padronizar o espaçamento (`pt-28 pb-16`), largura máxima (`max-w-[1700px]`) e o comportamento de `overflow`.

### Modais
Os modais de Programas e Equipe têm estruturas muito similares (lado esquerdo com imagem/título, lado direito com conteúdo scrollable). Devem ser unificados em um componente de `BaseModal` ou `Drawer`.

---

## 4. Próximos Passos Sugeridos

1.  **Refatoração do Schema**: Remover os campos listados no item 1 e rodar `sanity typegen`.
2.  **Criação da Design System**: Implementar `SectionHeader` e `SectionTitle` em `client/src/components/ui`.
3.  **Migração Progressiva**: Atualizar cada seção para usar os novos componentes de UI e consumir os campos do Sanity que antes eram ignorados.
