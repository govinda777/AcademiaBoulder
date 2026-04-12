import { PortableText as SanityPortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'
import { ImageWithFallback } from '@/components/ui/ImageWithFallback'

const components = {
  types: {
    image: ({ value }: any) => (
      <ImageWithFallback
        src={urlFor(value).url()}
        fallbackSrc="/placeholder-image.jpg"
        alt={value.alt || ''}
        className="rounded-lg shadow-lg max-w-full h-auto my-4"
      />
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-4 boulder-gradient-text">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-3 text-primary">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-semibold mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-semibold mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-boulder-gold pl-4 my-4 italic text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-primary hover:text-primary/80 underline transition-colors"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-bold text-boulder-gold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="ml-4">{children}</li>,
    number: ({ children }: any) => <li className="ml-4">{children}</li>,
  },
}

interface PortableTextProps {
  value: any
  className?: string
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null
  
  return (
    <div className={className}>
      <SanityPortableText value={value} components={components} />
    </div>
  )
}