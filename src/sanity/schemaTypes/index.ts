import { type SchemaTypeDefinition } from 'sanity'
import testimonial from './testimonial'
import event from './event'
import leader from './leader'
import branch from './branch'
import sermon from './sermon'
import announcement from './announcement'
import product from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testimonial, event, leader, branch, sermon, announcement, product],
}
