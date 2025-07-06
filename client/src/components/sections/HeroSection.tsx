import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoBackground from "@/components/ui/video-background";
import { motion } from "framer-motion";
import { useHeroSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";

const HeroSection = () => {
  const { data: heroData, isLoading } = useHeroSection();

  // Fallback content while loading or if no CMS data
  const fallbackContent = {
    title: "Evolua Além dos Limites",
    subtitle: "Centro de excelência em escalada boulder com metodologias avançadas para todos os níveis",
    ctaButtons: [
      { text: "Agendar Visita", link: "#agendamento", variant: "primary" },
      { text: "Conhecer Programas", link: "#programas", variant: "secondary" }
    ]
  };

  const content = heroData || fallbackContent;

  return (
    <section className="relative h-screen">
      {/* Video Background with Overlay */}
      <VideoBackground 
        videoUrl="https://player.vimeo.com/external/370331493.sd.mp4?s=e90dcaba73c19e0e36f03406b47bbd6992dd6c1c&profile_id=139&oauth2_token_id=57447761" 
        fallbackImg={heroData?.backgroundImage ? urlFor(heroData.backgroundImage).url() : "https://pixabay.com/get/gc3b07c52abb69dbeee4c5a7267a0fc5ae5607da4a82c78e1a9aa3f2075b1f0eadee36fd16cc3e49f87b1b56ba2c55e39_1280.jpg"}
      />

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-xl text-white mb-8 max-w-2xl">
              {content.subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {content.ctaButtons?.map((button: any, index: number) => (
              <Button
                key={index}
                asChild
                size="lg"
                className={
                  button.variant === 'primary' 
                    ? "bg-primary hover:bg-primary/90 text-white"
                    : button.variant === 'accent'
                    ? "bg-boulder-gold hover:bg-boulder-gold/90 text-boulder-dark"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-sm"
                }
                variant={button.variant === 'primary' ? "default" : "outline"}
              >
                <Link href={button.link}>
                  {button.text}
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-sans">+500m²</p>
            <p className="text-white/80">Área de Escalada</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-sans">+100</p>
            <p className="text-white/80">Problemas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-sans">8</p>
            <p className="text-white/80">Instrutores IFSC</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut" 
        }}
      >
        <Link href="#agendamento" className="text-white">
          <ChevronDown className="h-6 w-6" />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
