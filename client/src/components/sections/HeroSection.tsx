import { useEffect, useState } from "react";
import { useHeroSection } from "@/hooks/useSanity";

function useParallaxH(){
  const [p, setP] = useState({mx:0,my:0,sy:0});
  useEffect(()=>{
    const onMove = (e: MouseEvent)=>{ const w=innerWidth,h=innerHeight; setP(s=>({...s,mx:e.clientX/w-.5,my:e.clientY/h-.5})); };
    const onScroll = ()=> setP(s=>({...s, sy: window.scrollY}));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>{ window.removeEventListener('mousemove', onMove); window.removeEventListener('scroll', onScroll); };
  },[]);
  return p;
}

function GripBlobH({className='', fill='url(#g-grip)', d, label, labelColor='#0F1116'}: {className?: string, fill?: string, d?: string, label?: string, labelColor?: string}){
  const path = d || "M100 8 C148 6, 196 36, 188 92 C180 148, 132 192, 78 188 C28 184, 4 138, 12 92 C20 44, 56 10, 100 8 Z";
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <path d={path} fill={fill} filter="url(#liquid-soft)"/>
        <path d={path} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5"/>
      </svg>
      {label && <span className="absolute inset-0 grid place-items-center font-display font-extrabold leading-none select-none"
                     style={{color:labelColor, fontSize:'min(38%,52px)'}}>{label}</span>}
    </div>
  );
}



export default function HeroSection(){
  const p = useParallaxH();
  const { data: heroData } = useHeroSection();
  const tBg = { transform:`translate3d(${p.mx*-10}px, 0, 0) scale(1.1)` };
  const tFg = { transform:`translate3d(${p.mx*-60}px, ${p.my*32}px, 0)` };
  const tType = { transform:`translate3d(${p.mx*-8}px, ${p.my*-6}px, 0)` };

  const videoUrl = heroData?.backgroundVideo?.asset?.url || "https://cdn.pixabay.com/video/2020/03/26/34063-401476457_large.mp4";

  return (
    <section id="inicio" data-theme="dark" className="relative h-screen overflow-hidden grain"
             style={{background:'#000', color:'var(--paper)'}}>

      {/* VIDEO BG (placeholder — abstract animated SVG sim of climbing footage) */}
      <div className="absolute inset-0 pointer-events-none" style={tBg} aria-hidden>
        <video
          key={videoUrl}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
          style={{filter:'contrast(1.05) brightness(0.55) saturate(1.05)'}}>
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Fallback / overlay gradient mood */}
        <div className="absolute inset-0"
             style={{background:'linear-gradient(180deg, rgba(5,28,54,0.65) 0%, rgba(5,28,54,0.4) 40%, rgba(15,17,22,0.8) 100%)'}}/>
        {/* Animated abstract overlay */}
        <svg viewBox="0 0 1600 900" className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" preserveAspectRatio="xMidYMid slice">
          <path d="M0 760 C300 700, 700 720, 1000 660 C1300 600, 1600 540, 1600 540 L1600 900 L0 900 Z" fill="rgba(30,136,229,0.15)"/>
          <path d="M0 600 C300 540, 700 580, 1000 500 C1300 420, 1600 380, 1600 380" fill="none" stroke="rgba(30,136,229,0.35)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Spotlight glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-[20vh] left-[15vw] w-[80vw] h-[80vw] rounded-full"
             style={{background:'radial-gradient(closest-side, rgba(30,136,229,0.18), rgba(0,0,0,0) 65%)'}}/>
      </div>

      {/* Floating grips */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="hidden md:block absolute pointer-events-auto drift" style={{...tFg, top:'15vh', left:'55vw', width:'110px', height:'110px'}} data-cursor="grip">
          <GripBlobH fill="url(#g-grip)" label="V8"/>
        </div>
        <div className="hidden md:block absolute pointer-events-auto" style={{...tFg, top:'25vh', right:'15vw', width:'70px', height:'70px', animation:'drift-y 9s ease-in-out infinite -3s'}} data-cursor="grip">
          <GripBlobH fill="var(--azul)" label="V3"/>
        </div>
        <div className="hidden md:block absolute pointer-events-auto" style={{...tFg, bottom:'15vh', right:'25vw', width:'100px', height:'100px'}} data-cursor="grip">
          <GripBlobH fill="#FAFAF7" label="V0"/>
        </div>
      </div>

      {/* Type */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center" style={tType}>
        <div className="grid grid-cols-12 gap-0 px-8 max-w-[1700px] w-full">
          <div className="col-span-1 hidden md:block">
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-70 [writing-mode:vertical-rl] rotate-180">CAP · 00 / Home</div>
          </div>
          <div className="col-span-12 md:col-span-11 relative">
            <h1 className="relative font-display font-extrabold leading-[0.92] tracking-[-0.04em]">
              {heroData?.title ? (
                <>
                  {/* Smart split based on common pattern: LINE1 LINE2 LINE2_ACCENT. LINE3 */}
                  {(() => {
                    const parts = heroData.title.split(' ').filter(Boolean);
                    // Expected: ["DESCUBRA", "SEUS", "limites.", "CADA", "AGARRA."]
                    return (
                      <>
                        {/* Linha 1: DESCUBRA */}
                        <span className="block text-[clamp(40px,6vw,100px)] uppercase">
                          {parts[0]}
                        </span>
                        
                        {/* Linha 2: SEUS limites. (com limites. em itálico azul) */}
                        <span className="block text-[clamp(40px,6vw,100px)] pl-[6%] md:pl-[10%] uppercase">
                          {parts[1] || ""}{" "}
                          {parts[2] && (
                            <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300, textTransform:'none'}}>
                              {parts[2].toLowerCase()}
                            </span>
                          )}
                        </span>

                        {/* Linha 3: CADA AGARRA. (em stroke/contorno) */}
                        <span className="block text-[clamp(40px,6vw,100px)] stroke-text-light uppercase">
                          {parts.slice(3).join(' ')}
                        </span>
                      </>
                    );
                  })()}
                </>
              ) : (
                <>
                  <span className="block text-[clamp(40px,6vw,100px)]">DESCUBRA</span>
                  <span className="block text-[clamp(40px,6vw,100px)] pl-[6%] md:pl-[10%]">
                    SEUS <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>limites.</span>
                  </span>
                  <span className="block text-[clamp(40px,6vw,100px)] stroke-text-light">CADA AGARRA.</span>
                </>
              )}
            </h1>

            <div className="grid grid-cols-12 mt-8 md:mt-10 gap-8">
              <div className="col-span-12 md:col-span-6 md:col-start-2">
                <p className="font-mono text-[11px] tracking-[0.3em] uppercase opacity-70 mb-4">
                  {heroData?.label || "ESCALADA · CROSS · TRAINING"}
                </p>
                <p className="text-[16px] md:text-[18px] leading-[1.6] max-w-[44ch]" style={{textWrap:'pretty'}}>
                  {heroData?.subtitle ? (
                    heroData.subtitle.split('\n').map((line: string, i: number) => (
                      <span key={i} className="block mb-2">
                        {/* Highlighting "Sorocaba" if present, just like in original */}
                        {line.split('Sorocaba').map((part, j, arr) => (
                          <span key={j}>
                            {part}
                            {j < arr.length - 1 && <span className="text-[var(--azul)]">Sorocaba</span>}
                          </span>
                        ))}
                      </span>
                    ))
                  ) : (
                    <>
                      Em <span className="text-[var(--azul)]">Sorocaba</span> desde 2008, somos um centro de boulder e cross training que trata cada via como um <span className="font-serif-it italic" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>problema</span> a ser lido com o corpo.
                    </>
                  )}
                </p>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 flex md:justify-end items-end gap-3 flex-wrap">
                <a data-cursor="link" href="#programas"
                   className="group relative inline-flex items-center gap-4 pl-5 pr-3 py-2.5 bg-[var(--azul)] text-[var(--paper)] rounded-full hover:scale-[1.02] transition-transform">
                  <span className="font-display font-extrabold text-[18px] tracking-tight">COMECE AGORA</span>
                  <span className="relative w-8 h-8 grid place-items-center rounded-full bg-[var(--paper)] text-[var(--azul)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </a>
                <a data-cursor="link" href="#sobre"
                   className="inline-flex items-center gap-3 pl-5 pr-5 py-2.5 border border-white/40 hover:border-[var(--azul)] rounded-full text-[var(--paper)]">
                  <span className="font-display font-extrabold text-[16px] tracking-tight">SAIBA MAIS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
