'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type BannerImage = {
  src: string;
  mobileSrc?: string;
  alt: string;
};

type HomeBannerCarouselProps = {
  images: BannerImage[];
};

const HomeBannerCarousel = ({ images }: HomeBannerCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <section
      aria-label="Banner principal"
      className="relative h-[400px] overflow-hidden rounded-3xl text-white sm:h-[500px] lg:h-[600px]"
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          aria-hidden={index !== activeIndex}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <picture className="relative block h-full w-full">
            {image.mobileSrc && (
              <source media="(max-width: 639px)" srcSet={image.mobileSrc} />
            )}
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </picture>
        </div>
      ))}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
      <div className="absolute left-0 top-1/2 z-10 flex max-w-2xl -translate-y-1/2 flex-col items-start justify-center gap-4 p-4 sm:p-8 lg:p-16">
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-5xl">
          La tienda #1 de equipo fotográfico en Costa Rica
        </h1>
        <Button asChild variant="default" size="lg">
          <Link href="/catalog">Ver Catálogo</Link>
        </Button>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-5 right-5 z-10 flex gap-2">
          {images.map((image, index) => (
            <button
              key={`${image.src}-indicator-${index}`}
              type="button"
              aria-label={`Mostrar imagen ${index + 1} del banner`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full border border-white ${
                index === activeIndex ? 'bg-white' : 'bg-black/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeBannerCarousel;
