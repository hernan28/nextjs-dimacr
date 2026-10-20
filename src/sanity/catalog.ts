import { client } from './client'
import { rankSearchItems } from '@/lib/search'
import type { Item } from '@/app/types'

export async function fetchSearchItems(query: string): Promise<Item[]> {
  const items = await client.fetch<Item[]>(`*[_type == "item"]{_id, title, brand, images[]{asset->{url}}, price, availabilityInquiry, description}`)
  return rankSearchItems(items, query)
}

export async function fetchCatalogData() {
    const categories = await client.fetch(`*[_type == "category"]{_id, title}`)
    const subcategories = await client.fetch(`*[_type == "subcategory"]{_id, title, category->{_id, title}}`)
    const items = await client.fetch(`*[_type == "item"]{
      _id, title, brand, variantType,
      variants[]{_key, color, size, mount, price, image{asset->{url}}},
      images[]{asset->{url}},
      category->{_id, title},
      subcategory->{_id, title, category->{_id, title}},
      price, discountedPrice, availabilityInquiry, description
    }`)
    return { categories, subcategories, items }
  }

export async function fetchItemById(id: string) {
  const item = await client.fetch(`*[_type == "item" && _id == $id][0]{
    _id, 
    title, 
    brand,
    variantType,
    variants[]{_key, color, size, mount, price, image{asset->{url}}},
    images[]{asset->{url}}, 
    category->{_id, title},
    subcategory->{_id, title, category->{_id, title}}, 
    price, 
    discountedPrice,
    availabilityInquiry,
    description,
    descriptionLinks[]{_key, text, url},
    details,
    sku,
    peso,
    valor,
    unidad
  }`, { id })
  return item
} 
