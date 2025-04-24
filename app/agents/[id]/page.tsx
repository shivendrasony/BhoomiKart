"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronLeft, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Star, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent } from "react"

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
    specialties: ["Ultra-Luxury Homes", "Celebrity Properties", "Penthouses", "Sea-facing Properties"],
    experience: 15,
    listings: 45,
    rating: 4.9,
    bio: "Ravi Reddy is one of India's most prestigious luxury real estate consultants, known for handling high-profile celebrity and business leader properties in Mumbai's premium locations.",
    longBio: "With over 15 years in luxury real estate, Ravi Reddy has become synonymous with Mumbai's ultra-luxury property market. His portfolio includes some of the most expensive residential transactions in India, serving Bollywood celebrities, industrialists, and international clients.\n\nRavi's expertise extends beyond traditional property dealings - he's known for his discretion, extensive network, and ability to source off-market properties that meet his elite clientele's exacting standards. His deep understanding of luxury real estate trends and market dynamics has made him the go-to consultant for high-net-worth individuals looking to invest in Mumbai's premium real estate.\n\nHe has been featured in leading business magazines and is regularly consulted by media for insights on luxury real estate trends. His client list includes some of India's most prominent business families and international investors.",
    languages: ["English", "Hindi", "Marathi", "Gujarati"],
    areas: ["Malabar Hill", "Worli", "Bandra West", "Juhu", "Pali Hill"],
    certifications: ["Luxury Real Estate Specialist", "International Property Consultant", "High-Net-Worth Investment Advisor"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Raj Malhotra",
        rating: 5,
        date: "December 15, 2023",
        comment: "Ravi helped us acquire a stunning penthouse in Worli. His network and negotiation skills are unmatched. The entire process was seamless and professional.",
      },
      {
        id: 2,
        name: "Priya Hiranandani",
        rating: 5,
        date: "November 28, 2023",
        comment: "Working with Ravi was an exceptional experience. He understood exactly what we were looking for and showed us properties that weren't even on the market yet.",
      },
      {
        id: 3,
        name: "Ahmed Sheikh",
        rating: 5,
        date: "October 10, 2023",
        comment: "Ravi's knowledge of Mumbai's luxury real estate market is phenomenal. He helped us secure a sea-facing apartment at a great value.",
      },
    ],
    properties: [
      {
        id: 1,
        title: "Sea-facing Penthouse in Worli",
        location: "Worli, Mumbai",
        price: 150000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 5,
        bathrooms: 6,
        area: 8000,
      },
      {
        id: 2,
        title: "Luxury Villa in Juhu",
        location: "Juhu, Mumbai",
        price: 280000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 6,
        bathrooms: 7,
        area: 12000,
      },
      {
        id: 3,
        title: "Designer Apartment in Bandra",
        location: "Bandra West, Mumbai",
        price: 180000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 4,
        bathrooms: 4.5,
        area: 4500,
      },
    ],
  },
  {
    id: 2,
    name: "Anjali Shah",
    position: "Commercial Property Maven",
    location: "Delhi, NCR",
    phone: "+91 87654 32109",
    email: "anjali@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Commercial Complexes", "Retail Spaces", "Office Towers", "Mixed-Use Developments"],
    experience: 18,
    listings: 32,
    rating: 4.9,
    bio: "Anjali Shah is Delhi's most sought-after commercial property expert, having closed some of the biggest commercial real estate deals in North India.",
    longBio: "Anjali Shah has established herself as a powerhouse in commercial real estate with over 18 years of experience. She has been instrumental in shaping Delhi NCR's commercial real estate landscape, having facilitated some of the largest office space acquisitions and retail property developments in the region.\n\nHer expertise in commercial real estate spans various sectors, from corporate office spaces to retail establishments and mixed-use developments. She has worked with numerous Fortune 500 companies, helping them establish their presence in India through strategic property acquisitions.\n\nAnjali is known for her analytical approach to commercial real estate and her ability to structure complex deals that benefit all parties involved. She regularly conducts workshops on commercial real estate investment and has been recognized by several industry bodies for her contributions to the sector.",
    languages: ["English", "Hindi", "Punjabi"],
    areas: ["Connaught Place", "Gurugram", "Noida", "Aerocity", "Saket"],
    certifications: ["Commercial Real Estate Specialist", "Retail Property Expert", "Corporate Real Estate Professional"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Vikram Mehta",
        rating: 5,
        date: "December 5, 2023",
        comment: "Anjali's expertise in commercial real estate is unparalleled. She helped us secure prime office space in Gurugram at competitive rates.",
      },
      {
        id: 2,
        name: "Sanjay Kumar",
        rating: 5,
        date: "November 15, 2023",
        comment: "Working with Anjali was a game-changer for our retail expansion. Her market insights and negotiation skills are exceptional.",
      },
      {
        id: 3,
        name: "Neha Sharma",
        rating: 5,
        date: "October 20, 2023",
        comment: "Anjali's understanding of commercial real estate trends helped us make a very profitable investment in Noida's commercial sector.",
      },
    ],
    properties: [
      {
        id: 4,
        title: "Premium Office Tower",
        location: "Cybercity, Gurugram",
        price: 450000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 12,
        area: 50000,
      },
      {
        id: 5,
        title: "Retail Complex",
        location: "Connaught Place, Delhi",
        price: 350000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 8,
        area: 25000,
      },
      {
        id: 6,
        title: "Mixed-Use Development",
        location: "Noida Expressway",
        price: 550000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 20,
        area: 100000,
      },
    ],
  },
  {
    id: 3,
    name: "Arjun Kapoor",
    position: "Investment Property Guru",
    location: "Bangalore, Karnataka",
    phone: "+91 76543 21098",
    email: "arjun@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Investment Properties", "NRI Investments", "Property Portfolio Management", "Real Estate Investment Trusts"],
    experience: 20,
    listings: 38,
    rating: 4.9,
    bio: "Arjun Kapoor is Bangalore's leading investment property expert, known for his strategic approach to real estate investment and wealth creation.",
    longBio: "With two decades of experience in real estate investment, Arjun Kapoor has established himself as one of India's foremost experts in property investment strategy. His expertise spans residential, commercial, and industrial real estate investments, with a particular focus on helping NRI investors build profitable property portfolios in India.\n\nArjun's analytical approach to real estate investment has helped his clients achieve exceptional returns on their investments. He specializes in identifying emerging market opportunities and structuring complex investment deals that maximize returns while minimizing risk.\n\nAs a frequent speaker at international real estate conferences and investment seminars, Arjun shares his insights on Indian real estate market trends and investment strategies. He has been featured in leading financial publications and is considered an authority on real estate investment in South India.",
    languages: ["English", "Hindi", "Kannada", "Telugu"],
    areas: ["Whitefield", "Electronic City", "Hebbal", "Sarjapur Road", "Central Business District"],
    certifications: ["Certified Investment Advisor", "International Property Investment Analyst", "RERA Certified Professional"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Sunil Mehta",
        rating: 5,
        date: "December 10, 2023",
        comment: "Arjun's investment strategy helped us achieve a 25% return on our property portfolio in just two years. His market insights are invaluable.",
      },
      {
        id: 2,
        name: "Meera Iyer",
        rating: 5,
        date: "November 20, 2023",
        comment: "As an NRI investor, I found Arjun's guidance extremely helpful. He manages our entire property portfolio in Bangalore with great expertise.",
      },
      {
        id: 3,
        name: "John Smith",
        rating: 5,
        date: "October 25, 2023",
        comment: "Arjun's understanding of the international investor's perspective sets him apart. His investment recommendations have been spot on.",
      },
    ],
    properties: [
      {
        id: 7,
        title: "Tech Park Investment Opportunity",
        location: "Electronic City Phase 1, Bangalore",
        price: 850000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 30,
        area: 150000,
      },
      {
        id: 8,
        title: "Premium Residential Complex",
        location: "Whitefield, Bangalore",
        price: 450000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 200,
        bathrooms: 200,
        area: 180000,
      },
      {
        id: 9,
        title: "Commercial Hub Development",
        location: "Outer Ring Road, Bangalore",
        price: 750000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 40,
        area: 120000,
      },
    ],
  },
  {
    id: 4,
    name: "Priya Mehra",
    position: "Heritage Property Expert",
    location: "Jaipur, Rajasthan",
    phone: "+91 65432 10987",
    email: "priya@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Heritage Properties", "Palace Conversions", "Boutique Hotels", "Historical Residences"],
    experience: 12,
    listings: 15,
    rating: 4.8,
    bio: "Priya Mehra specializes in heritage properties across Rajasthan, helping preserve and repurpose historical buildings while maintaining their cultural significance.",
    longBio: "Priya Mehra has carved a unique niche in India's real estate market by focusing on heritage properties and historical buildings. With a background in architecture and conservation, she brings a deep understanding of both the historical value and commercial potential of heritage properties.\n\nOver the past 12 years, she has been instrumental in the successful conversion of numerous historical properties into luxury hotels, museums, and high-end residences. Her work has helped preserve important architectural heritage while creating sustainable commercial opportunities.\n\nPriya works closely with the Archaeological Survey of India and various heritage conservation bodies to ensure all renovations and conversions maintain the historical integrity of the properties. She has received several awards for her contribution to heritage property conservation and development.",
    languages: ["English", "Hindi", "Rajasthani", "French"],
    areas: ["Jaipur Old City", "Amber", "Civil Lines", "Malviya Nagar", "Mansarovar"],
    certifications: ["Heritage Conservation Specialist", "Historical Property Expert", "Architectural Conservation Professional"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Maharaja Padmanabh Singh",
        rating: 5,
        date: "December 1, 2023",
        comment: "Priya's expertise in heritage property conversion is exceptional. She helped us transform our ancestral haveli into a successful heritage hotel.",
      },
      {
        id: 2,
        name: "Sarah Thompson",
        rating: 5,
        date: "November 10, 2023",
        comment: "Working with Priya was a delightful experience. Her knowledge of heritage properties and restoration is impressive.",
      },
      {
        id: 3,
        name: "Rajkumar Sharma",
        rating: 4,
        date: "October 15, 2023",
        comment: "Priya's attention to historical detail while modernizing our property was remarkable. A true expert in heritage real estate.",
      },
    ],
    properties: [
      {
        id: 10,
        title: "Royal Heritage Haveli",
        location: "Old City, Jaipur",
        price: 250000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1582972236019-ea4af5ffe587?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 15,
        bathrooms: 16,
        area: 25000,
      },
      {
        id: 11,
        title: "Historic Palace Hotel",
        location: "Amber Road, Jaipur",
        price: 480000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 45,
        bathrooms: 50,
        area: 75000,
      },
      {
        id: 12,
        title: "Heritage Boutique Hotel",
        location: "Civil Lines, Jaipur",
        price: 180000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 20,
        bathrooms: 22,
        area: 15000,
      },
    ],
  },
  {
    id: 5,
    name: "Karthik Menon",
    position: "Waterfront Property Specialist",
    location: "Kochi, Kerala",
    phone: "+91 54321 09876",
    email: "karthik@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Waterfront Properties", "Luxury Resorts", "Island Properties", "Backwater Homes"],
    experience: 14,
    listings: 28,
    rating: 4.9,
    bio: "Karthik Menon is Kerala's premier waterfront property expert, specializing in luxury waterfront homes and resort properties along the Arabian Sea and backwaters.",
    longBio: "Karthik Menon has established himself as the go-to expert for waterfront properties in Kerala. With 14 years of experience, he has developed an unparalleled understanding of the unique aspects of waterfront real estate, from environmental considerations to luxury amenities.\n\nHis portfolio includes some of the most prestigious waterfront properties in Kerala, including luxury resorts, private islands, and exclusive backwater homes. Karthik's expertise extends to understanding coastal regulations, environmental impact assessments, and sustainable development practices.\n\nHe has been instrumental in developing several eco-friendly luxury resorts along Kerala's coast and has received recognition for his commitment to sustainable waterfront development. His client list includes international hotel chains, celebrity homeowners, and luxury property developers.",
    languages: ["English", "Malayalam", "Tamil", "Arabic"],
    areas: ["Fort Kochi", "Maradu", "Vypeen", "Kumarakom", "Vembanad"],
    certifications: ["Waterfront Property Specialist", "Luxury Resort Development Expert", "Environmental Impact Assessment Professional"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Thomas Kurian",
        rating: 5,
        date: "December 8, 2023",
        comment: "Karthik's knowledge of waterfront properties is exceptional. He helped us acquire a beautiful backwater resort property.",
      },
      {
        id: 2,
        name: "Marina Rodriguez",
        rating: 5,
        date: "November 25, 2023",
        comment: "Working with Karthik was fantastic. His understanding of coastal properties and regulations saved us from many potential issues.",
      },
      {
        id: 3,
        name: "Abdul Rahman",
        rating: 5,
        date: "October 30, 2023",
        comment: "Karthik's expertise in luxury waterfront properties is unmatched. He found us the perfect beachfront villa.",
      },
    ],
    properties: [
      {
        id: 13,
        title: "Luxury Backwater Resort",
        location: "Kumarakom, Kerala",
        price: 350000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 30,
        bathrooms: 32,
        area: 45000,
      },
      {
        id: 14,
        title: "Beachfront Villa Complex",
        location: "Fort Kochi, Kerala",
        price: 280000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 8,
        bathrooms: 10,
        area: 12000,
      },
      {
        id: 15,
        title: "Private Island Resort",
        location: "Vembanad Lake, Kerala",
        price: 650000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 25,
        bathrooms: 28,
        area: 80000,
      },
    ],
  },
  {
    id: 6,
    name: "Zara Khan",
    position: "Smart City Development Expert",
    location: "Hyderabad, Telangana",
    phone: "+91 43210 98765",
    email: "zara@bhoomikart.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    specialties: ["Smart City Projects", "Tech Parks", "Sustainable Development", "Green Buildings"],
    experience: 16,
    listings: 22,
    rating: 4.9,
    bio: "Zara Khan is a pioneer in smart city development, specializing in technology-integrated real estate projects and sustainable urban development in Hyderabad.",
    longBio: "Zara Khan has been at the forefront of smart city development in India for the past 16 years. Her expertise lies in integrating technology and sustainability into real estate projects, from smart homes to entire tech parks. She has played a crucial role in shaping Hyderabad's evolution as a smart city.\n\nWith a background in urban planning and sustainable development, Zara brings a comprehensive understanding of how technology can enhance living and working spaces. She has been instrumental in developing several LEED-certified buildings and smart technology-enabled commercial complexes in Hyderabad's IT corridor.\n\nZara regularly collaborates with international smart city experts and has been a key consultant for various government smart city initiatives. Her work has been recognized with several awards for innovation in real estate development.",
    languages: ["English", "Hindi", "Telugu", "Urdu"],
    areas: ["HITEC City", "Gachibowli", "Financial District", "Nanakramguda", "Madhapur"],
    certifications: ["Smart City Development Expert", "LEED Accredited Professional", "Urban Planning Specialist"],
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    reviews: [
      {
        id: 1,
        name: "Satya Nadella",
        rating: 5,
        date: "December 12, 2023",
        comment: "Zara's vision for smart city development is revolutionary. She helped us develop a state-of-the-art tech campus.",
      },
      {
        id: 2,
        name: "Ravi Kumar",
        rating: 5,
        date: "November 30, 2023",
        comment: "Working with Zara was enlightening. Her knowledge of sustainable development and smart technology integration is impressive.",
      },
      {
        id: 3,
        name: "Lisa Chen",
        rating: 5,
        date: "October 28, 2023",
        comment: "Zara's expertise in green building development helped us achieve LEED Platinum certification for our project.",
      },
    ],
    properties: [
      {
        id: 16,
        title: "Smart Tech Park",
        location: "HITEC City, Hyderabad",
        price: 950000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 50,
        area: 200000,
      },
      {
        id: 17,
        title: "Green Office Complex",
        location: "Financial District, Hyderabad",
        price: 580000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1577760258779-e787a1733016?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 0,
        bathrooms: 35,
        area: 85000,
      },
      {
        id: 18,
        title: "Smart Residential Township",
        location: "Gachibowli, Hyderabad",
        price: 750000000,
        type: "For Sale",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=600&h=400&auto=format&fit=crop",
        bedrooms: 500,
        bathrooms: 500,
        area: 250000,
      },
    ],
  }
]

interface AgentPageParams {
  id: string
}

export default function AgentDetailPage({ params }: { params: AgentPageParams }) {
  const agent = agents.find((a) => a.id === Number.parseInt(params.id)) || agents[0]
  const [messageSubmitted, setMessageSubmitted] = useState(false)

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would send the message to the agent
    setMessageSubmitted(true)
    // Reset form
    e.currentTarget.reset()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Agent Profile Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/agents" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Agents
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex items-center text-gray-500 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{agent.location}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
              <p className="text-emerald-600 font-medium text-lg mt-1">{agent.position}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {agent.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">{agent.experience}+</p>
                  <p className="text-gray-500">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">{agent.listings}</p>
                  <p className="text-gray-500">Active Listings</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-emerald-600 mr-1">{agent.rating}</p>
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-gray-500">Rating</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-6">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="h-4 w-4 mr-2" />
                  {agent.phone}
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  {agent.email}
                </Button>
                <div className="flex items-center space-x-3 ml-auto">
                  <Link href={agent.social.facebook} className="text-gray-400 hover:text-emerald-600">
                    <Facebook className="h-5 w-5" />
                  </Link>
                  <Link href={agent.social.twitter} className="text-gray-400 hover:text-emerald-600">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href={agent.social.instagram} className="text-gray-400 hover:text-emerald-600">
                    <Instagram className="h-5 w-5" />
                  </Link>
                  <Link href={agent.social.linkedin} className="text-gray-400 hover:text-emerald-600">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Details Tabs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About {agent.name}</h2>
                  <p className="text-gray-700 whitespace-pre-line">{agent.longBio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Specializations</h3>
                      <ul className="space-y-2">
                        {agent.specialties.map((specialty, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-600 mr-2"></div>
                            <span>{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Areas Served</h3>
                      <ul className="space-y-2">
                        {agent.areas.map((area, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-600 mr-2"></div>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {agent.languages.map((language, index) => (
                          <Badge key={index} variant="outline">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Certifications</h3>
                      <ul className="space-y-2">
                        {agent.certifications.map((certification, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-emerald-600 mr-2"></div>
                            <span>{certification}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="properties" className="space-y-8">
              <h2 className="text-xl font-semibold">Properties Listed by {agent.name}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agent.properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={property.image}
                        alt={property.title}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-4 left-4 bg-emerald-600">{property.type}</Badge>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      <Link href={`/properties/${property.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-emerald-600 transition-colors">
                          {property.title}
                        </h3>
                      </Link>
                      <p className="text-emerald-600 font-bold text-xl mt-2">{formatPrice(property.price)}</p>

                      <div className="flex items-center gap-4 mt-4">
                        {property.bedrooms > 0 && (
                          <div className="flex items-center text-gray-500">
                            <span className="text-sm">{property.bedrooms} Beds</span>
                          </div>
                        )}
                        {property.bathrooms > 0 && (
                          <div className="flex items-center text-gray-500">
                            <span className="text-sm">{property.bathrooms} Baths</span>
                          </div>
                        )}
                        <div className="flex items-center text-gray-500">
                          <span className="text-sm">{property.area} sq.ft</span>
                        </div>
                      </div>

                      <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700" asChild>
                        <Link href={`/properties/${property.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Client Reviews</h2>
                <div className="flex items-center">
                  <p className="font-semibold text-lg mr-2">{agent.rating}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-500">({agent.reviews.length} reviews)</span>
                </div>
              </div>

              <div className="space-y-6">
                {agent.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{review.name}</h3>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="text-sm">{review.date}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-700">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Contact {agent.name}</h2>
                  {messageSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-emerald-700 mb-2">Message Sent Successfully!</h3>
                      <p className="text-emerald-600">
                        Thank you for contacting {agent.name}. They will get back to you shortly.
                      </p>
                      <Button
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setMessageSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitMessage} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Your name" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Your email" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="Your phone number" required />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="Message subject" required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="I'm interested in discussing a property with you..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
