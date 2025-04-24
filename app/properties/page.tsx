"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bath,
  Bed,
  Building2,
  MapPin,
  Maximize,
  Search,
  SlidersHorizontal,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Define TypeScript interfaces
interface Filters {
  propertyType: string[];
  priceRange: number[];
  bedrooms: string[];
  location: string;
  category: string[];
}

export interface Property {
  id: number;
  title: string;
  location: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  category: string;
  image: string;
  featured?: boolean;
  description?: string;
  features?: string[];
  additionalImages?: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  yearBuilt?: number;
  parkingSpaces?: number;
  nearbyPlaces?: string[];
}

// Sample property data
export const properties: Property[] = [
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
    description: "Luxurious sea-facing penthouse with panoramic views of the Arabian Sea.",
    features: [],
    additionalImages: [],
    agent: {
      name: "Ravi Reddy",
      phone: "+91 98765 43210",
      email: "ravi@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop"
    }
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
    agent: {
      name: "Anjali Shah",
      phone: "+91 87654 32109",
      email: "anjali@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&h=400&auto=format&fit=crop"
    }
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
    agent: {
      name: "Arjun Kapoor",
      phone: "+91 76543 21098",
      email: "arjun@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop"
    }
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
    agent: {
      name: "Priya Mehra",
      phone: "+91 65432 10987",
      email: "priya@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop"
    }
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
    agent: {
      name: "Karthik Menon",
      phone: "+91 54321 09876",
      email: "karthik@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&h=400&auto=format&fit=crop"
    }
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
    agent: {
      name: "Zara Khan",
      phone: "+91 43210 98765",
      email: "zara@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop"
    }
  },
  {
    id: 17,
    title: "Modern Apartment for Rent",
    location: "Bandra West, Mumbai",
    address: "789 Sea Link View, Bandra West, Mumbai, Maharashtra 400050",
    price: 150000, // Monthly rent
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: "For Rent",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    agent: {
      name: "Ravi Reddy",
      phone: "+91 98765 43210",
      email: "ravi@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=400&h=400&auto=format&fit=crop"
    }
  },
  {
    id: 18,
    title: "Luxury Office Space for Rent",
    location: "Powai, Mumbai",
    address: "456 Business Hub, Powai, Mumbai, Maharashtra 400076",
    price: 300000, // Monthly rent
    bedrooms: 0,
    bathrooms: 4,
    area: 3000,
    type: "For Rent",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    agent: {
      name: "Anjali Shah",
      phone: "+91 87654 32109",
      email: "anjali@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&h=400&auto=format&fit=crop"
    }
  },
  {
    id: 19,
    title: "Furnished 2BHK for Rent",
    location: "HSR Layout, Bangalore",
    address: "123 Tech Park View, HSR Layout, Bangalore, Karnataka 560102",
    price: 45000, // Monthly rent
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "For Rent",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    agent: {
      name: "Karthik Menon",
      phone: "+91 54321 09876",
      email: "karthik@bhoomikart.com",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&h=400&auto=format&fit=crop"
    }
  },
  {
    id: 999,
    title: "Greenwood Residency – Luxurious Garden-Facing Penthouse with Panoramic",
    location: "Ambala, Haryana",
    address: "Greenwood Residency, Ambala, Haryana",
    price: 50000000000,
    bedrooms: 19,
    bathrooms: 14,
    area: 32000,
    type: "For Sale",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&h=400&auto=format&fit=crop",
    featured: true,
    description: "Luxurious garden-facing penthouse with panoramic views. This ultra-luxury residence features premium finishes, private garden access, and world-class amenities.",
    features: [
      "Garden View",
      "Private Garden Access",
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
    yearBuilt: 2023,
    parkingSpaces: 10,
    nearbyPlaces: [
      "City Center Mall - 1.5 km",
      "International Airport - 10 km",
      "Metro Station - 0.5 km",
      "Schools and Universities - 2 km"
    ]
  },
]

export default function PropertiesPage() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("all")
  const [filters, setFilters] = useState<Filters>({
    propertyType: [],
    priceRange: [0, 1000000000],
    bedrooms: [],
    location: "",
    category: [],
  })

  // Get the type parameter from URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get('type')
    if (typeParam) {
      setFilters(prev => ({
        ...prev,
        propertyType: [typeParam]
      }))
    }
  }, [])

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleFilterChange = (filterType: keyof Filters, value: string | number[] | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const handleCheckboxFilterChange = (filterType: keyof Filters, item: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] as string[]
      return {
        ...prev,
        [filterType]: currentValues.includes(item)
          ? currentValues.filter((i) => i !== item)
          : [...currentValues, item],
      }
    })
  }

  // Filter and sort properties
  const getFilteredAndSortedProperties = () => {
    let result = [...properties]

    // Filter by property type
    if (filters.propertyType.length > 0) {
      result = result.filter(property => filters.propertyType.includes(property.type))
    }

    // Filter by category
    if (filters.category.length > 0) {
      result = result.filter(property => filters.category.includes(property.category))
    }

    // Filter by location
    if (filters.location) {
      result = result.filter(property => 
        property.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // Filter by bedrooms
    if (filters.bedrooms.length > 0) {
      result = result.filter(property => 
        filters.bedrooms.includes(property.bedrooms.toString())
      )
    }

    // Filter by price range
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000000000) {
      result = result.filter(property => 
        property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
      )
    }

    // Sort properties
    switch (sortBy) {
      case "featured":
        result = result.filter(p => p.featured)
        break
      case "price-asc":
        result = result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result = result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result = result.sort((a, b) => Number(b.id) - Number(a.id))
        break
      default:
        break
    }

    return result
  }

  const filteredProperties = getFilteredAndSortedProperties()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="bg-emerald-600 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Find Your Perfect Property
          </h1>
          <p className="text-emerald-50 text-lg text-center mb-8">
            Browse through our extensive collection of properties across India
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-10"
                    placeholder="City, State or ZIP"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                  />
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <Select onValueChange={(value) => handleFilterChange("propertyType", [value])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="For Sale">For Sale</SelectItem>
                    <SelectItem value="For Rent">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <Select onValueChange={(value) => handleFilterChange("category", [value])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential">Residential</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Industrial">Industrial</SelectItem>
                    <SelectItem value="Land">Land</SelectItem>
                    <SelectItem value="Heritage">Heritage</SelectItem>
                    <SelectItem value="Resort">Resort</SelectItem>
                    <SelectItem value="Mixed Use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-10">
                  <Search className="h-4 w-4 mr-2" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties List Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-4">Filters</h2>
                
                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {[
                      { id: "Residential", label: "Residential" },
                      { id: "Commercial", label: "Commercial" },
                      { id: "Industrial", label: "Industrial" },
                      { id: "Land", label: "Land" },
                      { id: "Heritage", label: "Heritage" },
                      { id: "Resort", label: "Resort" },
                      { id: "Mixed Use", label: "Mixed Use" }
                    ].map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={category.id}
                          checked={filters.category.includes(category.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleCheckboxFilterChange("category", category.id)
                            } else {
                              handleCheckboxFilterChange("category", category.id)
                            }
                          }}
                        />
                        <label
                          htmlFor={category.id}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                    <Slider
                      defaultValue={[0, 1000000000]}
                      max={1000000000}
                      step={500000}
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange("priceRange", value)}
                    />
                  </div>
                </div>

                {/* More filters can be added here */}
              </div>
            </div>

            {/* Properties Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{filteredProperties.length} Properties</h2>
                <Select 
                  defaultValue="all" 
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden group">
                    <div className="relative">
                      <Link href={`/properties/${property.id}`}>
                        <Image
                          src={property.image}
                          alt={property.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                          priority
                        />
                      </Link>
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
                      <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
