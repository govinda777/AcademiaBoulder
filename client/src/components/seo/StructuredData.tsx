import { Helmet } from 'react-helmet';

interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  image: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone: string;
  email: string;
  sameAs: string[];
  contactPoint: {
    '@type': string;
    contactType: string;
    email: string;
  };
  priceRange: string;
}

interface CourseSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  image: string;
  instructor: {
    '@type': string;
    name: string;
  };
  courseCode: string;
  duration: string;
  level: string;
}

interface EventSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    '@type': string;
    name: string;
    address: {
      '@type': string;
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
    };
  };
  organizer: {
    '@type': string;
    name: string;
    url: string;
  };
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

interface StructuredDataProps {
  type: 'localBusiness' | 'course' | 'event' | 'breadcrumb';
  data: LocalBusinessSchema | CourseSchema | EventSchema | BreadcrumbSchema;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
}

// Helper functions para criar schemas

export const createLocalBusinessSchema = (): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Academia Boulder',
  description: 'Academia de escalada com tecnologia Web3 em São Paulo',
  url: 'https://academiaboulder.com',
  image: 'https://academiaboulder.com/og-image.png',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jardim São Carlos',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '04850-000',
    addressCountry: 'BR',
  },
  telephone: '+55-11-99999-9999',
  email: 'contato@academiaboulder.com',
  sameAs: [
    'https://instagram.com/academiaboulder',
    'https://github.com/govinda777/AcademiaBoulder',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'contato@academiaboulder.com',
  },
  priceRange: 'R$ 100 - R$ 500',
});

export const createCourseSchema = (
  name: string,
  description: string,
  image: string,
  level: string = 'Beginner'
): CourseSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  image,
  instructor: {
    '@type': 'Person',
    name: 'Academia Boulder',
  },
  courseCode: `COURSE-${Date.now()}`,
  duration: 'P12W',
  level,
});

export const createEventSchema = (
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  location: string
): EventSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name,
  description,
  startDate,
  endDate,
  location: {
    '@type': 'Place',
    name: location,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jardim São Carlos',
      addressLocality: 'São Paulo',
      addressRegion: 'SP',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'Academia Boulder',
    url: 'https://academiaboulder.com',
  },
});

export const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
): BreadcrumbSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
