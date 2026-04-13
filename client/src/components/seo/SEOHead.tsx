import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;  
  image?: string;
  url?: string;
  author?: string;
  publishDate?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  canonical?: string;
}

export function SEOHead({
  title,
  description,
  image,
  url,
  author,
  publishDate,
  keywords,
  type = 'website',
  canonical,
}: SEOHeadProps) {
  const baseUrl = 'https://academiaboulder.com';
  const fullUrl = url ? `${baseUrl}${url.startsWith('/') ? url : `/${url}`}` : baseUrl;
  const ogImage = image || `${baseUrl}/og-image.jpg`;
  const siteTitle = 'Academia Boulder';
  const displayTitle = `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="pt-BR" />
      <title>{displayTitle}</title>
      <meta name="title" content={displayTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || siteTitle} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical */}
      <link rel="canonical" href={canonical || fullUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/generated-icon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* WhatsApp / Search Engine Image */}
      <meta itemProp="image" content={ogImage} />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="pt-BR" href={fullUrl} />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.sanity.io" />

      {/* Article Meta Tags */}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {author && <meta property="article:author" content={author} />}
    </Helmet>
  );
}
