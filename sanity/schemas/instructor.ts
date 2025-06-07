export default {
  name: 'instructor',
  title: 'Instrutores',
  type: 'document',
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
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Biografia',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'image',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'specialties',
      title: 'Especialidades',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'certifications',
      title: 'Certificações',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'experience',
      title: 'Experiência',
      type: 'string'
    }
  ]
}