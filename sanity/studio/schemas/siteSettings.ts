export default {
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Nome do Site',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'siteDescription',
      title: 'Descrição do Site',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
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
      name: 'socialMedia',
      title: 'Redes Sociais',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url'
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url'
        }
      ]
    }
  ]
}