import Image from 'next/image';
import MostSearched from '../components/mostSearched';
import AboutUs from "@/components/AboutUs"

const DimaLogo = () => (
  <svg width="84" height="32" viewBox="0 0 84 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.968 0H0V32H11.968V19.808H10.4V12.16H11.968V0Z" fill="black"/>
    <path d="M24.896 0H15.2V32H24.896C29.984 32 32.224 28.512 32.224 23.84V8.128C32.224 3.456 29.984 0 24.896 0ZM21.504 24.896V7.072H23.072C24.416 7.072 25.024 8.032 25.024 9.536V22.432C25.024 23.936 24.416 24.896 23.072 24.896H21.504Z" fill="black"/>
    <path d="M48.064 0H33.824V32H48.064C53.152 32 55.392 28.512 55.392 23.84V8.128C55.392 3.456 53.152 0 48.064 0ZM44.672 24.896V7.072H46.24C47.584 7.072 48.192 8.032 48.192 9.536V22.432C48.192 23.936 47.584 24.896 46.24 24.896H44.672Z" fill="black"/>
    <path d="M60.16 20.32V0H51.456V32H75.392V20.32H60.16Z" fill="black"/>
    <path d="M84 0H78.4V32H84V0Z" fill="black"/>
  </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative h-[600px] text-white">
          <Image
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop"
            alt="Photographer with camera on tripod"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex flex-col items-start justify-center h-full p-8 md:p-16 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              La tienda #1 de equipo fotográfico en Costa Rica
            </h1>
            <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-sm">
              VER CATÁLOGO
            </button>
          </div>
        </section>

        {/* Categories Section */}
        <MostSearched />

        {/* Products Section */}
        <section className="py-16 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Explora</p>
                <h2 className="text-4xl font-bold mt-2">Nuestros productos</h2>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded-full text-sm">
                  VER TODOS
                </button>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
                    <ChevronRightIcon className="transform rotate-180" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Baterías', img: 'https://placehold.co/200x200/png' },
                { name: 'Estuches y Maletines', img: 'https://placehold.co/200x200/png' },
                { name: 'Proyección', img: 'https://placehold.co/200x200/png' },
                { name: 'Impresoras y Escaneres', img: 'https://placehold.co/200x200/png' },
                { name: 'Accesorios de Camara', img: 'https://placehold.co/200x200/png' },
                { name: 'Almacenamiento', img: 'https://placehold.co/200x200/png' },
              ].map((product) => (
                <div key={product.name} className="text-center">
                  <div className="bg-white rounded-lg p-4 flex items-center justify-center h-48">
                    <Image src={product.img} alt={product.name} width={150} height={150} objectFit="contain" />
                  </div>
                  <h3 className="mt-4 font-semibold">{product.name}</h3>
                </div>
              ))}
            </div>
             <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                    <div className="w-8 h-1 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
                </div>
            </div>
          </div>
        </section>
        
        {/* Brands Section */}
        <section className="py-12 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
                <Image src="https://tailwindui.com/img/logos/158x48/canon-gray-400.svg" alt="Canon" width={120} height={40} />
                <Image src="https://tailwindui.com/img/logos/158x48/nikon-gray-400.svg" alt="Nikon" width={120} height={40} />
                <Image src="https://tailwindui.com/img/logos/158x48/sony-gray-400.svg" alt="Sony" width={120} height={40} />
                <Image src="https://tailwindui.com/img/logos/158x48/fujifilm-gray-400.svg" alt="Fujifilm" width={120} height={40} />
                <Image src="https://tailwindui.com/img/logos/158x48/blackmagic-gray-400.svg" alt="Blackmagic" width={120} height={40} />
                <Image src="https://tailwindui.com/img/logos/158x48/gopro-gray-400.svg" alt="GoPro" width={120} height={40} />
            </div>
        </section>

        {/* About Us Section */}
        <AboutUs />

      </main>

      {/* Footer */}
      <footer className="bg-white pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <DimaLogo />
                <p className="mt-4 text-sm text-gray-600 max-w-md">Dima es una pequeña empresa fundada en 1972. Desde ese momento, la empresa se ha dedicado a la importación, distribución y venta de equipos y suministros para la fotografía.</p>
              </div>
              <div>
                <h4 className="font-bold">Teléfono</h4>
                <p className="text-sm mt-2">+506 8888-8888</p>
                <h4 className="font-bold mt-4">WhatsApp</h4>
                <p className="text-sm mt-2">+506 8888-8888</p>
                <h4 className="font-bold mt-4">Correo</h4>
                <p className="text-sm mt-2">info@dima.com</p>
              </div>
               <div>
                <a href="#" className="block text-sm font-semibold hover:text-red-500">Terminos del serivicio</a>
                <a href="#" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de devoluciones y Reintegros</a>
                <a href="#" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de envío</a>
              </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex justify-between items-center text-sm text-gray-500">
            <p>©2025 Dima</p>
            <p>Diseñado por Coolebra Studio y Hernito</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
