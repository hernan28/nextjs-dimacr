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
        const sections = data.filter(section => section.items.length > 0);
        setMenuItems(sections);
        setStatus(sections.length ? '' : 'No hay subcategorías disponibles.');
      })
      .catch(error => {
        console.error('No se pudieron cargar las categorías del menú:', error);
        setStatus('No pudimos cargar las categorías. Puedes abrir el catálogo desde su nombre.');
      });
  }, []);

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="flex items-center gap-1">
        <Link
          href="/catalog"
          onClick={() => setIsOpen(false)}
          className={`text-gray-700 hover:text-gray-900 font-medium ${pathname === '/catalog' ? 'text-red-500' : ''}`}
        >
          Catálogo
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(open => !open)}
          aria-label="Desplegar categorías del catálogo"
          aria-expanded={isOpen}
          aria-controls="catalog-dropdown"
          className="p-1 text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Dropdown */}
      <div id="catalog-dropdown" className={`
        absolute z-50 left-1/2 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-lg transition-all duration-300
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        w-screen max-w-5xl -translate-x-1/2 lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6 p-6
      `}>
        {status && <p role="status" className="col-span-full text-sm text-gray-500">{status}</p>}
        {menuItems.map((section) => (
          <div key={section._id} className="mb-6 lg:mb-0">
            <h3 className="font-semibold mb-3 text-black text-sm lg:text-base">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item._id}>
                  <Link 
                    href={`/catalog?subcategory=${encodeURIComponent(item._id)}`}
                    className="hover:underline text-gray-700 hover:text-black text-sm lg:text-base block py-1"
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
