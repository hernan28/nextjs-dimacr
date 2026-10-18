import { fetchSearchItems } from '@/sanity/catalog'
import SearchForm from '@/components/SearchForm'
import ItemCard from '../catalog/ItemCard'
import type { Item } from '../types'

export default async function SearchPage({ searchParams }: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const { q } = await searchParams
  const query = typeof q === 'string' ? q.trim().slice(0, 200) : ''
  const items = query ? await fetchSearchItems(query) : []

  return (
    <section key={query} className="search-results">
      <div className="mx-auto max-w-xl mb-8">
        <SearchForm query={query} variant="results" />
      </div>
      <h1 className="text-xl sm:text-2xl font-semibold mb-2">{query ? `Resultados para “${query}”` : 'Buscar productos'}</h1>
      {query ? (
        <>
          <p className="text-gray-600 mb-6">{items.length} {items.length === 1 ? 'producto encontrado' : 'productos encontrados'}</p>
          {items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {items.map((item: Item) => <ItemCard key={item._id} item={item} />)}
            </div>
          ) : (
            <p className="text-center py-8 text-gray-500">No se encontraron productos. Intenta con otro nombre, marca o modelo.</p>
          )}
        </>
      ) : (
        <p className="text-gray-600">Escribe el nombre, marca o modelo del producto que buscas.</p>
      )}
    </section>
  )
}
