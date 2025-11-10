import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
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
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Event Time',
      type: 'object',
      fields: [
        defineField({
          name: 'morning',
          title: 'Morning Time',
          type: 'string',
          description: 'e.g., "9:00 AM - 11:00 AM"',
        }),
        defineField({
          name: 'afternoon',
          title: 'Afternoon Time',
          type: 'string',
          description: 'e.g., "12:00 PM - 2:00 PM"',
        }),
        defineField({
          name: 'evening',
          title: 'Evening Time',
          type: 'string',
          description: 'e.g., "6:00 PM - 8:00 PM"',
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'Detailed description of the event',
    }),
    defineField({
      name: 'location',
      title: 'Event Location',
      type: 'string',
      description: 'Venue or location of the event',
    }),
    defineField({
      name: 'category',
      title: 'Event Category',
      type: 'string',
      options: {
        list: [
          {title: 'Worship', value: 'worship'},
          {title: 'Conference', value: 'conference'},
          {title: 'Seminar', value: 'seminar'},
          {title: 'Youth', value: 'youth'},
          {title: 'Prayer', value: 'prayer'},
          {title: 'Special Service', value: 'special-service'},
          {title: 'Community Outreach', value: 'community-outreach'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Mark as featured to highlight this event',
      initialValue: false,
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Optional link for event registration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Event Date, New',
      name: 'eventDateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Event Date, Old',
      name: 'eventDateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
  ],
})