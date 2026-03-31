import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { usePrograms } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Hardcoded programs as per requirement
const hardcodedPrograms = [
  {
    _id: "escalada",
    title: "Escalada Indoor",
    shortDescription: "Desenvolva habilidades técnicas de escalada com nosso currículo estruturado em 5 níveis.",
    image: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    progress: 80,
    progressLabel: "Nível 4 de 5",
    features: [
      "Técnicas fundamentais de movimento",
      "Estratégias de solução de problemas",
      "Avaliação de progresso mensal"
    ],
    slug: { current: "escalada" }
  },
  {
    _id: "crosstraining",
    title: "Cross Training",
    shortDescription: "Programa de condicionamento físico especializado para escaladores com periodização.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    progress: 60,
    progressLabel: "Fase 3 de 5",
    features: [
      "Força específica para escalada",
      "Mobilidade e prevenção de lesões",
      "Integração com wearables"
    ],
    slug: { current: "crosstraining" }
  },
  {
    _id: "personal",
    title: "Personal Training",
    shortDescription: "Treino individualizado focado nos seus objetivos específicos.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    progress: 100,
    progressLabel: "Exclusivo",
    features: [
      "Plano personalizado",
      "Acompanhamento exclusivo",
      "Horários flexíveis"
    ],
    slug: { current: "personal" }
  }
];

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

const ProgramsSection = () => {
  // const { data: programsData, isLoading } = usePrograms();
  const programs = hardcodedPrograms; // programsData || fallbackPrograms;

  const getImageUrl = (image: any) => {
    if (!image) return "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    if (typeof image === 'string') return image;
    try {
      return urlFor(image).url();
    } catch (e) {
      return "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500";
    }
  };

  return (
    <section id="programas" className="py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">Nossos Programas</h2>
          <p className="subtitle text-lg max-w-2xl mx-auto">
            Metodologias exclusivas para todos os níveis, do iniciante ao atleta profissional.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {programs.map((program: any) => (
            <motion.div key={program._id || program.id} variants={item} id={program._id || program.id} className="program-card">
              <Card className="h-full overflow-hidden border-none shadow-xl bg-white rounded-xl">
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={getImageUrl(program.image)}
                    fallbackSrc="/placeholder-image.jpg"
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 font-black text-2xl text-white uppercase italic tracking-tighter">{program.title}</h3>
                </div>
                <CardContent className="pt-8">
                  <div className="mb-6">
                    <p className="text-secondary leading-relaxed font-medium">
                      {program.shortDescription || program.description}
                    </p>
                    
                    {(program.progress || program.progressLabel) && (
                      <div className="flex items-center mt-6">
                        <div className="w-full mr-4">
                          <Progress value={program.progress || 0} className="h-2 bg-muted" />
                        </div>
                        <span className="text-xs font-bold text-primary uppercase tracking-widest whitespace-nowrap">{program.progressLabel}</span>
                      </div>
                    )}
                  </div>
                  
                  {program.features && program.features.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {program.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-secondary text-sm font-medium">{feature}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pb-8 px-6">
                  <Button asChild className="btn-primary w-full py-6">
                    <Link href={`/programas/${program.slug?.current || program.id}`}>
                      Detalhes do Programa
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
