import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowLeft, Users, Calendar, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useProgram } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SanityBlockContent } from "@/components/ui/SanityBlockContent";

const ProgramDetails = () => {
  const { id: slug } = useParams();
  const [activeTab, setActiveTab] = useState("sobre");
  const { data: program, isLoading, error } = useProgram(slug || "");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-secondary mb-4">Programa não encontrado</h2>
        <p className="mb-6 text-neutral-600">O programa que você está procurando não existe ou foi removido.</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/#programas">
            Voltar para Programas
          </Link>
        </Button>
      </div>
    );
  }

  const imageUrl = program.image ? urlFor(program.image).url() : null;

  return (
    <>
      <Helmet>
        <title>{program.title} - Academia Boulder</title>
        <meta name="description" content={program.shortDescription} />
        <meta property="og:title" content={`${program.title} - Academia Boulder`} />
        <meta property="og:description" content={program.shortDescription} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center bg-neutral-900"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
      >
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8">
          <div className="container mx-auto">
            <Button 
              asChild
              variant="outline" 
              className="mb-4 text-white border-white/20 hover:bg-white/10"
            >
              <Link href="/#programas">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Programas
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{program.title}</h1>
            <p className="text-white/80 text-lg mb-4 max-w-2xl">{program.shortDescription}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="sobre" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-b border-neutral-200 bg-transparent rounded-none w-full justify-start mb-8 overflow-x-auto overflow-y-hidden flex-nowrap h-auto pb-0">
            <TabsTrigger 
              value="sobre" 
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Sobre o Programa
            </TabsTrigger>
            {program.levels && program.levels.length > 0 && (
              <TabsTrigger
                value="niveis"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Níveis e Habilidades
              </TabsTrigger>
            )}
            {program.instructors && program.instructors.length > 0 && (
              <TabsTrigger
                value="instrutores"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Instrutores
              </TabsTrigger>
            )}
            {program.schedule && (
              <TabsTrigger
                value="horarios"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Horários e Preços
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="sobre" className="mt-0 outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-secondary mb-4">Descrição do Programa</h2>
                  <div className="text-neutral-700 mb-6 leading-relaxed">
                    <SanityBlockContent blocks={program.description} />
                  </div>
                  
                  {program.features && program.features.length > 0 && (
                    <>
                      <h3 className="text-xl font-semibold text-secondary mb-3">Principais Características</h3>
                      <div className="space-y-2 mb-6">
                        {program.features.map((feature: string, index: number) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-neutral-700">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
              
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-neutral-50">
                    <CardContent className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Tamanho da turma</h4>
                            <p className="text-sm text-neutral-600">Máximo de 8 alunos por instrutor</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Frequência semanal</h4>
                            <p className="text-sm text-neutral-600">2-3 sessões recomendadas</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Timer className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Duração do programa</h4>
                            <p className="text-sm text-neutral-600">6 meses para conclusão típica</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href="/#contato">Agendar Aula Experimental</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="niveis" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">Níveis e Progressão</h2>
              
              <div className="space-y-6">
                {program.levels?.map((level: any, index: number) => (
                  <Card key={index} className={index === 0 ? "border-primary" : ""}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-secondary mb-2">{level.level}</h3>
                      <p className="text-neutral-700 mb-4">{level.description}</p>
                      
                      {level.skills && level.skills.length > 0 && (
                        <>
                          <h4 className="font-medium text-secondary mb-2">Habilidades desenvolvidas:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {level.skills.map((skill: string, skillIndex: number) => (
                              <li key={skillIndex} className="flex items-start">
                                <CheckCircle className="h-4 w-4 text-accent mr-2 mt-0.5" />
                                <span className="text-neutral-700 text-sm">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="instrutores" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">Conheça Nossos Instrutores</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {program.instructors?.map((instructor: any, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    {instructor.image && (
                      <ImageWithFallback
                        src={urlFor(instructor.image).url()}
                        fallbackSrc=""
                        alt={instructor.name}
                        className="w-full h-64 object-cover"
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-secondary mb-1">{instructor.name}</h3>
                      <p className="text-primary text-sm mb-3">{instructor.role}</p>
                      <div className="text-neutral-700 text-sm">
                        <SanityBlockContent blocks={instructor.bio} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="horarios" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-6">Horários e Turmas</h2>
                  
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {program.schedule?.days && (
                          <div>
                            <h3 className="font-semibold text-secondary mb-1">Dias de aula:</h3>
                            <p className="text-neutral-700">{program.schedule.days}</p>
                          </div>
                        )}
                        
                        {program.schedule?.times && (
                          <div>
                            <h3 className="font-semibold text-secondary mb-1">Horários disponíveis:</h3>
                            <p className="text-neutral-700">{program.schedule.times}</p>
                          </div>
                        )}
                        
                        {program.schedule?.duration && (
                          <div>
                            <h3 className="font-semibold text-secondary mb-1">Duração das aulas:</h3>
                            <p className="text-neutral-700">{program.schedule.duration}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {program.pricing && (
                  <div>
                    <h2 className="text-2xl font-bold text-secondary mb-6">Investimento</h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {program.pricing.monthly && (
                        <Card className="overflow-hidden border-primary">
                          <div className="bg-primary text-white p-3 text-center">
                            <h3 className="font-semibold">Plano Mensal</h3>
                          </div>
                          <CardContent className="p-6 text-center">
                            <div className="text-3xl font-bold text-secondary mb-4">{program.pricing.monthly}</div>
                            <Button asChild className="w-full bg-primary hover:bg-primary/90">
                              <Link href="/#contato">Escolher este plano</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.pricing.quarterly && (
                          <Card className="overflow-hidden">
                            <div className="bg-secondary text-white p-3 text-center">
                              <h3 className="font-semibold">Plano Trimestral</h3>
                            </div>
                            <CardContent className="p-6 text-center">
                              <div className="text-2xl font-bold text-secondary mb-2">{program.pricing.quarterly}</div>
                              <Button variant="outline" asChild className="w-full">
                                <Link href="/#contato">Escolher plano</Link>
                              </Button>
                            </CardContent>
                          </Card>
                        )}

                        {program.pricing.annual && (
                          <Card className="overflow-hidden">
                            <div className="bg-secondary text-white p-3 text-center">
                              <h3 className="font-semibold">Plano Anual</h3>
                            </div>
                            <CardContent className="p-6 text-center">
                              <div className="text-2xl font-bold text-secondary mb-2">{program.pricing.annual}</div>
                              <Button variant="outline" asChild className="w-full">
                                <Link href="/#contato">Escolher plano</Link>
                              </Button>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProgramDetails;
