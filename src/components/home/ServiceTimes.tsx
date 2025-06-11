import { Clock, MapPin } from "lucide-react"

export default function ServiceTimes() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Join Us for Worship</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sunday Service */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Sunday Service</h3>
            <div className="flex items-start mb-3">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">9:00 AM - 10:30 AM</p>
                <p className="text-gray-600">Morning Worship</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <p className="text-gray-600">Main Sanctuary</p>
            </div>
          </div>

          {/* Sunday School */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Sunday School</h3>
            <div className="flex items-start mb-3">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">11:00 AM - 12:00 PM</p>
                <p className="text-gray-600">All Ages Welcome</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <p className="text-gray-600">Education Building</p>
            </div>
          </div>

          {/* Midweek Service */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">Wednesday Bible Study</h3>
            <div className="flex items-start mb-3">
              <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <p className="font-medium">7:00 PM - 8:30 PM</p>
                <p className="text-gray-600">Prayer & Bible Study</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <p className="text-gray-600">Fellowship Hall</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
