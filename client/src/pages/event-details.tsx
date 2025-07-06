import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, Award, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import CountdownTimer from "@/components/ui/countdown-timer";

// Event data structure
interface EventCategory {
  name: string;
  requirements: string;
  prizes: string;
}

interface EventSchedule {
  time: string;
  activity: string;
}

interface EventSpeaker {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface EventDetails {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  image: string;
  location: string;
  capacity: string;
  price: string;
  categories?: EventCategory[];
  schedule?: EventSchedule[];
  speakers?: EventSpeaker[];
  requirements?: string[];
}

// Mock event data (in a real app, this would come from an API)
const eventsData: EventDetails[] = [
  {
    id: 1,
    title: "Campeonato Regional de Boulder",
    description: "Competição aberta para escaladores de todos os níveis com categorias iniciante, intermediário e avançado.",
    fullDescription: "O Campeonato Regional de Boulder é a principal competição de escalada da região, reunindo atletas de todos os níveis. Com problemas desafiadores montados por route-setters experientes, os participantes terão a oportunidade de demonstrar suas habilidades técnicas, força e estratégia em um ambiente competitivo e amigável. O evento conta com categorias para todos os níveis, premiação atrativa e uma atmosfera incrível para networking e troca de experiências entre escaladores.",
    date: "2023-07-21T09:00:00",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    location: "Academia Boulder - Ginásio Principal",
    capacity: "120 competidores",
    price: "R$ 120,00 (competidores) / R$ 20,00 (espectadores)",
    categories: [
      {
        name: "Iniciante",
        requirements: "Até 1 ano de experiência em escalada",
        prizes: "Troféus + Kits de patrocinadores"
      },
      {
        name: "Intermediário",
        requirements: "1-3 anos de experiência em escalada",
        prizes: "Troféus + Prêmios em dinheiro (R$ 300, R$ 200, R$ 100)"
      },
      {
        name: "Avançado",
        requirements: "Mais de 3 anos de experiência ou ranking em competições anteriores",
        prizes: "Troféus + Prêmios em dinheiro (R$ 1000, R$ 600, R$ 300)"
      }
    ],
    schedule: [
      {
        time: "08:00 - 09:00",
        activity: "Check-in e aquecimento para categoria iniciante"
      },
      {
        time: "09:00 - 12:00",
        activity: "Competição categoria iniciante"
      },
      {
        time: "12:00 - 13:00",
        activity: "Almoço e preparação categoria intermediária"
      },
      {
        time: "13:00 - 16:00",
        activity: "Competição categoria intermediária"
      },
      {
        time: "16:00 - 17:00",
        activity: "Preparação categoria avançada"
      },
      {
        time: "17:00 - 20:00",
        activity: "Competição categoria avançada"
      },
      {
        time: "20:30",
        activity: "Cerimônia de premiação"
      }
    ],
    requirements: [
      "Documento de identificação com foto",
      "Termo de responsabilidade assinado (disponível no local)",
      "Roupa confortável para escalada",
      "Sapatilha própria (aluguel disponível por R$ 20,00)",
      "Garrafa de água e alimentação leve para o dia"
    ]
  },
  {
    id: 2,
    title: "Workshop de Técnicas Avançadas",
    description: "Aprenda técnicas avançadas de escalada com o atleta profissional Marco Aurelio.",
    fullDescription: "Neste workshop intensivo, o atleta profissional Marco Aurelio compartilhará técnicas avançadas de escalada que o ajudaram a conquistar pódios em competições internacionais. Os participantes aprenderão movimentos dinâmicos complexos, técnicas de leitura de via para competições, estratégias de conservação de energia e abordagens mentais para superar bloqueios. O workshop é ideal para escaladores intermediários e avançados que desejam elevar seu nível técnico.",
    date: "2023-07-28T14:00:00",
    image: "https://pixabay.com/get/g9cae84abe898d84f0774a2ebc16cbbf871447b22f57f92f7ae8fcffdf43d721c6e149ec69c93324bd6f53ac5aa20a4578e1d89281b4ad365d51f18f4139627c5_1280.jpg",
    location: "Academia Boulder - Sala de Treinamento",
    capacity: "20 participantes",
    price: "R$ 250,00",
    speakers: [
      {
        name: "Marco Aurelio",
        role: "Atleta Profissional",
        bio: "Marco Aurelio é atleta profissional de escalada com mais de 15 anos de experiência e diversos pódios em competições internacionais. Especialista em boulder e dificuldade, Marco é conhecido por seu estilo técnico e eficiente de movimentação.",
        image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      }
    ],
    schedule: [
      {
        time: "14:00 - 14:30",
        activity: "Introdução e aquecimento"
      },
      {
        time: "14:30 - 16:00",
        activity: "Módulo 1: Movimentos dinâmicos e coordenação"
      },
      {
        time: "16:00 - 16:15",
        activity: "Pausa"
      },
      {
        time: "16:15 - 17:45",
        activity: "Módulo 2: Leitura de via e estratégia"
      },
      {
        time: "17:45 - 18:00",
        activity: "Pausa"
      },
      {
        time: "18:00 - 19:30",
        activity: "Módulo 3: Preparação mental e aplicação prática"
      }
    ],
    requirements: [
      "Nível intermediário ou avançado de escalada",
      "Sapatilha própria",
      "Roupa confortável para escalada",
      "Garrafa de água",
      "Opcional: caderno para anotações"
    ]
  },
  {
    id: 3,
    title: "Encontro da Comunidade",
    description: "Evento social para conectar escaladores, trocar experiências e escalar juntos.",
    fullDescription: "O Encontro da Comunidade é um evento social descontraído que reúne escaladores de todos os níveis para uma noite de networking, troca de experiências e, é claro, muita escalada! O ginásio estará aberto exclusivamente para os participantes, com problemas novos e desafiadores. Haverá também um bate-papo com escaladores experientes, sorteio de brindes dos nossos patrocinadores e um delicioso buffet vegetariano para repor as energias. Este é o momento perfeito para fazer novas amizades na comunidade de escalada.",
    date: "2023-08-04T18:00:00",
    image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    location: "Academia Boulder - Área Social",
    capacity: "50 participantes",
    price: "R$ 50,00 (inclui entrada, um drink e buffet)",
    schedule: [
      {
        time: "18:00 - 19:00",
        activity: "Check-in e escalada livre"
      },
      {
        time: "19:00 - 19:30",
        activity: "Boas-vindas e apresentação dos convidados"
      },
      {
        time: "19:30 - 20:30",
        activity: "Bate-papo com escaladores experientes"
      },
      {
        time: "20:30 - 21:30",
        activity: "Jantar e networking"
      },
      {
        time: "21:30 - 22:00",
        activity: "Sorteio de brindes"
      },
      {
        time: "22:00 - 23:30",
        activity: "Escalada livre e confraternização"
      }
    ],
    speakers: [
      {
        name: "Ana Paula Silva",
        role: "Escaladora de Big Wall",
        bio: "Ana Paula é uma das principais escaladoras de Big Wall do Brasil, com ascensões importantes no Brasil e exterior. Compartilhará suas experiências nas montanhas e como a escalada indoor ajudou em sua preparação.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      },
      {
        name: "Ricardo Mendes",
        role: "Escalador Urbano",
        bio: "Ricardo é pioneiro na escalada urbana e no desenvolvimento de boulder urbano. Vai falar sobre como encontrar desafios na cidade e a relação entre escalada e arte urbana.",
        image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
      }
    ],
    requirements: [
      "Idade mínima: 18 anos",
      "Roupas confortáveis",
      "Sapatilha de escalada (se for escalar)"
    ]
  }
];

const EventDetails = () => {
  const { id } = useParams();
  const eventId = parseInt(id);

  // In a real app, we would fetch this data from an API
  const { data: event, isLoading, error } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: () => {
      // Simulating API fetch
      return new Promise<EventDetails>((resolve, reject) => {
        setTimeout(() => {
          const foundEvent = eventsData.find(e => e.id === eventId);
          if (foundEvent) {
            resolve(foundEvent);
          } else {
            reject(new Error("Evento não encontrado"));
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

  if (error || !event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-secondary mb-4">Evento não encontrado</h2>
        <p className="mb-6 text-neutral-600">O evento que você está procurando não existe ou foi removido.</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/">
            Voltar para Home
          </Link>
        </Button>
      </div>
    );
  }

  const eventDate = parseISO(event.date);

  return (
    <>
      <Helmet>
        <title>{event.title} - Academia Boulder</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={`${event.title} - Academia Boulder`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image} />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="relative h-80 md:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${event.image})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-8">
          <div className="container mx-auto">
            <Button 
              asChild
              variant="outline" 
              className="mb-4 text-white border-white/20 hover:bg-white/10"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Eventos
              </Link>
            </Button>
            <CountdownTimer targetDate={eventDate} />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            <p className="text-white/80 text-lg mb-4 max-w-2xl">{event.description}</p>
            <div className="flex flex-wrap items-center text-white gap-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{format(eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{format(eventDate, "HH:mm")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="info">
          <TabsList className="border-b border-neutral-200 bg-transparent rounded-none w-full justify-start mb-8">
            <TabsTrigger 
              value="info" 
              className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Informações
            </TabsTrigger>
            {event.categories && (
              <TabsTrigger 
                value="categories"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Categorias
              </TabsTrigger>
            )}
            {event.schedule && (
              <TabsTrigger 
                value="schedule"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Programação
              </TabsTrigger>
            )}
            {event.speakers && event.speakers.length > 0 && (
              <TabsTrigger 
                value="speakers"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Palestrantes
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="info" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-secondary mb-4">Sobre o Evento</h2>
                  <p className="text-neutral-700 mb-6 leading-relaxed">
                    {event.fullDescription}
                  </p>
                  
                  {event.requirements && (
                    <>
                      <h3 className="text-xl font-semibold text-secondary mb-3">O que levar</h3>
                      <div className="space-y-2 mb-6">
                        {event.requirements.map((req, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                            <p className="text-neutral-700">{req}</p>
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
                      <h3 className="text-xl font-semibold text-secondary mb-4">Detalhes do Evento</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Data e Hora</h4>
                            <p className="text-sm text-neutral-600">
                              {format(eventDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}, às {format(eventDate, "HH:mm")}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Local</h4>
                            <p className="text-sm text-neutral-600">{event.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Capacidade</h4>
                            <p className="text-sm text-neutral-600">{event.capacity}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-primary"
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M12 6v6l4 2"></path>
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-secondary">Investimento</h4>
                            <p className="text-sm text-neutral-600">{event.price}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Inscreva-se
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>
          
          {event.categories && (
            <TabsContent value="categories" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">Categorias da Competição</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.categories.map((category, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className={`${index === 0 ? 'bg-secondary' : index === 1 ? 'bg-primary' : 'bg-accent'} text-white p-3 text-center`}>
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <h4 className="font-medium text-secondary">Requisitos:</h4>
                          <p className="text-neutral-700">{category.requirements}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary">Premiação:</h4>
                          <p className="text-neutral-700">{category.prizes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 bg-neutral-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-secondary mb-3">Critérios de Julgamento</h3>
                  <p className="text-neutral-700 mb-4">
                    A competição seguirá o formato de Festival, onde cada participante terá um total de 4 horas para tentar quantos problemas desejar. Os 5 melhores resultados serão contabilizados para a pontuação final.
                  </p>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Pontuação</h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-neutral-700">• Top de primeira tentativa: 10 pontos</li>
                        <li className="text-sm text-neutral-700">• Top de segunda tentativa: 7 pontos</li>
                        <li className="text-sm text-neutral-700">• Top de terceira tentativa ou mais: 5 pontos</li>
                        <li className="text-sm text-neutral-700">• Zona de primeira tentativa: 3 pontos</li>
                        <li className="text-sm text-neutral-700">• Zona de segunda tentativa ou mais: 1 ponto</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary mb-2">Critérios de Desempate</h4>
                      <ul className="space-y-1">
                        <li className="text-sm text-neutral-700">1. Maior número de tops de primeira tentativa</li>
                        <li className="text-sm text-neutral-700">2. Maior número total de tops</li>
                        <li className="text-sm text-neutral-700">3. Maior número de zonas de primeira tentativa</li>
                        <li className="text-sm text-neutral-700">4. Menor número de tentativas para tops</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          )}
          
          {event.schedule && (
            <TabsContent value="schedule" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">Programação do Evento</h2>
                
                <div className="relative border-l-2 border-primary/20 pl-6 ml-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="mb-8 relative">
                      <div className="absolute -left-10 top-0 w-4 h-4 bg-primary rounded-full"></div>
                      <div className="text-lg font-semibold text-secondary mb-1">{item.time}</div>
                      <div className="text-neutral-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <p className="text-neutral-600 text-sm italic">
                    * A programação pode sofrer pequenas alterações. Fique atento às comunicações no dia do evento.
                  </p>
                </div>
              </motion.div>
            </TabsContent>
          )}
          
          {event.speakers && event.speakers.length > 0 && (
            <TabsContent value="speakers" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-secondary mb-6">
                  {event.speakers.length > 1 ? "Palestrantes" : "Palestrante"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {event.speakers.map((speaker, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                          <img 
                            src={speaker.image} 
                            alt={speaker.name} 
                            className="w-full h-full object-cover aspect-square"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <h3 className="text-xl font-semibold text-secondary mb-1">{speaker.name}</h3>
                          <p className="text-primary text-sm mb-3">{speaker.role}</p>
                          <p className="text-neutral-700">{speaker.bio}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          )}
        </Tabs>
        
        <div className="mt-12 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary mb-2">Garanta Sua Vaga</h2>
            <p className="text-neutral-700">As inscrições são limitadas. Não perca a oportunidade de participar!</p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Inscreva-se Agora
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
