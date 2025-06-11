import Hero from "@/components/home/Hero"
import UpcomingEvents from "@/components/home/UpcomingEvents"
import WelcomeMessage from "@/components/home/WelcomeMessage"
import ServiceTimes from "@/components/home/ServiceTimes"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <WelcomeMessage />
      <ServiceTimes />
      <UpcomingEvents />
    </div>
  )
}
