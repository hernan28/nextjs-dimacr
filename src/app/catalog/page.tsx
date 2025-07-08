import { fetchCatalogData } from '@/sanity/catalog'
import CatalogFilters from '@/app/catalog/CatalogFilters'
import ItemCard from '@/app/catalog/ItemCard'

export default async function CatalogPage() {
  const { categories, subcategories, items } = await fetchCatalogData()
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64">
        <CatalogFilters categories={categories} subcategories={subcategories} />
      </aside>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => <ItemCard key={item._id} item={item} />)}
      </main>
    </div>
  )
} 