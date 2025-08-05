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
      <Card className="p-3 sm:p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        <div className="w-full h-48 sm:h-56 lg:h-64 mb-3 sm:mb-4 relative flex-shrink-0">
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
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">{item.title}</h3>
          {item.description && (
            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 overflow-hidden flex-1" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {item.description}
            </p>
          )}
          {item.price !== undefined && item.price !== null && (
            <p className="text-base sm:text-lg font-bold text-green-600 mt-2 sm:mt-3">${Number(item.price).toLocaleString()}</p>
          )}
        </div>
      </Card>
    </Link>
  )
} 