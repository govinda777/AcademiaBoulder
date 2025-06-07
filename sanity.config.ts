import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Academia Boulder CMS',

  projectId: 'your-project-id',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Configurações do Site')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Seção Hero')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.divider(),
            S.listItem()
              .title('Programas')
              .schemaType('program')
              .child(S.documentTypeList('program').title('Programas')),
            S.listItem()
              .title('Eventos')
              .schemaType('event')
              .child(S.documentTypeList('event').title('Eventos')),
            S.listItem()
              .title('Instrutores')
              .schemaType('instructor')
              .child(S.documentTypeList('instructor').title('Instrutores')),
            S.divider(),
            S.listItem()
              .title('Seção Sobre')
              .child(
                S.document()
                  .schemaType('aboutSection')
                  .documentId('aboutSection')
              ),
            S.listItem()
              .title('Seção Comunidade')
              .child(
                S.document()
                  .schemaType('communitySection')
                  .documentId('communitySection')
              ),
            S.listItem()
              .title('Seção FAQ')
              .child(
                S.document()
                  .schemaType('faqSection')
                  .documentId('faqSection')
              ),
            S.listItem()
              .title('Seção Contato')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection')
              ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})