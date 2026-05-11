import { ReactNode } from "react";

interface SectionTitleProps {
  mainTitle?: string;
  highlightedTitle?: string;
  className?: string;
  dark?: boolean;
  children?: ReactNode;
}

export function SectionTitle({ mainTitle, highlightedTitle, className = "", dark = false, children }: SectionTitleProps) {
  return (
    <h2 className={`font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(32px,5vw,72px)] ${className}`}>
      {children || (
        <>
          <span className="block uppercase">{mainTitle}</span>
          {highlightedTitle && (
            <span className="block">
              <span
                className="font-serif-it italic text-[var(--azul)]"
                style={{ fontFamily: 'Fraunces', fontStyle: 'italic', fontWeight: 300, textTransform: 'none' }}
              >
                {highlightedTitle}
              </span>
            </span>
          )}
        </>
      )}
    </h2>
  );
}
