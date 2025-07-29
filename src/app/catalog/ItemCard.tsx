import { Card } from "@/components/ui/card"
import { urlFor } from "@/sanity/image"
import Image from "next/image"
import Link from "next/link"

// TODO Use item type from sanity?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ItemCard({ item }: { item: any }) {
const imageUrl = urlFor(item.images[0]).url()
  return (
    <Link href={`/catalog/${item._id}`}>
      <Card className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="w-full h-64 mb-2 relative">
          {item.images?.length > 0 ? (
              // TODO: Use carrousel for images?
            <Image 
              src={imageUrl} 
              fill
              alt={item.title} 
              className="object-cover rounded" 
            />
          ) : (
            <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 rounded">No Image</div>
          )}
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-gray-600 mt-1 overflow-hidden" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' 
          }}>
            {item.description}
          </p>
        )}
        {item.price !== undefined && item.price !== null && (
          <p className="text-lg font-bold text-green-600 mt-2">${Number(item.price).toLocaleString()}</p>
        )}
      </Card>
    </Link>
  )
} 