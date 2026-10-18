import { Search } from 'lucide-react'

export default function SearchForm({ query = '', variant = 'overlay' }: { query?: string; variant?: 'overlay' | 'results' }) {
  return (
    <form action="/search" method="get" role="search" className={`flex items-center gap-3 rounded-full border px-4 py-3 transition-[border-color,box-shadow,background-color] duration-200 motion-reduce:transition-none focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-100 ${variant === 'results' ? 'bg-white border-stone-300 shadow-sm hover:border-stone-400' : 'bg-stone-200 border-transparent'}`}>
      <button type="submit" aria-label="Buscar" className="text-red-500 hover:text-red-600 transition-colors duration-200 motion-reduce:transition-none rounded-full focus-visible:outline-2 focus-visible:outline-red-500">
        <Search className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <input
        key={query}
        type="search"
        name="q"
        aria-label="¿Qué estás buscando?"
        placeholder="¿Qué estás buscando?"
        defaultValue={query}
        required
        maxLength={200}
        className="w-full min-w-0 bg-transparent text-base text-gray-700 placeholder:text-gray-500 focus:outline-none"
      />
    </form>
  )
}
