'use client';

import Link from 'next/link';

const menuItems = [
  {
    title: 'Almacenamiento',
    items: [
      'Archivo de Película y Fotos',
      'Cintas Magnéticas',
      'Discos Ópticos',
      'Dispositivos de Memoria y Adaptadores',
      'Gabinetes Control de Humedad',
      'Lectores de Tarjeta',
      'Tarjetas de Memoria',
    ],
  },
  {
    title: 'Cámaras',
    items: [
      'Accesorios de Cámara',
      'Cámaras Desechables',
      'Cámaras de Objetivos Intercambiables',
      'Cámaras de Película',
      'Cámaras Instantáneas',
    ],
  },
  {
    title: 'Estuches y Maletines',
    items: [
      'Estuches',
      'Maletines',
      'Mochilas',
      'Accesorios de Transporte y Producción',
      'Estuches para Trípode',
    ],
  },
  {
    title: 'Iluminación',
    items: [
      'Bombillas',
      'Disparadores Inalámbricos',
      'Flash de Estudio',
      'Flash Portátil',
      'Flash de Cámara',
      'Fotómetros',
      'Luz Continua',
      'Modificadores de Luz',
    ],
  },
];

export default function MegaMenu() {
  return (
    <div className="relative group">
      {/* Trigger */}
      <span className="cursor-pointer text-white-600 font-medium">Catálogo</span>

      {/* Dropdown */}
      <div className="absolute z-50 w-screen max-w-5xl left-0 top-full mt-2 hidden group-hover:grid bg-white shadow-lg p-6 grid-cols-2 md:grid-cols-4 gap-6 text-sm border border-gray-200 rounded-lg transition-all duration-300">

        {menuItems.map((section) => (
          <div key={section.title}>
            <h3 className="font-semibold mb-2 text-black">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:underline text-gray-700 hover:text-black">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
