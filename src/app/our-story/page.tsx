import Vision from "@/components/our-story/Vision"
import Hero from "@/components/home/Hero";
import {OurStoryheroData} from "@/data/heroData";
import FounderStorySection from "@/components/our-story/FounderStorySection";
import ChurchLeadership from "@/components/our-story/ChurchLeaders";
import { getLeaders } from "@/sanity/lib/queries";

export default async function OurStory() {
  // Fetch leaders from Sanity
  const leaders = await getLeaders();

  return (
    <div className="">
        <Hero items={OurStoryheroData} />
        <FounderStorySection />
      <Vision />
        <ChurchLeadership />
    </div>
  )
}
