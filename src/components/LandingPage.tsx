import React from 'react';
import Image from 'next/image';

const DimaLogo = () => (
  <svg width="84" height="32" viewBox="0 0 84 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.968 0H0V32H11.968V19.808H10.4V12.16H11.968V0Z" fill="black"/>
    <path d="M24.896 0H15.2V32H24.896C29.984 32 32.224 28.512 32.224 23.84V8.128C32.224 3.456 29.984 0 24.896 0ZM21.504 24.896V7.072H23.072C24.416 7.072 25.024 8.032 25.024 9.536V22.432C25.024 23.936 24.416 24.896 23.072 24.896H21.504Z" fill="black"/>
    <path d="M48.064 0H33.824V32H48.064C53.152 32 55.392 28.512 55.392 23.84V8.128C55.392 3.456 53.152 0 48.064 0ZM44.672 24.896V7.072H46.24C47.584 7.072 48.192 8.032 48.192 9.536V22.432C48.192 23.936 47.584 24.896 46.24 24.896H44.672Z" fill="black"/>
    <path d="M60.16 20.32V0H51.456V32H75.392V20.32H60.16Z" fill="black"/>
    <path d="M84 0H78.4V32H84V0Z" fill="black"/>
  </svg>
);


const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.707 14.293L12.344 10.93C13.22 9.835 13.75 8.441 13.75 7C13.75 3.271 10.729 0.25 7 0.25C3.271 0.25 0.25 3.271 0.25 7C0.25 10.729 3.271 13.75 7 13.75C8.441 13.75 9.835 13.22 10.93 12.344L14.293 15.707C14.488 15.902 14.744 16 15 16C15.256 16 15.512 15.902 15.707 15.707C16.098 15.316 16.098 14.684 15.707 14.293ZM7 12.25C4.103 12.25 1.75 9.897 1.75 7C1.75 4.103 4.103 1.75 7 1.75C9.897 1.75 12.25 4.103 12.25 7C12.25 9.897 9.897 12.25 7 12.25Z" fill="currentColor"/>
  </svg>
);


const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const LandingPage = () => {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="py-4 px-8 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-10">
          <DimaLogo />
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-red-500">Catálogo</a>
            <a href="#" className="hover:text-red-500">Ofertas</a>
            <a href="#" className="flex items-center gap-2 hover:text-red-500">
              Buscar <SearchIcon />
            </a>
          </nav>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-red-500">Conocenos</a>
          <a href="#" className="hover:text-red-500">Contacto</a>
        </div>
      </header>

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
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-gray-500">A un click</p>
            <h2 className="text-4xl font-bold mt-2">Más buscado por categoría</h2>
            <p className="mt-4 text-gray-600">Ofrecemos gran variedad de equipos de fotografía en Costa Rica con envíos gratis en el GAM.</p>
            <button className="mt-6 border border-red-500 text-red-500 font-bold py-2 px-5 rounded-full text-sm hover:bg-red-500 hover:text-white">
              VER TODOS
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
              {[
                { name: 'Cámaras', img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800' },
                { name: 'Objetivos', img: 'https://images.unsplash.com/photo-1581338834647-b4fb31149793?w=800' },
                { name: 'Trípodes y Soportes', img: 'https://images.unsplash.com/photo-1590622434394-a65759719a77?w=800' },
                { name: 'Fotografía de película', img: 'https://images.unsplash.com/photo-1593018436353-6de5957a168a?w=800' },
                { name: 'Iluminación', img: 'https://images.unsplash.com/photo-1598488096201-9759856996d9?w=800' },
              ].map((category, i) => (
                <div key={category.name} className={`relative rounded-xl overflow-hidden h-64 ${i >= 2 ? 'lg:col-span-1' : 'lg:col-span-1'}`}>
                   {i === 0 && <div className="lg:col-span-2 h-full">
                    <Image src={category.img} alt={category.name} layout="fill" objectFit="cover" className="transform hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{category.name}</h3>
                   </div>}
                   {i === 1 && <div className="lg:col-span-2 h-full">
                    <Image src={category.img} alt={category.name} layout="fill" objectFit="cover" className="transform hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{category.name}</h3>
                   </div>}
                   {i > 1 && <div className="h-full">
                    <Image src={category.img} alt={category.name} layout="fill" objectFit="cover" className="transform hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black bg-opacity-40" />
                    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{category.name}</h3>
                   </div>}
                </div>
              ))}
            </div>
          </div>
        </section>

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
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm text-gray-500">¿Quienes somos?</p>
              <h2 className="text-4xl font-bold mt-2">Conocenos</h2>
              <div className="mt-8">
                 <Image 
                    src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800" 
                    alt="Man in an apron"
                    width={500}
                    height={600}
                    className="rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="bg-[#C4B79A] p-12 rounded-xl text-gray-800">
                <p className="text-sm">Trayectoria</p>
                <h3 className="text-3xl font-bold mt-2">Contamos con más de 53 años de experiencia en el mercado</h3>
                <p className="mt-4">Dima es una pequeña empresa fundada en 1972. Desde ese momento, la empresa se ha dedicado a la importación, distribución y venta de equipos y suministros para la fotografia.</p>
                <button className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-sm">
                  LEER MÁS
                </button>
            </div>
          </div>
        </section>

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

export default LandingPage; 