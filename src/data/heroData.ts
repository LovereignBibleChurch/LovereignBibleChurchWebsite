export interface HeroItem {
    id: number
    title: string
    subtitle: string
    desktopImage: string
    mobileImage: string
}

export const heroData: HeroItem[] = [
    {
        id: 1,
        title: "Welcome Home",
        subtitle: "your place to shine",
        desktopImage: "/hero_Images/homeHerolg.jpg",
        mobileImage: "/hero_Images/homeHerosm.jpeg"
    },
    {
        id: 2,
        title: "Lovereign Bible Church",
        subtitle: "the model church",
        desktopImage: "/hero_Images/homeHerolg.jpg",
        mobileImage: "/hero_Images/homeHerosm.jpeg"
    },
    {
        id: 3,
        title: "Lovereign Bible Church",
        subtitle: "keep shining",
        desktopImage: "/hero_Images/homeHerolg.jpg",
        mobileImage:  "/hero_Images/homeHerosm.jpeg"
    },
]
