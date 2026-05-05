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
    }
  ]
}
