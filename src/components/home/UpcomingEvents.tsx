import Image from "next/image"
import Link from "next/link"
import { Calendar } from "lucide-react"

export default function UpcomingEvents() {
  // Sample events data - in a real app, this would come from a CMS or API
  const events = [
    {
      id: 1,
      title: "Annual Church Retreat",
      date: "June 15-17, 2024",
      description: "Join us for a weekend of spiritual renewal, fellowship, and fun activities for all ages.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Community Outreach Day",
      date: "July 8, 2024",
      description: "Volunteer to help with various community service projects throughout our city.",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Youth Summer Camp",
      date: "July 22-26, 2024",
      description: "A week-long camp for teens with worship, outdoor activities, and spiritual growth.",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
            View All Events
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <Link href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
