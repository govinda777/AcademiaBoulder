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
    label,
    title,
    backgroundImage,
    backgroundVideo {
      asset-> {
        url
      }
    },
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
    },
    instructors[]->{
      name,
      role,
      bio,
      image
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
    },
    instructors[]->{
      name,
      role,
      bio,
      image
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
      missionLabel,
      visionLabel,
      valuesLabel,
      mainImage
    },
    teamSection {
      label,
      title,
      description,
      modalExpertiseLabel,
      modalCloseLabel,
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
    description
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
    title,
    description,
    contactInfo{
      address,
      phone,
      email,
      hours
    },
    mapEmbed
  }`
}