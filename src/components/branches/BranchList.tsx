import { MapPin, Phone, Clock } from "lucide-react"

export default function BranchList() {
  const branches = [
    {
      name: "Main Campus",
      address: "123 Church Street, City, State 12345",
      phone: "(123) 456-7890",
      services: "Sunday 9:00 AM & 11:00 AM",
      pastor: "Pastor John Smith",
    },
    {
      name: "North Branch",
      address: "456 North Ave, City, State 12345",
      phone: "(123) 456-7891",
      services: "Sunday 10:00 AM",
      pastor: "Pastor Mary Johnson",
    },
    {
      name: "South Campus",
      address: "789 South Blvd, City, State 12345",
      phone: "(123) 456-7892",
      services: "Sunday 9:30 AM",
      pastor: "Pastor David Wilson",
    },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Our Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {branches.map((branch, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-4">{branch.name}</h3>

            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                <span className="text-gray-600">{branch.address}</span>
              </div>

              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{branch.phone}</span>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{branch.services}</span>
              </div>

              <div className="pt-2 border-t">
                <p className="font-medium">{branch.pastor}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
