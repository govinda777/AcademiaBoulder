import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  experienceLevel: z.string().min(1, { message: "Selecione um nível de experiência" }),
  preferredTime: z.string().min(1, { message: "Informe um horário preferido" }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "Você deve concordar com a política de privacidade" })
});

const SchedulingWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experienceLevel: "",
      preferredTime: "",
      agreeToTerms: false
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!date) {
      toast({
        variant: "destructive",
        title: "Data não selecionada",
        description: "Por favor, selecione uma data para o agendamento.",
      });
      return;
    }

    // Formatar a mensagem para o WhatsApp
    const formattedDate = date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : '';
    const message = `Olá! Gostaria de agendar uma aula experimental.\n\n` +
      `*Dados do Agendamento:*\n` +
      `Nome: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Telefone: ${values.phone}\n` +
      `Nível: ${values.experienceLevel}\n` +
      `Data: ${formattedDate}\n` +
      `Horário Preferido: ${values.preferredTime}`;

    // Número do WhatsApp da academia
    const whatsappNumber = "5515991869689";
    
    // Criar URL do WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    form.reset();
    setDate(new Date());
  }

  return (
    <section id="agendamento" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-secondary mb-4 font-sans">Agende Sua Experiência</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Reserve uma visita, aula experimental ou horário livre com nossos instrutores especializados.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto bg-neutral-100 rounded-lg p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Select Date */}
            <div>
              <h3 className="font-semibold mb-3 text-secondary">Selecione a Data</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                fromDate={new Date()}
                modifiersClassNames={{
                  selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
                  today: 'font-bold'
                }}
              />
              <p className="text-sm text-secondary font-medium mt-2">
                Data selecionada: <span className="text-primary">
                  {date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : 'Selecione uma data'}
                </span>
              </p>
            </div>

            {/* Step 2 & 3: Form Fields */}
            <div className="md:col-span-2">
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
                            <Input placeholder="Seu nome" {...field} />
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
                            <Input placeholder="Seu e-mail" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu telefone" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horário Preferido</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 14:00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível de Experiência</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione seu nível" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="iniciante">Iniciante</SelectItem>
                            <SelectItem value="intermediario">Intermediário</SelectItem>
                            <SelectItem value="avancado">Avançado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Concordo com a <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
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
                    Confirmar Agendamento
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SchedulingWidget;
