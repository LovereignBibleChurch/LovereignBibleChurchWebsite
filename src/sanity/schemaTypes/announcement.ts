import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Announcement Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Announcement Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image for the announcement',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'General', value: 'general'},
          {title: 'Event', value: 'event'},
          {title: 'Service Update', value: 'service-update'},
          {title: 'Community', value: 'community'},
          {title: 'Youth', value: 'youth'},
          {title: 'Prayer', value: 'prayer'},
          {title: 'Important', value: 'important'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'priority',
      title: 'Priority Level',
      type: 'string',
      options: {
        list: [
          {title: 'Low', value: 'low'},
          {title: 'Medium', value: 'medium'},
          {title: 'High', value: 'high'},
          {title: 'Urgent', value: 'urgent'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When the announcement becomes active',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When the announcement expires (optional)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this announcement is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Announcement',
      type: 'boolean',
      description: 'Mark as featured to highlight this announcement',
      initialValue: false,
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'Optional link for more information',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (if link is provided)',
      initialValue: 'Learn More',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Start Date, New',
      name: 'startDateDesc',
      by: [
        {field: 'startDate', direction: 'desc'}
      ]
    },
    {
      title: 'Priority Level',
      name: 'priorityLevel',
      by: [
        {field: 'priority', direction: 'desc'}
      ]
    },
  ],
})