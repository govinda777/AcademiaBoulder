/**
 * Configuração centralizada de SEO
 * Use esses valores em todo o projeto para consistência
 */

export const SEO_CONFIG = {
  site: {
    name: 'Academia Boulder',
    description: 'Sistema de gerenciamento para academias e clubes de escalada com tecnologia Web3',
    url: 'https://academiaboulder.com',
    image: 'https://academiaboulder.com/og-image.png',
    twitterHandle: '@academiaboulder',
    locale: 'pt-BR',
  },
  
  contact: {
    email: 'contato@academiaboulder.com',
    phone: '+55-11-99999-9999',
    address: {
      street: 'Jardim São Carlos',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brazil',
      postalCode: '04850-000',
    },
  },

  social: {
    instagram: 'https://instagram.com/academiaboulder',
    github: 'https://github.com/govinda777/AcademiaBoulder',
    facebook: 'https://facebook.com/academiaboulder',
    linkedin: 'https://linkedin.com/company/academia-boulder',
  },

  keywords: {
    primary: 'escalada, academia, treinamento',
    secondary: 'São Paulo, Web3, sports',
  },
} as const;

/**
 * Helper para criar meta description com limite de caracteres
 */
export function createMetaDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Helper para criar URL canônica
 */
export function getCanonicalUrl(path: string = ''): string {
  return `${SEO_CONFIG.site.url}${path}`;
}

/**
 * Helper para criar OG Image URL
 */
export function getOGImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return SEO_CONFIG.site.image;
  }
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `${SEO_CONFIG.site.url}${imagePath}`;
}

/**
 * Helper para combinar titulo e site name
 */
export function createTitle(pageTitle: string, includeSiteName: boolean = true): string {
  if (!includeSiteName) {
    return pageTitle;
  }
  return `${pageTitle} | ${SEO_CONFIG.site.name}`;
}

/**
 * Helper para criar keywords
 */
export function createKeywords(...keywords: string[]): string {
  return [
    ...keywords,
    SEO_CONFIG.keywords.primary,
    SEO_CONFIG.keywords.secondary,
  ].join(', ');
}

/**
 * Configurações de meta tags padrão por tipo de página
 */
export const PAGE_SEO_DEFAULTS = {
  home: {
    title: 'Academia Boulder - Sistema de Gerenciamento para Academias de Escalada',
    description: 'Academia de escalada com tecnologia Web3. Gerenciamento completo, check-in, agendamento de aulas, gestão de pagamentos.',
    keywords: createKeywords('Academia Boulder', 'escalada'),
  },
  
  programs: {
    title: 'Programas de Treinamento | Academia Boulder',
    description: 'Conheça nossos programas de escalada e treinamento. Diferentes níveis e modalidades para todos.',
    keywords: createKeywords('programas', 'treinamento'),
  },
  
  events: {
    title: 'Eventos e Competições | Academia Boulder',
    description: 'Participe de eventos e competições de escalada. Confira datas, locais e como se inscrever.',
    keywords: createKeywords('eventos', 'competições'),
  },
  
  pricing: {
    title: 'Planos e Preços | Academia Boulder',
    description: 'Confira nossos planos de mensalidade e as melhores ofertas para você.',
    keywords: createKeywords('preços', 'planos'),
  },
  
  contact: {
    title: 'Contato | Academia Boulder',
    description: 'Entre em contato conosco. Tire suas dúvidas e saiba mais sobre nossos serviços.',
    keywords: createKeywords('contato', 'suporte'),
  },
  
  notFound: {
    title: 'Página não encontrada | Academia Boulder',
    description: 'A página que você procura não existe. Volte à página inicial.',
    keywords: createKeywords('404', 'não encontrado'),
  },
} as const;

/**
 * Validações de SEO
 */
export const SEO_VALIDATION = {
  title: {
    min: 30,
    max: 60,
    ideal: 'entre 50-60 caracteres',
  },
  
  description: {
    min: 120,
    max: 160,
    ideal: 'entre 150-160 caracteres',
  },
  
  keywords: {
    max: 5,
    ideal: '3-5 keywords',
  },
} as const;

/**
 * Helper para validar título
 */
export function isValidTitle(title: string): { valid: boolean; message: string } {
  if (title.length < SEO_VALIDATION.title.min) {
    return { valid: false, message: `Título muito curto (${title.length} < ${SEO_VALIDATION.title.min})` };
  }
  if (title.length > SEO_VALIDATION.title.max) {
    return { valid: false, message: `Título muito longo (${title.length} > ${SEO_VALIDATION.title.max})` };
  }
  return { valid: true, message: 'Título OK' };
}

/**
 * Helper para validar description
 */
export function isValidDescription(description: string): { valid: boolean; message: string } {
  if (description.length < SEO_VALIDATION.description.min) {
    return { valid: false, message: `Description muito curta (${description.length} < ${SEO_VALIDATION.description.min})` };
  }
  if (description.length > SEO_VALIDATION.description.max) {
    return { valid: false, message: `Description muito longa (${description.length} > ${SEO_VALIDATION.description.max})` };
  }
  return { valid: true, message: 'Description OK' };
}
