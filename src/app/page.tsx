import Image from 'next/image';
import MostSearched from '../components/mostSearched';
import AboutUs from "@/components/AboutUs"
import Link from 'next/link'
import OurProducts from '@/components/ourProducts'

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] sm:h-[500px] lg:h-[600px] text-white">
          <Image
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
            alt="Photographer with camera on tripod"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex flex-col items-start justify-center h-full p-4 sm:p-8 lg:p-16 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              La tienda #1 de equipo fotográfico en Costa Rica
            </h1>
            <Link 
              href="/catalog" 
              className="mt-4 sm:mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-sm sm:text-base transition-colors duration-200"
            >
              Ver CATÁLOGO
            </Link>
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


    </div>
  );
};
