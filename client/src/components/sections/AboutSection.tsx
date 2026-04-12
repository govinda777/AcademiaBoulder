import { useState } from "react";
import { Users, GraduationCap, ShieldCheck, Target, Eye, Heart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAboutSection } from "@/hooks/useSanity";
import { SanityBlockContent } from "@/components/ui/SanityBlockContent";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { AboutSectionData } from "@/types/about.types";
import { urlFor } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [selectedMember, setSelectedMember] = useState<any>(null);

  if (isLoading) {
    return (
      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-pulse h-12 bg-gray-100 rounded w-1/3 mx-auto mb-6"></div>
            <div className="animate-pulse h-4 bg-gray-100 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !aboutData) {
    return (
      <section id="sobre" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500 py-12">
            Ocorreu um erro ao carregar as informações sobre nós. Por favor, tente novamente mais tarde.
          </div>
        </div>
      </section>
    );
  }

  const { mainSection, teamSection, highlights, facilities } = aboutData as AboutSectionData;

  return (
    <section id="sobre" className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary px-4 py-1">Nossa História</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-sans">
            {mainSection?.title || 'Sobre Nós'}
          </h2>
          <div className="text-neutral-700 max-w-3xl mx-auto text-lg leading-relaxed">
            <SanityBlockContent blocks={mainSection?.description} />
          </div>
        </motion.div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border border-neutral-200/60 shadow-2xl shadow-neutral-200/50 bg-white hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="text-primary h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">Missão</h4>
                <p className="text-neutral-600 leading-relaxed">{mainSection?.mission}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full border border-neutral-200/60 shadow-2xl shadow-neutral-200/50 bg-white hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="text-accent h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">Visão</h4>
                <p className="text-neutral-600 leading-relaxed">{mainSection?.vision}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border border-neutral-200/60 shadow-2xl shadow-neutral-200/50 bg-white hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  <Heart className="text-red-500 h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-secondary mb-4">Valores</h4>
                <ul className="space-y-2">
                  {mainSection?.values?.map((value, index) => (
                    <li key={index} className="flex items-center text-neutral-600">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                      {value}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              {mainSection?.mainImage && (
                <ImageWithFallback
                  src={urlFor(mainSection.mainImage).url()}
                  fallbackSrc={FALLBACK_IMAGES.main}
                  alt="Academia Boulder"
                  className="rounded-3xl shadow-2xl w-full h-[500px] object-cover relative z-10"
                />
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-secondary leading-tight">
                Transformando vidas através do <span className="text-primary italic">esporte e da superação</span>.
              </h3>
              <p className="text-neutral-600 text-lg">
                Nossa infraestrutura foi pensada para oferecer o melhor em escalada e treinamento funcional, com segurança e orientação profissional.
              </p>
            </div>

            {/* Destaques List */}
            {highlights && highlights.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center flex-shrink-0 shadow-sm border border-neutral-100">
                      {renderIcon(highlight.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary text-base">{highlight.title}</h4>
                      <p className="text-sm text-neutral-500 leading-snug">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Team Section */}
        {teamSection?.members && teamSection.members.length > 0 && (
          <motion.div 
            className="mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary px-4 py-1">Time</Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary">
                {teamSection.title || 'Nossa Equipe Técnica'}
              </h3>
              <p className="text-neutral-500 mt-4">Clique em um integrante para ver mais detalhes</p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {teamSection.members.map((member, index) => (
                <motion.div 
                  key={`${member.name}-${index}`} 
                  variants={item} 
                  className="group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <Card className="h-full border-none shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl relative">
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white/90 p-2 rounded-full shadow-md">
                        <Info className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="relative h-64 overflow-hidden">
                      {member.image ? (
                        <ImageWithFallback
                          src={urlFor(member.image).url()}
                          fallbackSrc={FALLBACK_IMAGES.team}
                          alt={member.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                          <Users className="w-16 h-16 text-neutral-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                        <p className="text-white text-xs font-medium uppercase tracking-wider mb-1">{member.role}</p>
                        <h4 className="text-white font-bold text-lg">{member.name}</h4>
                      </div>
                    </div>
                    <CardContent className="p-6 text-center">
                      <h4 className="font-bold text-secondary text-lg mb-1 group-hover:text-primary transition-colors">{member.name}</h4>
                      <p className="text-primary text-sm font-medium mb-3 uppercase tracking-tighter">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Member Details Dialog */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none rounded-3xl">
            {selectedMember && (
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <ImageWithFallback
                    src={selectedMember.image ? urlFor(selectedMember.image).url() : FALLBACK_IMAGES.team}
                    fallbackSrc={FALLBACK_IMAGES.team}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <DialogHeader className="text-left mb-4">
                    <Badge className="w-fit mb-2">{selectedMember.role}</Badge>
                    <DialogTitle className="text-2xl font-bold text-secondary">{selectedMember.name}</DialogTitle>
                  </DialogHeader>
                  <div className="text-neutral-600 text-sm leading-relaxed overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                    <SanityBlockContent blocks={selectedMember.bio} />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Facilities Section */}
        {facilities && facilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary px-4 py-1">Espaço</Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-secondary">
                Nossas Instalações
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <div 
                  key={`${facility.name}-${index}`}
                  className="group relative overflow-hidden rounded-3xl h-[300px] shadow-lg"
                >
                  {facility.image ? (
                    <ImageWithFallback
                      src={urlFor(facility.image).url()}
                      fallbackSrc={FALLBACK_IMAGES.facility}
                      alt={facility.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h4 className="text-xl font-bold text-white mb-2">{facility.name}</h4>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {facility.description}
                    </p>
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
