const PILLARS = [
  { icon:'target', title:'Missão', body:'Transformar vidas através do esporte e da superação — entregando boulder e cross training de excelência em ambiente seguro, técnico e acolhedor.' },
  { icon:'eye',    title:'Visão',  body:'Ser referência em pedagogia de escalada e preparação física no interior de São Paulo, formando atletas e construindo comunidade.' },
  { icon:'heart',  title:'Valores',body:'Segurança radical · Erro como dado · Comunidade antes de hierarquia · Técnica antes de ego.' },
];

function PillarIcon({k}: {k: string}){
  const common = {width:32,height:32,fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  if(k==='target') return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>;
  if(k==='eye') return <svg viewBox="0 0 24 24" {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>;
}

export default function AboutSection(){
  return (
    <section id="sobre" className="relative sec-pad bg-[var(--azul-soft)] overflow-hidden">
      <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{background:'radial-gradient(closest-side, rgba(255,215,0,0.18), rgba(232,241,251,0) 70%)'}}/>
      <div className="absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
           style={{background:'radial-gradient(closest-side, rgba(30,136,229,0.14), rgba(232,241,251,0) 70%)'}}/>

      <div className="relative px-8 max-w-[1700px] mx-auto">
        <div className="flex items-baseline gap-6 mb-10">
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">CAP · 02</span>
          <span className="block w-20 h-px bg-[var(--ink)]/20"/>
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">SOBRE A ACADEMIA BOULDER</span>
        </div>

        <div className="grid grid-cols-12 gap-8 items-end mb-16">
          <div className="col-span-12 md:col-span-8">
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.04em] text-[clamp(28px,4.5vw,52px)]">
              <span className="block">TRANSFORMANDO <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>vidas</span></span>
              <span className="block uppercase stroke-text-dark">através do esporte</span>
              <span className="block uppercase">e da superação.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="text-[16px] md:text-[18px] leading-[1.55] opacity-90" style={{textWrap:'pretty'}}>
              Desde 2008, a Academia Boulder é onde escaladores e atletas de Sorocaba e região aprendem que cada via é um <span className="text-[var(--azul-deep)] font-semibold">problema</span> — e que problema bom é problema que se conversa.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((c,i)=>(
            <div key={i} className="relative bg-white rounded-3xl p-8 border border-[var(--ink)]/8" style={{boxShadow:'0 12px 40px rgba(15,17,22,0.06)'}}>
              <div className="w-14 h-14 rounded-2xl grid place-items-center mb-6"
                   style={{background: i===0?'rgba(30,136,229,0.10)' : i===1?'rgba(255,215,0,0.18)' : 'rgba(15,17,22,0.08)',
                           color: i===0?'#1E88E5' : i===1?'#D4A800' : '#0F1116'}}>
                <PillarIcon k={c.icon}/>
              </div>
              <h4 className="font-display font-extrabold text-[28px] tracking-tight mb-3">{c.title}</h4>
              <p className="text-[15px] leading-[1.55] opacity-85">{c.body}</p>
              <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.25em] opacity-50">0{i+1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
