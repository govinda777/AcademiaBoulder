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
  const [mediaLoaded, setMediaLoaded] = useState(false);

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
  const videoUrl = content.backgroundVideo?.asset?.url;

  // Get background image URL with error handling
  const getBackgroundImageUrl = () => {
    try {
      if (content.backgroundImage) {
        return urlFor(content.backgroundImage)
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

  // Preload image if no video
  useEffect(() => {
    if (bgUrl && !videoUrl) {
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
  }, [bgUrl, videoUrl]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#020B2D]">
      {/* Skeleton / Loading State */}
      <AnimatePresence>
        {(!mediaLoaded || isLoading) && (
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

      {/* Background Media with Overlay */}
      <div className={cn(
        "absolute inset-0 z-0 transition-opacity duration-1000",
        mediaLoaded ? "opacity-100" : "opacity-0"
      )}>
        {videoUrl ? (
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            onCanPlayThrough={() => setMediaLoaded(true)}
            className="w-full h-full object-cover"
          />
        ) : bgUrl ? (
          <img
            src={bgUrl}
            alt="Escalador em parede de boulder na Academia Boulder em Sorocaba"
            className="w-full h-full object-cover"
            onLoad={() => setMediaLoaded(true)}
            fetchpriority="high"
          />
        ) : null}
        {/* Subtle overlay to unify the background without over-darkening */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="backdrop-blur-xl bg-black/45 p-8 md:p-16 rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 font-montserrat tracking-tight leading-[1.1] uppercase drop-shadow-md">
              {content.title.includes(' - ') ? (
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4">
                  {content.title.split(' - ').map((part: string, idx: number, arr: string[]) => (
                    <div key={idx} className="flex items-center">
                      <span className={idx === arr.length - 1 ? "text-[#5B9BD5]" : "text-white"}>
                        {part}
                      </span>
                      {idx < arr.length - 1 && (
                        <span className="hidden md:inline ml-4 md:ml-8 text-[#5B9BD5]/40 font-extralight select-none">|</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <span className="text-white">{content.title.split(" ").slice(0, -1).join(" ")}{" "}</span>
                  <span className="text-[#5B9BD5]">{content.title.split(" ").pop()}</span>
                </>
              )}
            </h1>
            {content.subtitle && (
              <p className="text-lg md:text-2xl text-white/90 font-sans font-medium max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
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
