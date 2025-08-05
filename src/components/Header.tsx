'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import MegaMenu from './Menu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
            <MegaMenu />
            <Link href="/ofertas" className="text-gray-700 hover:text-gray-900 font-medium">
              Ofertas
            </Link>
            <div className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span className="font-medium">Buscar</span>
              <Search className="h-4 w-4" />
            </div>
          </nav>

          {/* Desktop Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/conocenos" className="text-gray-600 hover:text-gray-900 font-medium">
              Conócenos
            </Link>
            <Link href="/contacto" className="text-gray-600 hover:text-gray-900 font-medium">
              Contacto
            </Link>
          </nav>

          {/* Mobile search button */}
          <div className="flex items-center lg:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
                href="/catalog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link
                href="/ofertas"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link
                href="/conocenos"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conócenos
              </Link>
              <Link
                href="/contacto"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
