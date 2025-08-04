'use client'

import { useState } from 'react'
import CatalogFilters from './CatalogFilters'
import ItemCard from './ItemCard'
import { Category, Subcategory, Item } from "../types";

export default function CatalogWrapper({ categories, subcategories, items }: { 
  categories: Category[]; 
  subcategories: Subcategory[]; 
  items: Item[] 
}) {
  const [filteredItems, setFilteredItems] = useState(items)

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64">
        <CatalogFilters 
          categories={categories} 
          subcategories={subcategories} 
          items={items}
          onFilteredItemsChange={setFilteredItems}
        />
      </aside>
      <main className="flex-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No se encontraron productos que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: Item) => <ItemCard key={item._id} item={item} />)}
          </div>
        )}
      </main>
    </div>
  )
} 