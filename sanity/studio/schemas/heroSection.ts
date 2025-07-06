export default {
  name: 'heroSection',
  title: 'Seção Hero',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text'
    },
    {
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      description: 'Imagem de fundo para a seção hero. Recomendado: 1920x1080px ou maior.',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
      validation: (Rule: any) => Rule.required().error('A imagem de fundo é obrigatória')
    },
    {
      name: 'ctaButtons',
      title: 'Botões de Ação',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Texto do Botão',
              type: 'string'
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string'
            },
            {
              name: 'variant',
              title: 'Estilo',
              type: 'string',
              options: {
                list: [
                  { title: 'Primário', value: 'primary' },
                  { title: 'Secundário', value: 'secondary' },
                  { title: 'Destaque', value: 'accent' }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}