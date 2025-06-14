import Hero from "@/components/home/Hero";
import {heroData} from "@/data/heroData";
import DonationMethods from "@/components/DonationMethods";


export default function Give() {
  return (
    <div className="py-12">
        <Hero items={heroData} />
        <DonationMethods />
    </div>
  )
}
