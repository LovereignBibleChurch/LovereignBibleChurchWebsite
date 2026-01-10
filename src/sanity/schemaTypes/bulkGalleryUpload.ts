import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bulkGalleryUpload',
  title: 'Bulk Gallery Upload',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Upload Title',
      type: 'string',
      description: 'A title for this bulk upload session (for reference only)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for this image',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              description: 'Optional title for this image',
            }
          ]
        }
      ],
      options: {
        layout: 'grid'
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'autoGenerateTitles',
      title: 'Auto-generate Titles',
      type: 'boolean',
      description: 'Automatically generate titles from filename if no title is provided',
      initialValue: true,
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      images: 'images',
    },
    prepare(selection) {
      const {title, images} = selection
      return {
        title: title,
        subtitle: `${images?.length || 0} images uploaded`,
        media: images?.[0]
      }
    },
  },
})