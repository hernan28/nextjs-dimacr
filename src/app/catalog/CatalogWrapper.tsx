'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import CatalogFilters from './CatalogFilters'
import ItemCard from './ItemCard'
import { Category, Subcategory, Item } from "../types";

export default function CatalogWrapper({ categories, subcategories, items }: { 
  categories: Category[]; 
  subcategories: Subcategory[]; 
  items: Item[] 
}) {
  const [filteredItems, setFilteredItems] = useState(items)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
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
        <div className="lg:hidden bg-white p-4 rounded-lg shadow-sm border">
          <CatalogFilters 
            categories={categories} 
            subcategories={subcategories} 
            items={items}
            onFilteredItemsChange={setFilteredItems}
          />
        </div>
      )}

      {/* Desktop Filter Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white p-4 rounded-lg shadow-sm border sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <CatalogFilters 
            categories={categories} 
            subcategories={subcategories} 
            items={items}
            onFilteredItemsChange={setFilteredItems}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron productos que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item: Item) => <ItemCard key={item._id} item={item} />)}
          </div>
        )}
      </main>
    </div>
  )
} 