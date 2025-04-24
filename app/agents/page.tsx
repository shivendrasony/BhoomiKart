"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2, Facebook, Instagram, Linkedin, Mail, MapPin, Search, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample agents data
const agents = [
  {
    id: 1,
    name: "Ravi Reddy",
    position: "Luxury Real Estate Specialist",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "ravi@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Ultra-Luxury Homes", "Celebrity Properties"],
    experience: 15,
    listings: 45,
    rating: 4.9,
    bio: "Ravi Reddy is one of India's most prestigious luxury real estate consultants, known for handling high-profile celebrity and business leader properties in Mumbai's premium locations.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 2,
    name: "Anjali Shah",
    position: "Commercial Property Maven",
    location: "Delhi, NCR",
    phone: "+91 87654 32109",
    email: "anjali@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Commercial Complexes", "Retail Spaces"],
    experience: 18,
    listings: 32,
    rating: 4.9,
    bio: "Anjali Shah is Delhi's most sought-after commercial property expert, having closed some of the biggest commercial real estate deals in North India.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    position: "Investment Property Guru",
    location: "Bangalore, Karnataka",
    phone: "+91 76543 21098",
    email: "arjun@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Investment Properties", "Tech Parks"],
    experience: 20,
    listings: 28,
    rating: 4.8,
    bio: "Arjun Kapoor is recognized as Bangalore's tech park specialist, having facilitated major deals with leading IT companies and tech startups.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 4,
    name: "Priya Mehra",
    position: "Heritage Property Expert",
    location: "Jaipur, Rajasthan",
    phone: "+91 65432 10987",
    email: "priya@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Heritage Properties", "Palace Hotels"],
    experience: 12,
    listings: 15,
    rating: 4.9,
    bio: "Priya Mehra specializes in heritage properties and palace conversions, working with royal families and luxury hotel chains across Rajasthan.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 5,
    name: "Karthik Menon",
    position: "Waterfront Property Specialist",
    location: "Kochi, Kerala",
    phone: "+91 54321 09876",
    email: "karthik@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Waterfront Villas", "Resort Properties"],
    experience: 14,
    listings: 22,
    rating: 4.7,
    bio: "Karthik Menon is Kerala's leading waterfront property expert, specializing in luxury backwater properties and resort developments.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
  {
    id: 6,
    name: "Zara Khan",
    position: "Smart City Development Expert",
    location: "Hyderabad, Telangana",
    phone: "+91 43210 98765",
    email: "zara@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Smart Cities", "Township Projects"],
    experience: 16,
    listings: 25,
    rating: 4.8,
    bio: "Zara Khan is a pioneer in smart city developments, having played key roles in major township projects across Hyderabad's IT corridor.",
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
  },
]

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("")

  // Filter agents based on search term and filters
  const filteredAgents = agents.filter((agent) => {
    // Filter by search term
    if (
      searchTerm &&
      !agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !agent.position.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by location
    if (locationFilter && !agent.location.includes(locationFilter)) {
      return false
    }

    // Filter by specialty
    if (specialtyFilter && !agent.specialties.includes(specialtyFilter)) {
      return false
    }

    return true
  })

  // Get unique locations for filter
  const locations = [...new Set(agents.map((agent) => agent.location))]

  // Get unique specialties for filter
  const specialties = [...new Set(agents.flatMap((agent) => agent.specialties))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Our Real Estate Agents</h1>
            <p className="text-emerald-100 text-lg max-w-3xl mx-auto">
              Connect with our experienced real estate professionals to find your perfect property
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10"
                placeholder="Search agents by name or position"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <div className="flex space-x-3">
                          <Link href={agent.social.facebook} className="text-white hover:text-emerald-300">
                            <Facebook className="h-5 w-5" />
                          </Link>
                          <Link href={agent.social.twitter} className="text-white hover:text-emerald-300">
                            <Twitter className="h-5 w-5" />
                          </Link>
                          <Link href={agent.social.instagram} className="text-white hover:text-emerald-300">
                            <Instagram className="h-5 w-5" />
                          </Link>
                          <Link href={agent.social.linkedin} className="text-white hover:text-emerald-300">
                            <Linkedin className="h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{agent.location}</span>
                      </div>
                      <Link href={`/agents/${agent.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                          {agent.name}
                        </h3>
                      </Link>
                      <p className="text-emerald-600 font-medium mt-1">{agent.position}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {agent.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm">
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-semibold text-gray-900">{agent.experience}+</p>
                          <p className="text-gray-500">Years</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-semibold text-gray-900">{agent.listings}</p>
                          <p className="text-gray-500">Listings</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded">
                          <p className="font-semibold text-gray-900">{agent.rating}</p>
                          <p className="text-gray-500">Rating</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" asChild>
                          <Link href={`/agents/${agent.id}`}>View Profile</Link>
                        </Button>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href={`mailto:${agent.email}`}>
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No agents found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setLocationFilter("")
                  setSpecialtyFilter("")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Team of Real Estate Professionals</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Are you a passionate real estate agent looking to grow your career? Join BhoomiKart and get access to our
            extensive network of clients and properties.
          </p>
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
            Apply to Join
          </Button>
        </div>
      </section>
    </div>
  )
}
