import { NextRequest, NextResponse } from 'next/server'
import { processBulkUploads } from '@/sanity/lib/bulkUploadUtils'

export async function POST(request: NextRequest) {
  try {
    // Process any pending bulk uploads
    const result = await processBulkUploads()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Successfully processed ${result.processedCount} images from bulk uploads`,
        processedCount: result.processedCount
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error processing bulk uploads:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Bulk upload processing endpoint',
    usage: 'Send a POST request to process pending bulk uploads'
  })
}