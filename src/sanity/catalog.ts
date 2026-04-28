import { client } from './client'

export async function fetchCatalogData() {
  return client.fetch(`{
    "categories": *[_type == "category"]{_id, title},
    "subcategories": *[_type == "subcategory"]{_id, title, category->{_id, title}},
    "items": *[_type == "item"]{_id, title, images[]{asset->{url}}, subcategory->{_id, title, category->{_id, title}}, price, description}
  }`).then(({ categories, subcategories, items }) => ({ categories, subcategories, items }))
}

export async function fetchItemById(id: string) {
  const item = await client.fetch(`*[_type == "item" && _id == $id][0]{
    _id, 
    title, 
    images[]{asset->{url}}, 
    subcategory->{_id, title, category->{_id, title}}, 
    price, 
    description,
    details,
    sku,
    peso,
    valor,
    unidad
  }`, { id })
  return item
} 