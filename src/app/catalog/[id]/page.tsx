import { fetchItemById } from '@/sanity/catalog'
import { notFound } from 'next/navigation'
import ItemDetail from '@/app/catalog/[id]/ItemDetail'

interface ItemPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    variant?: string | string[]
  }>
}

export default async function ItemPage({ params, searchParams }: ItemPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  const item = await fetchItemById(id)
  
  if (!item) {
    notFound()
  }

  const initialVariantKey = typeof query.variant === 'string' ? query.variant : undefined

  return <ItemDetail item={item} initialVariantKey={initialVariantKey} />
}