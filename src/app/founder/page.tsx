import Hero from "@/components/home/Hero";
import {heroData} from "@/data/heroData";
import AboutFounder from "@/components/founder/about-founder";
import Books from "@/components/founder/books";


export default function Founder() {
  return (
    <div className="py-12">
        <Hero items={heroData} />
        <AboutFounder />
        <Books />
    </div>
  )
}
