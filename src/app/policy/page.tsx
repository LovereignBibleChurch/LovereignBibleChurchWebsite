import type { Metadata } from "next"
import PolicyPage from "@/components/policy/PolicyPage"

export const metadata: Metadata = {
  title: "Privacy Policy | Lovereign Bible Church",
  description:
    "How Lovereign Bible Church collects, uses, stores and protects personal information in the Lovereign Bible Church mobile application.",
  alternates: { canonical: "/policy" },
}

export default function Policy() {
  return <PolicyPage />
}
