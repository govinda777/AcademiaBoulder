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

  const features = [
    {
      icon: <Trophy className="w-8 h-8 text-blue-300" />,
      title: "Experiência",
      description: "Mais de 10 anos"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-300" />,
      title: "Comunidade",
      description: "500+ atletas"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-300" />,
      title: "Qualidade",
      description: "Instrutores certificados"
    }
  ];

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
          alt="Academia Boulder background"
          className="object-cover w-full h-full"
        />
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
            <span className="text-white">{content.title.split(" ").slice(0, -1).join(" ")} </span>
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

        {/* Feature Cards */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-xl bg-[#020B2D]/80 backdrop-blur-sm border border-white/10 w-[280px]"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-white mt-3">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
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
