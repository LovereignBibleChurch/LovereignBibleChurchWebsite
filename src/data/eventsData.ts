export interface EventItem {
    id: number
    title: string
    date: string
    time: string
    image: string
    description?: string
    location?: string
    category?: string
}

export const eventsData: EventItem[] = [
    {
        id: 1,
        title: "Midweek Service",
        date: "2024-01-07",
        time: "9:00 AM",
        image: "/church_flyers/midweek.jpeg",
        description: "Join us for our weekly worship service filled with praise, prayer, and the Word of God.",
        location: "Wellspring, Achimota Ghana",
        category: "Worship",
    },
    {
        id: 2,
        title: "Supernatural Encounter Night",
        date: "2024-01-10",
        time: "7:00 PM",
        image: "/church_flyers/sen.jpeg",
        description: "A dynamic Bible study session designed specifically for our youth community.",
        location: "Wellspring, Achimota Ghana",
        category: "Prayer",
    },
    {
        id: 3,
        title: "Sunday Service",
        date: "2024-01-15",
        time: "10:00 AM",
        image:"/church_flyers/sunday.jpeg",
        description: "Join us as we serve our local community with love and compassion.",
        location: "Wellspring, Achimota Ghana",
        category: "Service",
    },
]
