
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A title for the image.',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'caption',
        title: 'Caption',
        type: 'string',
        description: 'An optional caption for the image.',
      }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
