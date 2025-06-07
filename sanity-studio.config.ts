import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'demo-project'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'academia-boulder-studio',
  title: 'Academia Boulder CMS',
  projectId,
  dataset,
  
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Gerenciar Conteúdo')
          .items([
            // Singles - páginas únicas
            S.listItem()
              .title('⚙️ Configurações Gerais')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('🏠 Seção Principal (Hero)')
              .id('heroSection')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.listItem()
              .title('ℹ️ Sobre Nós')
              .id('aboutSection')
              .child(
                S.document()
                  .schemaType('aboutSection')
                  .documentId('aboutSection')
              ),
            S.listItem()
              .title('👥 Comunidade')
              .id('communitySection')
              .child(
                S.document()
                  .schemaType('communitySection')
                  .documentId('communitySection')
              ),
            S.listItem()
              .title('❓ Perguntas Frequentes')
              .id('faqSection')
              .child(
                S.document()
                  .schemaType('faqSection')
                  .documentId('faqSection')
              ),
            S.listItem()
              .title('📞 Contato')
              .id('contactSection')
              .child(
                S.document()
                  .schemaType('contactSection')
                  .documentId('contactSection')
              ),
            
            S.divider(),
            
            // Collections - múltiplos documentos
            S.listItem()
              .title('🏃‍♂️ Programas de Escalada')
              .schemaType('program')
              .child(S.documentTypeList('program').title('Programas')),
            S.listItem()
              .title('📅 Eventos')
              .schemaType('event')
              .child(S.documentTypeList('event').title('Eventos')),
            S.listItem()
              .title('👨‍🏫 Instrutores')
              .schemaType('instructor')
              .child(S.documentTypeList('instructor').title('Instrutores')),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})