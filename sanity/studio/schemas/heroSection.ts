export default {
  name: 'heroSection',
  title: 'Seção Hero',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'label',
      title: 'Rótulo Superior (Tagline)',
      type: 'string',
      initialValue: 'ESCALADA · CROSS · TRAINING'
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'DESCUBRA SEUS limites. CADA AGARRA.'
    },
    {
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      description: 'Imagem de fundo para a seção hero (se não houver vídeo). Recomendado: 1920x1080px.',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
      validation: (Rule: any) => Rule.custom((value: any, context: any) => {
        const { document } = context;
        if (!value && !document.backgroundVideo) {
          return 'A imagem de fundo é obrigatória se não houver um vídeo.';
        }
        return true;
      })
    },
    {
      name: 'backgroundVideo',
      title: 'Vídeo de Fundo',
      type: 'file',
      description: 'Vídeo de fundo para a seção hero. Se fornecido, substituirá a imagem.',
      options: {
        accept: 'video/*'
      }
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