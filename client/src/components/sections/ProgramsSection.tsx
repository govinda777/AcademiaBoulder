import { useRef, useState, useEffect } from "react";
import { usePrograms } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";

function ProgramModal({ p, onClose }: { p: any; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/60"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ y: 50, opacity: 0, scale: 0.95, rotateX: 10 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--paper)] rounded-[48px] overflow-hidden flex flex-col md:flex-row shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Visual Anchor */}
        <div className="w-full md:w-5/12 h-64 md:h-auto relative bg-[var(--ink)] overflow-hidden">
          {p.image && (
            <div className="absolute inset-0">
              <ImageWithFallback
                src={urlFor(p.image).url()}
                fallbackSrc="/placeholder-image.jpg"
                alt={p.title}
                className="w-full h-full object-cover opacity-70 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent" />
            </div>
          )}
          <div className="absolute bottom-10 left-10 right-10">
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/50 mb-3 block uppercase">Academia Boulder / Programas</span>
            <h2 className="font-display font-extrabold text-white text-[clamp(32px,5vw,64px)] leading-[0.85] tracking-tighter uppercase break-words">
              {p.title}
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-8 left-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-90 group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-90 transition-transform duration-500">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Right Side: Detailed Content */}
        <div className="flex-1 p-10 md:p-16 overflow-y-auto scrollbar-hide bg-[var(--paper)] flex flex-col">
          <div className="flex-1">
            <div className="font-mono text-[11px] tracking-[0.3em] text-[var(--azul)] mb-8 uppercase font-bold">Resumo & Detalhes</div>
            <div className="prose prose-neutral !max-w-none prose-p:leading-[1.7] prose-p:text-[var(--ink)]/80 prose-headings:font-display prose-headings:font-extrabold">
              <PortableText value={p.description} />
            </div>

            {p.features && (
              <div className="mt-12 pt-10 border-t border-[var(--ink)]/5">
                <div className="font-mono text-[10px] tracking-[0.3em] opacity-40 mb-6 uppercase">O que está incluso</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-[var(--gold)] group-hover:scale-150 transition-transform" />
                      <span className="font-mono text-[11px] tracking-wide opacity-80 uppercase leading-none">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-16 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] tracking-[0.2em] opacity-40 uppercase">Dúvidas?</span>
              <span className="font-display font-bold text-[18px]">Fale Conosco</span>
            </div>
            <a 
              href="#contato"
              className="px-10 py-5 rounded-full bg-[var(--ink)] text-white font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-[var(--azul)] transition-colors shadow-lg"
              onClick={onClose}
            >
              Começar Agora
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgramCard({ p, index, onSelect }: { p: any, index: number, onSelect: () => void }){
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const palettes = [
    { bg:'#0F1116', text:'#FAFAF7' },
    { bg:'#1E88E5', text:'#FFFFFF' },
    { bg:'#FFD700', text:'#0F1116' },
    { bg:'#FAFAF7', text:'#0F1116' }
  ];
  const style = palettes[index % palettes.length];
  const rotation = (index % 2 === 0 ? -0.5 : 0.5);
  const isLight = style.bg === '#FAFAF7' || style.bg === '#FFD700';

  return (
    <article ref={ref}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      onClick={onSelect}
      data-cursor="view"
      data-theme={isLight ? 'light' : 'dark'}
      className="relative overflow-hidden grain min-h-[220px] md:min-h-[380px] md:h-full group flex flex-col cursor-pointer"
      style={{
        background: style.bg, color: style.text,
        transform: `rotate(${rotation}deg) scale(${hover?1.02:1})`,
        transition:'transform .6s cubic-bezier(.2,0,0,1)',
        borderRadius: '40px',
        boxShadow: hover ? '0 40px 100px -20px rgba(15,17,22,0.3)' : '0 15px 45px -10px rgba(15,17,22,0.1)',
        border: style.bg === '#FAFAF7' ? '1.2px solid rgba(15,17,22,0.1)' : 'none'
      }}>
      
      {p.image && (
        <div className="absolute inset-0 opacity-[0.1] grayscale group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-1000 pointer-events-none">
          <ImageWithFallback
            src={urlFor(p.image).url()}
            fallbackSrc="/placeholder-image.jpg"
            alt={p.title}
            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]"
          />
        </div>
      )}

      <div className="relative p-6 md:p-10 flex flex-col h-full z-10">
        <div className="font-mono text-[9px] tracking-[0.2em] md:tracking-[0.4em] opacity-50 mb-3 md:mb-6 uppercase">
          0{index+1} / {p.shortDescription || 'ACADEMIA BOULDER'}
        </div>
        <h3 className="font-display font-extrabold leading-[0.85] tracking-[-0.05em] text-[32px] md:text-[clamp(32px,3.5vw,56px)] uppercase break-words">
          {p.title}
        </h3>
        
        <div className="mt-auto pt-6 md:pt-8 flex items-center justify-between border-t border-current/10">
          <div className="flex flex-col">
            <span className="font-mono text-[11px] tracking-[0.4em] uppercase font-bold">Ver +</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-current/20 grid place-items-center bg-transparent group-hover:bg-white/10 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProgramsSection(){
  const { data: programs, isLoading } = usePrograms();
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  if (isLoading) return null;

  const validPrograms = programs?.filter((p: any) => p.title) || [];

  return (
    <section id="programas" className="relative min-h-screen bg-[var(--paper)] overflow-y-auto md:overflow-hidden flex flex-col justify-center py-20 md:py-0 md:h-screen">
      <div className="px-8 max-w-[1780px] mx-auto w-full flex flex-col h-auto md:h-full pt-[clamp(60px,7vh,90px)] pb-12 md:pb-24">
        
        <div className="flex flex-col gap-2 mb-8 md:mb-10 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.4em] opacity-30 uppercase">Cap / 01</span>
            <div className="w-8 h-px bg-[var(--ink)]/20" />
            <span className="font-mono text-[12px] tracking-[0.3em] font-bold uppercase">Nossos Programas</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end mb-10 md:mb-14 shrink-0">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(28px,4.5vw,52px)]">
              <span className="block">QUATRO CAMINHOS,</span>
              <span className="block">UMA <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>parede.</span></span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 self-center">
            <p className="text-[14px] md:text-[16px] leading-[1.6] opacity-60 max-w-[36ch]">
              Programas pensados para encontrar você onde você está — do primeiro contato com a parede ao próximo grade.
            </p>
          </div>
        </div>

         <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 min-h-0 md:max-h-[500px]">
          {validPrograms.slice(0, 4).map((p: any, i: number) => (
            <div key={p._id} className="h-auto md:h-full">
              <ProgramCard p={p} index={i} onSelect={() => setSelectedProgram(p)} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <ProgramModal 
            p={selectedProgram} 
            onClose={() => setSelectedProgram(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
