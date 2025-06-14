import Vision from "@/components/our-story/Vision"
import Hero from "@/components/home/Hero";
import {heroData} from "@/data/heroData";
import FounderStorySection from "@/components/our-story/FounderStorySection";
import ChurchLeadership from "@/components/our-story/ChurchLeaders";

export default function OurStory() {
  return (
    <div className="">
        <Hero items={heroData} />
        <FounderStorySection />
      <Vision />
        <ChurchLeadership />
    </div>
  )
}
