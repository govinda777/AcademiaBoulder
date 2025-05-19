import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Marcelo Santos",
    role: "Diretor Técnico",
    bio: "Atleta IFSC, 15 anos de experiência e especialista em pedagogia esportiva.",
    image: "https://images.unsplash.com/photo-1568967729548-e3dbad3d37e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Camila Rocha",
    role: "Head Coach",
    bio: "Ex-atleta olímpica e especialista em treinamento de alta performance.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Felipe Almeida",
    role: "Preparador Físico",
    bio: "Fisioterapeuta esportivo e especialista em biomecânica da escalada.",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  },
  {
    name: "Juliana Costa",
    role: "Instrutora Chefe",
    bio: "Especialista em iniciação à escalada e formação de novos instrutores.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300"
  }
];

const safetyStats = [
  {
    value: "99.8%",
    label: "Sessões sem incidentes",
    description: "Média anual"
  },
  {
    value: "100%",
    label: "Equipe certificada",
    description: "Primeiros socorros"
  },
  {
    value: "24h",
    label: "Inspeção de equipamentos",
    description: "Frequência"
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

const AboutSection = () => {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Sobre Nós</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Conheça nossa filosofia, equipe técnica e compromisso com a segurança.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">Nossa Filosofia</h3>
            <p className="text-neutral-700 mb-4">
              A Academia Boulder nasceu da paixão por escalada e da vontade de criar um espaço onde pessoas de todos os níveis pudessem evoluir com segurança e metodologia.
            </p>
            <p className="text-neutral-700 mb-6">
              Nossa abordagem pedagógica progressiva permite que cada aluno evolua no seu próprio ritmo, com acompanhamento técnico personalizado e objetivos claros de desenvolvimento.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Comunidade Inclusiva</h4>
                  <p className="text-sm text-neutral-600">Ambiente acolhedor para todos os perfis e níveis</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <GraduationCap className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Metodologia Comprovada</h4>
                  <p className="text-sm text-neutral-600">Sistema técnico estruturado em níveis progressivos</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <ShieldCheck className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium text-secondary">Segurança Prioritária</h4>
                  <p className="text-sm text-neutral-600">Protocolos rigorosos e equipamentos certificados</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <img 
              src="https://pixabay.com/get/g63703d3004e93b4e703b3bbf1d1f3f01097ace0cafb4010d3ff80cc326efdab10cf036bd0aed67ffd4a8a9336a69c41a8822c2cec4fb12068e28692b34c10cf3_1280.jpg" 
              alt="Equipe da Academia Boulder" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-secondary mb-8 text-center">Nossa Equipe Técnica</h3>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={item} className="text-center">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="font-semibold text-secondary">{member.name}</h4>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-neutral-600 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Safety Report */}
        <motion.div 
          className="bg-neutral-100 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-secondary mb-4">Relatório Anual de Segurança</h3>
          <p className="text-neutral-700 mb-6">
            Nosso compromisso com a segurança é prioridade. Confira nossos protocolos e estatísticas de acidentes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {safetyStats.map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-accent text-3xl font-bold mb-1 font-sans">{stat.value}</div>
                <div className="text-secondary font-medium">{stat.label}</div>
                <p className="text-sm text-neutral-600 mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
          
          <Button className="bg-secondary hover:bg-secondary/90">
            Ver Relatório Completo
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
