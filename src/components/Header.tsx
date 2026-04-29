'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import DesktopNav from './DesktopNav';

const navLinks = [
  { href: '/catalog', label: 'Catálogo', position: 'left' },
  { href: '/ofertas', label: 'Ofertas', position: 'left' },
  { href: '/conocenos', label: 'Conócenos', position: 'right' },
  { href: '/contacto', label: 'Contacto', position: 'right' },
];

export default function Header = ({ menuItems }: { menuItems: CatalogData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true);
  }, []);

  const leftLinks = navLinks.filter(link => link.position === 'left');
  const rightLinks = navLinks.filter(link => link.position === 'right');

  return (
    <header className="fixed top-2 sm:top-4 z-50 w-full px-3 sm:px-4 lg:px-6">
      
        <div className="flex items-center justify-between h-14 sm:h-15 site-container mx-auto px-4 sm:px-6 py-2.5 transition-all duration-300 shadow-[0px_1px_4px_0_rgba(25,33,61,0.06)] rounded-full bg-white">
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Dima
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DesktopNav menuItems={menuItems}/>
            {leftLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-gray-700 hover:text-gray-900 font-medium ${pathname === link.href ? 'text-red-500' : ''}`}>
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span className="font-medium">Buscar</span>
              <Search className="h-4 w-4" />
            </div>
          </nav>

          {/* Desktop Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {rightLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-gray-600 hover:text-gray-900 font-medium ${pathname === link.href ? 'text-red-500' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile search button */}
          <div className="flex items-center lg:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mounted && isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      
    </header>
  );
};