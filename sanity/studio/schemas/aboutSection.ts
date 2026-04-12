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
          name: 'title',
          title: 'Título',
          type: 'string',
          validation: (Rule: any) => Rule.required()
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
          name: 'mainImage',
          title: 'Imagem Principal',
          type: 'image',
          options: { hotspot: true },
          validation: (Rule: any) => Rule.required()
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
          name: 'title',
          title: 'Título da Seção',
          type: 'string',
          initialValue: 'Nossa Equipe Técnica'
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

    // Seção de Segurança
    {
      name: 'safetySection',
      title: 'Seção de Segurança',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Relatório Anual de Segurança'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Nosso compromisso com a segurança é prioridade. Confira nossos protocolos e estatísticas de acidentes.'
        },
        {
          name: 'stats',
          title: 'Estatísticas de Segurança',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'value',
                  title: 'Valor',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'label',
                  title: 'Rótulo',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                },
                {
                  name: 'description',
                  title: 'Descrição',
                  type: 'string',
                  validation: (Rule: any) => Rule.required()
                }
              ]
            }
          ],
          validation: (Rule: any) => Rule.required().min(1)
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Ver Relatório Completo'
        }
      ]
    },

    // Seção de Destaques
    {
      name: 'highlights',
      title: 'Destaques',
      type: 'array',
      of: [
        {
          type: 'object',
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
              type: 'string',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Ícone',
              type: 'string',
              options: {
                list: [
                  { title: 'Usuários', value: 'users' },
                  { title: 'Graduação', value: 'graduation' },
                  { title: 'Escudo', value: 'shield' }
                ]
              },
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    },

    // Seção de Instalações
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
              options: {
                hotspot: true
              },
              validation: (Rule: any) => Rule.required()
            }
          ]
        }
      ]
    }
  ]
}