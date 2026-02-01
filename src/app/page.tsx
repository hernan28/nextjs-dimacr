import Image from 'next/image';
import MostSearched from '../components/mostSearched';
import AboutUs from "@/components/AboutUs"
import Link from 'next/link'
import OurProducts from '@/components/ourProducts'
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] text-white rounded-3xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
          alt="Photographer with camera on tripod"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute z-10 flex flex-col items-start justify-center gap-4 p-4 sm:p-8 lg:p-16 max-w-2xl left-0 top-1/2 -translate-y-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
            La tienda #1 de equipo fotográfico en Costa Rica
          </h1>
          <Button asChild variant="default">
            <Link href="/catalog">
              Ver Catálogo
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <MostSearched />

      {/* Products Section */}
      <OurProducts />

      {/* Brands Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-8 items-center justify-items-center">
          <Image src="https://tailwindui.com/img/logos/158x48/canon-gray-400.svg" alt="Canon" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
          <Image src="https://tailwindui.com/img/logos/158x48/nikon-gray-400.svg" alt="Nikon" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
          <Image src="https://tailwindui.com/img/logos/158x48/sony-gray-400.svg" alt="Sony" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
          <Image src="https://tailwindui.com/img/logos/158x48/fujifilm-gray-400.svg" alt="Fujifilm" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
          <Image src="https://tailwindui.com/img/logos/158x48/blackmagic-gray-400.svg" alt="Blackmagic" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
          <Image src="https://tailwindui.com/img/logos/158x48/gopro-gray-400.svg" alt="GoPro" width={120} height={40} className="w-16 sm:w-20 lg:w-24" />
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />

    </main>
  );
};
