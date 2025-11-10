import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'sermon',
  title: 'Sermon/Message',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sermon Title',
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
      title: 'Sermon Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Duration of the sermon (e.g., "45:30" for 45 minutes 30 seconds)',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Thumbnail image for the sermon',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description or summary of the sermon',
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      description: 'Name of the person who gave the sermon',
    }),
    defineField({
      name: 'scriptureReferences',
      title: 'Scripture References',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bible verses referenced in the sermon',
    }),
    defineField({
      name: 'platform',
      title: 'Platform Type',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Podbean', value: 'podbean'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'Audio File', value: 'audio'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Media URL',
      type: 'url',
      description: 'URL to the sermon video or audio',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      description: 'Upload audio file directly (if platform is "audio")',
    }),
    defineField({
      name: 'series',
      title: 'Sermon Series',
      type: 'string',
      description: 'Name of the sermon series if this is part of one',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Sunday Service', value: 'sunday-service'},
          {title: 'Midweek Service', value: 'midweek-service'},
          {title: 'Special Service', value: 'special-service'},
          {title: 'Conference', value: 'conference'},
          {title: 'Youth Service', value: 'youth-service'},
          {title: 'Prayer Meeting', value: 'prayer-meeting'},
          {title: 'Bible Study', value: 'bible-study'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Tags to help categorize and search sermons',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Sermon',
      type: 'boolean',
      description: 'Mark as featured to highlight this sermon',
      initialValue: false,
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'text',
      description: 'Full transcript of the sermon (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'thumbnail',
    },
  },
  orderings: [
    {
      title: 'Sermon Date, New',
      name: 'sermonDateDesc',
      by: [
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Sermon Date, Old',
      name: 'sermonDateAsc',
      by: [
        {field: 'date', direction: 'asc'}
      ]
    },
  ],
})