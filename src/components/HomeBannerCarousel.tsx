'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { CSSProperties } from 'react';

type BannerImage = {
  src: string;
  width: number;
  height: number;
  mobileSrc?: string;
  mobileWidth: number;
  mobileHeight: number;
  alt: string;
  href?: string;
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

  const activeImage = images[activeIndex];
  const referenceImage = images[2] ?? images[0];

  if (!activeImage || !referenceImage) return null;

  return (
    <div className="w-full">
      <section
        aria-label="Banner principal"
        style={{
          '--banner-mobile-ratio': `${referenceImage.mobileWidth} / ${referenceImage.mobileHeight}`,
          '--banner-desktop-ratio': `${referenceImage.width} / ${referenceImage.height}`,
        } as CSSProperties}
        className="home-hero-banner-frame relative min-h-[1px] overflow-hidden rounded-3xl bg-stone-300"
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex
                ? 'z-10 opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
          >
            <picture className="absolute inset-0">
              {image.mobileSrc && (
                <source media="(max-width: 639px)" srcSet={image.mobileSrc} />
              )}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1600px) 100vw, 1600px"
                unoptimized
                priority={index === 0}
                className="object-contain"
              />
            </picture>
            {image.href && (
              <Link
                href={image.href}
                tabIndex={index === activeIndex ? 0 : -1}
                aria-label={`Abrir ${image.alt}`}
                className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-4 focus-visible:outline-inset focus-visible:outline-white"
              />
            )}
          </div>
        ))}
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
    </div>
  );
};

export default HomeBannerCarousel;
