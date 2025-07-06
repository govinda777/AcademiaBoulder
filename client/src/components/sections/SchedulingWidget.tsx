import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, isToday, isBefore, isAfter, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useSchedulingSection } from "@/hooks/useSanity";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  experienceLevel: z.string().min(1, { message: "Selecione um nível de experiência" }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "Você deve concordar com a política de privacidade" })
});

const SchedulingWidget = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [activeTab, setActiveTab] = useState("aula-experimental");
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Buscar dados do Sanity
  const { data: schedulingData, isLoading } = useSchedulingSection();

  // Obter os horários disponíveis para o dia selecionado
  const getAvailableSlotsForDay = (selectedDate: Date) => {
    if (!schedulingData?.availableSlots) return [];
    
    const dayOfWeek = getDayOfWeek(selectedDate);
    const slotsForDay = schedulingData.availableSlots.find(
      (slot: any) => slot.day.toLowerCase() === dayOfWeek
    )?.timeSlots || [];
    
    // Se for hoje, filtrar horários que ainda não passaram
    if (isToday(selectedDate)) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      return slotsForDay.filter((time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours > currentHour || (hours === currentHour && minutes > currentMinute);
      });
    }
    
    return slotsForDay;
  };

  // Atualizar timeSlots disponíveis quando a data ou dados do Sanity mudarem
  useEffect(() => {
    if (date) {
      const slots = getAvailableSlotsForDay(date);
      setAvailableTimeSlots(slots);
      
      // Resetar o horário selecionado se não estiver mais disponível
      if (selectedTime && !slots.includes(selectedTime)) {
        setSelectedTime("");
      }
    }
  }, [date, schedulingData]);

  // Função auxiliar para obter o dia da semana em inglês
  const getDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };
  
  // Verificar se a data está desabilitada (fim de semana ou sem horários disponíveis)
  const isDateDisabled = (date: Date) => {
    const dayOfWeek = getDayOfWeek(date);
    const hasAvailableSlots = schedulingData?.availableSlots?.some(
      (slot: any) => slot.day.toLowerCase() === dayOfWeek && slot.timeSlots?.length > 0
    );
    
    return !hasAvailableSlots;
  };
  
  // Obter o título do serviço selecionado
  const getServiceTitle = () => {
    return activeTab === 'aula-experimental' 
      ? 'Aula Experimental Gratuita' 
      : 'Avaliação de Nível';
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experienceLevel: "",
      agreeToTerms: false
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedTime) {
      toast({
        variant: "destructive",
        title: "Horário não selecionado",
        description: "Por favor, selecione um horário disponível para o agendamento.",
      });
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados para sua API
    console.log({
      ...values,
      date: date ? format(date, 'yyyy-MM-dd') : null,
      time: selectedTime,
      serviceType: activeTab
    });

    // Exemplo de mensagem de sucesso
    toast({
      title: "Agendamento confirmado!",
      description: `${values.name}, seu agendamento para ${date ? format(date, 'dd/MM/yyyy') : ''} às ${selectedTime} foi confirmado. Enviaremos a confirmação por email.`,
    });
    
    // Resetar o formulário
    form.reset();
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
          <Tabs defaultValue="aula-experimental" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 border-b border-neutral-200 bg-transparent rounded-none w-full justify-start">
              <TabsTrigger 
                value="aula-experimental" 
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Aula Experimental
              </TabsTrigger>
              <TabsTrigger 
                value="horario-livre"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Horário Livre
              </TabsTrigger>
              <TabsTrigger 
                value="avaliacao-tecnica"
                className="px-6 py-2 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                Avaliação Técnica
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="aula-experimental" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1: Select Date */}
                <div>
                  <h3 className="font-semibold mb-3 text-secondary">Selecione a Data</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    locale={ptBR}
                    fromDate={new Date()}
                    disabled={isDateDisabled}
                    modifiers={{
                      disabled: [
                        (date) => isDateDisabled(date)
                      ]
                    }}
                    modifiersClassNames={{
                      disabled: 'text-muted-foreground opacity-50',
                      selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
                      today: 'font-bold'
                    }}
                  />
                  
                  <p className="text-sm text-secondary font-medium mt-2">
                    Data selecionada: <span className="text-primary">
                      {date ? format(date, 'dd/MM/yyyy') : 'Selecione uma data'}
                    </span>
                  </p>
                </div>
                
                {/* Step 2: Select Time */}
                <div>
                  <h3 className="font-semibold mb-3 text-secondary">Selecione o Horário</h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Horários disponíveis:</h4>
                    {isLoading ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="h-10 bg-muted rounded-md animate-pulse"></div>
                        ))}
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {availableTimeSlots.map((time: string) => (
                          <Button
                            key={time}
                            type="button"
                            variant={selectedTime === time ? "default" : "outline"}
                            className={`py-2 ${selectedTime === time ? 'bg-primary text-primary-foreground' : ''}`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhum horário disponível para este dia. Por favor, selecione outra data.
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-secondary font-medium">
                      Horário selecionado: <span className="text-primary">{selectedTime}</span>
                    </p>
                    <p className="text-sm text-neutral-600 mt-1">Duração: 1 hora</p>
                    <p className="text-sm text-neutral-600">Instrutor: Carlos Mendes</p>
                  </div>
                </div>
                
                {/* Step 3: Your Info */}
                <div>
                  <h3 className="font-semibold mb-3 text-secondary">Seus Dados</h3>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
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
                            <FormControl>
                              <Input placeholder="Seu e-mail" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Seu telefone" type="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Nível de experiência" />
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
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm">
                                Concordo com a <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={!selectedTime || availableTimeSlots.length === 0}
                      >
                        {schedulingData?.buttonText || 'Confirmar Agendamento'}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="horario-livre">
              <div className="p-4 text-center">
                <p>Selecione um horário livre para praticar na academia sem acompanhamento.</p>
                {/* Implement similar form as above but with different options */}
              </div>
            </TabsContent>
            
            <TabsContent value="avaliacao-tecnica">
              <div className="p-4 text-center">
                <p>Agende uma avaliação técnica com nossos instrutores especializados.</p>
                {/* Implement similar form as above but with different options */}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default SchedulingWidget;
