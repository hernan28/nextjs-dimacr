import { client } from './client'
import { rankSearchItems } from '@/lib/search'
import type { Item } from '@/app/types'

export async function fetchSearchItems(query: string): Promise<Item[]> {
  const items = await client.fetch<Item[]>(`*[_type == "item"]{_id, title, images[]{asset->{url}}, price, availabilityInquiry, description}`)
  return rankSearchItems(items, query)
}

export async function fetchCatalogData() {
    const categories = await client.fetch(`*[_type == "category"]{_id, title}`)
    const subcategories = await client.fetch(`*[_type == "subcategory"]{_id, title, category->{_id, title}}`)
    const items = await client.fetch(`*[_type == "item"]{_id, title, images[]{asset->{url}}, subcategory->{_id, title, category->{_id, title}}, price, discountedPrice, availabilityInquiry, description}`)
    return { categories, subcategories, items }
  }

export async function fetchItemById(id: string) {
  const item = await client.fetch(`*[_type == "item" && _id == $id][0]{
    _id, 
    title, 
    images[]{asset->{url}}, 
    subcategory->{_id, title, category->{_id, title}}, 
    price, 
    discountedPrice,
    availabilityInquiry,
    description,
    details,
    sku,
    peso,
    valor,
    unidad
  }`, { id })
  return item
} 
