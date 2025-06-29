export default {
  name: 'communitySection',
  title: 'Seção Comunidade',
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
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'instagramFeed',
      title: 'Feed do Instagram',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'caption',
              title: 'Legenda',
              type: 'text'
            },
            {
              name: 'link',
              title: 'Link do Post',
              type: 'url'
            }
          ]
        }
      ]
    },
    {
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nome',
              type: 'string'
            },
            {
              name: 'text',
              title: 'Depoimento',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'rating',
              title: 'Avaliação',
              type: 'number',
              validation: (Rule: any) => Rule.min(1).max(5)
            }
          ]
        }
      ]
    }
  ]
}