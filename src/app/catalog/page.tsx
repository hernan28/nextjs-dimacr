import { fetchCatalogData } from '@/sanity/catalog'
import CatalogWrapper from './CatalogWrapper'

export default async function CatalogPage() {
  const { categories, subcategories, items } = await fetchCatalogData()
  
  return <CatalogWrapper categories={categories} subcategories={subcategories} items={items} />
} 