'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useState, useEffect, useMemo } from 'react'
import { Category, Subcategory, Item } from "../types";

export default function CatalogFilters({ 
  categories = [], 
  subcategories = [], 
  items = [],
  initialCategory = 'unassigned',
  initialSubcategory = 'unassigned',
  onFilteredItemsChange 
}: { 
  categories: Category[]; 
  subcategories: Subcategory[]; 
  items: Item[];
  initialCategory?: string;
  initialSubcategory?: string;
  onFilteredItemsChange: (filteredItems: Item[]) => void;
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initialCategory)
  const [subcategory, setSubcategory] = useState(initialSubcategory)
  const [brand, setBrand] = useState('unassigned')
  const [color, setColor] = useState('unassigned')
  const [mount, setMount] = useState('unassigned')

  // Filter subcategories based on selected category
  const filteredSubcategories = useMemo(() => {
    if (category === 'unassigned') return subcategories
    return subcategories.filter(sub => sub.category?._id === category)
  }, [subcategories, category])

  const showColorFilter = subcategories.some(
    sub =>
      sub._id === subcategory &&
      sub.title.trim().toLocaleLowerCase() === 'fondos de estudio',
  )
  const showMountFilter = categories.some(
    cat =>
      cat._id === category &&
      cat.title.trim().toLocaleLowerCase() === 'objetivos',
  )

  const brands = useMemo(() => {
    const uniqueBrands = new Map<string, string>()

    items.forEach(item => {
      const value = item.brand?.trim()
      if (value) uniqueBrands.set(value.toLocaleLowerCase(), value)
    })

    return [...uniqueBrands.values()].sort((a, b) => a.localeCompare(b, 'es'))
  }, [items])

  const colors = useMemo(
    () => [...new Set(items.map(item => item.catalogVariant?.color).filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b, 'es')),
    [items],
  )
  const mounts = useMemo(
    () => [...new Set(items.map(item => item.catalogVariant?.mount).filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b, 'es')),
    [items],
  )

  // Filter items based on search, category, and subcategory
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search filter
      const matchesSearch = !search || 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.brand?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())

      // Category filter
      const matchesCategory = category  === 'unassigned' || 
        item.category?._id === category ||
        item.subcategory?.category?._id === category

      // Subcategory filter
      const matchesSubcategory = subcategory  === 'unassigned' || 
        item.subcategory?._id === subcategory

      // Brand filter
      const matchesBrand = brand === 'unassigned' ||
        item.brand?.trim().toLocaleLowerCase() === brand.toLocaleLowerCase()

      const matchesColor = !showColorFilter || color === 'unassigned' ||
        item.catalogVariant?.color?.toLocaleLowerCase() === color.toLocaleLowerCase()
      const matchesMount = !showMountFilter || mount === 'unassigned' ||
        item.catalogVariant?.mount?.toLocaleLowerCase() === mount.toLocaleLowerCase()

      return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesColor && matchesMount
    })
  }, [items, search, category, subcategory, brand, color, mount, showColorFilter, showMountFilter])

  // Notify parent component when filtered items change
  useEffect(() => {
    onFilteredItemsChange(filteredItems)
  }, [filteredItems, onFilteredItemsChange])

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
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value)
            setSubcategory('unassigned')
          }}
        >
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
        <Select value={brand} onValueChange={setBrand}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las marcas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="unassigned">Todas las marcas</SelectItem>
            {brands.map(brandName => (
              <SelectItem key={brandName} value={brandName}>
                {brandName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {showColorFilter && colors.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color de fondo</label>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los colores" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Todos los colores</SelectItem>
              {colors.map(colorName => (
                <SelectItem key={colorName} value={colorName}>{colorName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showMountFilter && mounts.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de montura</label>
          <Select value={mount} onValueChange={setMount}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas las monturas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unassigned">Todas las monturas</SelectItem>
              {mounts.map(mountName => (
                <SelectItem key={mountName} value={mountName}>{mountName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results count */}
      <div className="pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          {filteredItems.length} producto{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
        </p>
      </div>
    </form>
  )
}
