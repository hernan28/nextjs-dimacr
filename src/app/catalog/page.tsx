import { fetchCatalogData } from '@/sanity/catalog'
import CatalogWrapper from './CatalogWrapper'

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ category?: string; subcategory?: string; search?: string }> }) {
  const { categories, subcategories, items } = await fetchCatalogData()
  const params = await searchParams
  
  return <CatalogWrapper categories={categories} subcategories={subcategories} items={items} searchParams={params} />
} 