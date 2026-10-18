import Image from 'next/image';
import { client } from '@/sanity/client';
import promoBannerQuery from '@/sanity/promoBannerQuery';

type PromoBannerData = {
  altText?: string;
  imageUrl?: string;
  mobileImageUrl?: string;
} | null;

const PromoBanner = async () => {
  const banner = await client.fetch<PromoBannerData>(promoBannerQuery);

  if (!banner?.imageUrl) return null;

  return (
    <section className="px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl">
        <picture>
          {banner.mobileImageUrl && (
            <source
              media="(max-width: 639px)"
              srcSet={banner.mobileImageUrl}
            />
          )}
          <Image
            src={banner.imageUrl}
            alt={banner.altText ?? ''}
            width={1920}
            height={500}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="h-auto w-full"
          />
        </picture>
      </div>
    </section>
  );
};

export default PromoBanner;
