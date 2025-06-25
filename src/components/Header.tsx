import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-100 py-4 px-6 shadow-sm">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Left nav */}
        <nav className="flex gap-8 text-gray-800 font-mono text-lg">
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/ofertas">Ofertas</Link>
          <div className="flex items-center gap-1 cursor-pointer">
            <span>Buscar</span>
            {/* Custom red magnifying glass */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </nav>

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/">
            <div className="relative text-4xl font-black text-black cursor-pointer">
              Di
              <span className="relative inline-block">
                ma
                <span className="absolute -top-2 -left-2 w-3 h-3 bg-red-600 rounded-full"></span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right nav */}
        <nav className="flex gap-8 text-gray-800 font-mono text-lg">
          <Link href="/conocenos">Conócenos</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
