'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium focus:outline-none"
      >
        <span>Catálogo</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      <div className={`
        absolute z-50 left-1/2 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        w-screen max-w-5xl -translate-x-1/2 lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 p-6
        lg:block
      `}>
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6 lg:mb-0">
            <h3 className="font-semibold mb-3 text-black text-sm lg:text-base">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="hover:underline text-gray-700 hover:text-black text-sm lg:text-base block py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
