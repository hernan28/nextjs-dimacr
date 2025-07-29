import { fetchItemById } from '@/sanity/catalog'
import { notFound } from 'next/navigation'
import ItemDetail from '@/app/catalog/[id]/ItemDetail'

interface ItemPageProps {
  params: {
    id: string
  }
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params
  const item = await fetchItemById(id)
  
  if (!item) {
    notFound()
  }

  return <ItemDetail item={item} />
} 