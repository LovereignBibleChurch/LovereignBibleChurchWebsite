import { client } from './client'
import { groq } from 'next-sanity'

/**
 * Processes bulk gallery uploads and converts them to individual gallery images
 * This function can be called to migrate bulk uploads to individual gallery images
 */
export async function processBulkUploads() {
  try {
    // Get all bulk uploads that haven't been processed
    const bulkUploads = await client.fetch(groq`
      *[_type == "bulkGalleryUpload"] {
        _id,
        title,
        images,
        uploadedAt
      }
    `)

    let processedCount = 0

    for (const upload of bulkUploads) {
      if (upload.images && upload.images.length > 0) {
        // Create individual gallery images for each image in the bulk upload
        const galleryImages = upload.images.map((image: any, index: number) => ({
          _type: 'galleryImage',
          title: image.title || `${upload.title} - Image ${index + 1}`,
          image: {
            _type: 'image',
            asset: image.asset
          },
          caption: image.caption || ''
        }))

        // Create the documents in Sanity
        for (const galleryImage of galleryImages) {
          await client.create(galleryImage)
          processedCount++
        }

        // Optionally delete the bulk upload after processing
        // await client.delete(upload._id)
      }
    }

    return { success: true, processedCount }
  } catch (error) {
    console.error('Error processing bulk uploads:', error)
    return { success: false, error }
  }
}

/**
 * Gets all images from both individual gallery images and bulk uploads
 * This ensures the frontend displays all images regardless of upload method
 */
export async function getAllGalleryImages() {
  try {
    const [individualImages, bulkUploadImages] = await Promise.all([
      client.fetch(groq`
        *[_type == "galleryImage"] | order(_createdAt desc) {
          _id,
          title,
          image,
          caption
        }
      `),
      client.fetch(groq`
        *[_type == "bulkGalleryUpload"] {
          _id,
          title,
          "images": images[] {
            "_key": _key,
            asset,
            caption,
            title
          },
          uploadedAt
        }
      `)
    ])

    // Flatten bulk upload images into the same format as individual images
    const flattenedBulkImages = bulkUploadImages.flatMap((upload: any) => 
      upload.images?.map((img: any) => ({
        _id: `${upload._id}-${img._key}`,
        title: img.title || upload.title,
        image: {
          _type: 'image',
          asset: img.asset
        },
        caption: img.caption || '',
        _createdAt: upload.uploadedAt
      })) || []
    )

    // Combine and sort all images
    const allImages = [...individualImages, ...flattenedBulkImages]
      .sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime())

    return allImages
  } catch (error) {
    console.error('Error fetching all gallery images:', error)
    return []
  }
}