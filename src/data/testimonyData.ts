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
    {
        id: 3,
        name: "Grace Williams",
        role: "Worship Team",
        testimony:
            "Being part of the worship team has been such a blessing. Through music and fellowship, I've discovered gifts I never knew I had. This church family has supported me through every season of life.",
        image: "/images/testimonies/grace.jpg",
        date: "October 2023",
        location: "Main Campus",
    },
    {
        id: 4,
        name: "David Rodriguez",
        role: "Small Group Leader",
        testimony:
            "The small group ministry here changed my life completely. I went from feeling isolated to being surrounded by brothers and sisters who genuinely care. God has used this community to heal and restore me.",
        image: "/images/testimonies/david.jpg",
        date: "September 2023",
        location: "South Campus",
    },
    {
        id: 5,
        name: "Emily Thompson",
        role: "Volunteer",
        testimony:
            "Serving in the children's ministry has brought me so much joy. Seeing young hearts learn about God's love reminds me daily of His goodness. This church has given me purpose and direction.",
        image: "/images/testimonies/emily.jpg",
        date: "August 2023",
        location: "Main Campus",
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Men's Ministry",
        testimony:
            "The men's ministry here has helped me become the husband and father God called me to be. The accountability and brotherhood I've found here is invaluable. My family has been transformed.",
        image: "/images/testimonies/james.jpg",
        date: "July 2023",
        location: "North Branch",
    },
]
