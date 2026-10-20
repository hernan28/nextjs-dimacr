import { client } from '@/sanity/client';
import homeBannerQuery from '@/sanity/homeBannerQuery';
import HomeBannerCarousel from '@/components/HomeBannerCarousel';

type HomeBannerData = {
  images?: { url?: string; width?: number; height?: number }[];
  link?: string;
  mobileImages?: ({ url?: string; width?: number; height?: number } | null)[];
};

const fallbackImages = [
  {
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop',
    alt: 'Photographer with camera on tripod',
    width: 2564,
    height: 1709,
    mobileWidth: 2564,
    mobileHeight: 1709,
  },
];

const HomeBanner = async () => {
  const data = await client.fetch<HomeBannerData | null>(homeBannerQuery);
  const images =
    data?.images
      ?.filter(
        (image): image is { url: string; width?: number; height?: number } =>
          Boolean(image.url),
      )
      .map((image, index) => ({
        src: image.url,
        width: image.width ?? 1600,
        height: image.height ?? 600,
        mobileSrc: data?.mobileImages?.[index]?.url ?? undefined,
        mobileWidth: data?.mobileImages?.[index]?.width ?? image.width ?? 1600,
        mobileHeight: data?.mobileImages?.[index]?.height ?? image.height ?? 600,
        alt: `Imagen ${index + 1} del banner de DimaCR`,
        href: data?.link,
      })) ?? [];

  return (
    <HomeBannerCarousel
      images={images.length > 0 ? images : fallbackImages}
    />
  );
};

export default HomeBanner;
