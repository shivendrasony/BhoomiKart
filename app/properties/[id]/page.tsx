"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Bath, Bed, Heart, MapPin, Maximize, Share2, Calendar, Home, Phone, Mail, Car, Shield, Wifi, Tv, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Map from "@/components/map"
import Link from "next/link"
import { Property, properties as pageProperties } from "../page"
import { properties as featuredPageProperties } from "@/components/featured-properties"

// Combine both property lists, with featured properties taking precedence
const allProperties = [...pageProperties, ...featuredPageProperties.filter((fp: Property) => 
  !pageProperties.some((p: Property) => p.id === fp.id)
)]

export default function PropertyDetails() {
  const params = useParams()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [messageSubmitted, setMessageSubmitted] = useState(false)

  // Find the property based on the ID from the URL, checking both sources
  const property = allProperties.find((p) => p.id === Number(params.id))

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault()
    setMessageSubmitted(true)
  }

  // If property is not found
  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Ensure we have the correct agent
  const agent = property.agent

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Images */}
      <section className="relative bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="relative h-[300px] md:h-[500px]">
            <Image
              src={property.additionalImages?.[activeImageIndex] || property.image}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
          </div>
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
            {[property.image, ...(property.additionalImages || [])].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                  activeImageIndex === index ? "ring-2 ring-emerald-600" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                    <div className="flex items-center text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{property.address}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 py-4 border-t border-b">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Property Type</p>
                      <p className="font-medium">{property.category}</p>
                    </div>
                  </div>
                  {property.bedrooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="h-5 w-5 text-emerald-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p className="font-medium">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 text-emerald-600 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                        <p className="font-medium">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Maximize className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-medium">{property.area} sq.ft</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Year Built</p>
                      <p className="font-medium">{property.yearBuilt}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Price</h2>
                  <p className="text-3xl font-bold text-emerald-600">
                    {formatPrice(property.price)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-4">
                    <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                    <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                  </TabsContent>
                  <TabsContent value="features" className="pt-4">
                    <h2 className="text-xl font-semibold mb-4">Property Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(property.features || []).map((feature: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="location" className="pt-4">
                    <h2 className="text-xl font-semibold mb-4">Property Location</h2>
                    <Map address={property.address} location={property.location} />
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Nearby Places</h3>
                      <ul className="space-y-2">
                        {(property.nearbyPlaces || []).map((place: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            {place}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Contact Agent</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input type="email" placeholder="Your email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input placeholder="Your phone number" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea
                      placeholder="I'm interested in this property. Please contact me with more information."
                      rows={4}
                    />
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send Message</Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-[60px] h-[60px]">
                    <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        sizes="60px"
                        priority
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-sm text-gray-500">Property Agent</p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-emerald-600 mr-2" />
                      <span>{agent.email}</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Call Agent</Button>
                    <Button variant="outline" className="w-full">
                      Email Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">Property Highlights</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>24/7 Security</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>High-Speed Internet</span>
                    </div>
                    <div className="flex items-center">
                      <Tv className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>Smart TV Ready</span>
                        </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 text-emerald-600 mr-2" />
                      <span>{property.parkingSpaces} Parking Spaces</span>
                        </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
