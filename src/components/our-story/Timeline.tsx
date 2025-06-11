export default function Timeline() {
  const timelineEvents = [
    {
      year: "1985",
      title: "Church Founded",
      description: "Our church was established with a small group of faithful believers.",
    },
    {
      year: "1992",
      title: "First Building",
      description: "We built our first sanctuary to accommodate our growing congregation.",
    },
    {
      year: "2005",
      title: "Community Outreach",
      description: "Launched our first major community service programs.",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Added education building and expanded our youth programs.",
    },
    {
      year: "2020",
      title: "Digital Ministry",
      description: "Embraced online worship and digital ministry during challenging times.",
    },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
      <div className="space-y-8">
        {timelineEvents.map((event, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-20 text-right mr-8">
              <span className="text-2xl font-bold text-blue-600">{event.year}</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
