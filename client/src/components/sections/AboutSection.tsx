import { useAboutSection } from "@/hooks/useSanity";
import { SanityBlockContent } from "@/components/ui/SanityBlockContent";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";

function PillarIcon({k}: {k: string}){
  const common = {width:32,height:32,fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  if(k==='target') return <svg viewBox="0 0 24 24" {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>;
  if(k==='eye') return <svg viewBox="0 0 24 24" {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>;
  return <svg viewBox="0 0 24 24" {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>;
}

export default function AboutSection(){
  const { data: aboutData, isLoading } = useAboutSection();
  
  if (isLoading) return null;

  const main = aboutData?.mainSection;
  
  const icons = main?.pillarIcons || ['target', 'eye', 'heart'];

  const PILLARS = [
    { icon: icons[0], title: main?.missionLabel || 'Missão', body: main?.mission },
    { icon: icons[1], title: main?.visionLabel || 'Visão',  body: main?.vision },
    { icon: icons[2], title: main?.valuesLabel || 'Valores', body: main?.values?.length ? main.values.join(' · ') : null },
  ].filter(p => p.body);

  return (
    <SectionContainer id="sobre" className="bg-[var(--azul-soft)]">
      <div className="absolute -top-20 -right-20 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{background:'radial-gradient(closest-side, rgba(255,215,0,0.18), rgba(232,241,251,0) 70%)'}}/>
      <div className="absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
           style={{background:'radial-gradient(closest-side, rgba(30,136,229,0.14), rgba(232,241,251,0) 70%)'}}/>

      <SectionHeader chapter="02" label={main?.label || "SOBRE A ACADEMIA BOULDER"} className="mb-10" />

      <div className="grid grid-cols-12 gap-8 items-start mb-12 md:mb-16">
        <div className="col-span-12 md:col-span-7">
          <SectionTitle
            mainTitle={main?.title || "SOBRE A ACADEMIA"}
            highlightedTitle={main?.highlightedTitle || "história."}
          />
        </div>
        <div className="col-span-12 md:col-span-5 pt-2">
          <div className="text-[15px] md:text-[17px] leading-[1.6] opacity-80" style={{textWrap:'pretty'}}>
            {main?.description ? (
              <SanityBlockContent blocks={main.description} />
            ) : (
              main?.philosophy || "Carregando descrição..."
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((c,i)=>(
          <div key={i} className="relative bg-white rounded-3xl p-8 border border-[var(--ink)]/8 shadow-2xl shadow-neutral-200/50">
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
    </SectionContainer>
  );
}

