import { client } from './client'

export async function fetchCatalogData() {
    const categories = await client.fetch(`*[_type == "category"]{_id, title}`)
    const subcategories = await client.fetch(`*[_type == "subcategory"]{_id, title, category->{_id, title}}`)
    const items = await client.fetch(`*[_type == "item"]{_id, title, images[]{asset->{url}}, subcategory->{_id, title, category->{_id, title}}, price, description}`)
    return { categories, subcategories, items }
  } 