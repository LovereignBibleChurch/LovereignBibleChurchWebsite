import Hero from "@/components/home/Hero"
import WelcomeMessage from "@/components/home/WelcomeMessage"
import ServiceTimes from "@/components/home/ServiceTimes"
import {heroData} from "@/data/heroData";
import EventsSlider from "@/components/ui/EventSlider";
import {eventsData} from "@/data/eventsData";
import OnlineCommunity from "@/components/home/OnlineCommunity";
import TestimonyCorner from "@/components/home/TestimonyCorner";
import { getTestimonials, getEvents } from "@/sanity/lib/queries";
import CelebrationConfetti from "@/components/home/CelebrationConfetti";
import BooksMiniCard from "@/components/books/BooksMiniCard";
import PromoModal from "@/components/home/PromoModal";

export default async function Home() {
  // Fetch data from Sanity
  const testimonials = await getTestimonials();
  const events = await getEvents();

  return (
    <div className="">
        <PromoModal />
        <CelebrationConfetti message="Celebrating 12 Years!" />
        <Hero
          items={heroData}
          primaryButtonText="Explore Books"
          primaryButtonLink="/books"
        />
        <BooksMiniCard />
        <EventsSlider  events={events} />
        <WelcomeMessage />
        <ServiceTimes />
        <OnlineCommunity />
        <TestimonyCorner testimonials={testimonials} />
    </div>
  )
}
