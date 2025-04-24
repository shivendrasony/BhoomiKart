"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  Building2,
  ChevronDown,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Settings,
  User,
  X,
  Eye,
  MapPin,
  Bath,
  Bed,
  Maximize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Mumbai, Maharashtra",
    price: 12500000,
    status: "Active",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    views: 245,
    inquiries: 12,
    date: "2023-12-15",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
  },
  {
    id: 2,
    title: "Luxury Apartment with Sea View",
    location: "Bangalore, Karnataka",
    price: 8900000,
    status: "Under Review",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    views: 120,
    inquiries: 5,
    date: "2023-12-10",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
  },
  {
    id: 3,
    title: "Commercial Space in Business District",
    location: "Delhi, NCR",
    price: 15000000,
    status: "Active",
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    views: 189,
    inquiries: 8,
    date: "2023-12-05",
    bedrooms: 0,
    bathrooms: 2,
    area: 3500,
  },
]

// Sample saved properties
const savedProperties = [
  {
    id: 4,
    title: "Spacious Family Home",
    location: "Pune, Maharashtra",
    price: 7500000,
    type: "For Sale",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "2023-12-12",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
  },
  {
    id: 5,
    title: "Modern Office Space",
    location: "Hyderabad, Telangana",
    price: 9800000,
    type: "For Rent",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    date: "2023-12-08",
    bedrooms: 0,
    bathrooms: 2,
    area: 2500,
  },
]

// Sample messages
const messages = [
  {
    id: 1,
    from: "Rahul Sharma",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    message: "I'm interested in your property in Mumbai. Is it still available?",
    date: "2023-12-15",
    unread: true,
  },
  {
    id: 2,
    from: "Priya Patel",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    message: "Can I schedule a viewing for the apartment in Bangalore this weekend?",
    date: "2023-12-14",
    unread: false,
  },
  {
    id: 3,
    from: "Amit Singh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    message: "What's the best price you can offer for the commercial space?",
    date: "2023-12-12",
    unread: false,
  },
]

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [user, loading, router, toast])

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r h-screen sticky top-0">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">BhoomiKart</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-600"
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/properties"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Building2 className="h-5 w-5" />
              <span>My Properties</span>
            </Link>
            <Link
              href="/dashboard/saved"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
              <span>Saved Properties</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign out
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white border-b">
            <div className="flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || "User"} />
                        <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block">{user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">My Properties</TabsTrigger>
                <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Properties</p>
                          <p className="text-2xl font-bold">{properties.length}</p>
                        </div>
                        <Building2 className="h-8 w-8 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Views</p>
                          <p className="text-2xl font-bold">{properties.reduce((sum, p) => sum + p.views, 0)}</p>
                        </div>
                        <Eye className="h-8 w-8 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Inquiries</p>
                          <p className="text-2xl font-bold">{properties.reduce((sum, p) => sum + p.inquiries, 0)}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Saved Properties</p>
                          <p className="text-2xl font-bold">{savedProperties.length}</p>
                        </div>
                        <Heart className="h-8 w-8 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Properties */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <Card key={property.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
                          <Badge
                            className={`absolute top-4 right-4 ${
                              property.status === "Active" ? "bg-green-600" : "bg-yellow-600"
                            }`}
                          >
                            {property.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <p className="text-emerald-600 font-bold text-lg mb-3">
                            {formatPrice(property.price)}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {property.bedrooms > 0 && (
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1" />
                                <span>{property.bedrooms} Beds</span>
                              </div>
                            )}
                            {property.bathrooms > 0 && (
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                <span>{property.bathrooms} Baths</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <Maximize className="h-4 w-4 mr-1" />
                              <span>{property.area} sq.ft</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                <span>{property.views} views</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                <span>{property.inquiries} inquiries</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/properties/${property.id}`}>View Details</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Recent Messages */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Card key={message.id} className={`${message.unread ? "border-emerald-600" : ""}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.avatar} alt={message.from} />
                              <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{message.from}</h3>
                                <span className="text-sm text-gray-500">{message.date}</span>
                              </div>
                              <p className="text-gray-600 mt-1">{message.message}</p>
                            </div>
                            {message.unread && (
                              <div className="h-2 w-2 bg-emerald-600 rounded-full"></div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="properties" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
                        <Badge
                          className={`absolute top-4 right-4 ${
                            property.status === "Active" ? "bg-green-600" : "bg-yellow-600"
                          }`}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <p className="text-emerald-600 font-bold text-lg mb-3">
                          {formatPrice(property.price)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1" />
                              <span>{property.bedrooms} Beds</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1" />
                              <span>{property.bathrooms} Baths</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Maximize className="h-4 w-4 mr-1" />
                            <span>{property.area} sq.ft</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              <span>{property.views} views</span>
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{property.inquiries} inquiries</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/properties/${property.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                        <div className="flex items-center text-gray-500 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <p className="text-emerald-600 font-bold text-lg mb-3">
                          {formatPrice(property.price)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1" />
                              <span>{property.bedrooms} Beds</span>
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1" />
                              <span>{property.bathrooms} Baths</span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Maximize className="h-4 w-4 mr-1" />
                            <span>{property.area} sq.ft</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                          <span className="text-sm text-gray-500">Saved on {property.date}</span>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/properties/${property.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id} className={`${message.unread ? "border-emerald-600" : ""}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={message.avatar} alt={message.from} />
                            <AvatarFallback>{message.from.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">{message.from}</h3>
                              <span className="text-sm text-gray-500">{message.date}</span>
                            </div>
                            <p className="text-gray-600 mt-1">{message.message}</p>
                          </div>
                          {message.unread && (
                            <div className="h-2 w-2 bg-emerald-600 rounded-full"></div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <Building2 className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-bold">BhoomiKart</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-emerald-50 text-emerald-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/properties"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Building2 className="h-5 w-5" />
              <span>My Properties</span>
            </Link>
            <Link
              href="/dashboard/saved"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Heart className="h-5 w-5" />
              <span>Saved Properties</span>
            </Link>
            <Link
              href="/dashboard/messages"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>

          <div className="p-4 border-t mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign out
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
