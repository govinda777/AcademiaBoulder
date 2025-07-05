export default {
  name: 'communitySection',
  title: 'Seção Comunidade',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Título Principal da Seção',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      initialValue: 'Nossa Comunidade'
    },
    {
      name: 'description',
      title: 'Descrição Principal da Seção',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Faça parte da nossa comunidade de escaladores e acompanhe nossos eventos e conquistas.'
            }
          ]
        }
      ]
    },
    // Programa de Embaixadores
    {
      name: 'ambassadorProgram',
      title: 'Programa de Embaixadores',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Programa de Embaixadores'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Faça parte do nosso time de embaixadores e ganhe benefícios exclusivos por contribuir com nossa comunidade.'
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Tornar-se Embaixador'
        },
        {
          name: 'benefits',
          title: 'Benefícios',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Ícone (Lucide ID)', type: 'string', description: 'Ex: gift, users, medal' },
                { name: 'title', title: 'Título do Benefício', type: 'string' },
                { name: 'description', title: 'Descrição do Benefício', type: 'text' }
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'description',
                  media: 'icon'
                },
                prepare(selection: any) {
                  const {title, subtitle, media} = selection;
                  // Você pode querer mapear o 'icon' string para um componente React aqui se o Sanity Studio suportar
                  return {
                    title: title,
                    subtitle: subtitle,
                    // media: <IconComponent id={media} /> // Exemplo
                  }
                }
              }
            }
          ],
          initialValue: [
            { icon: 'Gift', title: 'Benefícios Exclusivos', description: 'Acesso antecipado a eventos e descontos especiais' },
            { icon: 'Users', title: 'Networking', description: 'Conexão com atletas profissionais e entusiastas' },
            { icon: 'Medal', title: 'Reconhecimento', description: 'Destaque nas nossas redes sociais e espaço físico' }
          ]
        }
      ]
    },
    // Feed do Instagram
    {
      name: 'instagramSection',
      title: 'Seção Instagram',
      type: 'object',
      fields: [
        {
          name: 'hashtag',
          title: 'Hashtag',
          type: 'string',
          initialValue: '#academiaboulder'
        },
        {
          name: 'profileUrl',
          title: 'URL do Perfil do Instagram',
          type: 'url',
          initialValue: 'https://www.instagram.com/academiaboulder'
        },
        {
          name: 'feedTitle',
          title: 'Título do Feed (Opcional)',
          type: 'string',
          description: 'Se vazio, usará a hashtag como título.'
        },
        {
            name: 'posts',
            title: 'Posts Manuais (Fallback ou Destaque)',
            type: 'array',
            description: 'Adicione posts manualmente. Serão usados se a API do Instagram não estiver configurada ou como destaque.',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'image', title: 'Imagem do Post', type: 'image', options: { hotspot: true }},
                        { name: 'caption', title: 'Legenda (Opcional)', type: 'text'},
                        { name: 'link', title: 'Link para o Post (Opcional)', type: 'url'}
                    ]
                }
            ]
        }
      ]
    },
    // Fórum Técnico
    {
      name: 'forumSection',
      title: 'Seção Fórum Técnico',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Título',
          type: 'string',
          initialValue: 'Fórum Técnico'
        },
        {
          name: 'description',
          title: 'Descrição',
          type: 'text',
          initialValue: 'Participe de discussões técnicas moderadas por atletas profissionais e compartilhe suas experiências.'
        },
        {
          name: 'buttonText',
          title: 'Texto do Botão',
          type: 'string',
          initialValue: 'Acessar o Fórum Completo'
        },
        {
          name: 'topics',
          title: 'Tópicos do Fórum (Exemplos)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Título do Tópico', type: 'string' },
                { name: 'preview', title: 'Preview do Conteúdo', type: 'text' },
                { name: 'commentsCount', title: 'Nº de Comentários', type: 'number' },
                { name: 'authorName', title: 'Nome do Autor', type: 'string' },
                { name: 'authorAvatar', title: 'Avatar do Autor', type: 'image', options: { hotspot: true } },
                { name: 'timestamp', title: 'Timestamp (Ex: há 2 dias)', type: 'string' }
              ]
            }
          ]
        }
      ]
    },
    // Depoimentos (já existente, mantido)
    {
      name: 'testimonials',
      title: 'Depoimentos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nome', type: 'string' },
            { name: 'text', title: 'Depoimento', type: 'text' },
            { name: 'image', title: 'Foto', type: 'image', options: { hotspot: true } },
            { name: 'rating', title: 'Avaliação (1-5)', type: 'number', validation: (Rule: any) => Rule.min(1).max(5) }
          ]
        }
      ]
    }
  ]
}