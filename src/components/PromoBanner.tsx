import Image from 'next/image';
import type { CSSProperties } from 'react';
import { client } from '@/sanity/client';
import promoBannerQuery from '@/sanity/promoBannerQuery';

type PromoBannerData = {
  altText?: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  mobileImageUrl?: string;
  mobileImageWidth?: number;
  mobileImageHeight?: number;
} | null;

const PromoBanner = async () => {
  const banner = await client.fetch<PromoBannerData>(promoBannerQuery);

  if (!banner?.imageUrl) return null;

  return (
    <section className="w-full py-8 sm:py-12">
      <div
        style={{
          '--banner-mobile-ratio': `${banner.mobileImageWidth ?? banner.imageWidth ?? 670} / ${banner.mobileImageHeight ?? banner.imageHeight ?? 80}`,
          '--banner-desktop-ratio': `${banner.imageWidth ?? 670} / ${banner.imageHeight ?? 80}`,
        } as CSSProperties}
        className="home-banner-frame relative min-h-[1px] mx-auto w-full max-w-[670px] overflow-hidden rounded-xl"
      >
        <picture className="absolute inset-0">
          {banner.mobileImageUrl && (
            <source
              media="(max-width: 639px)"
              srcSet={banner.mobileImageUrl}
            />
          )}
          <Image
            src={banner.imageUrl}
            alt={banner.altText ?? ''}
            fill
            sizes="(max-width: 670px) calc(100vw - 2rem), 670px"
            unoptimized
            className="object-contain"
          />
        </picture>
      </div>
    </section>
  );
};

export default PromoBanner;
