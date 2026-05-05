import { useState } from "react";
import { useFaqSection } from "@/hooks/useSanity";

export default function FAQSection(){
  const { data: faqData, isLoading } = useFaqSection();
  const [open, setOpen] = useState(0);

  if (isLoading) return null;

  const faqs = faqData?.faqs || [];

  return (
    <section id="faq" className="relative sec-pad bg-[var(--paper)] overflow-hidden">
      <div className="relative px-8 max-w-[1700px] mx-auto">
        <div className="flex items-baseline gap-6 mb-10">
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">CAP · 06</span>
          <span className="block w-20 h-px bg-[var(--ink)]/20"/>
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70 uppercase">
            {faqData?.label || "PERGUNTAS FREQUENTES"}
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="font-display font-extrabold text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-tight">
              {faqData?.title ? (
                <>
                  {faqData.title.split(' ').map((word: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {word} {i < arr.length - 1 && <br/>}
                    </span>
                  ))}
                  <span className="font-serif-it italic text-[var(--azul)] block" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300, textTransform: 'none'}}>
                    {faqData.subtitle}
                  </span>
                </>
              ) : (
                <>
                  PERGUNTAS <br/>
                  <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>frequentes.</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-[15px] opacity-80 max-w-[40ch]">
              {faqData?.footer}
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            {faqs.map((f: any, i: number)=>(
              <button key={i} data-cursor="link" onClick={()=>setOpen(open===i?-1:i)}
                      className="w-full text-left border-b border-[var(--ink)]/15 py-6 group">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--azul)] mt-2">0{i+1}</span>
                    <span className="font-display font-extrabold text-[clamp(20px,2.2vw,32px)] leading-[1.1] tracking-tight group-hover:text-[var(--azul)] transition-colors">{f.question}</span>
                  </div>
                  <span className={`mt-2 w-8 h-8 rounded-full border border-[var(--ink)]/30 grid place-items-center transition-all ${open===i?'bg-[var(--gold)] border-transparent rotate-45':''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </span>
                </div>
                <div className={`grid transition-all duration-500 ${open===i?'grid-rows-[1fr] opacity-100 mt-4':'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-[15px] md:text-[16px] leading-[1.55] opacity-85 max-w-[60ch] pl-12">{f.answer}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
