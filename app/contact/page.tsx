"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample office locations
const offices = [
  {
    id: 1,
    city: "Mumbai",
    address: "123 Business Park, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
    phone: "+91 22 1234 5678",
    email: "mumbai@bhoomikart.com",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
  {
    id: 2,
    city: "Delhi",
    address: "456 Corporate Tower, Connaught Place, New Delhi 110001",
    phone: "+91 11 2345 6789",
    email: "delhi@bhoomikart.com",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
  {
    id: 3,
    city: "Bangalore",
    address: "789 Tech Park, Whitefield, Bangalore, Karnataka 560066",
    phone: "+91 80 3456 7890",
    email: "bangalore@bhoomikart.com",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
  {
    id: 4,
    city: "Hyderabad",
    address: "101 Cyber Hub, Hitech City, Hyderabad, Telangana 500081",
    phone: "+91 40 4567 8901",
    email: "hyderabad@bhoomikart.com",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
]

// Sample FAQ data
const faqs = [
  {
    question: "How do I list my property on BhoomiKart?",
    answer:
      "To list your property on BhoomiKart, you need to create an account and click on the 'List Your Property' button. Fill in the required details about your property, upload images, and submit the listing for review. Once approved, your property will be visible to potential buyers or renters.",
  },
  {
    question: "Is there a fee for listing properties on BhoomiKart?",
    answer:
      "Basic property listings on BhoomiKart are free for individual sellers. However, we offer premium listing options with enhanced visibility and features for a nominal fee. Real estate agencies and developers can contact us for special packages tailored to their needs.",
  },
  {
    question: "How long does it take for my property listing to be approved?",
    answer:
      "Most property listings are reviewed and approved within 24-48 hours. To expedite the process, ensure that all required information is provided accurately and the uploaded images are clear and representative of the property.",
  },
  {
    question: "Can I edit my property listing after it's published?",
    answer:
      "Yes, you can edit your property listing at any time through your dashboard. Simply navigate to 'My Properties', select the listing you want to modify, and click on 'Edit'. Remember to save your changes when done.",
  },
  {
    question: "How do buyers contact me about my property?",
    answer:
      "When a buyer is interested in your property, they can send you a message through our platform. You'll receive notifications via email and on your dashboard. You can then respond directly through BhoomiKart's messaging system.",
  },
  {
    question: "What types of properties can I list on BhoomiKart?",
    answer:
      "BhoomiKart supports a wide range of property types including residential (apartments, houses, villas), commercial (offices, shops, warehouses), industrial spaces, and land. You can specify the property type during the listing process.",
  },
  {
    question: "How can I increase visibility for my property listing?",
    answer:
      "To increase visibility for your property, consider upgrading to a premium listing, ensure your listing has high-quality images, provide detailed and accurate information, and keep your listing updated. Responding promptly to inquiries also improves your listing's performance.",
  },
  {
    question: "Can I list multiple properties under one account?",
    answer:
      "Yes, you can list multiple properties under a single account. There's no limit to the number of properties you can list, making BhoomiKart ideal for individual sellers with multiple properties as well as real estate agents and developers.",
  },
]

export default function ContactPage() {
  const [activeOffice, setActiveOffice] = useState(offices[0])
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // In a real app, this would send the form data to a server
    setFormSubmitted(true)
    // Reset form
    e.target.reset()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-emerald-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-emerald-100 text-lg max-w-3xl mx-auto">
              Get in touch with our team for any questions, feedback, or assistance with your real estate needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  {formSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-emerald-700 mb-2">Message Sent Successfully!</h3>
                      <p className="text-emerald-600">
                        Thank you for contacting BhoomiKart. Our team will get back to you shortly.
                      </p>
                      <Button
                        className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setFormSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Textarea id="message" placeholder="How can we help you?" rows={4} required />
                      </div>
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Send Message
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Building2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Head Office</h3>
                    <p className="text-gray-700">123 Business Park, Bandra Kurla Complex, Mumbai, Maharashtra 400051</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">+91 22 1234 5678</p>
                    <p className="text-gray-500 text-sm">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">info@bhoomikart.com</p>
                    <p className="text-gray-500 text-sm">We'll respond as soon as possible</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="bg-emerald-100 hover:bg-emerald-200 text-emerald-600 p-3 rounded-full transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Offices</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Visit us at one of our offices across India to meet our team in person.
            </p>
          </div>

          <Tabs
            defaultValue={activeOffice.city.toLowerCase()}
            onValueChange={(value) => {
              const office = offices.find((o) => o.city.toLowerCase() === value)
              if (office) setActiveOffice(office)
            }}
          >
            <TabsList className="grid grid-cols-4 mb-8">
              {offices.map((office) => (
                <TabsTrigger key={office.id} value={office.city.toLowerCase()}>
                  {office.city}
                </TabsTrigger>
              ))}
            </TabsList>

            {offices.map((office) => (
              <TabsContent key={office.id} value={office.city.toLowerCase()}>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                          <MapPin className="h-8 w-8 text-gray-400" />
                          <span className="ml-2 text-gray-500">Map view would be displayed here</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city} Office</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{office.email}</span>
                          </div>
                          <div className="flex items-start">
                            <svg
                              className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>{office.hours}</span>
                          </div>
                        </div>
                        <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">Get Directions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about using BhoomiKart.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Our Support Team</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
