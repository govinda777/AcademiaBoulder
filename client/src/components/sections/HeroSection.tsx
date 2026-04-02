import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Trophy, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroSection } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const { data: heroData, isLoading } = useHeroSection();
  const [imageLoaded, setImageLoaded] = useState(false);

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
      return null;
    } catch (error) {
      console.error('Error loading background image:', error);
      return null;
    }
  };

  const bgUrl = getBackgroundImageUrl();

  // Preload image
  useEffect(() => {
    if (bgUrl) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = bgUrl;
      link.imageSrcset = ""; // Avoid issues if not defined
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [bgUrl]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#020B2D]">
      {/* Skeleton / Loading State */}
      <AnimatePresence>
        {(!imageLoaded || isLoading) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 bg-[#020B2D] flex items-center justify-center"
          >
            <div className="w-full h-full animate-pulse bg-gradient-to-br from-[#020B2D] via-[#0A1A4D] to-[#020B2D]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Image with Overlay */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-1000",
        imageLoaded ? "opacity-100" : "opacity-0"
      )}>
        {bgUrl && (
          <img
            src={bgUrl}
            alt="Escalador em parede de boulder na Academia Boulder em Sorocaba"
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            fetchpriority="high"
          />
        )}
        {/* Dark linear-gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            <span className="text-white">{content.title.split(" ").slice(0, -1).join(" ")}{" "}</span>
            <span className="text-[#5B9BD5]">{content.title.split(" ").pop()}</span>
          </h1>
          {content.subtitle && (
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              {content.subtitle}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {content.ctaButtons?.map((button: any, index: number) => (
              <Button
                key={index}
                asChild
                size="lg"
                className={cn(
                  "text-lg px-8 py-6 rounded-full font-medium",
                  button.variant === 'primary' 
                    ? "bg-[#2B7FE0] hover:bg-[#2B7FE0]/90 text-white"
                    : "bg-transparent hover:bg-white/5 text-white border border-white/30"
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
