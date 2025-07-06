import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Users, Medal, ArrowRight, User, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SocialFeed from "@/components/ui/social-feed";

const forumTopics = [
  {
    id: 1,
    title: "Dicas para superar platôs no treinamento",
    preview: "Estou há três meses tentando progredir no nível intermediário mas sinto que estagnei...",
    commentsCount: 12,
    author: "Carlos Silva",
    avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    timestamp: "há 2 dias"
  },
  {
    id: 2,
    title: "Melhores exercícios para resistência de antebraço",
    preview: "Quais são os exercícios mais eficientes para desenvolver resistência nos antebraços...",
    commentsCount: 8,
    author: "Marina Gomes",
    avatar: "https://images.unsplash.com/photo-1563306406-e66174fa3787?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    timestamp: "há 5 dias"
  },
  {
    id: 3,
    title: "Indicação de equipamentos para iniciantes",
    preview: "Estou começando agora e gostaria de recomendações de sapatilhas e outros equipamentos...",
    commentsCount: 15,
    author: "Rafael Oliveira",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=32&h=32",
    timestamp: "há 1 semana"
  }
];

const instagramImages = [
  "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://pixabay.com/get/g90eebe02557320ca2f3291b0d8f3487c7a889fb0f9781624fdc498a7f3a2386dde2919c0986dd2625300a40c89408d107236c28bd1637b86bfcb058aa72a0760_1280.jpg",
  "https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
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

const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState("embaixadores");

  return (
    <section id="comunidade" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Nossa Comunidade</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Faça parte da nossa comunidade de escaladores e acompanhe nossos eventos e conquistas.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Community Programs */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader>
                <h3 className="text-xl font-semibold text-secondary">Programa de Embaixadores</h3>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-700 mb-6">
                  Faça parte do nosso time de embaixadores e ganhe benefícios exclusivos por contribuir com nossa comunidade.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
                      <Gift className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary">Benefícios Exclusivos</h4>
                      <p className="text-sm text-neutral-600">Acesso antecipado a eventos e descontos especiais</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary">Networking</h4>
                      <p className="text-sm text-neutral-600">Conexão com atletas profissionais e entusiastas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-2 mr-3">
                      <Medal className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-secondary">Reconhecimento</h4>
                      <p className="text-sm text-neutral-600">Destaque nas nossas redes sociais e espaço físico</p>
                    </div>
                  </div>
                </div>
                
                <Button className="bg-primary hover:bg-primary/90">
                  Tornar-se Embaixador
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Instagram Feed */}
          <motion.div variants={item}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <h3 className="text-xl font-semibold text-secondary">#academiaboulder</h3>
                <a 
                  href="https://www.instagram.com/academiaboulder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              </CardHeader>
              <CardContent>
                <SocialFeed images={instagramImages} />
                
                <div className="mt-4">
                  <a 
                    href="https://www.instagram.com/academiaboulder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium inline-flex items-center"
                  >
                    Ver mais no Instagram <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Forum Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-secondary">Fórum Técnico</h3>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-700 mb-6">
                Participe de discussões técnicas moderadas por atletas profissionais e compartilhe suas experiências.
              </p>
              
              <div className="space-y-6">
                {forumTopics.map((topic, index) => (
                  <div key={topic.id} className={index < forumTopics.length - 1 ? "border-b border-neutral-200 pb-6" : ""}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-secondary">{topic.title}</h4>
                      <span className="text-sm text-neutral-500">{topic.commentsCount} comentários</span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-2">
                      {topic.preview}
                    </p>
                    <div className="flex items-center text-sm text-neutral-500">
                      <img 
                        src={topic.avatar} 
                        alt={`Avatar de ${topic.author}`} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{topic.author}</span>
                      <span className="mx-2">•</span>
                      <span>{topic.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button className="bg-secondary hover:bg-secondary/90">
                  Acessar o Fórum Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
