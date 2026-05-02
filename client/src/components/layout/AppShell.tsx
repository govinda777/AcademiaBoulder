import { useEffect, useRef, useState } from "react";
import { useSiteSettings } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

function MagneticCursor(){
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({x:0,y:0,tx:0,ty:0,dx:0,dy:0});
  const [mode, setMode] = useState('idle');
  const [onDark, setOnDark] = useState(false);

  useEffect(()=>{
    const onMove = (e: MouseEvent) => { stateRef.current.tx = e.clientX; stateRef.current.ty = e.clientY; };
    window.addEventListener('mousemove', onMove);
    let raf: number;
    const loop = () => {
      const s = stateRef.current;
      s.x += (s.tx - s.x)*0.18; s.y += (s.ty - s.y)*0.18;
      s.dx += (s.tx - s.dx)*0.6; s.dy += (s.ty - s.dy)*0.6;
      if(ringRef.current) ringRef.current.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%,-50%)`;
      if(dotRef.current) dotRef.current.style.transform = `translate(${s.dx}px, ${s.dy}px) translate(-50%,-50%)`;
      // sample background under cursor for theme
      const el = document.elementFromPoint(s.tx, s.ty);
      if(el){
        const dark = el.closest('[data-theme="dark"]');
        setOnDark(!!dark);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onOver = (e: MouseEvent)=>{ const t = (e.target as HTMLElement).closest('[data-cursor]'); if(t) setMode((t as HTMLElement).dataset.cursor || 'idle'); };
    const onOut  = (e: MouseEvent)=>{ const t = (e.target as HTMLElement).closest('[data-cursor]'); if(t) setMode('idle'); };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return ()=>{
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  },[]);

  return (
    <>
      <div ref={ringRef} className={`mag-cursor nocoarse ${mode==='grip'?'on-grip':''} ${mode==='link'?'on-link':''} ${onDark?'on-dark':''}`}></div>
      <div ref={dotRef} className="mag-dot nocoarse" style={{background: onDark?'#FAFAF7':'#0F1116'}}></div>
    </>
  );
}

const NAV = [
  { id:'inicio',     label:'INÍCIO',      sub:'00' },
  { id:'programas',  label:'PROGRAMAS',   sub:'01' },
  { id:'sobre',      label:'SOBRE',       sub:'02' },
  { id:'equipe',     label:'EQUIPE',      sub:'03' },
  { id:'instalacoes',label:'INSTALAÇÕES', sub:'04' },
  { id:'faq',        label:'FAQ',         sub:'05' },
  { id:'contato',    label:'CONTATO',     sub:'06' },
];

function RadialMenu(){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const k = (e: KeyboardEvent)=>{ if(e.key==='Escape') setOpen(false); };
    window.addEventListener('keydown', k);
    return ()=>window.removeEventListener('keydown', k);
  },[]);

  return (
    <div className="fixed top-6 right-6 z-[60]">
      <button data-cursor="grip" onClick={()=>setOpen(o=>!o)}
        className="relative w-[80px] h-[80px] grid place-items-center"
        aria-label={open?'Fechar menu':'Abrir menu'}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transition-transform duration-500"
             style={{transform: open?'rotate(135deg) scale(1.05)':'rotate(0deg)'}}>
          <defs>
            <radialGradient id="grip-rg2" cx="35%" cy="35%" r="80%">
              <stop offset="0%" stopColor="#FFE25C"/>
              <stop offset="55%" stopColor="#FFD700"/>
              <stop offset="100%" stopColor="#C28800"/>
            </radialGradient>
          </defs>
          <path d="M50 6 C70 6, 92 22, 92 46 C94 68, 76 92, 52 92 C28 96, 6 78, 6 54 C4 30, 30 6, 50 6Z"
                fill="url(#grip-rg2)" filter="url(#liquid-soft)"/>
          <path d="M50 6 C70 6, 92 22, 92 46 C94 68, 76 92, 52 92 C28 96, 6 78, 6 54 C4 30, 30 6, 50 6Z"
                fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1"/>
        </svg>
        <span className="relative font-display font-extrabold text-[var(--ink)] text-[20px] leading-none select-none"
              style={{transform: open?'rotate(45deg)':'none', transition:'transform .4s'}}>
          {open ? '×' : '≡'}
        </span>
      </button>

      <div className={`pointer-events-${open?'auto':'none'} fixed inset-0 z-[55]`} aria-hidden={!open}>
        <div onClick={()=>setOpen(false)}
             className={`absolute inset-0 transition-all duration-700 ${open?'opacity-100':'opacity-0'}`}
             style={{
               background: 'radial-gradient(circle at calc(100% - 48px) 48px, rgba(255,215,0,0.20), rgba(5,28,54,0.92) 40%, rgba(5,28,54,0.97) 70%)',
               backdropFilter: open?'blur(2px)':'none'
             }}/>
        <div className="absolute top-12 right-12">
          {NAV.map((n,i)=>{
            const total = NAV.length;
            // Create a nice C-curve downwards, guaranteeing 75px vertical gap to avoid overlaps
            const x = -100 - Math.sin((i/(total-1)) * Math.PI) * 40;
            const y = 60 + i * 75;
            return (
              <a key={n.id} href={`#${n.id}`} onClick={()=>setOpen(false)} data-cursor="link"
                 className="absolute origin-top-right transition-all duration-700"
                 style={{
                   transform: open ? `translate(${x}px, ${y}px)` : `translate(0,0) scale(.6)`,
                   opacity: open ? 1 : 0,
                   transitionDelay: open ? `${80 + i*60}ms` : `${(total-i)*30}ms`
                 }}>
                <div className="flex items-center gap-3 -translate-x-full -translate-y-1/2">
                  <div className="text-right">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--gold)] opacity-90">{n.sub}</div>
                    <div className="font-display font-extrabold text-[40px] leading-[0.85] text-[var(--paper)] hover:text-[var(--gold)] transition-colors whitespace-nowrap">
                      {n.label}
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[var(--gold)]"/>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TopStrip(){
  const { data: siteSettings } = useSiteSettings();

  return (
    <div className="fixed top-0 left-0 right-0 z-[50] mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="#inicio" data-cursor="link" className="flex items-center gap-4">
          {siteSettings?.logo ? (
            <div className="bg-white/90 p-1.5 rounded-xl">
              <ImageWithFallback
                src={urlFor(siteSettings.logo).url()}
                fallbackSrc="/placeholder-image.jpg"
                alt={siteSettings?.siteName || "Academia Boulder"}
                className="h-10 w-auto object-contain"
              />
            </div>
          ) : (
            <svg width="38" height="38" viewBox="0 0 40 40">
              <path d="M6 8 C8 4, 18 2, 26 4 C36 6, 40 16, 36 24 C34 34, 22 40, 12 36 C2 34, 0 22, 6 8Z" fill="#FAFAF7"/>
              <path d="M14 12 L14 30 L23 30 C29 30, 30 22, 24 21 C29 20, 28 12, 22 12 Z" fill="#0F1116"/>
            </svg>
          )}
          <div className="leading-none text-[var(--paper)]">
            <div className="font-display font-extrabold text-[20px] tracking-tight">{siteSettings?.siteName?.split(' ')[0]?.toUpperCase() || "ACADEMIA"}</div>
            <div className="font-mono text-[11px] tracking-[0.35em] opacity-90 -mt-0.5">{siteSettings?.siteName?.split(' ')[1]?.toUpperCase().split('').join(' · ') || "B · O · U · L · D · E · R"}</div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default function AppShell() {
  return (
    <>
      <MagneticCursor />
      <TopStrip />
      <RadialMenu />
    </>
  );
}
