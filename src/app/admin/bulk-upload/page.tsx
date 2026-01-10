import BulkUploadProcessor from '@/components/admin/BulkUploadProcessor'

export default function AdminBulkUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bulk Upload Management
            </h1>
            <p className="text-gray-600">
              Process bulk image uploads and convert them to individual gallery images
            </p>
          </div>
          
          <div className="space-y-6">
            <BulkUploadProcessor />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">How it works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Go to the Sanity admin panel and create a new "Bulk Gallery Upload"</li>
                <li>Upload multiple images at once using the array field</li>
                <li>Come back to this page and click "Process Bulk Uploads"</li>
                <li>All images from the bulk upload will be converted to individual gallery images</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip:</h4>
              <p className="text-yellow-700 text-sm">
                You can also access the bulk upload feature directly in the Sanity admin panel 
                under "🖼️ Bulk Image Upload" for a more streamlined workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}