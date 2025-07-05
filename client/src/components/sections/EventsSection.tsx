import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
// import CountdownTimer from "@/components/ui/countdown-timer"; // TODO: Implementar ou remover
import { motion } from "framer-motion";
import { useEvents } from "@/hooks/useSanity";
import { urlFor } from "@/lib/sanity";
import { format, differenceInDays, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Tipagem para os eventos vindos do Sanity
interface Event {
  _id: string;
  title?: string;
  slug?: { current: string };
  description?: string;
  date?: string;
  image?: any; // Tipo 'any' para o objeto de imagem do Sanity
}

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// TODO: Mover títulos e descrições da seção para Sanity (ex: siteSettings ou um schema específico para a página de eventos)
const SECTION_TITLE = "Próximos Eventos";
const SECTION_DESCRIPTION = "Participe de competições, workshops e encontros da nossa comunidade de escalada.";
const FALLBACK_IMAGE_URL = "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500";


const EventsSection = () => {
  const { data: eventsData, isLoading, error } = useEvents();

  const getDaysUntil = (dateString?: string) => {
    if (!dateString) return null;
    const eventDate = parseISO(dateString);
    const today = new Date();
    return differenceInDays(eventDate, today);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-neutral-700">Carregando eventos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>Ocorreu um erro ao carregar os eventos. Tente novamente mais tarde.</p>
        </div>
      </section>
    );
  }

  const events = eventsData || [];

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">{SECTION_TITLE}</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            {SECTION_DESCRIPTION}
          </p>
        </motion.div>

        {events.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
            variants={containerAnimation}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {events.map((event: Event) => {
              const daysUntil = getDaysUntil(event.date);
              const imageUrl = event.image ? urlFor(event.image).width(800).height(500).url() : FALLBACK_IMAGE_URL;

              return (
                <motion.div key={event._id} variants={itemAnimation}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={event.title || 'Imagem do Evento'}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pt-6 pb-0">
                      {daysUntil !== null && daysUntil >= 0 && (
                        <div className="event-countdown text-sm text-primary mb-1">
                          {daysUntil === 0 ? "É hoje!" : `Em ${daysUntil} dia${daysUntil > 1 ? 's' : ''}`}
                        </div>
                      )}
                       {/* <CountdownTimer targetDate={event.date} /> TODO: Re-integrar ou refatorar CountdownTimer */}
                      <h3 className="font-semibold text-xl text-secondary line-clamp-2">{event.title || "Evento Sem Título"}</h3>
                    </CardHeader>
                    <CardContent className="py-3 flex-grow">
                      <p className="text-neutral-700 mb-4 line-clamp-3">
                        {event.description || "Sem descrição disponível."}
                      </p>
                      {event.date && (
                        <div className="flex items-center text-neutral-600 text-sm mb-2">
                          <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>
                            {format(parseISO(event.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="link" className="text-primary p-0 h-auto hover:underline">
                        <Link href={`/eventos/${event.slug?.current || event._id}`}>
                          Inscreva-se <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center text-neutral-600 py-10">
            <p>Nenhum evento programado no momento. Volte em breve!</p>
          </div>
        )}

        <div className="text-center">
          {/* TODO: Link para uma página de "Todos os Eventos" se existir */}
          <Button variant="outline" className="bg-white hover:bg-neutral-50 text-primary border-primary">
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
