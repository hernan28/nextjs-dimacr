'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/image'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Phone, MessageCircle } from 'lucide-react'
import { CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ItemDetailProps {
  item: {
    _id: string
    title: string
    images: Array<{ asset: { url: string } }>
    description?: string
    details?: string
    sku?: string
    peso?: {
      valor?: number
      unidad?: string
    }
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
    <div className="min-h-screen py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Carousel */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              {item.images && item.images.length > 0 ? (
                <>
                  <Image
                    src={urlFor(item.images[currentImageIndex]).url()}
                    fill
                    quality={90}
                    alt={`${item.title} - Image ${currentImageIndex + 1}`}
                    className="object-contain"
                    priority
                  />
                  
                  {/* Navigation Arrows */}
                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Counter */}
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  <span className="text-sm sm:text-base">No Image Available</span>
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
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-red-500 shadow-lg' 
                        : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                    }`}
                  >
                    <Image
                      src={urlFor(image).url()}
                      width={80}
                      height={80}
                      quality={1}
                      alt={`${item.title} thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
            
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              {/* Breadcrumb */}
              {item.subcategory?.category && (
                <div className="text-xs sm:text-sm text-gray-500 mb-2">
                  {item.subcategory.category.title} / {item.subcategory.title}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {item.title}
              </h1>

                {/* Price */}
                {item.price !== undefined && item.price !== null && item.price >= 1 ? (
                <p aria-label="Precio del producto" className="text-2xl sm:text-3xl lg:text-3xl pt-4 block">
                  {Number(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs sm:text-sm text-gray-500">IVA incluido</span>
                </p>
                ) : (
                <p className="text-2xl sm:text-3xl lg:text-3xl pt-4 block text-red-500">Consulte el precio</p>
                )}
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Consultar Disponibilidad
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleWhatsAppContact}
                  variant="default"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
                
                <Button
                  onClick={handlePhoneContact}
                  variant="secondary"
                  size="lg"
                  className='sm:hidden'
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Llamar
                </Button>
              </div>
            </div>

            {/* Detalles */}
            {item.details && Array.isArray(item.details) && (
              <CardDescription className="p-4 sm:p-6 bg-white">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Detalles
                </h2>
                <ul className="space-y-2">
                    {item.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-red-500 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      </div>
                      <span>{detail}</span>
                    </li>
                    ))}
                </ul>
              </CardDescription>
            )}


            {/* Additional Info */}
            <CardDescription className="p-4 sm:p-6 bg-white">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Características del producto
              </h2>
              <ul>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                  <span className='font-semibold'>SKU:</span> {item.sku || 'N/A'}
                </li>
                <li className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                  <span className='font-semibold'>Peso:</span> {item.peso?.valor ? `${item.peso.valor} ${item.peso.unidad}` : 'N/A'}
                </li>
              </ul>
            </CardDescription>


          </div>
        </div>
      </div>
    </div>
  )
} 