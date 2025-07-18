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
import { properties, Property, Filters } from "./data";

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
