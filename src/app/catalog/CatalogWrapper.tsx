'use client'

import { useMemo, useState } from 'react'
import { Filter, X } from 'lucide-react'
import CatalogFilters from './CatalogFilters'
import ItemCard from './ItemCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category, Subcategory, Item } from "../types";
import { expandCatalogVariants } from '@/lib/utils'

export default function CatalogWrapper({
  categories,
  subcategories,
  items,
  initialCategory = 'unassigned',
  initialSubcategory = 'unassigned',
}: {
  categories: Category[]; 
  subcategories: Subcategory[]; 
  items: Item[];
  initialCategory?: string;
  initialSubcategory?: string;
}) {
  const catalogItems = useMemo(() => expandCatalogVariants(items), [items])
  const [filteredItems, setFilteredItems] = useState(() =>
    catalogItems.filter(item =>
      (initialCategory === 'unassigned' || item.category?._id === initialCategory || item.subcategory?.category?._id === initialCategory) &&
      (initialSubcategory === 'unassigned' || item.subcategory?._id === initialSubcategory)
    )
  )
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState('default')

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aName = `${a.brand ?? ''} ${a.title}`.trim()
    const bName = `${b.brand ?? ''} ${b.title}`.trim()
    if (sortOrder === 'name-asc') return aName.localeCompare(bName, 'es', { sensitivity: 'base', numeric: true })
    if (sortOrder === 'name-desc') return bName.localeCompare(aName, 'es', { sensitivity: 'base', numeric: true })
    if (sortOrder === 'price-asc' || sortOrder === 'price-desc') {
      const aPrice = a.catalogVariant?.price ?? a.price
      const bPrice = b.catalogVariant?.price ?? b.price
      const aHasPrice = !a.availabilityInquiry && typeof aPrice === 'number' && Number.isFinite(aPrice)
      const bHasPrice = !b.availabilityInquiry && typeof bPrice === 'number' && Number.isFinite(bPrice)
      if (!aHasPrice && !bHasPrice) return 0
      if (!aHasPrice) return 1
      if (!bHasPrice) return -1
      return sortOrder === 'price-asc' ? aPrice! - bPrice! : bPrice! - aPrice!
    }
    return 0
  })

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          {isFilterOpen ? (
            <>
              <X className="h-5 w-5" />
              <span>Cerrar</span>
            </>
          ) : (
            <>
              <Filter className="h-5 w-5" />
              <span>Abrir</span>
            </>
          )}
        </button>
      </div>

      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <div className="lg:hidden bg-white p-4 rounded-lg shadow-sm">
          <CatalogFilters 
            categories={categories} 
            subcategories={subcategories} 
            items={catalogItems}
            initialCategory={initialCategory}
            initialSubcategory={initialSubcategory}
            onFilteredItemsChange={setFilteredItems}
          />
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <CatalogFilters 
            categories={categories} 
            subcategories={subcategories} 
            items={catalogItems}
            initialCategory={initialCategory}
            initialSubcategory={initialSubcategory}
            onFilteredItemsChange={setFilteredItems}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-semibold">Catálogo</h1>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger aria-label="Ordenar productos por" className="rounded-full border-0 bg-red-500 text-white font-medium px-5 hover:bg-red-600 transition-colors motion-reduce:transition-none [&_svg:not([class*='text-'])]:text-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Ordenar por</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="name-asc">Nombre: A–Z</SelectItem>
              <SelectItem value="name-desc">Nombre: Z–A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron productos que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedItems.map((item: Item) => <ItemCard key={item.catalogKey ?? item._id} item={item} />)}
          </div>
        )}
      </main>
    </div>
  )
} 
