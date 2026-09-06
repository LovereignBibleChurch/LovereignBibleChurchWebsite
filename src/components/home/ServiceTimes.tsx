import { Clock, MapPin } from "lucide-react"
import { services } from "@/data/serviceData"

export default function ServiceTimes() {
  return (
    <section className="bg-[#0b0b0a] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <div className="max-w-2xl border-b border-white/15 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8b267]">Weekly Schedule</p>
          <h2 className="mt-4 font-display text-4xl font-semibold text-white md:text-5xl">Join Us for Worship</h2>
          <p className="mt-4 text-white/60">Gather with us in Wellspring, Achimota throughout the week.</p>
        </div>
        <dl className="divide-y divide-white/10">
          {services.map((service) => <div key={service.id} className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <dt className="text-lg font-semibold text-white">{service.title}</dt>
              <dd className="mt-1 text-sm text-white/55">{service.description}</dd>
            </div>
            <dd className="flex flex-col gap-2 text-sm text-white/75 md:items-end">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#d8b267]" aria-hidden="true" />{service.time}</span>
              <span className="flex items-center gap-2 text-white/50"><MapPin className="h-4 w-4 text-[#d8b267]" aria-hidden="true" />{service.location}</span>
            </dd>
          </div>)}
        </dl>
      </div>
    </section>
  )
}
