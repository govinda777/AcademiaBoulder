export default {
  name: 'virtualTourSection',
  title: 'Seção Tour Virtual',
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
      type: 'text'
    },
    {
      name: 'fallbackImage',
      title: 'Imagem de Fallback',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Imagem exibida antes do tour carregar ou caso haja erro.'
    },
    {
      name: 'tourHotspots',
      title: 'Hotspots do Tour',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'ID',
              type: 'string',
              description: 'Identificador único para o hotspot (ex: area-iniciantes)'
            },
            {
              name: 'label',
              title: 'Rótulo',
              type: 'string',
              description: 'Texto exibido no hotspot (ex: "1", "A")'
            },
            {
              name: 'title',
              title: 'Título do Hotspot',
              type: 'string',
              description: 'Nome da área que o hotspot representa'
            },
            {
              name: 'position',
              title: 'Posição',
              type: 'object',
              fields: [
                { name: 'top', title: 'Topo (%)', type: 'number' },
                { name: 'right', title: 'Direita (%)', type: 'number' },
                { name: 'bottom', title: 'Abaixo (%)', type: 'number' },
                { name: 'left', title: 'Esquerda (%)', type: 'number' }
              ],
              description: 'Posicionamento percentual do hotspot na imagem de fallback.'
            }
          ]
        }
      ]
    },
    {
      name: 'tourAreas',
      title: 'Áreas do Tour',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Nomes das diferentes áreas navegáveis no tour virtual (ex: "Área de Iniciantes", "Vestiários").'
    },
    {
      name: 'videoUrl',
      title: 'URL do Vídeo do Tour',
      type: 'url',
      description: 'URL do vídeo 360 graus (opcional, se estiver usando um player de vídeo externo).'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}
