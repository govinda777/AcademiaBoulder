import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4y88u6cf',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
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
    title,
    subtitle,
    backgroundImage,
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
  
  events: `*[_type == "event"] | order(date asc){
    _id,
    title,
    slug,
    description,
    fullDescription,
    date,
    image,
    location,
    capacity,
    price,
    categories[]{
      name,
      requirements,
      prizes
    },
    schedule[]{
      time,
      activity
    },
    speakers[]->{
      name,
      role,
      bio,
      image
    },
    requirements[]
  }`,
  
  about: `*[_type == "aboutSection"][0]{
    mainSection {
      title,
      description,
      mission,
      vision,
      values[],
      "mainImageUrl": mainImage.asset->url
    },
    teamSection {
      title,
      members[] {
        name,
        role,
        bio,
        "imageUrl": image.asset->url
      }
    },
    safetySection {
      title,
      description,
      stats[] {
        value,
        label,
        description
      },
      buttonText
    },
    highlights[] {
      title,
      description,
      icon
    },
    facilities[] {
      name,
      description,
      "imageUrl": image.asset->url
    }
  }`,
  
  community: `*[_type == "communitySection"][0]{
    title,
    description,
    instagramFeed[]{
      image,
      caption,
      link
    },
    testimonials[]{
      name,
      text,
      image,
      rating
    }
  }`,
  
  faq: `*[_type == "faqSection"][0]{
    title,
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
  }`,
  
  scheduling: `*[_type == "schedulingSection"][0]{
    title,
    description,
    buttonText,
    modalTitle,
    modalDescription,
    calendarUrl,
    availableSlots[]{
      day,
      timeSlots
    },
    notes
  }`
}