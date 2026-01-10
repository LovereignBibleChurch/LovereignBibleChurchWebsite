import {StructureBuilder} from 'sanity/structure'

/**
 * Custom structure for the Sanity admin interface
 * This makes bulk upload functionality more prominent
 */
export const customStructure = (S: StructureBuilder) =>
  S.list()
    .title('Church Content Management')
    .items([
      S.listItem()
        .title('🖼️ Bulk Image Upload')
        .child(
          S.editor()
            .id('bulk-upload')
            .schemaType('bulkGalleryUpload')
            .documentId('new-bulk-upload')
            .title('Upload Multiple Images')
        ),
      S.divider(),
      S.listItem()
        .title('📸 Photo Gallery')
        .child(
          S.documentTypeList('galleryImage')
            .title('Gallery Images')
        ),
      S.listItem()
        .title('📚 Sermons')
        .child(
          S.documentTypeList('sermon')
            .title('Sermons')
        ),
      S.listItem()
        .title('📅 Events')
        .child(
          S.documentTypeList('event')
            .title('Events')
        ),
      S.listItem()
        .title('👥 Leaders')
        .child(
          S.documentTypeList('leader')
            .title('Church Leaders')
        ),
      S.listItem()
        .title('🏢 Branches')
        .child(
          S.documentTypeList('branch')
            .title('Church Branches')
        ),
      S.listItem()
        .title('📢 Announcements')
        .child(
          S.documentTypeList('announcement')
            .title('Announcements')
        ),
      S.listItem()
        .title('🛍️ Products')
        .child(
          S.documentTypeList('product')
            .title('Shop Products')
        ),
      S.listItem()
        .title('💬 Testimonials')
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
        ),
      S.divider(),
      ...S.documentTypeListItems()
    ])