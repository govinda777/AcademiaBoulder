import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { usePrograms } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

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
  const { data: programs, isLoading } = usePrograms();

  if (isLoading) {
    return (
      <section id="programas" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-neutral-200 animate-pulse mx-auto mb-4 rounded"></div>
            <div className="h-4 w-96 bg-neutral-200 animate-pulse mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-neutral-100 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!programs || programs.length === 0) return null;

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
            <motion.div key={program._id} variants={item} id={program._id} className="program-card">
              <Card className="h-full overflow-hidden border border-neutral-200 flex flex-col">
                {program.image && (
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={urlFor(program.image).url()}
                      fallbackSrc="" // No fallback as per requirement
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pt-6">
                  <h3 className="font-semibold text-xl mb-2 text-secondary">{program.title}</h3>
                </CardHeader>
                <CardContent className="pb-0 flex-grow">
                  <div className="mb-4">
                    <p className="text-neutral-700 mb-2">
                      {program.shortDescription}
                    </p>
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
                  <Button asChild className="bg-secondary hover:bg-secondary/90 w-full">
                    <Link href={`/programas/${program.slug?.current}`}>
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
