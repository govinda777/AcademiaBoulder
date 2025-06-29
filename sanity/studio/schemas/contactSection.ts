export default {
  name: 'contactSection',
  title: 'Seção Contato',
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
      name: 'contactInfo',
      title: 'Informações de Contato',
      type: 'object',
      fields: [
        {
          name: 'address',
          title: 'Endereço',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Telefone',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string'
        },
        {
          name: 'hours',
          title: 'Horário de Funcionamento',
          type: 'string'
        }
      ]
    },
    {
      name: 'mapEmbed',
      title: 'Código do Mapa',
      type: 'text',
      description: 'Cole aqui o código embed do Google Maps'
    }
  ]
}