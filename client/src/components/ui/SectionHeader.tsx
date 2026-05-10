interface SectionHeaderProps {
  chapter: string;
  label: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({ chapter, label, className = "", dark = false }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`font-mono text-[11px] tracking-[0.4em] uppercase ${dark ? 'text-[var(--azul)] opacity-50' : 'opacity-30'}`}>
        Cap / {chapter}
      </span>
      <div className={`w-8 h-px ${dark ? 'bg-white/20' : 'bg-[var(--ink)]/20'}`} />
      <span className={`font-mono text-[11px] tracking-[0.3em] uppercase ${dark ? 'font-bold' : 'opacity-70'}`}>
        {label}
      </span>
    </div>
  );
}
