export default {
  name: 'contactSection',
  title: 'Seção Contato',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'label',
      title: 'Rótulo da Seção (Tagline)',
      type: 'string',
      initialValue: 'ENTRE EM CONTATO'
    },
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Destaque Serifado (Itálico)',
      type: 'string'
    },
    {
      name: 'titlePart2',
      title: 'Título Parte 2 (Contorno)',
      type: 'string'
    },
    {
      name: 'titlePart3',
      title: 'Título Parte 3 (Normal)',
      type: 'string'
    },
    {
      name: 'titlePart3Accent',
      title: 'Título Parte 3 Destaque (Azul)',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Descrição',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'column1Label',
      title: 'Rótulo Coluna 1',
      type: 'string',
      initialValue: '01 · Social'
    },
    {
      name: 'column2Label',
      title: 'Rótulo Coluna 2',
      type: 'string',
      initialValue: '02 · Envie uma mensagem'
    },
    {
      name: 'column3Label',
      title: 'Rótulo Coluna 3',
      type: 'string',
      initialValue: '03 · Unidade'
    },
    {
      name: 'formInterests',
      title: 'Opções de Interesse do Formulário',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Aula Aberta (Grátis)', 'Cross Training', 'Escalada', 'Outro']
    },
    // --- ADICIONE ESTES CAMPOS ABAIXO PARA RECUPERAR OS DADOS ---
    {
      name: 'contactInfo',
      title: 'Informações de Contato (Dados Atuais)',
      type: 'object',
      fields: [
        { name: 'address', title: 'Endereço', type: 'string' },
        { name: 'email', title: 'E-mail', type: 'string' },
        { name: 'hours', title: 'Horário de Funcionamento', type: 'string' },
        { name: 'phone', title: 'Telefone', type: 'string' },
      ]
    },
    {
      name: 'mapEmbed',
      title: 'URL do Mapa (Google Maps)',
      type: 'text',
      description: 'Cole aqui o link do iframe ou a URL do mapa.'
    }
  ]
}