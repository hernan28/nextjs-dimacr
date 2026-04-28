import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { fetchCatalogData } from '@/sanity/catalog';
import { ReactNode } from "react";


const geistSans = Geist({
  weight: "400",
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  weight: "600",
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DimaLogo = () => (
  <svg width="84" height="32" viewBox="0 0 84 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.968 0H0V32H11.968V19.808H10.4V12.16H11.968V0Z" fill="black"/>
    <path d="M24.896 0H15.2V32H24.896C29.984 32 32.224 28.512 32.224 23.84V8.128C32.224 3.456 29.984 0 24.896 0ZM21.504 24.896V7.072H23.072C24.416 7.072 25.024 8.032 25.024 9.536V22.432C25.024 23.936 24.416 24.896 23.072 24.896H21.504Z" fill="black"/>
    <path d="M48.064 0H33.824V32H48.064C53.152 32 55.392 28.512 55.392 23.84V8.128C55.392 3.456 53.152 0 48.064 0ZM44.672 24.896V7.072H46.24C47.584 7.072 48.192 8.032 48.192 9.536V22.432C48.192 23.936 47.584 24.896 46.24 24.896H44.672Z" fill="black"/>
    <path d="M60.16 20.32V0H51.456V32H75.392V20.32H60.16Z" fill="black"/>
    <path d="M84 0H78.4V32H84V0Z" fill="black"/>
  </svg>
);

export const metadata: Metadata = {
  title: "Dima - Equipo Fotográfico Costa Rica",
  description: "La tienda #1 de equipo fotográfico en Costa Rica",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const menuItems = await fetchCatalogData();
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-200`}
      >
        <Header menuItems={menuItems} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 sm:pt-24">
          {children}
        </main>

        <footer className="bg-white pt-12 sm:pt-16 pb-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="sm:col-span-2">
                <DimaLogo />
                <p className="mt-4 text-sm text-gray-600 max-w-md">
                  Dima es una pequeña empresa fundada en 1972. Desde ese momento, la empresa se ha dedicado a la importación, distribución y venta de equipos y suministros para la fotografía.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">Teléfono</h4>
                <p className="text-sm mt-2">+506 8888-8888</p>
                <h4 className="font-bold mt-4 text-sm sm:text-base">WhatsApp</h4>
                <p className="text-sm mt-2">+506 8888-8888</p>
                <h4 className="font-bold mt-4 text-sm sm:text-base">Correo</h4>
                <p className="text-sm mt-2">info@dima.com</p>
              </div>
              <div>
                <a href="#" className="block text-sm font-semibold hover:text-red-500">Terminos del serivicio</a>
                <a href="#" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de devoluciones y Reintegros</a>
                <a href="#" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de envío</a>
              </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>©2025 Dima</p>
            <p>Diseñado por Coolebra Studio y Hernito</p>
          </div>
        </div>
      </footer>
      
      </body>


    </html>
  );
}
