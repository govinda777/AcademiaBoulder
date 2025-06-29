export default {
  name: 'schedulingSection',
  title: 'Seção de Agendamento',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3
    },
    {
      name: 'buttonText',
      title: 'Texto do Botão',
      type: 'string',
      initialValue: 'Agendar Agora'
    },
    {
      name: 'modalTitle',
      title: 'Título do Modal',
      type: 'string',
      description: 'Título exibido no modal de agendamento'
    },
    {
      name: 'modalDescription',
      title: 'Descrição do Modal',
      type: 'text',
      rows: 3,
      description: 'Texto descritivo exibido no modal de agendamento'
    },
    {
      name: 'calendarUrl',
      title: 'URL do Calendly (ou similar)',
      type: 'url',
      description: 'Link para integração com sistema de agendamento externo'
    },
    {
      name: 'availableSlots',
      title: 'Horários Disponíveis',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Dia da Semana',
              type: 'string',
              options: {
                list: [
                  { title: 'Segunda-feira', value: 'monday' },
                  { title: 'Terça-feira', value: 'tuesday' },
                  { title: 'Quarta-feira', value: 'wednesday' },
                  { title: 'Quinta-feira', value: 'thursday' },
                  { title: 'Sexta-feira', value: 'friday' },
                  { title: 'Sábado', value: 'saturday' },
                  { title: 'Domingo', value: 'sunday' }
                ]
              }
            },
            {
              name: 'timeSlots',
              title: 'Horários',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Ex: 09:00, 10:30, 14:00, etc.'
            }
          ]
        }
      ]
    },
    {
      name: 'notes',
      title: 'Observações',
      type: 'text',
      rows: 3,
      description: 'Informações adicionais sobre o agendamento'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}
