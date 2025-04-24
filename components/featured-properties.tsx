"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bath, Bed, Heart, MapPin, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample property data
export const properties = [
  {
    id: 1,
    title: "Sea-facing Penthouse in Worli",
    location: "Worli, Mumbai",
    address: "123 Sea View Heights, Worli Sea Face, Mumbai, Maharashtra 400018",
    price: 150000000,
    bedrooms: 5,
    bathrooms: 6,
    area: 8000,
    type: "For Sale",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Luxurious sea-facing penthouse with panoramic views of the Arabian Sea. This ultra-luxury residence features premium finishes, private terrace, and world-class amenities.",
    features: [
      "Sea View",
      "Private Terrace",
      "Smart Home System",
      "Private Pool",
      "Home Theater",
      "Wine Cellar",
      "Staff Quarters",
      "Helipad Access",
      "Spa & Gym",
      "24/7 Security"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Ravi Reddy",
      phone: "+91 98765 43210",
      email: "ravi@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 2022,
    parkingSpaces: 4,
    nearbyPlaces: [
      "Worli Sea Face (0.1 km)",
      "High Street Phoenix Mall (2 km)",
      "International School (1.5 km)",
      "Luxury Hotels (0.5 km)",
      "Business District (1 km)"
    ]
  },
  {
    id: 4,
    title: "Premium Office Tower",
    location: "Cybercity, Gurugram",
    address: "456 Cyber Hub, DLF Cybercity, Gurugram, Haryana 122002",
    price: 450000000,
    bedrooms: 0,
    bathrooms: 12,
    area: 50000,
    type: "For Sale",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "State-of-the-art office tower in the heart of Gurugram's business district. This premium commercial space offers modern amenities and excellent connectivity.",
    features: [
      "Grade A Office Space",
      "24/7 Access",
      "High-speed Elevators",
      "Central Air Conditioning",
      "100% Power Backup",
      "Multi-level Parking",
      "Conference Facilities",
      "Food Court",
      "Security System",
      "Green Building Certification"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Anjali Shah",
      phone: "+91 87654 32109",
      email: "anjali@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 2021,
    parkingSpaces: 500,
    nearbyPlaces: [
      "Metro Station (0.2 km)",
      "Cyber Hub (0.5 km)",
      "International Airport (15 km)",
      "Hotels (0.3 km)",
      "Shopping Mall (0.1 km)"
    ]
  },
  {
    id: 7,
    title: "Tech Park Investment Opportunity",
    location: "Electronic City Phase 1, Bangalore",
    address: "789 Tech Park, Electronic City Phase 1, Bangalore, Karnataka 560100",
    price: 850000000,
    bedrooms: 0,
    bathrooms: 30,
    area: 150000,
    type: "For Sale",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Premium tech park offering excellent investment opportunity in Bangalore's IT hub. Fully leased to multinational companies with high rental yields.",
    features: [
      "LEED Certified",
      "Multiple Office Spaces",
      "Conference Centers",
      "Food Courts",
      "Parking Complex",
      "24/7 Security",
      "Power Backup",
      "High-speed Internet",
      "Employee Recreation Area",
      "Green Spaces"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Arjun Kapoor",
      phone: "+91 76543 21098",
      email: "arjun@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 2020,
    parkingSpaces: 1000,
    nearbyPlaces: [
      "Tech Companies (0.1 km)",
      "Metro Station (1 km)",
      "Hotels (0.5 km)",
      "Shopping Mall (0.8 km)",
      "Residential Areas (2 km)"
    ]
  },
  {
    id: 10,
    title: "Royal Heritage Haveli",
    location: "Old City, Jaipur",
    address: "101 Heritage Lane, Old City, Jaipur, Rajasthan 302001",
    price: 250000000,
    bedrooms: 15,
    bathrooms: 16,
    area: 25000,
    type: "For Sale",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Historic haveli converted into a luxury heritage hotel. Features traditional Rajasthani architecture with modern amenities and beautiful courtyards.",
    features: [
      "Heritage Architecture",
      "Courtyard Gardens",
      "Period Furniture",
      "Modern Amenities",
      "Restaurant Space",
      "Event Areas",
      "Swimming Pool",
      "Spa Facility",
      "Parking Area",
      "Tourist Permit"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Priya Mehra",
      phone: "+91 65432 10987",
      email: "priya@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 1890,
    parkingSpaces: 20,
    nearbyPlaces: [
      "City Palace (1 km)",
      "Hawa Mahal (1.5 km)",
      "Tourist Attractions (0.5 km)",
      "Markets (0.3 km)",
      "Restaurants (0.2 km)"
    ]
  },
  {
    id: 13,
    title: "Luxury Backwater Resort",
    location: "Kumarakom, Kerala",
    address: "234 Backwater Lane, Kumarakom, Kerala 686563",
    price: 350000000,
    bedrooms: 30,
    bathrooms: 32,
    area: 45000,
    type: "For Sale",
    category: "Resort",
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Premium resort property on the serene backwaters of Kerala. Features luxury cottages, houseboats, and world-class amenities.",
    features: [
      "Waterfront Location",
      "Luxury Cottages",
      "Houseboats",
      "Ayurveda Center",
      "Restaurant",
      "Swimming Pool",
      "Conference Facilities",
      "Water Sports",
      "Private Jetty",
      "Organic Garden"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Karthik Menon",
      phone: "+91 54321 09876",
      email: "karthik@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 2019,
    parkingSpaces: 50,
    nearbyPlaces: [
      "Vembanad Lake (0 km)",
      "Bird Sanctuary (2 km)",
      "Village Tours (1 km)",
      "Boat Jetty (0.1 km)",
      "Local Market (3 km)"
    ]
  },
  {
    id: 16,
    title: "Smart Tech Park",
    location: "HITEC City, Hyderabad",
    address: "567 Smart Hub, HITEC City, Hyderabad, Telangana 500081",
    price: 950000000,
    bedrooms: 0,
    bathrooms: 50,
    area: 200000,
    type: "For Sale",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Ultra-modern smart tech park with cutting-edge technology integration. Features sustainable design and smart building management systems.",
    features: [
      "Smart Building Systems",
      "Solar Power",
      "IoT Integration",
      "EV Charging",
      "Waste Management",
      "Smart Parking",
      "Digital Security",
      "Green Spaces",
      "Innovation Hub",
      "Collaboration Spaces"
    ],
    additionalImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&h=400&auto=format&fit=crop"
    ],
    agent: {
      name: "Zara Khan",
      phone: "+91 43210 98765",
      email: "zara@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop"
    },
    yearBuilt: 2023,
    parkingSpaces: 2000,
    nearbyPlaces: [
      "IT Companies (0.1 km)",
      "Metro Station (0.5 km)",
      "Shopping Mall (1 km)",
      "Hotels (0.8 km)",
      "Residential Areas (2 km)"
    ]
  }
]

export const featuredProperties = [
  // ... existing code ...
]

export default function FeaturedProperties() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="mt-2 text-lg text-gray-600">Handpicked properties for you</p>
          </div>
          <Link href="/properties">
            <Button variant="outline">View All Properties</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden group">
              <div className="relative">
                <div className="w-full h-64 relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="object-cover"
                  />
                </div>
                <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full"
                  onClick={() => toggleFavorite(property.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                  />
                </Button>
              </div>

              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-10 h-10">
                      <Image
                        src={property.agent.image}
                        alt={property.agent.name}
                        fill
                        sizes="40px"
                        priority
                        className="rounded-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{property.agent.name}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                <Link href={`/properties/${property.id}`}>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                    {property.title}
                  </h3>
                </Link>
                <p className="text-emerald-600 font-bold text-xl mt-2">{formatPrice(property.price)}</p>

                <div className="flex items-center gap-4 mt-4">
                  {property.bedrooms > 0 && (
                    <div className="flex items-center text-gray-500">
                      <Bed className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.bedrooms} Beds</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="flex items-center text-gray-500">
                      <Bath className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.bathrooms} Baths</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-500">
                    <Maximize className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.area} sq.ft</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
