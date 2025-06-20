import Hero from "@/components/home/Hero"
import WelcomeMessage from "@/components/home/WelcomeMessage"
import ServiceTimes from "@/components/home/ServiceTimes"
import {heroData} from "@/data/heroData";
import EventsSlider from "@/components/ui/EventSlider";
import {eventsData} from "@/data/eventsData";
import OnlineCommunity from "@/components/home/OnlineCommunity";
import TestimonyCorner from "@/components/home/TestimonyCorner";

export default function Home() {


  return (
    <div className="">
        <Hero items={heroData} /> 
        <div className="flex flex-col gap-42">    
          <EventsSlider events={eventsData} autoSlideInterval={6000} slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }} />
          <WelcomeMessage />
        </div>
      <ServiceTimes />
        <OnlineCommunity />
        <TestimonyCorner />
    </div>
  )
}
