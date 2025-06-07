export default {
  name: 'aboutSection',
  title: 'Seção Sobre',
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
      name: 'mission',
      title: 'Missão',
      type: 'text'
    },
    {
      name: 'vision',
      title: 'Visão',
      type: 'text'
    },
    {
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'teamMembers',
      title: 'Membros da Equipe',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'instructor' }] }]
    },
    {
      name: 'facilities',
      title: 'Instalações',
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
              name: 'description',
              title: 'Descrição',
              type: 'text'
            },
            {
              name: 'image',
              title: 'Imagem',
              type: 'image',
              options: {
                hotspot: true
              }
            }
          ]
        }
      ]
    }
  ]
}