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

export interface Filters {
  propertyType: string[];
  priceRange: number[];
  bedrooms: string[];
  location: string;
  category: string[];
}

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