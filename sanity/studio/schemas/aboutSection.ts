export default {
  name: 'aboutSection',
  title: 'Seção Sobre',
  type: 'document',
  fields: [
    // Seção Principal
    {
      name: 'mainSection',
      title: 'Seção Principal',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Rótulo da Seção',
          type: 'string',
          initialValue: 'SOBRE A ACADEMIA BOULDER'
        },
        {
          name: 'title',
          title: 'Título Principal (Parte Superior)',
          type: 'string',
          initialValue: 'TRANSFORMANDO vidas ATRAVÉS DO ESPORTE E DA'
        },
        {
          name: 'highlightedTitle',
          title: 'Título Destacado (Parte Inferior/Itálico)',
          type: 'string',
          initialValue: 'SUPERAÇÃO.'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'philosophy',
          title: 'Nossa Filosofia',
          type: 'text',
          description: 'Texto que descreve a filosofia da Academia Boulder',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'mission',
          title: 'Missão',
          type: 'text',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'vision',
          title: 'Visão',
          type: 'text',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'values',
          title: 'Valores',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'pillarIcons',
          title: 'Ícones dos Pilares',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: ['target', 'eye', 'heart'],
          options: {
            list: [
              { title: 'Alvo (Missão)', value: 'target' },
              { title: 'Olho (Visão)', value: 'eye' },
              { title: 'Coração (Valores)', value: 'heart' }
            ]
          }
        },
        {
          name: 'missionLabel',
          title: 'Rótulo Missão',
          type: 'string',
          initialValue: 'Missão'
        },
        {
          name: 'visionLabel',
          title: 'Rótulo Visão',
          type: 'string',
          initialValue: 'Visão'
        },
        {
          name: 'valuesLabel',
          title: 'Rótulo Valores',
          type: 'string',
          initialValue: 'Valores'
        }
      ]
    },

    // Seção da Equipe
    {
      name: 'teamSection',
      title: 'Seção da Equipe',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Rótulo da Seção',
          type: 'string',
          initialValue: 'NOSSA EQUIPE TÉCNICA'
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          initialValue: 'QUEM ABRE'
        },
        {
          name: 'highlightedTitle',
          title: 'Título Destacado (Itálico)',
          type: 'string',
          initialValue: 'os caminhos.'
        },
        {
          name: 'description',
          title: 'Descrição da Seção',
          type: 'text'
        },
        {
          name: 'modalExpertiseLabel',
          title: 'Rótulo de Expertise (Modal)',
          type: 'string',
          initialValue: 'Trajetória e Expertise'
        },
        {
          name: 'modalCloseLabel',
          title: 'Rótulo de Fechar (Modal)',
          type: 'string',
          initialValue: 'Fechar Perfil'
        },
        {
          name: 'cardLabel',
          title: 'Rótulo do Card',
          type: 'string',
          initialValue: 'COACH · 0X'
        },
        {
          name: 'technicalLabel',
          title: 'Rótulo Ficha Técnica',
          type: 'string',
          initialValue: 'Ficha Técnica'
        },
        {
          name: 'members',
          title: 'Membros da Equipe',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nome',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'role',
                  title: 'Cargo',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'bio',
                  title: 'Biografia',
                  type: 'text',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'image',
                  title: 'Foto',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule: any) => Rule.required()
                }
              ]
            }
          ]
        }
      ]
    },

    // Seção de Instalações
    {
      name: 'facilitiesSection',
      title: 'Seção de Instalações',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Rótulo da Seção',
          type: 'string',
          initialValue: 'NOSSAS INSTALAÇÕES'
        },
        {
          name: 'title',
          title: 'Título Principal',
          type: 'string',
          initialValue: 'UM GINÁSIO'
        },
        {
          name: 'highlightedTitle',
          title: 'Título Destacado (Itálico)',
          type: 'string',
          initialValue: 'desenhado'
        },
        {
          name: 'titlePart2',
          title: 'Título Parte 2',
          type: 'string',
          initialValue: 'COMO UMA ROTA.'
        },
        {
          name: 'description',
          title: 'Descrição de Apoio',
          type: 'text',
          initialValue: 'Dois ambientes complementares, um só projeto pedagógico. Escalada e cross training se conversam a cada ciclo de treino.'
        },
        {
          name: 'capacityLabel',
          title: 'Rótulo de Capacidade',
          type: 'string',
          initialValue: 'Capacidade Máxima'
        },
        {
          name: 'items',
          title: 'Lista de Instalações',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Nome',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'text',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'image',
                  title: 'Imagem',
                  type: 'image',
                  options: { hotspot: true },
                  validation: (Rule: any) => Rule.required()
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
