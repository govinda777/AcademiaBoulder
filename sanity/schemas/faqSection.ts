export default {
  name: 'faqSection',
  title: 'Seção FAQ',
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
      name: 'faqs',
      title: 'Perguntas Frequentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Pergunta',
              type: 'string'
            },
            {
              name: 'answer',
              title: 'Resposta',
              type: 'text'
            }
          ]
        }
      ]
    }
  ]
}