import Link from 'next/link';
import MegaMenu from './Menu';

const Header = () => {
  return (
    <header className="bg-gray-100 py-4 px-6 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Left nav */}
        <nav className="flex gap-6 items-center">
          <MegaMenu />
          <Link href="/ofertas" className="text-gray-800">Ofertas</Link>
          <div className="flex items-center gap-1">
            <span className="text-gray-800">Buscar</span>
            <span>🔍</span>
          </div>
        </nav>

        {/* Logo */}
        <div className="text-2xl font-bold">Dima</div>

        {/* Right nav */}
        <nav className="flex gap-4 text-gray-600">
          <Link href="/conocenos">Conócenos</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
