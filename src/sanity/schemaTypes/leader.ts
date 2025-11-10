import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Church Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title/Position',
      type: 'string',
      options: {
        list: [
          {title: 'Senior Pastor', value: 'Senior Pastor'},
          {title: 'Pastor', value: 'Pastor'},
          {title: 'Assistant Pastor', value: 'Assistant Pastor'},
          {title: 'Prophet', value: 'Prophet'},
          {title: 'Chief Elder', value: 'Chief Elder'},
          {title: 'Elder', value: 'Elder'},
          {title: 'Shepherd', value: 'Shepherd'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Church Location/Branch',
      type: 'string',
      description: 'Which church branch or location this leader serves',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Brief biography or description of the leader',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which leaders should appear (lower numbers first)',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Active Leader',
      type: 'boolean',
      description: 'Whether this leader is currently active in ministry',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
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