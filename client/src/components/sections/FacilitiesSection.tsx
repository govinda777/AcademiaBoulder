import { useState } from "react";
import { useAboutSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 backdrop-blur-2xl bg-black/90"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-7xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" alt="Facility detail" />
        <button onClick={onClose} className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function FacilitiesSection(){
  const { data: aboutData, isLoading } = useAboutSection();
  const [lightbox, setLightbox] = useState<string | null>(null);
  const facilities = aboutData?.facilities || [];

  if (isLoading) return null;

  return (
    <section id="instalacoes" className="relative min-h-[130vh] bg-[var(--paper)] overflow-hidden flex flex-col justify-center py-20">
      <div className="px-8 max-w-[1780px] mx-auto w-full flex flex-col pt-[clamp(70px,9vh,110px)]">
        
        <div className="flex flex-col gap-2 mb-8 md:mb-10 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.4em] opacity-30 uppercase">Cap / 04</span>
            <div className="w-8 h-px bg-[var(--ink)]/20" />
            <span className="font-mono text-[12px] tracking-[0.3em] font-bold uppercase">Nossas Instalações</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end mb-12 md:mb-20 shrink-0">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(28px,4.5vw,52px)]">
              <span className="block uppercase">UM GINÁSIO <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>desenhado</span></span>
              <span className="block uppercase">COMO UMA <span className="text-[var(--azul)]">ROTA.</span></span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 self-center">
            <p className="text-[14px] md:text-[16px] leading-[1.6] opacity-65 max-w-[36ch]">
              Dois ambientes complementares, um só projeto pedagógico. Escalada e cross training se conversam a cada ciclo de treino.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full">
          {facilities.map((f: any, i: number) => {
            const imageUrl = f.image ? urlFor(f.image).url() : '';
            return (
              <div key={i} 
                   onClick={() => imageUrl && setLightbox(imageUrl)}
                   data-cursor="expand"
                   className={`relative ${i % 2 !== 0 ? 'md:mt-32' : ''} group overflow-hidden rounded-[32px] bg-[var(--ink)] cursor-pointer grain`}
                   style={{ 
                     boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                     minHeight: '480px',
                     transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)`,
                     transition: 'transform 0.8s cubic-bezier(0.2, 0, 0, 1)'
                   }}>
                
                <div className="absolute inset-0">
                  {f.image ? (
                    <ImageWithFallback
                      src={imageUrl}
                      fallbackSrc="/placeholder-facility.jpg"
                      alt={f.name}
                      className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-black opacity-40" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                </div>

                <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full mix-blend-overlay opacity-40 pointer-events-none" preserveAspectRatio="none">
                  <path d="M40 320 C100 280, 220 300, 280 240 C340 180, 420 220, 500 160 C560 120, 600 80, 600 40 L600 400 L0 400 Z" fill="rgba(0,0,0,0.5)"/>
                </svg>

                <div className="absolute top-10 left-10 font-mono text-[11px] tracking-[0.4em] text-white/40 uppercase">Setor · 0{i+1}</div>

                <div className="absolute bottom-12 left-12 right-12">
                  <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--gold)] mb-4 font-bold">Capacidade Máxima</div>
                  <div className="font-display font-extrabold text-white text-[clamp(40px,5.5vw,82px)] leading-[0.85] tracking-tighter mb-6">
                    {f.name.split(' · ').map((w: string, j: number) => (
                      <span key={j} className="block uppercase">{w}</span>
                    ))}
                  </div>
                  <p className="text-white/80 text-[16px] md:text-[18px] leading-relaxed max-w-[40ch] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {lightbox && <ImageLightbox src={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}
