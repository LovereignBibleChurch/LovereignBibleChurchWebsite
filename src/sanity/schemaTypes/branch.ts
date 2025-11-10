import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'branch',
  title: 'Church Branch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Branch Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'location',
      title: 'Location/Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'string',
      description: 'Phone number or contact details',
    }),
    defineField({
      name: 'pastor',
      title: 'Branch Pastor/Leader',
      type: 'reference',
      to: [{type: 'leader'}],
      description: 'Select the pastor or leader for this branch',
    }),
    defineField({
      name: 'services',
      title: 'Service Times',
      type: 'object',
      fields: [
        defineField({
          name: 'tuesday',
          title: 'Tuesday Service',
          type: 'string',
          description: 'e.g., "6:00 PM - 8:00 PM"',
        }),
        defineField({
          name: 'thursday',
          title: 'Thursday Service',
          type: 'string',
          description: 'e.g., "6:00 PM - 8:00 PM"',
        }),
        defineField({
          name: 'friday',
          title: 'Friday Service',
          type: 'string',
          description: 'e.g., "6:00 PM - 8:00 PM"',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday Services',
          type: 'object',
          fields: [
            defineField({
              name: 'morning',
              title: 'Morning Service',
              type: 'string',
              description: 'e.g., "8:00 AM - 10:30 AM"',
            }),
            defineField({
              name: 'afternoon',
              title: 'Afternoon Service',
              type: 'string',
              description: 'e.g., "10:30 AM - 12:30 PM"',
            }),
            defineField({
              name: 'evening',
              title: 'Evening Service',
              type: 'string',
              description: 'e.g., "6:00 PM - 8:00 PM"',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Branch Description',
      type: 'text',
      description: 'Brief description about this church branch',
    }),
      defineField({
          name: 'photos',
          title: 'Branch Photos',
          type: 'array',
          of: [
              {
                  type: 'image',
                  options: {
                      hotspot: true,
                  },
              },
          ],
          description: 'Photos of the church building or activities',
      }),

      defineField({
      name: 'mapLink',
      title: 'Google Maps Link',
      type: 'url',
      description: 'Link to Google Maps location',
    }),
    defineField({
      name: 'isActive',
      title: 'Active Branch',
      type: 'boolean',
      description: 'Whether this branch is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which branches should appear (lower numbers first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    },
  ],
})