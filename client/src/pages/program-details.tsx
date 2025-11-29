import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowLeft, Users, Calendar, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Program data structure
interface ProgramLevel {
  level: string;
  description: string;
  skills: string[];
}

interface Instructor {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface ProgramDetails {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  progress: number;
  progressLabel: string;
  features: string[];
  levels: ProgramLevel[];
  instructors: Instructor[];
  schedule: {
    days: string;
    times: string;
    duration: string;
  };
  pricing: {
    monthly: string;
    quarterly: string;
    annual: string;
  };
}

// Mock program data (in a real app, this would come from an API)
const programsData: ProgramDetails[] = [
  {
    id: "escalada",
    title: "Escalada Esportiva",
    description: "Desenvolva habilidades técnicas de escalada com nosso currículo estruturado em 5 níveis.",
    fullDescription: "Nosso programa de Escalada Esportiva é projetado para desenvolver escaladores completos, combinando técnica, força, resistência e mentalidade. Com uma metodologia progressiva, você avançará por níveis claramente definidos, cada um com objetivos específicos e habilidades mensuráveis.",
    image: "https://images.unsplash.com/photo-1516592673884-4a382d1124c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    progress: 80,
    progressLabel: "Nível 4 de 5",
    features: [
      "Técnicas fundamentais de movimento",
      "Estratégias de solução de problemas",
      "Avaliação de progresso mensal"
    ],
    levels: [
      {
        level: "Nível 1 - Fundamentos",
        description: "Introdução às técnicas básicas de escalada e segurança.",
        skills: ["Posicionamento corporal", "Técnicas de pega", "Leitura básica de vias", "Quedas seguras"]
      },
      {
        level: "Nível 2 - Desenvolvimento",
        description: "Aprimoramento das técnicas e introdução a movimentos intermediários.",
        skills: ["Técnicas de pés", "Escalada dinâmica básica", "Conservação de energia", "Estratégias simples"]
      },
      {
        level: "Nível 3 - Intermediário",
        description: "Foco em eficiência e variedade de técnicas em diferentes terrenos.",
        skills: ["Movimentos dinâmicos", "Escalada em teto", "Leitura avançada de vias", "Técnicas de respiração"]
      },
      {
        level: "Nível 4 - Avançado",
        description: "Domínio de técnicas avançadas e treinamento de força específica.",
        skills: ["Movimentos de coordenação", "Técnicas de bloqueio", "Escalada em volumes", "Periodização de treino"]
      },
      {
        level: "Nível 5 - Elite",
        description: "Preparação para competições e escalada de alto nível.",
        skills: ["Técnicas de competição", "Movimentos complexos", "Estratégia avançada", "Preparação mental"]
      }
    ],
    instructors: [
      {
        name: "Marcelo Santos",
        role: "Instrutor Chefe",
        bio: "Atleta IFSC com 15 anos de experiência e especialista em pedagogia esportiva.",
        image: "https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      },
      {
        name: "Camila Rocha",
        role: "Instrutora Avançada",
        bio: "Ex-atleta olímpica e especialista em treinamento de alta performance.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      }
    ],
    schedule: {
      days: "Segunda, Quarta e Sexta",
      times: "07:00, 10:00, 16:00 e 19:00",
      duration: "1h30 por sessão"
    },
    pricing: {
      monthly: "R$ 350,00",
      quarterly: "R$ 950,00",
      annual: "R$ 3.500,00"
    }
  },
  {
    id: "crosstraining",
    title: "Cross Training",
    description: "Programa de condicionamento físico especializado para escaladores com periodização.",
    fullDescription: "O Cross Training para escaladores é um programa de condicionamento físico especializado que foca no desenvolvimento de força, resistência, mobilidade e prevenção de lesões específicas para as demandas da escalada. Utilizamos uma abordagem periodizada para maximizar seus ganhos e evitar platôs.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    progress: 60,
    progressLabel: "Fase 3 de 5",
    features: [
      "Força específica para escalada",
      "Mobilidade e prevenção de lesões",
      "Integração com wearables"
    ],
    levels: [
      {
        level: "Fase 1 - Avaliação e Base",
        description: "Avaliação inicial e construção de base de força e mobilidade.",
        skills: ["Avaliação biomecânica", "Correção postural", "Força básica de dedos", "Mobilidade de ombros"]
      },
      {
        level: "Fase 2 - Construção",
        description: "Desenvolvimento progressivo de força e endurance.",
        skills: ["Treinamento de antagonistas", "Força de core", "Resistência aeróbia", "Técnicas de recuperação"]
      },
      {
        level: "Fase 3 - Especialização",
        description: "Treinamento específico para demandas da escalada.",
        skills: ["Força específica de dedos", "Pulling power", "Resistência de antebraço", "Potência de pernas"]
      },
      {
        level: "Fase 4 - Pico",
        description: "Intensificação e preparação para performance máxima.",
        skills: ["Treinamento campus", "Bloqueios avançados", "Resistência anaeróbia", "Power endurance"]
      },
      {
        level: "Fase 5 - Transição",
        description: "Recuperação ativa e preparação para novo ciclo.",
        skills: ["Técnicas de recuperação", "Mobilidade avançada", "Treino de baixo impacto", "Reabilitação"]
      }
    ],
    instructors: [
      {
        name: "Felipe Almeida",
        role: "Preparador Físico",
        bio: "Fisioterapeuta esportivo e especialista em biomecânica da escalada.",
        image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      }
    ],
    schedule: {
      days: "Terça, Quinta e Sábado",
      times: "08:00, 12:00, 18:00",
      duration: "1h por sessão"
    },
    pricing: {
      monthly: "R$ 300,00",
      quarterly: "R$ 800,00",
      annual: "R$ 3.000,00"
    }
  },
  {
    id: "instrutores",
    title: "Formação de Instrutores",
    description: "Torne-se um instrutor certificado com nossa formação reconhecida nacionalmente.",
    fullDescription: "O programa de Formação de Instrutores da Academia Boulder é uma certificação completa para quem deseja atuar profissionalmente no ensino da escalada. Nosso curso abrange metodologias pedagógicas, técnicas avançadas, segurança, primeiros socorros e gestão de aulas, tudo com uma abordagem prática e teórica equilibrada.",
    image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    progress: 100,
    progressLabel: "Certificação",
    features: [
      "Metodologia de ensino",
      "Segurança e prevenção",
      "Programa de residência técnica"
    ],
    levels: [
      {
        level: "Módulo 1 - Fundamentos de Escalada",
        description: "Revisão e aprofundamento técnico das habilidades fundamentais.",
        skills: ["Técnica avançada", "Biomecânica", "Análise de movimento", "Auto-resgate básico"]
      },
      {
        level: "Módulo 2 - Pedagogia da Escalada",
        description: "Metodologias de ensino adaptadas para diferentes perfis de alunos.",
        skills: ["Princípios pedagógicos", "Planejamento de aulas", "Progressões didáticas", "Feedback efetivo"]
      },
      {
        level: "Módulo 3 - Segurança e Gestão de Risco",
        description: "Protocolos de segurança e primeiros socorros específicos para escalada.",
        skills: ["Primeiros socorros", "Avaliação de risco", "Protocolos de emergência", "Responsabilidade legal"]
      },
      {
        level: "Módulo 4 - Prática Supervisionada",
        description: "Experiência prática de ensino sob supervisão de instrutores seniores.",
        skills: ["Aulas assistidas", "Co-instrução", "Avaliação de alunos", "Gestão de grupo"]
      },
      {
        level: "Módulo 5 - Residência Técnica",
        description: "Período de instrução com acompanhamento e mentorias regulares.",
        skills: ["Instrução solo", "Mentoria semanal", "Estudos de caso", "Projeto final"]
      }
    ],
    instructors: [
      {
        name: "Juliana Costa",
        role: "Coordenadora de Formação",
        bio: "Especialista em iniciação à escalada e formação de novos instrutores.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      }
    ],
    schedule: {
      days: "Intensivo (3 meses) ou Extensivo (6 meses)",
      times: "Aulas aos finais de semana ou noturnas",
      duration: "200 horas totais (teóricas e práticas)"
    },
    pricing: {
      monthly: "R$ 1.200,00 (parcela)",
      quarterly: "R$ 3.400,00 (à vista)",
      annual: "R$ 5.500,00 (curso completo)"
    }
  }
];

const ProgramDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("sobre");

  // In a real app, we would fetch this data from an API
  const { data: program, isLoading, error } = useQuery({
    queryKey: [`program-${id}`],
    queryFn: () => {
      // Simulating API fetch
      return new Promise<ProgramDetails>((resolve, reject) => {
        setTimeout(() => {
          const foundProgram = programsData.find(p => p.id === id);
          if (foundProgram) {
            resolve(foundProgram);
          } else {
            reject(new Error("Programa não encontrado"));
          }
        }, 300);
      });
    },
    staleTime: Infinity, // since this is mock data
  });

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

  return (
    <>
      <Helmet>
        <title>{program.title} - Academia Boulder</title>
        <meta name="description" content={program.description} />
        <meta property="og:title" content={`${program.title} - Academia Boulder`} />
        <meta property="og:description" content={program.description} />
        <meta property="og:image" content={program.image} />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${program.image})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
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
            <p className="text-white/80 text-lg mb-4 max-w-2xl">{program.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="sobre" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="border-b border-neutral-200 bg-transparent rounded-none w-full justify-start mb-8">
            <TabsTrigger 
              value="sobre" 
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Sobre o Programa
            </TabsTrigger>
            <TabsTrigger 
              value="niveis"
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Níveis e Habilidades
            </TabsTrigger>
            <TabsTrigger 
              value="instrutores"
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Instrutores
            </TabsTrigger>
            <TabsTrigger 
              value="horarios"
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Horários e Preços
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sobre" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-secondary mb-4">Descrição do Programa</h2>
                  <p className="text-neutral-700 mb-6 leading-relaxed">
                    {program.fullDescription}
                  </p>
                  
                  <h3 className="text-xl font-semibold text-secondary mb-3">Principais Características</h3>
                  <div className="space-y-2 mb-6">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-neutral-700">{feature}</p>
                      </div>
                    ))}
                  </div>
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
                      <h3 className="text-xl font-semibold text-secondary mb-4">Seu Progresso</h3>
                      
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <Progress value={program.progress} className="h-2 flex-grow mr-2" />
                          <span className="text-sm text-neutral-600">{program.progressLabel}</span>
                        </div>
                      </div>
                      
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
                      
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Agendar Aula Experimental
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="niveis" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">Níveis e Progressão</h2>
              
              <div className="space-y-6">
                {program.levels.map((level, index) => (
                  <Card key={index} className={index === 0 ? "border-primary" : ""}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-secondary mb-2">{level.level}</h3>
                      <p className="text-neutral-700 mb-4">{level.description}</p>
                      
                      <h4 className="font-medium text-secondary mb-2">Habilidades desenvolvidas:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {level.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-accent mr-2 mt-0.5" />
                            <span className="text-neutral-700 text-sm">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="instrutores" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-secondary mb-6">Conheça Nossos Instrutores</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {program.instructors.map((instructor, index) => (
                  <Card key={index} className="overflow-hidden">
                    <ImageWithFallback
                      src={instructor.image}
                      fallbackSrc="/placeholder-image.jpg"
                      alt={instructor.name}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-secondary mb-1">{instructor.name}</h3>
                      <p className="text-primary text-sm mb-3">{instructor.role}</p>
                      <p className="text-neutral-700">{instructor.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="horarios" className="mt-0">
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
                        <div>
                          <h3 className="font-semibold text-secondary mb-1">Dias de aula:</h3>
                          <p className="text-neutral-700">{program.schedule.days}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-secondary mb-1">Horários disponíveis:</h3>
                          <p className="text-neutral-700">{program.schedule.times}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-secondary mb-1">Duração das aulas:</h3>
                          <p className="text-neutral-700">{program.schedule.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-secondary mb-3">Informações Adicionais</h3>
                    <ul className="space-y-2 text-neutral-700">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
                        <span>Material incluso para alunos iniciantes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
                        <span>Reposição de aulas mediante aviso prévio</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
                        <span>Acesso à área de treino em horários específicos</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
                        <span>Desconto em eventos e competições</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold text-secondary mb-6">Investimento</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="overflow-hidden border-primary">
                      <div className="bg-primary text-white p-3 text-center">
                        <h3 className="font-semibold">Plano Mensal</h3>
                      </div>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-secondary mb-4">{program.pricing.monthly}</div>
                        <ul className="space-y-2 text-left mb-6">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2" />
                            <span>Acesso a todas as aulas do programa</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2" />
                            <span>Material incluso</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2" />
                            <span>Sem taxa de matrícula</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Escolher este plano
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="overflow-hidden">
                        <div className="bg-secondary text-white p-3 text-center">
                          <h3 className="font-semibold">Plano Trimestral</h3>
                        </div>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-secondary mb-2">{program.pricing.quarterly}</div>
                          <p className="text-sm text-neutral-600 mb-4">Economia de até 10%</p>
                          <Button variant="outline" className="w-full">
                            Escolher plano
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="bg-secondary text-white p-3 text-center">
                          <h3 className="font-semibold">Plano Anual</h3>
                        </div>
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-secondary mb-2">{program.pricing.annual}</div>
                          <p className="text-sm text-neutral-600 mb-4">Economia de até 17%</p>
                          <Button variant="outline" className="w-full">
                            Escolher plano
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-neutral-700 mb-4">Dúvidas sobre qual plano escolher?</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="#contato">
                    Fale com nossos consultores
                  </Link>
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProgramDetails;
