'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import DesktopNav from './DesktopNav';
import { Button } from './ui/button';
/* import { usePathname } from 'next/navigation'; */

interface MenuItemsType {
  categories?: Array<{ _id: string; title: string }>;
  subcategories?: Array<{ _id: string; title: string; category?: { _id: string } }>;
  items?: Array<Record<string, unknown>>;
}


export default function Header({ menuItems }: { menuItems: MenuItemsType }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  /* const pathname = usePathname() */

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-2 z-20 w-full px-3 sm:px-4 lg:px-6">
      
        <div className="flex items-center justify-between h-18 sm:h-20 site-container mx-auto px-4 sm:px-6 py-2.5 transition-all duration-300 shadow-[0px_1px_4px_0_rgba(25,33,61,0.06)] rounded-full bg-white">
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
          <nav className="hidden lg:flex items-center">
            <DesktopNav menuItems={menuItems}/>
          </nav>

          {/* Desktop Right Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            
            <Link href="#"  className="relative flex items-center gap-1 rounded-full px-6 py-3 transition-colors hover:bg-black hover:text-white" >
              Conócenos
            </Link>
            
            <Button asChild variant="default" size="lg"  >
            <Link href="#">
              Contacto
            </Link>
          </Button>
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
            </div>
          </div>
        )}
      
    </header>
  );
}