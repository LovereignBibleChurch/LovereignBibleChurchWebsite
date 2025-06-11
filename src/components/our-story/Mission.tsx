export default function Mission() {
  return (
    <section className="mb-12">
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto mb-6">
          We are committed to worshiping God, building authentic relationships, and serving our community with the love
          of Christ.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Worship</h3>
            <p className="text-gray-600">Honoring God through heartfelt worship and praise</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Fellowship</h3>
            <p className="text-gray-600">Building meaningful relationships within our church family</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Service</h3>
            <p className="text-gray-600">Serving our community with compassion and love</p>
          </div>
        </div>
      </div>
    </section>
  )
}
