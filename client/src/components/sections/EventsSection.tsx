import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/ui/countdown-timer";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

const events = [
  {
    id: 1,
    title: "Campeonato Regional de Boulder",
    description: "Competição aberta para escaladores de todos os níveis com categorias iniciante, intermediário e avançado.",
    date: "2023-07-21T09:00:00",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    daysUntil: 7
  },
  {
    id: 2,
    title: "Workshop de Técnicas Avançadas",
    description: "Aprenda técnicas avançadas de escalada com o atleta profissional Marco Aurelio.",
    date: "2023-07-28T14:00:00",
    image: "https://pixabay.com/get/g9cae84abe898d84f0774a2ebc16cbbf871447b22f57f92f7ae8fcffdf43d721c6e149ec69c93324bd6f53ac5aa20a4578e1d89281b4ad365d51f18f4139627c5_1280.jpg",
    daysUntil: 14
  },
  {
    id: 3,
    title: "Encontro da Comunidade",
    description: "Evento social para conectar escaladores, trocar experiências e escalar juntos.",
    date: "2023-08-04T18:00:00",
    image: "https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
    daysUntil: 21
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

const EventsSection = () => {
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
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Próximos Eventos</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Participe de competições, workshops e encontros da nossa comunidade de escalada.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div key={event.id} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    fallbackSrc="/placeholder-image.jpg"
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardHeader className="pt-6 pb-0">
                  <div className="event-countdown">
                    Em <span className="font-semibold">{event.daysUntil} dias</span>
                  </div>
                  <h3 className="font-semibold text-xl text-secondary">{event.title}</h3>
                </CardHeader>
                <CardContent className="py-3">
                  <p className="text-neutral-700 mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center text-neutral-600 mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('pt-BR')} - {new Date(event.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/eventos/${event.id}`} className="text-primary font-medium hover:underline flex items-center">
                    Inscreva-se <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Button variant="outline" className="bg-white hover:bg-neutral-50 text-primary border-primary">
            Ver Todos os Eventos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
