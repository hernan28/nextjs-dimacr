import ItemCard from '@/app/catalog/ItemCard'
import { fetchCatalogData } from '@/sanity/catalog'
import { hasValidDiscount } from '@/lib/utils'
import type { Item } from '@/app/types'

export default async function OffersPage() {
  const { items } = await fetchCatalogData()
  const discountedItems = items.filter(hasValidDiscount)

  return (
    <section>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">Ofertas</h1>
      <p className="text-gray-600 mb-6">Aprovechá estos precios especiales en productos seleccionados.</p>
      {discountedItems.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No hay ofertas disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {discountedItems.map((item: Item) => <ItemCard key={item._id} item={item} />)}
        </div>
      )}
    </section>
  )
}
