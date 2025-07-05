import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useFaqSection } from "@/hooks/useSanity";
import { Loader2 } from "lucide-react";

interface FAQItem {
  _key?: string; // Sanity usa _key para itens em arrays
  question?: string;
  answer?: string;
}

interface FaqSectionData {
  title?: string;
  faqs?: FAQItem[];
}

// Fallback data em caso de erro ou ausência de dados do CMS
const fallbackFaqsData: FaqSectionData = {
  title: "Perguntas Frequentes",
  faqs: [
    { _key: "fb1", question: "Preciso ter experiência prévia para começar?", answer: "Não, nossos programas são adaptados para todos os níveis." },
    { _key: "fb2", question: "Qual equipamento preciso levar?", answer: "Apenas roupas confortáveis. Sapatilhas podem ser alugadas." },
  ]
};

const SECTION_DESCRIPTION = "Respostas para as dúvidas mais comuns sobre nossas aulas e serviços.";


const FAQSection = () => {
  const { data: faqSectionData, isLoading, error } = useFaqSection();

  const content = faqSectionData || fallbackFaqsData;
  const faqsToDisplay = content?.faqs || [];
  const sectionTitle = content?.title || fallbackFaqsData.title;


  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-neutral-700">Carregando FAQs...</p>
        </div>
      </section>
    );
  }

  if (error) {
     // Em caso de erro, usamos os dados de fallback
     // Poderia também exibir uma mensagem de erro específica
    console.error("Erro ao buscar FAQs:", error);
  }


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
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">
            {sectionTitle}
          </h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            {SECTION_DESCRIPTION} {/* TODO: Mover para Sanity se necessário */}
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqsToDisplay.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {faqsToDisplay.map((faq, index) => (
                <AccordionItem
                  key={faq._key || `faq-${index}`} // Usar _key do Sanity ou um fallback
                  value={faq._key || `faq-item-${index}`}
                  className="border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50 data-[state=open]:bg-white"
                >
                  <AccordionTrigger className="px-4 py-4 hover:bg-neutral-100 hover:no-underline font-medium text-secondary text-left">
                    {faq.question || "Pergunta não disponível"}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 text-neutral-700">
                    {faq.answer || "Resposta não disponível."}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-neutral-600">Nenhuma pergunta frequente encontrada.</p>
          )}

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
