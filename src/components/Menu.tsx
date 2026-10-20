'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { client } from '@/sanity/client';
import type { Category, Subcategory } from '@/app/types';

type MenuSection = Category & {
  items: Pick<Subcategory, '_id' | 'title'>[];
};

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuSection[]>([]);
  const [status, setStatus] = useState('Cargando categorías...');
  const pathname = usePathname();

  useEffect(() => {
    client.fetch<MenuSection[]>(
      `*[_type == "category"] | order(title asc){
        _id,
        title,
        "items": *[_type == "subcategory" && category._ref == ^._id] | order(title asc){
          _id, title
        }
      }`
    )
      .then(data => {
        setMenuItems(data);
        setStatus(data.length ? '' : 'No hay categorías disponibles.');
      })
      .catch(error => {
        console.error('No se pudieron cargar las categorías del menú:', error);
        setStatus('No pudimos cargar las categorías. Puedes abrir el catálogo desde su nombre.');
      });
  }, []);

  return (
    <div className="group">
      {/* Trigger */}
      <div className="flex items-center gap-1">
        <Link
          href="/catalog"
          onClick={() => setIsOpen(false)}
          className={`header-control inline-block text-gray-700 font-medium ${pathname === '/catalog' ? 'text-red-500' : ''}`}
        >
          Catálogo
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          aria-label="Desplegar categorías del catálogo"
          aria-expanded={isOpen}
          aria-controls="catalog-dropdown"
          className="header-control p-1 text-gray-700 cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown */}
      <div id="catalog-dropdown" className={`
        absolute z-50 left-0 top-full bg-white shadow-lg border border-gray-200 rounded-b-2xl transition-all duration-300 motion-reduce:transition-none
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        w-full max-h-[calc(100dvh-5rem)] overflow-y-auto lg:grid lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-8 p-6
      `}>
        {status && <p role="status" className="col-span-full text-sm text-gray-500">{status}</p>}
        {menuItems.map((section) => (
          <div key={section._id} className="mb-6 lg:mb-0">
            <h3 className="mb-3 text-sm font-semibold text-black lg:text-base">
              <Link
                href={`/catalog?category=${encodeURIComponent(section._id)}`}
                className="header-control hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {section.title}
              </Link>
            </h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item._id}>
                  <Link 
                    href={`/catalog?subcategory=${encodeURIComponent(item._id)}`}
                    className="header-control hover:underline text-gray-700 text-sm block py-1"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.title}
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
