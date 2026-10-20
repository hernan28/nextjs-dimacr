import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import Header from "@/components/Header";
import { PHONE_DISPLAY_NUMBER, WHATSAPP_DISPLAY_NUMBER } from "@/lib/contact";

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dima - Equipo Fotográfico Costa Rica",
  description: "La tienda #1 de equipo fotográfico en Costa Rica",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${jost.variable} antialiased bg-stone-200`}>
        <Header />
        <main className="mx-auto w-full max-w-[1664px] px-4 py-8 pt-20 sm:px-6 sm:pt-24 lg:px-8">
          {children}
        </main>

        <footer className="bg-white pt-12 pb-8 sm:pt-16">
        <div className="mx-auto w-full max-w-[1664px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="sm:col-span-2">
                <Image src="/Dima RGB 500.png" alt="Dima" width={100} height={30} />
                <p className="mt-4 text-sm text-gray-600 max-w-md">
                  Dima es una pequeña empresa fundada en 1972. Desde ese momento, la empresa se ha dedicado a la importación, distribución y venta de equipos y suministros para la fotografía.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm sm:text-base">Teléfono</h4>
                <p className="text-sm mt-2">{PHONE_DISPLAY_NUMBER}</p>
                <h4 className="font-bold mt-4 text-sm sm:text-base">WhatsApp</h4>
                <p className="text-sm mt-2">{WHATSAPP_DISPLAY_NUMBER}</p>
                <h4 className="font-bold mt-4 text-sm sm:text-base">Correo</h4>
                <p className="text-sm mt-2">info@dima.cr</p>
              </div>
              <div>
                <a href="/terminos-del-servicio" className="block text-sm font-semibold hover:text-red-500">Términos del servicio</a>
                <a href="/politica-de-devoluciones" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de devoluciones y reintegros</a>
                <a href="/politica-de-envio" className="block text-sm font-semibold mt-4 hover:text-red-500">Política de envío</a>
              </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
            <p>©2025 Dima</p>
            <p>Diseñado por Coolebra Studio</p>
          </div>
        </div>
      </footer>
      
      </body>


    </html>
  );
}
