import { useState } from "react";
import { useSiteSettings, useContactSection } from "@/hooks/useSanity";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function ContactSection(){
  const { data: siteSettings } = useSiteSettings();
  const { data: contactData } = useContactSection();
  
  const [form, setForm] = useState({ name: '', email: '', interest: 'Escalada', message: '' });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = siteSettings?.contactInfo?.phone?.replace(/\D/g, '');
    if (!phone) return;
    const text = `*Nova Mensagem - Academia Boulder*\n\n*Nome:* ${form.name}\n*Email:* ${form.email}\n*Interesse:* ${form.interest}\n*Mensagem:* ${form.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const address = siteSettings?.contactInfo?.address || "";
  const instagram = siteSettings?.socialMedia?.instagram || "#";
  const whatsappNumber = siteSettings?.contactInfo?.phone?.replace(/\D/g, '') || "";
  const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";
  const safeMapUrl = address ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed` : "";

  const interests = contactData?.formInterests || ['Aula Aberta (Grátis)', 'Cross Training', 'Escalada', 'Outro'];

  return (
    <SectionContainer
      id="contato"
      dark
      fullHeight
      className="grain"
      style={{ background: 'linear-gradient(180deg, #051C36 0%, #0F1116 100%)' }}
    >
      <div className="absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full pointer-events-none"
           style={{background:'radial-gradient(closest-side, rgba(30,136,229,0.12), rgba(0,0,0,0) 70%)'}}/>

      <div className="flex flex-col h-full">
        {/* Header */}
        <SectionHeader chapter="05" label={contactData?.label || "Entre em Contato"} dark className="mb-6 md:mb-10 shrink-0" />

        {/* 3-Column Layout */}
        <div className="grid grid-cols-12 gap-8 md:gap-12 flex-1 min-h-0 items-start">
          {/* Column 1: Title + Social */}
          <div className="col-span-12 md:col-span-4 flex flex-col h-full justify-between pb-8">
            <div>
              <SectionTitle className="mb-12">
                {contactData?.title ? (
                  <>
                    <span className="block uppercase">
                      {contactData.title} <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300, textTransform: 'none'}}>{contactData.subtitle}</span>
                    </span>
                    <span className="block uppercase stroke-text-light">{contactData.titlePart2}</span>
                    <span className="block uppercase">
                      {contactData.titlePart3} <span className="text-[var(--azul)]">{contactData.titlePart3Accent}</span>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block uppercase">SUA <span className="font-serif-it italic text-[var(--azul)]" style={{fontFamily:'Fraunces',fontStyle:'italic',fontWeight:300, textTransform: 'none'}}>primeira</span></span>
                    <span className="block uppercase stroke-text-light">SUBIDA COMEÇA</span>
                    <span className="block uppercase">COM UM <span className="text-[var(--azul)]">OI.</span></span>
                  </>
                )}
              </SectionTitle>

              <div className="space-y-8">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] opacity-40 mb-4 uppercase text-[var(--azul)] font-bold">
                    {contactData?.column1Label || "01 · Social"}
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href={instagram} target="_blank" rel="noopener noreferrer" data-cursor="link" className="flex items-center justify-between group hover:text-[var(--azul)] transition-colors border-b border-white/5 pb-2">
                      <span className="font-display font-extrabold text-[20px] tracking-tight uppercase">INSTAGRAM</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white/20 group-hover:text-[var(--azul)] transition-colors">
                        <path d="M5 19L19 5M19 5H7M19 5V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" data-cursor="link" className="flex items-center justify-between group hover:text-[var(--azul)] transition-colors border-b border-white/5 pb-2">
                      <span className="font-display font-extrabold text-[20px] tracking-tight uppercase">WHATSAPP</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white/20 group-hover:text-[var(--azul)] transition-colors">
                        <path d="M5 19L19 5M19 5H7M19 5V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <span className="font-mono text-[9px] tracking-[0.3em] opacity-30 uppercase font-bold">
                © {new Date().getFullYear()} Academia Boulder
              </span>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="col-span-12 md:col-span-4 flex flex-col pt-2 border-x border-white/5 px-0 md:px-12 h-full">
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-40 mb-6 uppercase text-[var(--azul)] font-bold">
              {contactData?.column2Label || "02 · Envie uma mensagem"}
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="group">
                <label className="font-mono text-[9px] tracking-[0.3em] opacity-50 block mb-1.5 uppercase">NOME</label>
                <input type="text" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Seu nome" data-cursor="link" required
                  className="w-full bg-transparent border-b border-white/20 focus:border-[var(--azul)] outline-none py-2 text-[17px] transition-all placeholder:text-white/10"/>
              </div>
              <div className="group">
                <label className="font-mono text-[9px] tracking-[0.3em] opacity-50 block mb-1.5 uppercase">EMAIL</label>
                <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="voce@dominio.com" data-cursor="link" required
                  className="w-full bg-transparent border-b border-white/20 focus:border-[var(--azul)] outline-none py-2 text-[17px] transition-all placeholder:text-white/10"/>
              </div>
              <div className="group">
                <label className="font-mono text-[9px] tracking-[0.3em] opacity-50 block mb-1.5 uppercase">INTERESSE</label>
                <select value={form.interest} onChange={e=>setForm({...form, interest:e.target.value})} data-cursor="link"
                  className="w-full bg-transparent border-b border-white/20 focus:border-[var(--azul)] outline-none py-2 text-[17px] transition-all">
                  {interests.map((o: string, j: number)=><option key={j} value={o} className="bg-[var(--azul-ink)]">{o}</option>)}
                </select>
              </div>
              <div className="group">
                <label className="font-mono text-[9px] tracking-[0.3em] opacity-50 block mb-1.5 uppercase">MENSAGEM</label>
                <textarea rows={3} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="O que você busca?" data-cursor="link" required
                  className="w-full bg-transparent border-b border-white/20 focus:border-[var(--azul)] outline-none py-2 text-[17px] resize-none transition-all placeholder:text-white/10"/>
              </div>
              <button data-cursor="link" type="submit"
                      className="mt-6 w-full flex items-center justify-between pl-6 pr-2 py-2.5 bg-[var(--azul)] text-[var(--paper)] rounded-full hover:scale-[1.02] transition-all active:scale-95 shadow-[0_15px_30px_rgba(30,136,229,0.1)]">
                <span className="font-display font-extrabold text-[17px] tracking-tight">ENVIAR AGORA</span>
                <span className="w-9 h-9 rounded-full bg-[var(--paper)] text-[var(--azul)] grid place-items-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>
            </form>
          </div>

          {/* Column 3: Address + Map */}
          <div className="col-span-12 md:col-span-4 flex flex-col h-full pt-2">
            <div className="font-mono text-[10px] tracking-[0.3em] opacity-40 mb-6 uppercase text-[var(--azul)] font-bold">
              {contactData?.column3Label || "03 · Unidade"}
            </div>
            <div className="mb-6">
              <div 
                data-cursor="link"
                onClick={() => {
                  navigator.clipboard.writeText(address);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="group cursor-pointer relative"
              >
                <p className="text-[17px] leading-snug opacity-80 font-medium whitespace-pre-line mb-1 group-hover:text-[var(--azul)] transition-colors">
                  {address}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-[0.1em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                    {copied ? '✓ Copiado!' : 'Clique para copiar'}
                  </span>
                </div>
              </div>
              <a data-cursor="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" 
                 className="mt-4 inline-flex items-center gap-2 text-[var(--azul)] hover:text-white transition-all">
                <span className="font-mono text-[10px] tracking-[0.1em] uppercase">VER NO GOOGLE MAPS</span>
                <span className="block w-6 h-px bg-current"/>
              </a>
            </div>

            <div className="relative flex-1 w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 grayscale opacity-40 hover:opacity-100 transition-all duration-700 min-h-[180px]">
              <iframe
                title="Google Maps"
                src={safeMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(1.1) saturate(0.8)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
