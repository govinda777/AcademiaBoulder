import { Button } from "@/components/ui/button";
import { Users, GraduationCap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAboutSection } from "@/hooks/useSanity";
import { SanityBlockContent } from "@/components/ui/SanityBlockContent";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { AboutSectionData } from "@/types/about.types";
import { urlFor } from "@/lib/sanity";

const FALLBACK_IMAGES = {
  main: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  team: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  facility: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'users':
      return <Users className="text-primary h-6 w-6" />;
    case 'graduation':
      return <GraduationCap className="text-primary h-6 w-6" />;
    case 'shield':
      return <ShieldCheck className="text-primary h-6 w-6" />;
    default:
      return <Users className="text-primary h-6 w-6" />;
  }
};

const AboutSection = () => {
  const { data: aboutData, isLoading, error } = useAboutSection();

  if (isLoading) {
    return (
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !aboutData) {
    return (
      <section id="sobre" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 py-12">
            Ocorreu um erro ao carregar as informações sobre nós. Por favor, tente novamente mais tarde.
          </div>
        </div>
      </section>
    );
  }

  const { mainSection, teamSection, safetySection, highlights, facilities } = aboutData as AboutSectionData;
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Seção Principal */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">
            {mainSection?.title || 'Sobre Nós'}
          </h2>
          <div className="text-neutral-700 max-w-2xl mx-auto">
            <SanityBlockContent blocks={mainSection?.description} />
          </div>
        </motion.div>

        {/* Filosofia e Destaques */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-medium text-secondary mb-2">Missão</h4>
                <p className="text-neutral-700">{mainSection?.mission}</p>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2">Visão</h4>
                <p className="text-neutral-700">{mainSection?.vision}</p>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2">Valores</h4>
                <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                  {mainSection?.values?.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Destaques */}
            {highlights && highlights.length > 0 && (
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      {renderIcon(highlight.icon)}
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary">{highlight.title}</h4>
                      <p className="text-sm text-neutral-600">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Imagem Principal */}
          <div className="h-full flex items-center">
            {mainSection?.mainImage && (
              <ImageWithFallback
                src={urlFor(mainSection.mainImage).url()}
                fallbackSrc={FALLBACK_IMAGES.main}
                alt="Academia Boulder"
                className="rounded-lg shadow-lg w-full h-auto max-h-[500px] object-cover"
              />
            )}
          </div>
        </motion.div>

        {/* Seção da Equipe */}
        {teamSection?.members && teamSection.members.length > 0 && (
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold text-secondary mb-8 text-center">
              {teamSection.title || 'Nossa Equipe Técnica'}
            </h3>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {teamSection.members.map((member, index) => (
                <motion.div 
                  key={`${member.name}-${index}`} 
                  variants={item} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  {member.image && (
                    <ImageWithFallback
                      src={urlFor(member.image).url()}
                      fallbackSrc={FALLBACK_IMAGES.team}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
                    />
                  )}
                  <h4 className="font-semibold text-secondary text-lg">{member.name}</h4>
                  <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-neutral-600 text-sm">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Seção de Instalações */}
        {facilities && facilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-semibold text-secondary mb-8 text-center">
              Nossas Instalações
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility, index) => (
                <div 
                  key={`${facility.name}-${index}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {facility.image && (
                    <ImageWithFallback
                      src={urlFor(facility.image).url()}
                      fallbackSrc={FALLBACK_IMAGES.facility}
                      alt={facility.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-secondary mb-2">{facility.name}</h4>
                    <p className="text-neutral-600">{facility.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
