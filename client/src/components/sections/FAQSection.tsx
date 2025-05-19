import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    id: "faq1",
    question: "Preciso ter experiência prévia para começar?",
    answer: "Não, temos programas específicos para iniciantes. Nossos instrutores irão guiá-lo desde os primeiros passos, ensinando as técnicas básicas de movimento e segurança. As aulas para iniciantes ocorrem em áreas com dificuldade adequada para quem está começando."
  },
  {
    id: "faq2",
    question: "Qual equipamento preciso levar?",
    answer: "Para iniciantes, apenas roupas confortáveis e uma garrafa de água. Disponibilizamos sapatilhas de escalada para aluguel. Conforme você evolui, pode considerar adquirir seu próprio equipamento, como sapatilhas, magnésio e crash pads para prática externa."
  },
  {
    id: "faq3",
    question: "Qual a frequência recomendada de treino?",
    answer: "Para iniciantes, recomendamos 2-3 sessões por semana de 1-2 horas cada. Isso permite desenvolvimento muscular adequado e tempo para recuperação. Para escaladores intermediários e avançados, a frequência pode aumentar, mas sempre respeitando períodos de descanso para evitar lesões."
  },
  {
    id: "faq4",
    question: "Vocês oferecem planos para famílias?",
    answer: "Sim, temos planos familiares com descontos progressivos. Também oferecemos aulas específicas para crianças (a partir de 5 anos) e adolescentes, com metodologia adaptada para cada faixa etária e acompanhamento especializado de instrutores com formação em pedagogia infantil."
  },
  {
    id: "faq5",
    question: "É possível agendar aulas particulares?",
    answer: "Sim, oferecemos aulas particulares com nossos instrutores especializados. Elas podem ser agendadas diretamente pelo nosso sistema online ou pelo telefone. Aulas particulares são ideais para foco em habilidades específicas ou para quem deseja progresso mais rápido."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Perguntas Frequentes</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossas aulas e serviços.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 data-[state=open]:bg-white"
              >
                <AccordionTrigger className="px-4 py-4 hover:bg-neutral-100 hover:no-underline font-medium text-secondary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2 text-neutral-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-neutral-700 mb-4">Não encontrou o que procurava?</p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="#contato">
                Entre em Contato
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
