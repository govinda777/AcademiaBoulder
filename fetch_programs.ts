
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '4y88u6cf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

const query = `*[_type == "program"]{
  _id,
  title,
  slug,
  shortDescription,
  features
}`

client.fetch(query).then(programs => {
  console.log(JSON.stringify(programs, null, 2))
}).catch(err => {
  console.error(err)
})
