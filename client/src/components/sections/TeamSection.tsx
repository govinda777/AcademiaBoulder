import { useAboutSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function TeamSection(){
  const { data: aboutData, isLoading } = useAboutSection();
  
  const section = aboutData?.teamSection;
  const team = section?.members || [];

  if (isLoading) return null;

  return (
    <SectionContainer id="equipe" fullHeight>
      <SectionHeader chapter="03" label={section?.label || "Nossa Equipe Técnica"} className="mb-8" />

      <div className="grid grid-cols-12 gap-8 items-end mb-8 md:mb-12 shrink-0">
        <div className="col-span-12 md:col-span-8">
          <SectionTitle
            mainTitle={section?.title || "QUEM ABRE"}
            highlightedTitle={section?.highlightedTitle || "os caminhos."}
          />
        </div>
        <div className="col-span-12 md:col-span-4 self-center">
          <p className="text-[12px] md:text-[14px] leading-[1.6] opacity-65 max-w-[36ch]">
            {section?.description}
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full max-w-[950px] mx-auto">
          {team.map((m: any, i: number) => {
            const rotations = [-2.5, 2, -1.8];
            const offsets = ['md:mt-0', 'md:mt-12', 'md:mt-6'];

            return (
              <article key={i}
                className={`relative aspect-[3/4.1] group overflow-hidden rounded-[24px] grain bg-[var(--ink)] ${offsets[i]}`}
                style={{
                  boxShadow: '0 15px 45px -10px rgba(15,17,22,0.3)',
                  transform: `rotate(${rotations[i]}deg)`,
                  transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)'
                }}
              >
                <div className="absolute inset-0">
                  {m.image && (
                    <ImageWithFallback
                      src={urlFor(m.image).url()}
                      fallbackSrc="/placeholder-person.jpg"
                      alt={m.name}
                      className="w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent transition-opacity group-hover:opacity-100" />
                </div>

                <div className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.3em] text-white/50 uppercase">
                  {(section?.cardLabel || "COACH · 0X").replace('0X', `0${i+1}`)}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-mono text-[8px] tracking-[0.2em] uppercase text-[var(--gold)] mb-1 font-bold">{m.role}</div>
                  <h3 className="font-display font-extrabold text-white text-[18px] md:text-[23px] leading-[0.95] tracking-tight uppercase">{m.name}</h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>

    </SectionContainer>
  );
}

