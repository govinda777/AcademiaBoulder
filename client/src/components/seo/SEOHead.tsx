import { Helmet } from 'react-helmet';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  author?: string;
  publishDate?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
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
}: SEOHeadProps) {
  const baseUrl = 'https://academiaboulder.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const ogImage = image || `${baseUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="pt-BR" />
      <title>{title} | Academia Boulder</title>
      <meta name="title" content={`${title} | Academia Boulder`} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || 'Academia Boulder'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="charset" content="utf-8" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={`${title} | Academia Boulder`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Academia Boulder" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={`${title} | Academia Boulder`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#000000" />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Alternate Languages */}
      <link rel="alternate" hrefLang="pt-BR" href={fullUrl} />

      {/* Preconnect */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Article Meta Tags */}
      {publishDate && <meta property="article:published_time" content={publishDate} />}
      {author && <meta property="article:author" content={author} />}

      {/* Structured Data - Local Business */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Academia Boulder',
          description: 'Academia de escalada e treinamento com tecnologia Web3',
          url: baseUrl,
          image: ogImage,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jardim São Carlos',
            addressLocality: 'São Paulo',
            addressRegion: 'SP',
            postalCode: '04850',
            addressCountry: 'BR',
          },
          telephone: '+55-11-99999-9999',
          sameAs: [
            'https://instagram.com/academiaboulder',
            'https://github.com/govinda777/AcademiaBoulder',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            email: 'contato@academiaboulder.com',
          },
        })}
      </script>
    </Helmet>
  );
}
