import { fetchCatalogData } from '@/sanity/catalog'
import CatalogWrapper from './CatalogWrapper'
import type { Subcategory } from '../types'

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; subcategory?: string | string[] }>
}) {
  const { category, subcategory } = await searchParams
  const { categories, subcategories, items } = await fetchCatalogData()

  const initialCategory = typeof category === 'string' && categories.some(
    (cat: { _id: string }) => cat._id === category
  ) ? category : 'unassigned'
  const initialSubcategory = typeof subcategory === 'string' && subcategories.some(
    (sub: Subcategory) => sub._id === subcategory
  ) ? subcategory : 'unassigned'

  return (
    <CatalogWrapper
      key={`${initialCategory}:${initialSubcategory}`}
      categories={categories}
      subcategories={subcategories}
      items={items}
      initialCategory={initialCategory}
      initialSubcategory={initialSubcategory}
    />
  )
} 
