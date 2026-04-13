# Documentação de SEO - Academia Boulder

Esta seção detalha a estratégia de SEO implementada no projeto para garantir visibilidade orgânica, compartilhamento social otimizado e indexação técnica eficiente.

## 🛠️ Pilares Técnicos

### 1. Metadados Dinâmicos (Metadata API)
Utilizamos a biblioteca `react-helmet-async` para gerenciar as tags do `<head>` de forma dinâmica.
- **Componente `SEOHead`**: Gerencia títulos redundantes, descrições, Open Graph (Facebook/WhatsApp), Twitter Cards e Canonical URLs.
- **Dinamismo**: As páginas de Programas e Eventos buscam automaticamente o conteúdo do Sanity CMS para popular as meta tags.

### 2. Dados Estruturados (JSON-LD)
Implementamos schemas do [Schema.org](https://schema.org) para ajudar os buscadores a entenderem o contexto do negócio:
- **LocalBusiness / SportsActivityLocation**: Para a página inicial, definindo local, telefone e endereço em Sorocaba/SP.
- **Course**: Para as páginas de programas de treinamento.
- **Breadcrumb**: Para facilitar a navegação estruturada nos resultados de pesquisa.

### 3. Automação de Sitemap
O arquivo `sitemap.xml` é gerado automaticamente a partir de um script que consulta o Sanity CMS.
- **Script**: `npm run sitemap`
- **Automação**: O script roda automaticamente antes de cada build (`prebuild`), garantindo que novas páginas de programas ou eventos sejam incluídas na próxima versão de produção.

### 4. Otimização de Imagens
- **Formatos Modernos**: O helper do Sanity foi configurado com `.auto('format')`, servindo imagens em **WebP** ou **AVIF** quando suportado.
- **WhatsApp Support**: Adicionamos tags específicas (`itemprop="image"` e `og:image:secure_url`) e garantimos que as imagens base de OG estejam seguindo os padrões de visualização (1200x630).

---

## 📈 Guia de Manutenção

### Adicionando novas páginas para SEO
Ao criar uma nova página, envolva o conteúdo com o componente `SEOHead`:

```tsx
<SEOHead 
  title="Novo Título"
  description="Descrição curta da página"
  url="/nova-rota"
/>
```

### Atualizando o Sitemap
Sempre que houver mudanças estruturais no Sanity ou novas rotas no frontend, rode:
```bash
npm run sitemap
```

### Configurações Necessárias (Environment Variables)
Para que o gerador de sitemap funcione corretamente, certifique-se de que as variáveis abaixo estão no seu `.env`:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

---

## 🔍 Ferramentas de Monitoramento Recomendadas
1. **Google Search Console**: Para monitorar indexação e erros de sitemap.
2. **Google Search Console Placeholder**: A tag de verificação já está no `index.html`. Substitua o ID pelo real gerado no console.
3. **Plausible / GA4**: Configurado via GTM no `index.html`.
