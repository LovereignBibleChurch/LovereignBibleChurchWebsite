export interface EventItem {
    id: number
    title: string
    date: string
    time:
        {
            morning: string | ""
            afternoon: string | ""
            evening: string | ""
        }
    image: string
    description?: string
    location?: string
    category?: string
}

export const eventsData: EventItem[] = [
    {
        id: 1,
        title: "Apostolic Encounter",
        date: "2025-11-12",
        time: {
            morning: "",
            afternoon: "",
            evening: "6:00 PM",
        },
        image: "/church_flyers/ae.jpeg",
        description: "",
        location: "Wellspring, Achimota Ghana",
        category: "Worship",
    },
    {
        id: 1,
        title: "Young Minister Network International",
        date: "2025-11-30",
        time: {
            morning: "",
            afternoon: "",
            evening: "6:00 PM Each Night",
        },
        image: "/church_flyers/ewo.jpeg",
        description: "",
        location: "Wellspring, Achimota Ghana",
        category: "Worship",
    },
]
