import { fetchCatalogData } from '@/sanity/catalog'
import CatalogWrapper from './CatalogWrapper'
import type { Subcategory } from '../types'

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ subcategory?: string | string[] }>
}) {
  const { subcategory } = await searchParams
  const { categories, subcategories, items } = await fetchCatalogData()

  const initialSubcategory = typeof subcategory === 'string' && subcategories.some(
    (sub: Subcategory) => sub._id === subcategory
  ) ? subcategory : 'unassigned'

  return (
    <CatalogWrapper
      key={initialSubcategory}
      categories={categories}
      subcategories={subcategories}
      items={items}
      initialSubcategory={initialSubcategory}
    />
  )
} 
