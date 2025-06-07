export default {
  name: 'program',
  title: 'Programas',
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
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0
    },
    {
      name: 'shortDescription',
      title: 'Descrição Curta',
      type: 'text',
      rows: 3
    },
    {
      name: 'description',
      title: 'Descrição Completa',
      type: 'array',
      of: [{ type: 'block' }]
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
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'levels',
      title: 'Níveis',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'level',
              title: 'Nível',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Descrição',
              type: 'text'
            },
            {
              name: 'skills',
              title: 'Habilidades',
              type: 'array',
              of: [{ type: 'string' }]
            }
          ]
        }
      ]
    },
    {
      name: 'schedule',
      title: 'Cronograma',
      type: 'object',
      fields: [
        {
          name: 'days',
          title: 'Dias',
          type: 'string'
        },
        {
          name: 'times',
          title: 'Horários',
          type: 'string'
        },
        {
          name: 'duration',
          title: 'Duração',
          type: 'string'
        }
      ]
    },
    {
      name: 'pricing',
      title: 'Preços',
      type: 'object',
      fields: [
        {
          name: 'monthly',
          title: 'Mensal',
          type: 'string'
        },
        {
          name: 'quarterly',
          title: 'Trimestral',
          type: 'string'
        },
        {
          name: 'annual',
          title: 'Anual',
          type: 'string'
        }
      ]
    },
    {
      name: 'instructors',
      title: 'Instrutores',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instructor' }] }]
    }
  ]
}