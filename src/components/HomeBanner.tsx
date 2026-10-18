import { client } from '@/sanity/client';
import homeBannerQuery from '@/sanity/homeBannerQuery';
import HomeBannerCarousel from '@/components/HomeBannerCarousel';

type HomeBannerData = {
  images?: { url?: string }[];
  mobileImageUrls?: (string | null)[];
};

const fallbackImages = [
  {
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop',
    alt: 'Photographer with camera on tripod',
  },
];

const HomeBanner = async () => {
  const data = await client.fetch<HomeBannerData | null>(homeBannerQuery);
  const images =
    data?.images
      ?.filter((image): image is { url: string } => Boolean(image.url))
      .map((image, index) => ({
        src: image.url,
        mobileSrc: data?.mobileImageUrls?.[index] ?? undefined,
        alt: `Imagen ${index + 1} del banner de DimaCR`,
      })) ?? [];

  return (
    <HomeBannerCarousel
      images={images.length > 0 ? images : fallbackImages}
    />
  );
};

export default HomeBanner;
