import { fetchCatalogData } from '@/sanity/catalog'
import CatalogWrapper from '@/app/catalog/CatalogWrapper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CatalogPage() {
  const { categories, subcategories, items } = await fetchCatalogData()
  
  return <CatalogWrapper categories={categories} subcategories={subcategories} items={items} />
} 