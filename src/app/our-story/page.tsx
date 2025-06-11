import StoryHeader from "@/components/our-story/StoryHeader"
import Timeline from "@/components/our-story/Timeline"
import Vision from "@/components/our-story/Vision"
import Mission from "@/components/our-story/Mission"

export default function OurStory() {
  return (
    <div className="container mx-auto px-4 py-12">
      <StoryHeader />
      <Vision />
      <Mission />
      <Timeline />
    </div>
  )
}
