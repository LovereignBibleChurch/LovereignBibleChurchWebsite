import Hero from "@/components/home/Hero"
import WelcomeMessage from "@/components/home/WelcomeMessage"
import ServiceTimes from "@/components/home/ServiceTimes"
import {heroData} from "@/data/heroData";
import EventsSlider from "@/components/ui/EventSlider";
import {eventsData} from "@/data/eventsData";
import OnlineCommunity from "@/components/home/OnlineCommunity";
import TestimonyCorner from "@/components/home/TestimonyCorner";
import { getTestimonials, getEvents } from "@/sanity/lib/queries";

export default async function Home() {
  // Fetch data from Sanity
  const testimonials = await getTestimonials();
  const events = await getEvents();

  return (
    <div className="">
        <Hero items={heroData} />
        <EventsSlider  events={events} autoSlideInterval={6000} slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }} />
        <WelcomeMessage />
        <ServiceTimes />
        <OnlineCommunity />
        <TestimonyCorner testimonials={testimonials} />
    </div>
  )
}
