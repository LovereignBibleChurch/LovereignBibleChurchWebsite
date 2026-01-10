'use client'

import { useState } from 'react'

export default function BulkUploadProcessor() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [processedCount, setProcessedCount] = useState(0)

  const processBulkUploads = async () => {
    setIsProcessing(true)
    setMessage('Processing bulk uploads...')
    
    try {
      const response = await fetch('/api/process-bulk-uploads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()
      
      if (result.success) {
        setMessage(`✅ Successfully processed ${result.processedCount} images!`)
        setProcessedCount(result.processedCount)
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Bulk Upload Processor</h3>
      <p className="text-gray-600 mb-4">
        Convert bulk image uploads into individual gallery images.
      </p>
      <button
        onClick={processBulkUploads}
        disabled={isProcessing}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isProcessing ? 'Processing...' : 'Process Bulk Uploads'}
      </button>
      {message && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <p className="text-sm text-gray-800">{message}</p>
          {processedCount > 0 && (
            <p className="text-xs text-gray-600 mt-1">
              {processedCount} images processed successfully
            </p>
          )}
        </div>
      )}
    </div>
  )
}