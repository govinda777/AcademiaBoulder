import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { usePrograms } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Fallback data only as backup
const fallbackPrograms = [
  {
    _id: "escalada",
    title: "Escalada Esportiva",
    shortDescription: "Desenvolva habilidades técnicas de escalada com nosso currículo estruturado em 5 níveis.",
    image: null,
    progress: 80,
    progressLabel: "Nível 4 de 5",
    features: [
      "Técnicas fundamentais de movimento",
      "Estratégias de solução de problemas",
      "Avaliação de progresso mensal"
    ],
    slug: { current: "escalada" }
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
  const { data: programsData, isLoading } = usePrograms();
  const programs = programsData || fallbackPrograms;

  return (
    <section id="programas" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Nossos Programas</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Conheça nossas metodologias exclusivas para todos os níveis, do iniciante ao atleta profissional.
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
              <Card className="h-full overflow-hidden border border-neutral-200">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={program.image ? urlFor(program.image).url() : "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"}
                    fallbackSrc="/placeholder-image.jpg"
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader className="pt-6">
                  <h3 className="font-semibold text-xl mb-4 text-secondary">{program.title}</h3>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="mb-4">
                    <p className="text-neutral-700 mb-2">
                      {program.shortDescription || program.description}
                    </p>
                    
                    {(program.progress || program.progressLabel) && (
                      <div className="flex items-center mt-3">
                        <div className="w-full mr-2">
                          <Progress value={program.progress || 0} className="h-2" />
                        </div>
                        <span className="text-sm text-neutral-600 whitespace-nowrap">{program.progressLabel}</span>
                      </div>
                    )}
                  </div>
                  
                  {program.features && program.features.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {program.features.map((feature: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-neutral-700 text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                  <Button asChild className="bg-secondary hover:bg-secondary/90">
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
