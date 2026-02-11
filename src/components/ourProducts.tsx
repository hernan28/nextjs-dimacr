'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronRightIcon } from 'lucide-react'
import { client } from '@/sanity/client'
import useEmblaCarousel from 'embla-carousel-react'
import '@/app/globals.css'
import Link from 'next/link'
import { Button } from './ui/button'

type Subcategory = {
  _id: string
  title: string
  description?: string
  image?: { asset: { url: string } }
}

export default function OurProducts() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([])

  useEffect(() => {
      client.fetch(
        `*[_type == "subcategory"]{
          _id,
          title,
          description,
          image { asset->{url} }
        }`
      )
      .then((data) => setSubcategories(data))
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    slidesToScroll: 1,
    dragFree: true,
    containScroll: 'trimSnaps'
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  useEffect(() => {
    if (!emblaApi) return

    setScrollSnaps(emblaApi.scrollSnapList())

    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    })
  }, [emblaApi])

  // Add this effect to update Embla when subcategories change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
      setScrollSnaps(emblaApi.scrollSnapList())
    }
  }, [subcategories, emblaApi])

  return (
    <section className="py-8 sm:py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 gap-4 items-end">
          <div>
            <span className="text-sm text-gray-500">Explora</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2">Nuestros productos</h2>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* TODO: Add link for navigation */}
            <Button asChild variant="default" size="sm">
              <Link href="/catalog">
                Ver Todo
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={scrollPrev}
                variant="outline"
                size="sm"
              >
                <ChevronRightIcon className="transform rotate-180 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                onClick={scrollNext}
                variant="outline"
                size="sm"
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Embla Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {subcategories.map((subcategory) => (
              <div
                className="min-w-[160px] sm:min-w-[180px] lg:min-w-[200px] max-w-[160px] sm:max-w-[180px] lg:max-w-[200px] flex-shrink-0 text-center cursor-pointer"
                key={subcategory._id}
              >
                <div className="bg-white rounded-lg p-3 sm:p-4 flex items-center justify-start h-36 sm:h-40 lg:h-48 shadow-sm">
                  <Image
                    src={subcategory.image?.asset?.url || 'https://placehold.co/200x200/png'}
                    alt={subcategory.title}
                    width={150}
                    height={150}
                    quality={1}
                    loading="lazy"
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="mt-3 sm:mt-4 font-semibold text-xs sm:text-sm">{subcategory.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1 rounded-full transition-all focus:outline-none ${
                selectedIndex === index ? 'w-6 sm:w-8 bg-red-500' : 'w-2 sm:w-3 bg-gray-300'
              }`}
              style={{ cursor: 'pointer' }}
            />
          ))
          }
        </div>
      </div>
    </section>
  )
}