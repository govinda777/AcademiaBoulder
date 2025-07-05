import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Gift, Users, Medal, ArrowRight, MessageSquare, Edit3, Users2, Loader2, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import SocialFeed from "@/components/ui/social-feed"; // Presumindo que este componente será adaptado
import { useCommunitySection, useSiteSettings } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { SanityBlockContent } from "../ui/SanityBlockContent";


// Helper para mapear string de ícone para componente Lucide
const LucideIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name?.toLowerCase()) {
    case 'gift': return <Gift className={className} />;
    case 'users': return <Users className={className} />;
    case 'medal': return <Medal className={className} />;
    case 'messagesquare': return <MessageSquare className={className} />;
    case 'edit3': return <Edit3 className={className} />;
    case 'users2': return <Users2 className={className} />;
    default: return <ImageIcon className={className} />; // Ícone padrão
  }
};


const containerAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const CommunitySection = () => {
  const { data: communityData, isLoading, error } = useCommunitySection();
  const { data: siteSettings } = useSiteSettings(); // Para URL do Instagram, se necessário

  if (isLoading) {
    return (
      <section id="comunidade" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-neutral-700">Carregando seção da comunidade...</p>
        </div>
      </section>
    );
  }

  if (error || !communityData) {
    return (
      <section id="comunidade" className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 text-center text-red-500">
           <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-2" />
          <p>Ocorreu um erro ao carregar a seção da comunidade.</p>
          <p className="text-sm">Por favor, tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  const {
    title: sectionTitle,
    description: sectionDescription,
    ambassadorProgram,
    instagramSection,
    forumSection,
    // testimonials // TODO: Implementar renderização de depoimentos se houver
  } = communityData;

  const instagramProfileUrl = instagramSection?.profileUrl || siteSettings?.socialMedia?.instagram || "#";
  const instagramFeedTitle = instagramSection?.feedTitle || instagramSection?.hashtag || "#academiaboulder";

  // Prepara imagens para SocialFeed. Prioriza posts manuais do Sanity.
  const socialFeedImages = instagramSection?.posts?.map(post => ({
    src: post.image ? urlFor(post.image).width(400).height(400).url() : '',
    alt: post.caption || 'Post do Instagram',
    link: post.link
  })).filter(img => img.src) || [];

  // Fallback se não houver posts manuais (poderia integrar API aqui no futuro)
  if (socialFeedImages.length === 0) {
    // Adicionar imagens placeholder ou lógica de API
  }


  return (
    <section id="comunidade" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        {/* Título e Descrição da Seção */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">{sectionTitle || "Nossa Comunidade"}</h2>
          {sectionDescription && (
            <div className="text-neutral-700 max-w-2xl mx-auto">
              <SanityBlockContent blocks={sectionDescription} />
            </div>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Programa de Embaixadores */}
          {ambassadorProgram && (
            <motion.div variants={itemAnimation}>
              <Card className="h-full">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-secondary">{ambassadorProgram.title || "Programa de Embaixadores"}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700 mb-6">
                    {ambassadorProgram.description}
                  </p>
                  
                  {ambassadorProgram.benefits && ambassadorProgram.benefits.length > 0 && (
                    <div className="space-y-4 mb-6">
                      {ambassadorProgram.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
                            <LucideIcon name={benefit.icon || 'gift'} className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">{benefit.title}</h4>
                            <p className="text-sm text-neutral-600">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <Button className="bg-primary hover:bg-primary/90">
                    {ambassadorProgram.buttonText || "Saiba Mais"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Instagram Feed */}
          {instagramSection && (
            <motion.div variants={itemAnimation}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h3 className="text-xl font-semibold text-secondary">{instagramFeedTitle}</h3>
                  <a 
                    href={instagramProfileUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                    aria-label="Perfil do Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                </CardHeader>
                <CardContent>
                  {socialFeedImages.length > 0 ? (
                    <SocialFeed images={socialFeedImages.map(img => img.src)} /> // Adaptar SocialFeed se precisar de links/captions
                  ) : (
                    <p className="text-neutral-600">Siga-nos no Instagram para ver as últimas novidades!</p>
                  )}
                  <div className="mt-4">
                    <a
                      href={instagramProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium inline-flex items-center"
                    >
                      Ver mais no Instagram <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Forum Section */}
        {forumSection && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-secondary">{forumSection.title || "Fórum Técnico"}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 mb-6">
                  {forumSection.description}
                </p>

                {forumSection.topics && forumSection.topics.length > 0 ? (
                  <div className="space-y-6">
                    {forumSection.topics.map((topic, index) => (
                      <div key={topic._key || `topic-${index}`} className={index < forumSection.topics.length - 1 ? "border-b border-neutral-200 pb-6" : ""}>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-secondary">{topic.title}</h4>
                          {topic.commentsCount !== undefined && (
                            <span className="text-sm text-neutral-500">{topic.commentsCount} comentários</span>
                          )}
                        </div>
                        <p className="text-neutral-600 text-sm mb-2">
                          {topic.preview}
                        </p>
                        <div className="flex items-center text-sm text-neutral-500">
                          {topic.authorAvatar && (
                            <img
                              src={urlFor(topic.authorAvatar).width(24).height(24).url()}
                              alt={`Avatar de ${topic.authorName}`}
                              className="w-6 h-6 rounded-full mr-2"
                              loading="lazy"
                            />
                          )}
                          <span>{topic.authorName}</span>
                          {topic.timestamp && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{topic.timestamp}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-600">Nenhum tópico no fórum no momento.</p>
                )}

                <div className="mt-6">
                  <Button className="bg-secondary hover:bg-secondary/90">
                    {forumSection.buttonText || "Acessar Fórum"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* TODO: Adicionar renderização de Testimonials se houver dados */}

      </div>
    </section>
  );
};

export default CommunitySection;
