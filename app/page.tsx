"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, Home, MapPin, Search, TrendingUp, Star, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FeaturedProperties from "@/components/featured-properties"
import TestimonialSection from "@/components/testimonial-section"
import StatsSection from "@/components/stats-section"

export default function HomePage() {
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    priceRange: ""
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Convert the search parameters to URL query params
    const queryParams = new URLSearchParams()
    if (searchParams.location) queryParams.append("location", searchParams.location)
    if (searchParams.propertyType) queryParams.append("type", searchParams.propertyType)
    if (searchParams.priceRange) queryParams.append("price", searchParams.priceRange)
    
    // Navigate to properties page with search params
    window.location.href = `/properties?${queryParams.toString()}`
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:20px_20px]" />
        </div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-300/20 to-emerald-300/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm">
                <Star className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Trusted by 50,000+ Users</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                Find Your Perfect <span className="text-emerald-600">Property</span> with BhoomiKart
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Simplifying real estate transactions for buyers and sellers. Browse thousands of verified properties and
                connect directly with owners. Your dream property is just a click away.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 h-14 px-8 text-lg shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-300" asChild>
                  <Link href="/properties?type=For Sale">
                    Browse Properties
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-emerald-50" asChild>
                  <Link href="/sell">List Your Property</Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-600">Verified Properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span className="text-gray-600">Direct Owner Connect</span>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px]">
              {/* Main Property Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Modern luxury home"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">20k+</div>
                    <div className="text-sm text-gray-600">Properties Listed</div>
                  </div>
                </div>
              </div>

              {/* Featured Property Card */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl max-w-[200px]">
                <div className="relative w-full h-24 rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Featured property"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">Luxury Villa</h3>
                <p className="text-sm text-emerald-600 font-medium">₹2.5 Cr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-6 -mt-16 relative z-10">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input 
                    className="pl-10" 
                    placeholder="City, State or ZIP"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <Select onValueChange={(value) => setSearchParams({...searchParams, propertyType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <Select onValueChange={(value) => setSearchParams({...searchParams, priceRange: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchParams.propertyType === "For Rent" ? (
                      <>
                        <SelectItem value="0-25000">₹0 - ₹25,000/month</SelectItem>
                        <SelectItem value="25000-50000">₹25,000 - ₹50,000/month</SelectItem>
                        <SelectItem value="50000-100000">₹50,000 - ₹1 Lakh/month</SelectItem>
                        <SelectItem value="100000-200000">₹1 Lakh - ₹2 Lakh/month</SelectItem>
                        <SelectItem value="200000+">₹2 Lakh+/month</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="0-5000000">₹0 - ₹50 Lakh</SelectItem>
                        <SelectItem value="5000000-10000000">₹50 Lakh - ₹1 Crore</SelectItem>
                        <SelectItem value="10000000-20000000">₹1 Crore - ₹2 Crore</SelectItem>
                        <SelectItem value="20000000-50000000">₹2 Crore - ₹5 Crore</SelectItem>
                        <SelectItem value="50000000+">₹5 Crore+</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Search className="mr-2 h-4 w-4" />
                  Search Properties
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Property Type</h2>
            <p className="mt-4 text-lg text-gray-600">Find the perfect property that suits your needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Home,
                name: "Residential",
                count: 1245,
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
                description: "Luxury homes and apartments",
              },
              {
                icon: Building2,
                name: "Commercial",
                count: 873,
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                description: "Office spaces and retail",
              },
              {
                icon: MapPin,
                name: "Land",
                count: 642,
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
                description: "Plots and agricultural land",
              },
              {
                icon: Building2,
                name: "Industrial",
                count: 428,
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                description: "Warehouses and factories",
              },
            ].map((category, index) => (
              <Link href={`/properties?category=${category.name.toLowerCase()}`} key={index} className="group">
                <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 text-white mb-1">
                        <category.icon className="h-5 w-5" />
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                      </div>
                      <p className="text-sm text-gray-200">{category.description}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-semibold">{category.count} Properties</span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        View All
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <FeaturedProperties />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Dream Property?</h2>
          <p className="text-emerald-100 text-lg max-w-3xl mx-auto mb-8">
            Join thousands of satisfied users who have found their perfect property through BhoomiKart.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              Browse Properties
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-emerald-700">
              List Your Property
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
