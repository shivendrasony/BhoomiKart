import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-6">About BhoomiKart</h1>
              <p className="text-emerald-100 text-lg mb-8">
                We're revolutionizing the real estate industry by connecting buyers and sellers through a transparent,
                efficient, and user-friendly platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100" asChild>
                  <Link href="/properties">Our Properties</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="BhoomiKart Office"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
                alt="BhoomiKart Journey"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">BHOOMIKART</span> was founded in 2024 with a simple mission: to make real estate transactions more accessible,
                transparent, and efficient for everyone involved. What started as a small team of passionate real estate
                professionals has grown into one of India's leading property platforms.
              </p>
              <p className="text-gray-700 mb-4">
                Our founders recognized the challenges that buyers and sellers faced in the traditional real estate
                market - from lack of information to complex processes and high intermediary costs. They envisioned a
                platform that would leverage technology to address these pain points and create a seamless experience
                for all stakeholders.
              </p>
              <p className="text-gray-700">
                Today, <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">BHOOMIKART</span> connects thousands of buyers, sellers, and real estate professionals across India,
                facilitating transparent and efficient property transactions. Our commitment to innovation and customer
                satisfaction continues to drive our growth and evolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We're driven by a clear purpose and ambitious goals for the future of real estate in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 mb-6">
                  To simplify real estate transactions by providing a transparent, efficient, and user-friendly platform
                  that connects buyers and sellers, eliminating traditional barriers and creating value for all
                  stakeholders.
                </p>
                <ul className="space-y-3">
                  {[
                    "Make property search and listing accessible to everyone",
                    "Ensure transparency in all transactions",
                    "Empower users with comprehensive information and tools",
                    "Reduce complexity and friction in the buying/selling process",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 mb-6">
                  To become India's most trusted real estate platform, revolutionizing how properties are bought, sold,
                  and rented across the country, and making quality housing accessible to all.
                </p>
                <ul className="space-y-3">
                  {[
                    "Create the largest and most reliable property marketplace in India",
                    "Leverage technology to solve traditional real estate challenges",
                    "Foster community development through accessible housing",
                    "Set new standards for trust and reliability in real estate",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at BhoomiKart, from product development to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                description:
                  "We believe in complete transparency in all our operations, providing clear and honest information to our users.",
              },
              {
                title: "Innovation",
                description:
                  "We continuously strive to innovate and improve our platform, leveraging technology to solve real estate challenges.",
              },
              {
                title: "Customer-Centricity",
                description:
                  "Our users are at the heart of everything we do. We design our services with their needs and preferences in mind.",
              },
              {
                title: "Integrity",
                description:
                  "We uphold the highest standards of integrity in all our interactions, building trust with our users and partners.",
              },
              {
                title: "Accessibility",
                description:
                  "We are committed to making real estate accessible to everyone, regardless of their background or experience.",
              },
              {
                title: "Community",
                description:
                  "We believe in fostering community development through our platform, contributing to balanced urban and rural growth.",
              },
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals driving BhoomiKart's mission and vision forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                position: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Rajesh has over 15 years of experience in real estate and technology. He founded BhoomiKart with a vision to transform India's property market.",
              },
              {
                name: "Priya Sharma",
                position: "Chief Operating Officer",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Priya oversees BhoomiKart's day-to-day operations, ensuring that our platform delivers exceptional value to all users.",
              },
              {
                name: "Vikram Mehta",
                position: "Chief Technology Officer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Vikram leads our technology team, developing innovative solutions that make property transactions simpler and more efficient.",
              },
              {
                name: "Ananya Patel",
                position: "Head of Marketing",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Ananya drives BhoomiKart's marketing strategy, building our brand and connecting with property buyers and sellers across India.",
              },
              {
                name: "Suresh Reddy",
                position: "Head of Real Estate Partnerships",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Suresh manages our relationships with developers, agents, and other real estate professionals, expanding our property network.",
              },
              {
                name: "Deepa Nair",
                position: "Customer Experience Director",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Deepa ensures that every user has a seamless and satisfying experience on the BhoomiKart platform.",
              },
              {
                name: "Arjun Singh",
                position: "Head of Data Analytics",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&auto=format&fit=crop",
                bio: "Arjun leads our data analytics team, leveraging AI and machine learning to provide valuable market insights and improve user experience.",
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Achievements</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Milestones that mark our journey of growth and impact in the real estate industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
              <ul className="space-y-4">
                {[
                  { year: "2024", event: "BhoomiKart was founded in Mumbai" },
                  { year: "2024", event: "Expanded operations to 5 major cities across India" },
                  { year: "2024", event: "Reached 1,000 property listings milestone" },
                  { year: "2024", event: "Secured seed funding of $2 million" },
                  { year: "2024", event: "Launched mobile app with over 10,000 downloads" },
                  { year: "2024", event: "Expanded to 10+ cities with 5,000+ active listings" },
                ].map((milestone, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-emerald-600 text-white font-semibold px-3 py-1 rounded mr-3 text-sm">
                      {milestone.year}
                    </div>
                    <span className="mt-1">{milestone.event}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Awards & Recognition</h3>
              <ul className="space-y-4">
                {[
                  { year: "2024", award: "Best Real Estate Startup - TechIndia Awards" },
                  { year: "2024", award: "Most Innovative PropTech Solution - RealEstate Excellence Awards" },
                  { year: "2024", award: "Best Emerging PropTech Platform - Digital India Summit" },
                  { year: "2024", award: "Best User Experience - UX Design Awards" },
                  { year: "2024", award: "Top 50 Startups to Watch - Business Today" },
                  { year: "2024", award: "Most Promising Real Estate Platform - National Housing Awards" },
                ].map((award, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-emerald-600 text-white font-semibold px-3 py-1 rounded mr-3 text-sm">
                      {award.year}
                    </div>
                    <span className="mt-1">{award.award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Growing Team</h2>
          <p className="text-emerald-100 text-lg max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals who are passionate about real estate and technology. Join us
            in our mission to transform the property market in India.
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
            View Open Positions
          </Button>
        </div>
      </section>
    </div>
  )
}
