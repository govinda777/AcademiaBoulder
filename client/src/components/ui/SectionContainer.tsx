import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  fullHeight?: boolean;
}

export function SectionContainer({
  children,
  id,
  className = "",
  dark = false,
  fullHeight = false
}: SectionContainerProps) {
  return (
    <section
      id={id}
      data-theme={dark ? "dark" : "light"}
      className={`relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden ${fullHeight ? 'min-h-screen flex flex-col justify-center py-12 md:py-0 md:h-screen' : ''} ${className}`}
      style={dark ? { background: 'var(--ink)', color: 'var(--paper)' } : {}}
    >
      <div className="relative px-8 max-w-[1700px] mx-auto w-full">
        {children}
      </div>
    </section>
  );
}
