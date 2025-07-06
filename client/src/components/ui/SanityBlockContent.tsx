import { PortableText } from '@portabletext/react';
import { TypedObject } from '@portabletext/types';

interface SanityBlockContentProps {
  blocks: TypedObject | TypedObject[];
  className?: string;
}

export function SanityBlockContent({ blocks, className = '' }: SanityBlockContentProps) {
  if (!blocks) return null;
  
  return (
    <div className={`prose max-w-none ${className}`}>
      <PortableText
        value={blocks}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                {children}
              </blockquote>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li className="mb-2">{children}</li>,
            number: ({ children }) => <li className="mb-2">{children}</li>,
          },
        }}
      />
    </div>
  );
}
