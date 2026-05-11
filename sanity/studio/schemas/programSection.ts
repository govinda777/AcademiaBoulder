export default {
  name: 'programSection',
  title: 'Seção de Programas',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'label',
      title: 'Rótulo da Seção',
      type: 'string',
      initialValue: 'NOSSOS PROGRAMAS'
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      initialValue: 'QUATRO CAMINHOS,'
    },
    {
      name: 'subtitle',
      title: 'Destaque Serifado (Itálico)',
      type: 'string',
      initialValue: 'UMA parede.'
    },
    {
      name: 'description',
      title: 'Descrição Curta',
      type: 'text'
    },
    {
      name: 'cardPalettes',
      title: 'Paletas de Cores dos Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'bg', title: 'Cor de Fundo', type: 'string' },
            { name: 'text', title: 'Cor do Texto', type: 'string' }
          ]
        }
      ],
      initialValue: [
        { bg: '#0F1116', text: '#FAFAF7' },
        { bg: '#1E88E5', text: '#FFFFFF' },
        { bg: '#FFD700', text: '#0F1116' },
        { bg: '#FAFAF7', text: '#0F1116' }
      ]
    },
    {
      name: 'modalLabels',
      title: 'Rótulos do Modal',
      type: 'object',
      fields: [
        { name: 'summary', title: 'Resumo & Detalhes', type: 'string', initialValue: 'Resumo & Detalhes' },
        { name: 'included', title: 'O que está incluso', type: 'string', initialValue: 'O que está incluso' },
        { name: 'questions', title: 'Dúvidas?', type: 'string', initialValue: 'Dúvidas?' },
        { name: 'contactUs', title: 'Fale Conosco', type: 'string', initialValue: 'Fale Conosco' },
        { name: 'cta', title: 'Botão de CTA', type: 'string', initialValue: 'Começar Agora' }
      ]
    }
  ]
}
