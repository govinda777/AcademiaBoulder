# Guia de SEO - Academia Boulder

Este documento descreve as melhores práticas de SEO implementadas no projeto Academia Boulder.

## 📋 Sumário

1. [Meta Tags](#meta-tags)
2. [Structured Data](#structured-data)
3. [Robots.txt & Sitemap](#robotstxt--sitemap)
4. [Implementação em Componentes](#implementação-em-componentes)
5. [Checklist de SEO](#checklist-de-seo)

---

## Meta Tags

### Componente SEOHead

O componente `SEOHead` gerencia todas as meta tags essenciais para SEO usando `react-helmet`.

**Arquivo:** `client/src/components/seo/SEOHead.tsx`

**Propriedades:**

```typescript
interface SEOHeadProps {
  title: string;              // Título da página
  description: string;        // Meta description (155-160 caracteres)
  image?: string;            // OG Image URL
  url?: string;              // URL canônica
  author?: string;           // Autor do conteúdo
  publishDate?: string;      // Data de publicação
  keywords?: string;         // Keywords (separadas por vírgula)
  type?: 'website' | 'article' | 'profile';
}
```

### Exemplo de Uso

```typescript
import { SEOHead } from '@/components/seo';

export function HomePage() {
  return (
    <>
      <SEOHead
        title="Home"
        description="Academia de escalada com tecnologia Web3 em São Paulo"
        keywords="escalada, academia, São Paulo, Web3"
        image="https://academiaboulder.com/og-image.png"
      />
      {/* Conteúdo da página */}
    </>
  );
}
```

**O que é incluído automaticamente:**

- ✅ `<title>` tag
- ✅ `<meta name="description">`
- ✅ Open Graph tags (`og:title`, `og:description`, `og:image`, etc.)
- ✅ Twitter Card tags
- ✅ Canonical URL
- ✅ Language alternatives (hreflang)
- ✅ Favicon
- ✅ Schema.org LocalBusiness

---

## Structured Data

### Componente StructuredData

Implementa JSON-LD para melhor indexação por search engines.

**Arquivo:** `client/src/components/seo/StructuredData.tsx`

**Tipos suportados:**

1. **LocalBusiness** - Para a página inicial
2. **Course** - Para páginas de programas/aulas
3. **Event** - Para páginas de eventos
4. **Breadcrumb** - Para navegação estruturada

### Exemplos de Uso

#### LocalBusiness (Home)

```typescript
import { StructuredData, createLocalBusinessSchema } from '@/components/seo';

export function HomePage() {
  const schema = createLocalBusinessSchema();
  
  return (
    <>
      <StructuredData type="localBusiness" data={schema} />
      {/* Conteúdo */}
    </>
  );
}
```

#### Course (Página de Programa)

```typescript
import { StructuredData, createCourseSchema } from '@/components/seo';

export function ProgramDetails({ program }) {
  const schema = createCourseSchema(
    program.name,
    program.description,
    program.image,
    'Beginner' // nível
  );
  
  return (
    <>
      <StructuredData type="course" data={schema} />
      {/* Conteúdo */}
    </>
  );
}
```

#### Event (Página de Evento)

```typescript
import { StructuredData, createEventSchema } from '@/components/seo';

export function EventDetails({ event }) {
  const schema = createEventSchema(
    event.name,
    event.description,
    event.startDate,
    event.endDate,
    event.location
  );
  
  return (
    <>
      <StructuredData type="event" data={schema} />
      {/* Conteúdo */}
    </>
  );
}
```

#### Breadcrumb (Navegação)

```typescript
import { StructuredData, createBreadcrumbSchema } from '@/components/seo';

const breadcrumbs = [
  { name: 'Home', url: 'https://academiaboulder.com/' },
  { name: 'Programas', url: 'https://academiaboulder.com/programas' },
  { name: 'Nome do Programa', url: 'https://academiaboulder.com/programas/123' },
];

const schema = createBreadcrumbSchema(breadcrumbs);
```

---

## Robots.txt & Sitemap

### robots.txt

**Localização:** `client/public/robots.txt`

Configura quais páginas os search engines podem indexar:

```
User-agent: *
Allow: /                    # Permitir todas as páginas
Disallow: /admin            # Bloquear seção admin
Disallow: /dashboard        # Bloquear dashboard
Disallow: /api              # Bloquear endpoints API

Sitemap: https://academiaboulder.com/sitemap.xml
```

### Sitemap XML

Precisa ser criado dinamicamente com as páginas do site.

**Exemplo de estrutura:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://academiaboulder.com/</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://academiaboulder.com/programas/1</loc>
    <lastmod>2026-02-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## Implementação em Componentes

### Passo 1: Atualizar Home Page

```typescript
// client/src/pages/home.tsx
import { SEOHead, StructuredData, createLocalBusinessSchema } from '@/components/seo';

export default function Home() {
  const schema = createLocalBusinessSchema();

  return (
    <>
      <SEOHead
        title="Home"
        description="Academia de escalada com tecnologia Web3"
        keywords="escalada, academia, São Paulo"
      />
      <StructuredData type="localBusiness" data={schema} />
      {/* Conteúdo existente */}
    </>
  );
}
```

### Passo 2: Atualizar Program Details

```typescript
// client/src/pages/program-details.tsx
import { SEOHead, StructuredData, createCourseSchema } from '@/components/seo';

export default function ProgramDetails({ id }) {
  const program = useFetchProgram(id);
  const schema = createCourseSchema(
    program?.name || '',
    program?.description || '',
    program?.image || ''
  );

  return (
    <>
      <SEOHead
        title={program?.name || 'Programa'}
        description={program?.description || ''}
        image={program?.image}
        url={`/programas/${id}`}
      />
      <StructuredData type="course" data={schema} />
      {/* Conteúdo existente */}
    </>
  );
}
```

---

## Checklist de SEO

### ✅ On-Page SEO

- [ ] Título único e descritivo (50-60 caracteres)
- [ ] Meta description (155-160 caracteres)
- [ ] Keywords relevantes
- [ ] Heading H1 único por página
- [ ] Headings H2-H6 estruturados
- [ ] Imagens com alt text
- [ ] Links internos relevantes
- [ ] URL amigável

### ✅ Technical SEO

- [x] Meta tags completos
- [x] Open Graph tags
- [x] Twitter Card
- [x] Structured Data (JSON-LD)
- [x] Robots.txt
- [ ] Sitemap XML
- [x] Canonical URLs
- [x] Language alternates (hreflang)

### ✅ Performance

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals Green
- [ ] Tempo de carregamento < 3s
- [ ] Imagens otimizadas
- [ ] CSS/JS minificados

### ✅ Mobile SEO

- [x] Mobile responsive
- [ ] Mobile-first indexing
- [ ] Touch-friendly buttons
- [ ] Fast mobile loading

### ✅ Content SEO

- [ ] Conteúdo original
- [ ] Paragrafos bem estruturados
- [ ] FAQ Schema
- [ ] Internal linking strategy

### ✅ Social & Backlinks

- [ ] Social media integration
- [ ] Share buttons
- [ ] Backlinks de qualidade
- [ ] Citations locais

---

## Próximos Passos

1. **Gerar Sitemap XML dinâmico**
   - Criar gerador de sitemap com dados do Sanity
   - Atualizar automático em cada deploy

2. **Implementar FAQ Schema**
   - Adicionar FAQ em páginas de programas
   - FAQ Schema para perguntas frequentes

3. **Otimizar Performance**
   - Implementar image lazy loading
   - Cache headers
   - CDN para static assets

4. **Integração Google Search Console**
   - Submeter sitemap
   - Monitorar indexação
   - Analisar queries

5. **Integração Google Analytics 4**
   - Rastrear conversões
   - Analisar comportamento do usuário
   - Setup de eventos

---

## Recursos Úteis

- [Google SEO Starter Guide](https://developers.google.com/search/docs)
- [Schema.org Documentation](https://schema.org)
- [Open Graph Protocol](https://ogp.me)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [React Helmet Documentation](https://github.com/nfl/react-helmet)
