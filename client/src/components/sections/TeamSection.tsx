import { useState, useEffect } from "react";
import { useAboutSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

function TeamModal({ m, onClose, index, labels }: { m: any; onClose: () => void, index: number, labels?: any }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/70 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.98 }}
        className="relative w-full max-w-6xl h-[90vh] md:h-[80vh] bg-[var(--paper)] rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LADO ESQUERDO: IMAGEM E NOME */}
        <div className="w-full md:w-[45%] h-[40%] md:h-auto relative bg-[var(--ink)] overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-neutral-900 overflow-hidden">
            {m.image && (
              <ImageWithFallback
                src={urlFor(m.image).url()}
                fallbackSrc="/placeholder-person.jpg"
                alt={m.name}
                className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 group-hover:scale-110 transition-transform duration-1000"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>
          
          <div className="absolute top-10 left-10 md:top-14 md:left-14 flex flex-col gap-4">
            <div className="font-mono text-[9px] md:text-[11px] tracking-[0.4em] text-white/40 uppercase">Ficha Técnica · 0{index + 1}</div>
            <div className="w-12 h-px bg-[var(--gold)]/50" />
          </div>

          <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16 right-10">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="font-mono text-[10px] md:text-[12px] text-[var(--gold)] tracking-[0.3em] uppercase block mb-4 font-bold">{m.role}</span>
              <h2 className="font-display font-extrabold text-white text-5xl md:text-7xl leading-[0.85] uppercase tracking-tighter drop-shadow-2xl">{m.name}</h2>
            </motion.div>
          </div>

          <button onClick={onClose} className="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group z-10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-90 transition-transform duration-500"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* LADO DIREITO: CONTEÚDO */}
        <div className="flex-1 relative p-10 md:p-20 overflow-y-auto overflow-x-hidden bg-[var(--paper)] grain scrollbar-hide">
          {/* Elemento Decorativo: Número de Fundo */}
          <div className="absolute top-0 right-0 font-display font-black text-[300px] leading-none opacity-[0.02] translate-x-1/4 -translate-y-1/4 pointer-events-none select-none">
            0{index + 1}
          </div>

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-10 md:mb-14">
                <div className="w-10 h-px bg-[var(--azul)]" />
                <span className="font-mono text-[11px] tracking-[0.3em] text-[var(--azul)] uppercase font-extrabold italic">
                  {labels?.modalExpertiseLabel || "Trajetória e Expertise"}
                </span>
              </div>
              
              {m.bio && (
                <div className="font-serif-it italic text-[clamp(24px,3vw,36px)] text-[var(--ink)]/90 leading-tight mb-10 md:mb-14" style={{fontFamily:'Fraunces'}}>
                  "{m.bio.substring(0, 100)}..."
                </div>
              )}

              <p className="text-[17px] md:text-[20px] leading-[1.7] text-[var(--ink)]/80 font-medium whitespace-pre-wrap max-w-[60ch]">
                {m.bio || '...'}
              </p>
            </div>

            <div className="mt-16">
              <button className="px-14 py-7 rounded-full bg-[var(--ink)] text-white font-mono text-[12px] tracking-[0.4em] uppercase hover:bg-[var(--azul)] hover:-translate-y-1 transition-all duration-300 shadow-2xl" onClick={onClose}>
                {labels?.modalCloseLabel || "Fechar Perfil"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSection(){
  const { data: aboutData, isLoading } = useAboutSection();
  const [active, setActive] = useState<{ member: any, index: number } | null>(null);
  
  const section = aboutData?.teamSection;
  const team = section?.members || [];

  if (isLoading) return null;

  return (
    <section id="equipe" className="relative min-h-screen bg-[var(--paper)] overflow-x-hidden md:overflow-y-hidden flex flex-col justify-center py-20 md:py-0 md:h-screen">
      <div className="px-8 max-w-[1500px] mx-auto w-full flex flex-col h-full pt-[clamp(60px,7vh,90px)] pb-10 md:pb-16">
        
        <div className="flex flex-col gap-2 mb-8 md:mb-10 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.4em] opacity-30 uppercase">Cap / 03</span>
            <div className="w-8 h-px bg-[var(--ink)]/20" />
            <span className="font-mono text-[11px] tracking-[0.3em] opacity-70 uppercase">
              {section?.label || "Nossa Equipe Técnica"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end mb-8 md:mb-12 shrink-0">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(40px,6vw,80px)]">
              {section?.title ? (
                <>
                  {(() => {
                    const parts = section.title.split(' ').filter(Boolean);
                    if (parts.length >= 2) {
                      return (
                        <>
                          <span className="block uppercase">{parts.slice(0, -2).join(' ')} {parts[parts.length-2]}</span>
                          <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300, display:'block', textTransform: 'none'}}>
                            {parts[parts.length-1].toLowerCase()}
                          </span>
                        </>
                      );
                    }
                    return <span className="block uppercase">{section.title}</span>;
                  })()}
                </>
              ) : (
                <>
                  <span className="block uppercase">QUEM ABRE</span>
                  <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>os caminhos.</span>
                </>
              )}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 self-center">
            <p className="text-[12px] md:text-[14px] leading-[1.6] opacity-65 max-w-[36ch]">
              {section?.description}
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center min-h-0 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-[950px] mx-auto">
            {team.map((m: any, i: number) => {
              const rotations = [-2.5, 2, -1.8];
              const offsets = ['md:mt-0', 'md:mt-12', 'md:mt-6'];
              
              return (
                <article key={i} 
                  onClick={() => setActive({ member: m, index: i })}
                  data-cursor="link"
                  className={`relative aspect-[3/4.1] group cursor-pointer overflow-hidden rounded-[24px] grain bg-[var(--ink)] ${offsets[i]}`}
                  style={{ 
                    boxShadow: '0 15px 45px -10px rgba(15,17,22,0.3)',
                    transform: `rotate(${rotations[i]}deg)`,
                    transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)'
                  }}
                >
                  <div className="absolute inset-0">
                    {m.image && (
                      <ImageWithFallback
                        src={urlFor(m.image).url()}
                        fallbackSrc="/placeholder-person.jpg"
                        alt={m.name}
                        className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent transition-opacity group-hover:opacity-100" />
                  </div>

                  <div className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.3em] text-white/50 uppercase">COACH · 0{i+1}</div>
                  
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-[var(--gold)] mb-1 font-bold">{m.role}</div>
                    <h3 className="font-display font-extrabold text-white text-[18px] md:text-[23px] leading-[0.95] tracking-tight uppercase">{m.name}</h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <TeamModal m={active.member} index={active.index} onClose={() => setActive(null)} labels={section} />
        )}
      </AnimatePresence>
    </section>
  );
}

