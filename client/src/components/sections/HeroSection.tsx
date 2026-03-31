import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronDown, Trophy, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useHeroSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { data: heroData, isLoading } = useHeroSection();

  // Fallback content while loading or if no CMS data
  const fallbackContent = {
    title: "Descubra Seus Limites.",
    subtitle: "Escalada esportiva e cross training em Sorocaba",
    ctaButtons: [
      { text: "Comece Agora", link: "#agendamento", variant: "primary" },
      { text: "Saiba Mais", link: "#sobre", variant: "secondary" }
    ]
  };

  const content = heroData || fallbackContent;

  // Default background image (fallback)
  const defaultBackgroundImage = "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";

  // Get background image URL with error handling
  const getBackgroundImageUrl = () => {
    try {
      if (heroData?.backgroundImage) {
        return urlFor(heroData.backgroundImage)
          .width(1920)
          .height(1080)
          .quality(90)
          .url();
      }
      return defaultBackgroundImage;
    } catch (error) {
      console.error('Error loading background image:', error);
      return defaultBackgroundImage;
    }
  };

  return (
    <section className="relative h-screen overflow-hidden bg-[#020B2D]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={getBackgroundImageUrl()}
          alt="Escalador em parede de boulder na Academia Boulder em Sorocaba"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="hero-title text-white mb-6">
            <span className="text-white">{content.title.split(" ").slice(0, -1).join(" ")}{" "}</span>
            <span className="text-highlight">{content.title.split(" ").pop()}</span>
          </h1>
          {content.subtitle && (
            <p className="subtitle text-xl md:text-2xl text-white/90 mb-12 uppercase tracking-widest">
              {content.subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {content.ctaButtons?.map((button: any, index: number) => (
              <Button
                key={index}
                asChild
                className={cn(
                  button.variant === 'primary' 
                    ? "btn-primary text-lg"
                    : "bg-transparent hover:bg-white/10 text-white border-2 border-white/50 text-lg px-8 py-6 rounded-md font-bold transition-all duration-300"
                )}
              >
                <Link href={button.link}>
                  {button.text}
                </Link>
              </Button>
            ))}
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
        <Link href="#sobre" className="text-white/40 hover:text-white/60 transition-colors">
          <ChevronDown className="h-8 w-8" />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
