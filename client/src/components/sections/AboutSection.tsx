import { Button } from "@/components/ui/button";
import { Users, GraduationCap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAboutSection } from "@/hooks/useSanity";
import { SanityBlockContent } from "@/components/ui/SanityBlockContent";
import { AboutSectionData } from "@/types/about.types";

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
            <h3 className="text-2xl font-semibold text-secondary mb-4">Nossa Filosofia</h3>
            <p className="text-neutral-700 mb-4">
              {mainSection?.philosophy}
            </p>
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
            {mainSection?.mainImageUrl && (
              <img 
                src={mainSection.mainImageUrl} 
                alt="Academia Boulder" 
                className="rounded-lg shadow-lg w-full h-auto max-h-[500px] object-cover"
                loading="lazy"
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
                  {member.imageUrl && (
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
                      loading="lazy"
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

        {/* Seção de Segurança */}
        {safetySection?.stats && safetySection.stats.length > 0 && (
          <motion.div 
            className="bg-neutral-50 rounded-lg p-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-secondary mb-2">
                {safetySection.title || 'Segurança em Primeiro Lugar'}
              </h3>
              {safetySection.description && (
                <p className="text-neutral-700 max-w-3xl mx-auto">
                  {safetySection.description}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {safetySection.stats.map((stat, index) => (
                <div 
                  key={`${stat.label}-${index}`} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
                >
                  <div className="text-accent text-3xl font-bold mb-2 font-sans">{stat.value}</div>
                  <div className="text-secondary font-medium text-lg mb-1">{stat.label}</div>
                  <p className="text-sm text-neutral-600">{stat.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button className="bg-secondary hover:bg-secondary/90">
                {safetySection.buttonText || 'Ver Relatório Completo'}
              </Button>
            </div>
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
                  {facility.imageUrl && (
                    <img 
                      src={facility.imageUrl} 
                      alt={facility.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
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
