import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Address</h3>
            <p className="text-gray-600">123 Church Street</p>
            <p className="text-gray-600">City, State 12345</p>
          </div>
        </div>

        <div className="flex items-start">
          <Phone className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-600">(123) 456-7890</p>
            <p className="text-gray-600">(123) 456-7891 (Office)</p>
          </div>
        </div>

        <div className="flex items-start">
          <Mail className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-gray-600">info@churchname.org</p>
            <p className="text-gray-600">pastor@churchname.org</p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-6 w-6 text-blue-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium">Office Hours</h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="text-gray-600">Saturday: Closed</p>
            <p className="text-gray-600">Sunday: 8:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
