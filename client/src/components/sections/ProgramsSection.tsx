import { useRef, useState, useEffect } from "react";
import { usePrograms, useProgramSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { PortableText } from "@portabletext/react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { BaseModal } from "@/components/ui/BaseModal";

function ProgramModal({ p, onClose, labels }: { p: any; onClose: () => void; labels?: any }) {
  const leftContent = (
    <>
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
    </>
  );

  return (
    <BaseModal
      isOpen={!!p}
      onClose={onClose}
      leftContent={leftContent}
      leftWidth="md:w-5/12"
      maxWidth="max-w-5xl"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="font-mono text-[11px] tracking-[0.3em] text-[var(--azul)] mb-8 uppercase font-bold">
            {labels?.summary || "Resumo & Detalhes"}
          </div>
          <div className="prose prose-neutral !max-w-none prose-p:leading-[1.7] prose-p:text-[var(--ink)]/80 prose-headings:font-display prose-headings:font-extrabold">
            <PortableText value={p.description} />
          </div>

          {p.features && (
            <div className="mt-12 pt-10 border-t border-[var(--ink)]/5">
              <div className="font-mono text-[10px] tracking-[0.3em] opacity-40 mb-6 uppercase">
                {labels?.included || "O que está incluso"}
              </div>
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
            <span className="font-mono text-[9px] tracking-[0.2em] opacity-40 uppercase">{labels?.questions || "Dúvidas?"}</span>
            <span className="font-display font-bold text-[18px]">{labels?.contactUs || "Fale Conosco"}</span>
          </div>
          <a
            href="#contato"
            className="px-10 py-5 rounded-full bg-[var(--ink)] text-white font-mono text-[11px] tracking-[0.3em] uppercase hover:bg-[var(--azul)] transition-colors shadow-lg"
            onClick={onClose}
          >
            {labels?.cta || "Começar Agora"}
          </a>
        </div>
      </div>
    </BaseModal>
  );
}

function ProgramCard({ p, index, onSelect, palettes }: { p: any, index: number, onSelect: () => void, palettes?: any[] }){
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);

  const defaultPalettes = [
    { bg:'#0F1116', text:'#FAFAF7' },
    { bg:'#1E88E5', text:'#FFFFFF' },
    { bg:'#FFD700', text:'#0F1116' },
    { bg:'#FAFAF7', text:'#0F1116' }
  ];
  const currentPalettes = palettes && palettes.length > 0 ? palettes : defaultPalettes;
  const style = currentPalettes[index % currentPalettes.length];
  const rotation = (index % 2 === 0 ? -0.5 : 0.5);
  const isLight = style.bg === '#FAFAF7' || style.bg === '#FFD700' || style.bg?.toLowerCase() === '#fafaf7' || style.bg?.toLowerCase() === '#ffd700';

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
  const { data: programs, isLoading: pLoading } = usePrograms();
  const { data: sectionData, isLoading: sLoading } = useProgramSection();
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  if (pLoading || sLoading) return null;

  const validPrograms = programs?.filter((p: any) => p.title) || [];

  return (
    <SectionContainer id="programas" fullHeight>
      <SectionHeader chapter="01" label={sectionData?.label || "Nossos Programas"} className="mb-6" />

      <div className="grid grid-cols-12 gap-8 items-end mb-6 md:mb-10 shrink-0">
        <div className="col-span-12 md:col-span-8">
          <SectionTitle
            mainTitle={sectionData?.title || "QUATRO CAMINHOS,"}
            highlightedTitle={sectionData?.subtitle || "UMA parede."}
          />
        </div>
        <div className="col-span-12 md:col-span-4 self-center">
          <p className="text-[13px] md:text-[15px] leading-[1.6] opacity-60 max-w-[36ch]">
            {sectionData?.description}
          </p>
        </div>
      </div>

       <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 min-h-0">
        {validPrograms.slice(0, 4).map((p: any, i: number) => (
          <div key={p._id} className="h-auto md:h-full min-h-0">
            <ProgramCard
              p={p}
              index={i}
              onSelect={() => setSelectedProgram(p)}
              palettes={sectionData?.cardPalettes}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <ProgramModal 
            p={selectedProgram} 
            onClose={() => setSelectedProgram(null)} 
            labels={sectionData?.modalLabels}
          />
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
