import Hero from "@/components/home/Hero";
import {heroData} from "@/data/heroData";


export default function Media() {
  return (
    <div className="">
        <Hero items={heroData} />
    </div>
  )
}
