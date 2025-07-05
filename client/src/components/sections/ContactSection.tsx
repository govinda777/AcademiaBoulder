import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Loader2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useContactSection, useSiteSettings } from "@/hooks/useSanity"; // Adicionado useSiteSettings
import { SanityBlockContent } from "@/components/ui/SanityBlockContent"; // Para renderizar block content

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "Selecione um assunto"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  agreeToPrivacy: z.boolean().refine(val => val === true, {
    message: "Você deve concordar com a Política de Privacidade",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Fallback data
const fallbackContactData = {
  title: "Entre em Contato",
  description: [{ _type: 'block', children: [{ _type: 'span', text: "Tire suas dúvidas, solicite informações ou venha nos visitar." }] }],
  contactInfo: {
    address: "Av. Exemplo, 1234 - Centro, Cidade - UF",
    phone: "(00) 0000-0000",
    email: "contato@example.com",
    hours: "Seg-Sex: 07h às 22h / Sáb-Dom: 08h às 20h",
  },
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976082759226!2d-46.65390492467796!3d-23.56507126162643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1682964119683!5m2!1spt-BR!2sbr'
};

const fallbackSiteSettings = {
  socialMedia: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  }
};

const ContactSection = () => {
  const { toast } = useToast();
  const { data: contactData, isLoading: isLoadingContact, error: errorContact } = useContactSection();
  const { data: siteSettingsData, isLoading: isLoadingSiteSettings, error: errorSiteSettings } = useSiteSettings();


  const content = contactData || fallbackContactData;
  const siteSettings = siteSettingsData || fallbackSiteSettings;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      agreeToPrivacy: false,
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Dados do formulário de contato:", data); // Simular envio
    toast({
      title: "Mensagem enviada!",
      description: "Agradecemos seu contato. Responderemos em breve.",
    });
    form.reset();
  }

  if (isLoadingContact || isLoadingSiteSettings) {
    return (
      <section id="contato" className="py-16 bg-neutral-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4">Carregando informações de contato...</p>
        </div>
      </section>
    );
  }

  // Simples tratamento de erro, poderia ser mais elaborado
  if (errorContact) console.error("Erro ao carregar dados da seção de contato:", errorContact);
  if (errorSiteSettings) console.error("Erro ao carregar configurações do site (social media):", errorSiteSettings);


  return (
    <section id="contato" className="py-16 bg-neutral-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-sans">{content.title}</h2>
          <div className="text-neutral-300 max-w-2xl mx-auto">
            <SanityBlockContent blocks={content.description} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6">Envie uma Mensagem</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                            placeholder="Seu nome completo"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            className="bg-white/10 border border-white/20 text-white placeholder:text-neutral-400"
                            placeholder="seu@email.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assunto</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/10 border border-white/20 text-white">
                            <SelectValue placeholder="Selecione um assunto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aulas">Informações sobre Aulas</SelectItem>
                          <SelectItem value="eventos">Eventos e Competições</SelectItem>
                          <SelectItem value="parcerias">Parcerias</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={4} 
                          className="bg-white/10 border border-white/20 text-white resize-none placeholder:text-neutral-400"
                          placeholder="Digite sua mensagem aqui..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreeToPrivacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary border-white/30"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Concordo com a <a href="/politica-de-privacidade" className="text-primary hover:underline">Política de Privacidade</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </Form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Informações de Contato</h3>
              
              <div className="space-y-4">
                {content.contactInfo?.address && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 rounded-full p-2 mr-3">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Endereço</h4>
                      <p className="text-neutral-300">{content.contactInfo.address}</p>
                    </div>
                  </div>
                )}
                
                {content.contactInfo?.phone && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 rounded-full p-2 mr-3">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Telefone</h4>
                      <p className="text-neutral-300">{content.contactInfo.phone}</p>
                    </div>
                  </div>
                )}
                
                {content.contactInfo?.email && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 rounded-full p-2 mr-3">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">E-mail</h4>
                      <p className="text-neutral-300">{content.contactInfo.email}</p>
                    </div>
                  </div>
                )}
                
                {content.contactInfo?.hours && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-primary/20 rounded-full p-2 mr-3">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Horário de Funcionamento</h4>
                      {content.contactInfo.hours.split('/').map((line, index) => (
                        <p key={index} className="text-neutral-300">{line.trim()}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Social Media from Site Settings */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Redes Sociais</h3>
              <div className="flex space-x-4">
                {siteSettings.socialMedia?.facebook && (
                  <a
                    href={siteSettings.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {siteSettings.socialMedia?.instagram && (
                  <a
                    href={siteSettings.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {siteSettings.socialMedia?.youtube && (
                  <a
                    href={siteSettings.socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
                {/* WhatsApp (se gerenciado pelo Sanity, caso contrário, pode ser estático ou removido) */}
                {/* Exemplo de link estático para WhatsApp, idealmente viria do Sanity se necessário */}
                {/* <a
                  href={`https://wa.me/${(content.contactInfo?.phone || "").replace(/\D/g, '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
                  aria-label="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                  </svg>
                </a> */}
              </div>
            </div>
            
            {/* Map */}
            {content.mapEmbed && (
              <div className="rounded-lg overflow-hidden h-64 bg-white/10">
                <iframe
                  src={content.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Localização - ${content.title || 'Academia'}`}
                ></iframe>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
