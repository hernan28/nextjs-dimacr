'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState, useEffect, useMemo } from 'react'
import { Category, Subcategory, Item } from "../types";

export default function CatalogFilters({ 
  categories = [], 
  subcategories = [], 
  items = [],
  onFilteredItemsChange 
}: { 
  categories: Category[]; 
  subcategories: Subcategory[]; 
  items: Item[];
  onFilteredItemsChange: (filteredItems: Item[]) => void;
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('unassigned')
  const [subcategory, setSubcategory] = useState('unassigned')

  // Filter subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    if (category === 'unassigned') return subcategories
    return subcategories.filter(sub => sub.category?._id === category)
  }, [subcategories, category])

  // Filter items based on search, category, and subcategory
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())

      // Category filter
      const matchesCategory = category  === 'unassigned' || 
        item.subcategory?.category?._id === category

      // Subcategory filter
      const matchesSubcategory = subcategory  === 'unassigned' || 
        item.subcategory?._id === subcategory

      return matchesSearch && matchesCategory && matchesSubcategory
    })
  }, [items, search, category, subcategory])

  // Notify parent component when filtered items change
  useEffect(() => {
    onFilteredItemsChange(filteredItems)
  }, [filteredItems, onFilteredItemsChange])

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory('unassigned')
  }, [category])

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Todas las categorías</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat._id} value={cat._id}>{cat.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subcategoría</label>
        <Select value={subcategory} onValueChange={setSubcategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las subcategorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Todas las subcategorías</SelectItem>
            {filteredSubcategories.map(sub => (
              <SelectItem key={sub._id} value={sub._id}>{sub.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {filteredItems.length} producto{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
        </p>
      </div>
    </form>
  )
}
