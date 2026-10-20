'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react'
import { CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '@/lib/contact'
import { getItemDisplayName, hasValidDiscount } from '@/lib/utils'

interface ItemDetailProps {
  item: {
    _id: string
    title: string
    brand?: string
    variantType?: 'standard' | 'background' | 'lensMount'
    variants?: Array<{
      _key: string
      color?: string
      size?: string
      mount?: string
      price: number
      image?: { asset?: { url?: string } | null } | null
    }> | null
    images?: Array<{ asset?: { url?: string } | null } | null> | null
    category?: {
      _id: string
      title: string
    }
    description?: string
    descriptionLinks?: Array<{
      _key?: string
      text: string
      url: string
    }>
    details?: string
    sku?: string
    peso?: {
      valor?: number
      unidad?: string
    }
    price?: number
    discountedPrice?: number
    availabilityInquiry?: boolean
    subcategory?: {
      _id: string
      title: string
      category?: {
        _id: string
        title: string
      }
    }
  }
  initialVariantKey?: string
}

export default function ItemDetail({ item, initialVariantKey }: ItemDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const initialVariant = item.variants?.find(variant => variant._key === initialVariantKey)
    ?? item.variants?.[0]
  const [selectedColor, setSelectedColor] = useState(initialVariant?.color ?? '')
  const [selectedSize, setSelectedSize] = useState(initialVariant?.size ?? '')
  const [selectedMount, setSelectedMount] = useState(initialVariant?.mount ?? '')
  const currentVariant = item.variantType === 'background'
    ? item.variants?.find(variant => variant.color === selectedColor && variant.size === selectedSize)
    : item.variantType === 'lensMount'
      ? item.variants?.find(variant => variant.mount === selectedMount)
      : undefined
  const displayImages = [
    ...(currentVariant?.image?.asset?.url ? [currentVariant.image.asset.url] : []),
    ...(item.images ?? []).flatMap(image =>
      image?.asset?.url ? [image.asset.url] : [],
    ),
  ]
  const isDiscounted = !currentVariant && hasValidDiscount(item)
  const displayPrice = currentVariant?.price ?? item.price
  const displayName = getItemDisplayName(item)

  const colors = [...new Set(item.variants?.map(variant => variant.color).filter((value): value is string => Boolean(value)) ?? [])]
  const sizes = [...new Set(item.variants
    ?.filter(variant => variant.color === selectedColor)
    .map(variant => variant.size)
    .filter((value): value is string => Boolean(value)) ?? [])]
  const mounts = [...new Set(item.variants?.map(variant => variant.mount).filter((value): value is string => Boolean(value)) ?? [])]

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleWhatsAppContact = () => {
    const option = currentVariant?.color
      ? `${currentVariant.color}, ${currentVariant.size}`
      : currentVariant?.mount
    const message = `Hola, estoy interesado en el producto: ${displayName}${option ? ` (${option})` : ''}`
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePhoneContact = () => {
    window.open(`tel:${PHONE_NUMBER}`, '_self')
  }

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Carousel */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              {displayImages.length > 0 ? (
                <>
                  <Image
                    src={displayImages[currentImageIndex]}
                    fill
                    quality={90}
                    alt={`${displayName} - Image ${currentImageIndex + 1}`}
                    className="object-contain"
                    priority
                  />
                  
                  {/* Navigation Arrows */}
                  {displayImages.length > 1 && (
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
                    {currentImageIndex + 1} / {displayImages.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                  <span className="text-sm sm:text-base">No Image Available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {displayImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {displayImages.map((imageUrl, index) => (
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
                      src={imageUrl}
                      width={80}
                      height={80}
                      quality={1}
                      alt={`${displayName} thumbnail ${index + 1}`}
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
              {(item.category || item.subcategory?.category) && (
                <div className="text-xs sm:text-sm text-gray-500 mb-2">
                  {item.category?.title ?? item.subcategory?.category?.title}
                  {item.subcategory?.title && ` / ${item.subcategory.title}`}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                {displayName}
              </h1>

              {item.variantType === 'background' && colors.length > 0 && (
                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="item-color" className="mb-1 block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <Select
                      value={selectedColor}
                      onValueChange={(value) => {
                        setSelectedColor(value)
                        setSelectedSize(item.variants?.find(variant => variant.color === value)?.size ?? '')
                        setCurrentImageIndex(0)
                      }}
                    >
                      <SelectTrigger id="item-color" className="w-full bg-white">
                        <SelectValue placeholder="Selecciona un color" />
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map(color => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {sizes.length > 0 && (
                    <div>
                      <label htmlFor="item-size" className="mb-1 block text-sm font-medium text-gray-700">
                        Tamaño
                      </label>
                      <Select
                        value={selectedSize}
                        onValueChange={(value) => {
                          setSelectedSize(value)
                          setCurrentImageIndex(0)
                        }}
                      >
                        <SelectTrigger id="item-size" className="w-full bg-white">
                          <SelectValue placeholder="Selecciona un tamaño" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map(size => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              )}

              {item.variantType === 'lensMount' && mounts.length > 0 && (
                <div className="pt-2">
                  <label htmlFor="item-mount" className="mb-1 block text-sm font-medium text-gray-700">
                    Tipo de montura
                  </label>
                  <Select
                    value={selectedMount}
                    onValueChange={(value) => {
                      setSelectedMount(value)
                      setCurrentImageIndex(0)
                    }}
                  >
                    <SelectTrigger id="item-mount" className="w-full bg-white">
                      <SelectValue placeholder="Selecciona una montura" />
                    </SelectTrigger>
                    <SelectContent>
                      {mounts.map(mount => (
                        <SelectItem key={mount} value={mount}>{mount}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

                {/* Price */}
                {isDiscounted ? (
                <div aria-label="Precio con descuento" className="pt-4">
                  <p className="text-base sm:text-lg text-gray-500 line-through">
                    {item.price.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-2xl sm:text-3xl lg:text-3xl text-red-600">
                    {item.discountedPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs sm:text-sm text-gray-500">IVA incluido</span>
                  </p>
                </div>
                ) : item.availabilityInquiry === true ? (
                <p className="text-2xl sm:text-3xl lg:text-3xl pt-4 block text-red-500">Consultar disponibilidad</p>
                ) : typeof displayPrice === 'number' && Number.isFinite(displayPrice) ? (
                <p aria-label="Precio del producto" className="text-2xl sm:text-3xl lg:text-3xl pt-4 block">
                  {Number(displayPrice).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs sm:text-sm text-gray-500">IVA incluido</span>
                </p>
                ) : (
                <p className="text-2xl sm:text-3xl lg:text-3xl pt-4 block text-red-500">Consultar disponibilidad</p>
                )}
            </div>

            {/* Contact Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleWhatsAppContact}
                  variant="default"
                  size="lg"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
                  >
                    <path d="M12 2.5A9.4 9.4 0 0 0 4 17l-1.2 4.4L7.3 20A9.5 9.5 0 1 0 12 2.5Zm0 17.1c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.6.7.7-2.5-.2-.3A7.6 7.6 0 1 1 12 19.6Zm4.2-5.7c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.5l.4-.4c.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.5-1.3-.7-1.7-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 3.9 3.4.6.3 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1 0-.1-.2-.2-.4-.3Z" />
                  </svg>
                  Consultar por disponibilidad
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


            {(item.description?.trim() || item.descriptionLinks?.length) && (
              <CardDescription className="bg-white p-4 sm:p-6">
                <h2 className="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg">
                  Descripción
                </h2>
                {item.description?.trim() && (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700 sm:text-base">
                    {item.description}
                  </p>
                )}
                {item.descriptionLinks && item.descriptionLinks.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {item.descriptionLinks.map((link, index) => (
                      <li key={link._key ?? `${link.url}-${index}`}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-red-600 underline underline-offset-2 hover:text-red-700 sm:text-base"
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </CardDescription>
            )}


          </div>
        </div>
      </div>
    </div>
  )
} 