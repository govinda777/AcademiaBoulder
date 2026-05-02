import { useState } from "react";

const FAQ = [
  { q:'Preciso de experiência prévia?', a:'Não. A aula aberta de quinta às 19h é desenhada exatamente para quem nunca tocou em uma agarra. Equipamento e magnésio incluídos.' },
  { q:'Qual o nível de risco?', a:'Boulder é escalada baixa (até 4,5m) sobre tatame de alta absorção. Nosso protocolo de queda é a primeira coisa que ensinamos — antes mesmo da primeira via.' },
  { q:'Vocês atendem iniciantes em cross training?', a:'Sim. O programa começa com avaliação inicial e progride em ciclos de 6 semanas. Não é necessário ser escalador.' },
  { q:'Como funciona o personal trainer?', a:'Atendimento 1-a-1 com periodização sob medida. Pode ser para preparação para competição, retorno de lesão, ou objetivo específico (primeiro V5, primeira via outdoor).' },
  { q:'Tem aula experimental?', a:'Sim. Quinta-feira 19h é nossa aula aberta gratuita. Para os outros programas, basta agendar uma visita pelo formulário.' },
];

export default function FAQSection(){
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative sec-pad bg-[var(--paper)] overflow-hidden">
      <div className="relative px-8 max-w-[1700px] mx-auto">
        <div className="flex items-baseline gap-6 mb-10">
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">CAP · 06</span>
          <span className="block w-20 h-px bg-[var(--ink)]/20"/>
          <span className="font-mono text-[11px] tracking-[0.3em] opacity-70">PERGUNTAS FREQUENTES</span>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-4">
            <h2 className="font-display font-extrabold text-[clamp(40px,6vw,100px)] leading-[1.05] tracking-tight">
              PERGUNTAS <br/>
              <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300}}>frequentes.</span>
            </h2>
            <p className="mt-6 text-[15px] opacity-80 max-w-[40ch]">
              Não achou sua pergunta? Manda no formulário ali em cima — a gente responde em até 24h.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8">
            {FAQ.map((f,i)=>(
              <button key={i} data-cursor="link" onClick={()=>setOpen(open===i?-1:i)}
                      className="w-full text-left border-b border-[var(--ink)]/15 py-6 group">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--azul)] mt-2">0{i+1}</span>
                    <span className="font-display font-extrabold text-[clamp(20px,2.2vw,32px)] leading-[1.1] tracking-tight group-hover:text-[var(--azul)] transition-colors">{f.q}</span>
                  </div>
                  <span className={`mt-2 w-8 h-8 rounded-full border border-[var(--ink)]/30 grid place-items-center transition-all ${open===i?'bg-[var(--gold)] border-transparent rotate-45':''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                  </span>
                </div>
                <div className={`grid transition-all duration-500 ${open===i?'grid-rows-[1fr] opacity-100 mt-4':'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="text-[15px] md:text-[16px] leading-[1.55] opacity-85 max-w-[60ch] pl-12">{f.a}</p>
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
