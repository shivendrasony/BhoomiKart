"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Building2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { properties } from "../properties/page"

interface FormData {
  title: string
  description: string
  price: string
  type: string
  category: string
  bedrooms: string
  bathrooms: string
  area: string
  location: string
  address: string
  images: File[]
}

interface FormErrors {
  [key: string]: string
}

export default function SellPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    type: "",
    category: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    location: "",
    address: "",
    images: []
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Property title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Property description is required"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    if (!formData.type) {
      newErrors.type = "Property type is required"
    }

    if (!formData.category) {
      newErrors.category = "Property category is required"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (formData.bedrooms && (isNaN(Number(formData.bedrooms)) || Number(formData.bedrooms) < 0)) {
      newErrors.bedrooms = "Please enter a valid number of bedrooms"
    }

    if (formData.bathrooms && (isNaN(Number(formData.bathrooms)) || Number(formData.bathrooms) < 0)) {
      newErrors.bathrooms = "Please enter a valid number of bathrooms"
    }

    if (!formData.area || isNaN(Number(formData.area)) || Number(formData.area) <= 0) {
      newErrors.area = "Please enter a valid area"
    }

    if (formData.images.length === 0) {
      newErrors.images = "Please upload at least one image"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + formData.images.length > 10) {
      toast({
        title: "Maximum 10 images allowed",
        description: "Please select fewer images",
        variant: "destructive",
      })
      return
    }

    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/jpeg') || file.type.startsWith('image/png')
      if (!isValid) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a valid image file. Please upload JPG or PNG files only.`,
          variant: "destructive",
        })
      }
      return isValid
    })

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles]
    }))

    // Generate preview URLs for the new images
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }, [formData.images, toast])

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    setPreviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, you would upload images to a storage service
      // and send the form data to your backend API
      const newProperty = {
        id: properties.length + 1,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        category: formData.category,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        area: Number(formData.area),
        location: formData.location,
        address: formData.address,
        image: previewImages[0], // In real app, this would be the uploaded image URL
        agent: {
          name: "John Doe", // In real app, this would be the logged-in user's info
          phone: "+91 98765 43210",
          email: "john@bhoomikart.com",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop"
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Add the new property to the list (in a real app, this would be handled by the backend)
      properties.push(newProperty)

      toast({
        title: "Success!",
        description: "Your property has been listed successfully",
      })

      // Redirect to the property details page
      router.push(`/properties/${newProperty.id}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to list your property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">List Your Property</h1>
            <p className="text-emerald-100 text-lg">
              Reach thousands of potential buyers and get the best value for your property
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Luxury 3BHK Apartment with Sea View"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your property..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={5}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className={errors.price ? "border-red-500" : ""}
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <Label htmlFor="type">Property Type</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Industrial">Industrial</SelectItem>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Heritage">Heritage</SelectItem>
                        <SelectItem value="Resort">Resort</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      placeholder="Number of bedrooms"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className={errors.bedrooms ? "border-red-500" : ""}
                    />
                    {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
                  </div>

                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      placeholder="Number of bathrooms"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className={errors.bathrooms ? "border-red-500" : ""}
                    />
                    {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
                  </div>

                  <div>
                    <Label htmlFor="area">Area (sq.ft)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="Total area"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className={errors.area ? "border-red-500" : ""}
                    />
                    {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Bandra West, Mumbai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div>
                  <Label htmlFor="address">Complete Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter complete property address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={errors.address ? "border-red-500" : ""}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div>
                  <Label>Property Images</Label>
                  <div className="mt-2">
                    <div className={`border-2 border-dashed rounded-lg p-8 ${
                      errors.images ? "border-red-500" : "border-gray-300"
                    }`}>
                      <div className="flex flex-col items-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop images here, or click to select files
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Maximum 10 images. Supported formats: JPG, PNG
                        </p>
                        <div className="mt-4">
                          <input
                            type="file"
                            id="images"
                            multiple
                            accept="image/jpeg,image/png"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <Button type="button" variant="outline" onClick={() => document.getElementById('images')?.click()}>
                            Select Files
                          </Button>
                        </div>
                      </div>
                    </div>
                    {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}

                    {previewImages.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Listing Property..." : "List Property"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why List with Us?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get the best value for your property with our comprehensive listing service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wide Reach",
                description: "Connect with thousands of potential buyers across India",
              },
              {
                title: "Professional Support",
                description: "Get expert guidance throughout the selling process",
              },
              {
                title: "Verified Buyers",
                description: "Deal with genuine, verified buyers for a secure transaction",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Building2 className="h-8 w-8 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
