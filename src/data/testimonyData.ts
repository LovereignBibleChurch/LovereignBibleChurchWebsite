export interface TestimonyItem {
    id: number
    name: string
    role?: string
    testimony: string
    image?: string
    date?: string
    location?: string
}

export const testimonyData: TestimonyItem[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Youth Leader",
        testimony:
            "This church has been my spiritual home for over 5 years. The community here is incredible, and I've grown so much in my faith journey. The youth programs have helped me discover my calling to serve others.",
        image: "/images/testimonies/sarah.jpg",
        date: "December 2023",
        location: "Main Campus",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "New Member",
        testimony:
            "I was searching for a place where I could truly belong, and I found it here. The warmth and acceptance I've experienced has been life-changing. Pastor's messages speak directly to my heart every Sunday.",
        image: "/images/testimonies/michael.jpg",
        date: "November 2023",
        location: "North Branch",
    },

]
