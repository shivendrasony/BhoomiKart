"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface MapProps {
  address: string
  location: string
}

export default function Map({ address, location }: MapProps) {
  const [hasError, setHasError] = useState(false)
  const encodedAddress = encodeURIComponent(`${address}, ${location}`)
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}&zoom=15`

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      {!hasError ? (
        <iframe
          title="Property Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
          <MapPin className="h-8 w-8 text-emerald-600 mb-2" />
          <h3 className="text-lg font-semibold mb-1">{location}</h3>
          <p className="text-gray-600 text-center">{address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-emerald-600 hover:text-emerald-700 underline"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  )
} 