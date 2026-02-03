# Exemplo de Implementação de SEO

Este documento mostra como integrar os componentes SEO na sua aplicação.

## Passo 1: Atualizar a Home Page

**Arquivo:** `client/src/pages/home.tsx`

```typescript
import { useEffect, useState } from 'react';
import { SEOHead, StructuredData, createLocalBusinessSchema } from '@/components/seo';
import { PAGE_SEO_DEFAULTS } from '@/lib/seo-config';

export default function Home() {
  const [programs, setPrograms] = useState([]);
  const schema = createLocalBusinessSchema();

  useEffect(() => {
    // Fetch programas do Sanity
    fetchPrograms();
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title={PAGE_SEO_DEFAULTS.home.title}
        description={PAGE_SEO_DEFAULTS.home.description}
        keywords={PAGE_SEO_DEFAULTS.home.keywords}
        type="website"
      />

      {/* Structured Data - Local Business */}
      <StructuredData type="localBusiness" data={schema} />

      {/* Seu conteúdo */}
      <main>
        <h1>Bem-vindo à Academia Boulder</h1>
        <p>Sistema de gerenciamento para academias de escalada</p>
        
        {/* Rest of your content */}
      </main>
    </>
  );
}
```

---

## Passo 2: Atualizar Página de Programa

**Arquivo:** `client/src/pages/program-details.tsx`

```typescript
import { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { SEOHead, StructuredData, createCourseSchema, createBreadcrumbSchema } from '@/components/seo';
import { createMetaDescription, getCanonicalUrl } from '@/lib/seo-config';

interface Program {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
}

export default function ProgramDetails() {
  const [route, params] = useRoute('/programas/:id');
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.id) {
      fetchProgram(params.id);
    }
  }, [params?.id]);

  const fetchProgram = async (id: string) => {
    try {
      // Buscar dados do Sanity
      const data = await fetch(`/api/programs/${id}`).then(r => r.json());
      setProgram(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar programa:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!program) return <div>Programa não encontrado</div>;

  // Criar schema do curso
  const courseSchema = createCourseSchema(
    program.name,
    createMetaDescription(program.description, 160),
    program.image,
    program.level
  );

  // Criar breadcrumb
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: getCanonicalUrl('/') },
    { name: 'Programas', url: getCanonicalUrl('/programas') },
    { name: program.name, url: getCanonicalUrl(`/programas/${program.slug}`) },
  ]);

  return (
    <>
      {/* Meta Tags Dinâmicos */}
      <SEOHead
        title={program.name}
        description={createMetaDescription(program.description)}
        image={program.image}
        url={`/programas/${program.slug}`}
        author={program.instructor}
        keywords={`${program.name}, escalada, ${program.level}, treinamento`}
        type="article"
      />

      {/* Structured Data */}
      <StructuredData type="course" data={courseSchema} />
      <StructuredData type="breadcrumb" data={breadcrumbSchema} />

      {/* Conteúdo */}
      <main>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/programas">Programas</a></li>
            <li aria-current="page">{program.name}</li>
          </ol>
        </nav>

        <article>
          <h1>{program.name}</h1>
          <img
            src={program.image}
            alt={`${program.name} - Imagem do programa`}
            title={program.name}
          />
          <p>{program.description}</p>

          <div className="metadata">
            <p><strong>Instrutora:</strong> {program.instructor}</p>
            <p><strong>Nível:</strong> {program.level}</p>
            <p><strong>Duração:</strong> {program.duration}</p>
          </div>

          {/* Rest of your content */}
        </article>
      </main>
    </>
  );
}
```

---

## Passo 3: Atualizar Página de Evento

**Arquivo:** `client/src/pages/event-details.tsx`

```typescript
import { useRoute } from 'wouter';
import { SEOHead, StructuredData, createEventSchema, createBreadcrumbSchema } from '@/components/seo';
import { createMetaDescription, getCanonicalUrl } from '@/lib/seo-config';

interface Event {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
}

export default function EventDetails() {
  const [route, params] = useRoute('/eventos/:id');
  const [event, setEvent] = useState<Event | null>(null);

  // ... fetch event ...

  if (!event) return <div>Evento não encontrado</div>;

  // Criar schema do evento
  const eventSchema = createEventSchema(
    event.name,
    createMetaDescription(event.description),
    event.startDate,
    event.endDate,
    event.location
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: getCanonicalUrl('/') },
    { name: 'Eventos', url: getCanonicalUrl('/eventos') },
    { name: event.name, url: getCanonicalUrl(`/eventos/${event.slug}`) },
  ]);

  return (
    <>
      <SEOHead
        title={event.name}
        description={createMetaDescription(event.description)}
        image={event.image}
        url={`/eventos/${event.slug}`}
        author={event.organizer}
        type="article"
      />

      <StructuredData type="event" data={eventSchema} />
      <StructuredData type="breadcrumb" data={breadcrumbSchema} />

      <main>
        <h1>{event.name}</h1>
        <img src={event.image} alt={event.name} />
        <p>{event.description}</p>

        <div className="event-details">
          <p><strong>Data:</strong> {new Date(event.startDate).toLocaleDateString('pt-BR')}</p>
          <p><strong>Local:</strong> {event.location}</p>
          <p><strong>Organizador:</strong> {event.organizer}</p>
        </div>
      </main>
    </>
  );
}
```

---

## Passo 4: Adicionar Validadores de SEO em Desenvolvimento

**Arquivo:** `client/src/lib/seo-validators.ts`

```typescript
import {
  isValidTitle,
  isValidDescription,
  SEO_VALIDATION,
} from '@/lib/seo-config';

/**
 * Validação de SEO para desenvolvimento
 * Use em testes ou em um componente de debug
 */
export function validatePageSEO(title: string, description: string) {
  const titleValidation = isValidTitle(title);
  const descriptionValidation = isValidDescription(description);

  console.log('=== SEO Validation ===' );
  console.log(`Título (${title.length}/${SEO_VALIDATION.title.max}):`, titleValidation.message);
  console.log(`Description (${description.length}/${SEO_VALIDATION.description.max}):`, descriptionValidation.message);

  return {
    valid: titleValidation.valid && descriptionValidation.valid,
    title: titleValidation,
    description: descriptionValidation,
  };
}

/**
 * Log de debug para desenvolvedores
 */
export function logSEODebug(
  pageName: string,
  title: string,
  description: string,
  keywords?: string
) {
  if (process.env.NODE_ENV !== 'development') return;

  console.group(`🔍 SEO Debug: ${pageName}`);
  console.log('Título:', title);
  console.log('Description:', description);
  console.log('Keywords:', keywords || 'N/A');
  
  const validation = validatePageSEO(title, description);
  if (!validation.valid) {
    console.warn('⚠️ SEO Issues detected!');
  }
  console.groupEnd();
}
```

---

## Passo 5: Usar em Componentes Simples

Para componentes que não são páginas completas, você pode fazer apenas o SEOHead:

```typescript
// client/src/pages/about.tsx
import { SEOHead } from '@/components/seo';

export default function About() {
  return (
    <>
      <SEOHead
        title="Sobre Nós"
        description="Conheça a história da Academia Boulder e nossa missão de promover escalada."
        keywords="sobre, academia, história"
      />
      
      <main>
        {/* Seu conteúdo */}
      </main>
    </>
  );
}
```

---

## Checklist de Integração

- [ ] Adicionar SEOHead em home.tsx
- [ ] Adicionar SEOHead em program-details.tsx
- [ ] Adicionar SEOHead em event-details.tsx
- [ ] Adicionar SEOHead em not-found.tsx (404)
- [ ] Adicionar StructuredData em páginas relevantes
- [ ] Testar meta tags com navegador inspector
- [ ] Validar schema com schema.org validator
- [ ] Testar OpenGraph com Facebook Debugger
- [ ] Testar Twitter Card com Twitter Card Validator
- [ ] Executar Lighthouse audit
- [ ] Verificar no Google Search Console

---

## Ferramentas de Teste

### 1. Validar Schema.org
```
https://validator.schema.org/
```

### 2. Testar Open Graph
```
https://developers.facebook.com/tools/debug/
```

### 3. Testar Twitter Card
```
https://cards-dev.twitter.com/validator
```

### 4. Google Lighthouse
```
https://developers.google.com/web/tools/lighthouse
```

### 5. Google Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```

---

## Troubleshooting

### Meta tags não aparecem

1. Verifique se react-helmet está instalado
2. Verifique se SEOHead está dentro de Helmet Provider
3. Inspeccione o <head> no navegador

### Schema não é validado

1. Use https://validator.schema.org/
2. Verifique sintaxe JSON
3. Verifique tipos de schema usados

### Performance degradado

1. Verifique tamanho das imagens OG
2. Use lazy loading para componentes pesados
3. Otimize bundle com code splitting

---

**Dicas:**
- Mantenha SEOHead sempre no topo da página
- Use helpers do seo-config para consistência
- Teste regularmente com ferramentas do Google
- Mantenha meta descriptions únicas e descritivas
