export default {
  name: 'faqSection',
  title: 'Seção FAQ',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'label',
      title: 'Rótulo da Seção',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'PERGUNTAS FREQUENTES'
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'PERGUNTAS'
    },
    {
      name: 'subtitle',
      title: 'Destaque Serifado (Itálico)',
      type: 'string',
      initialValue: 'frequentes.'
    },
    {
      name: 'footer',
      title: 'Texto de Rodapé',
      type: 'text',
      initialValue: 'Não achou sua pergunta? Manda no formulário ali em cima.'
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