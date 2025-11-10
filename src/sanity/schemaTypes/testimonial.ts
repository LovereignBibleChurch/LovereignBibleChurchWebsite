import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Optional role or title of the person giving testimony',
    }),
    defineField({
      name: 'testimony',
      title: 'Testimony',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image of the person giving testimony',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Date when the testimony was given',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location where the testimony was given',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Mark as featured to highlight this testimony',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which testimonies should appear (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})