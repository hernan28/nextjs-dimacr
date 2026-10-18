'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import MegaMenu from './Menu';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/catalog', label: 'Catálogo', position: 'left' },
  { href: '/ofertas', label: 'Ofertas', position: 'left' },
  { href: '/conocenos', label: 'Conócenos', position: 'right' },
  { href: '/contacto', label: 'Contacto', position: 'right' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true);
  }, []);

  const leftLinks = navLinks.filter(link => link.position === 'left' && link.href !== '/catalog');
  const rightLinks = navLinks.filter(link => link.position === 'right');

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:grid lg:grid-cols-[1fr_auto_1fr]">
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
          <div className="flex items-center justify-center flex-1 lg:flex-none lg:order-2">
            <Link href="/" aria-label="Dima - inicio">
              <Image src="/Dima RGB 500.png" alt="Dima" width={120} height={36} priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 lg:order-1">
            <MegaMenu />
            {leftLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-gray-700 hover:text-gray-900 font-medium ${pathname === link.href ? 'text-red-500' : ''}`}>
                {link.label}
              </Link>
            ))}
            <SearchOverlay />
          </nav>

          {/* Desktop Right Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 lg:order-3 lg:justify-self-end">
            {rightLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-gray-600 hover:text-gray-900 font-medium ${pathname === link.href ? 'text-red-500' : ''}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile search button */}
          <div className="flex items-center lg:hidden">
            <SearchOverlay mobile />
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
      </div>
    </header>
  );
};

export default Header;
