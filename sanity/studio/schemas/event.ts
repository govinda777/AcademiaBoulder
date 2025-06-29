export default {
  name: 'event',
  title: 'Eventos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3
    },
    {
      name: 'fullDescription',
      title: 'Descrição Completa',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'date',
      title: 'Data',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'location',
      title: 'Local',
      type: 'string'
    },
    {
      name: 'capacity',
      title: 'Capacidade',
      type: 'string'
    },
    {
      name: 'price',
      title: 'Preço',
      type: 'string'
    },
    {
      name: 'categories',
      title: 'Categorias',
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
              name: 'requirements',
              title: 'Requisitos',
              type: 'text'
            },
            {
              name: 'prizes',
              title: 'Prêmios',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'schedule',
      title: 'Cronograma',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Horário',
              type: 'string'
            },
            {
              name: 'activity',
              title: 'Atividade',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      name: 'speakers',
      title: 'Palestrantes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instructor' }] }]
    },
    {
      name: 'requirements',
      title: 'Requisitos',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}