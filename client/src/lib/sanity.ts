import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4y88u6cf',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source).auto('format')
}

// Queries para buscar conteúdo
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    siteName,
    siteDescription,
    logo,
    contactInfo,
    socialMedia
  }`,
  
  heroSection: `*[_type == "heroSection"][0]{
    tagline,
    subtitle,
    title,
    backgroundImage,
    backgroundVideo {
      asset-> {
        url
      }
    },
    gripLabels,
    ctaButtons[]{
      text,
      link,
      variant
    }
  }`,
  
  programs: `*[_type == "program"] | order(order asc){
    _id,
    title,
    slug,
    description,
    shortDescription,
    image,
    features[],
    levels[]{
      level,
      description,
      skills[]
    },
    schedule{
      days,
      times,
      duration
    },
    pricing{
      monthly,
      quarterly,
      annual
    }
  }`,

  program: `*[_type == "program" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    shortDescription,
    image,
    features[],
    levels[]{
      level,
      description,
      skills[]
    },
    schedule{
      days,
      times,
      duration
    },
    pricing{
      monthly,
      quarterly,
      annual
    }
  }`,
  
  about: `*[_type == "aboutSection"][0]{
    mainSection {
      label,
      title,
      description,
      mission,
      vision,
      values[],
      pillarIcons,
      missionLabel,
      visionLabel,
      valuesLabel
    },
    teamSection {
      label,
      title,
      description,
      modalExpertiseLabel,
      modalCloseLabel,
      cardLabel,
      technicalLabel,
      members[] {
        name,
        role,
        bio,
        image
      }
    },
    facilitiesSection {
      label,
      title,
      description,
      capacityLabel,
      items[] {
        name,
        description,
        image
      }
    },
    facilities[] {
      name,
      description,
      image
    }
  }`,
  
  programSection: `*[_type == "programSection"][0]{
    label,
    title,
    subtitle,
    description,
    cardPalettes[]{
      bg,
      text
    },
    modalLabels{
      summary,
      included,
      questions,
      contactUs,
      cta
    }
  }`,
  
  faq: `*[_type == "faqSection"][0]{
    label,
    title,
    subtitle,
    footer,
    faqs[]{
      question,
      answer
    }
  }`,
  
  contact: `*[_type == "contactSection"][0]{
    label,
    title,
    subtitle,
    titlePart2,
    titlePart3,
    titlePart3Accent,
    description,
    column1Label,
    column2Label,
    column3Label,
    formInterests
  }`
}