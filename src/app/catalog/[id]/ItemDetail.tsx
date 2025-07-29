'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/image'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ItemDetailProps {
  item: {
    _id: string
    title: string
    images: Array<{ asset: { url: string } }>
    description?: string
    price?: number
    subcategory?: {
      _id: string
      title: string
      category?: {
        _id: string
        title: string
      }
    }
  }
}

export default function ItemDetail({ item }: ItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleWhatsAppContact = () => {
    const message = `Hola, estoy interesado en el producto: ${item.title}`
    const whatsappUrl = `https://wa.me/+1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePhoneContact = () => {
    window.open('tel:+1234567890', '_self')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              {item.images && item.images.length > 0 ? (
                <>
                  <Image
                    src={urlFor(item.images[currentImageIndex]).url()}
                    fill
                    alt={`${item.title} - Image ${currentImageIndex + 1}`}
                    className="object-cover"
                    priority
                  />
                  
                  {/* Navigation Arrows */}
                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {item.images && item.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={urlFor(image).url()}
                      width={80}
                      height={80}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              {/* Breadcrumb */}
              {item.subcategory?.category && (
                <div className="text-sm text-gray-500 mb-2">
                  {item.subcategory.category.title} / {item.subcategory.title}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {item.title}
              </h1>

              {/* Price */}
              {item.price !== undefined && item.price !== null && (
                <div className="text-4xl font-bold text-green-600 mb-6">
                  ${Number(item.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Description */}
            {item.description && (
              <Card className="p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            )}

            {/* Contact Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                ¿Te interesa este producto?
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
                
                <Button
                  onClick={handlePhoneContact}
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="p-6 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Información del producto
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Categoría:</span>
                  <span className="font-medium">
                    {item.subcategory?.category?.title || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Subcategoría:</span>
                  <span className="font-medium">
                    {item.subcategory?.title || 'N/A'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 