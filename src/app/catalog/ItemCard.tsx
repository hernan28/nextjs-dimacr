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
      <Card className="p-3 sm:p-4 hover:shadow-lg focus-within:border-red-500 transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        <div className="h-40 relative flex-shrink-0">
          {item.images?.length > 0 ? (
              // TODO: Use carrousel for images?
            <Image
              src={imageUrl} 
              fill
              quality={1}
              alt={item.title} 
              className="object-contain rounded aspect-square"
            />
          ) : (
            <article className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 rounded">No Image</article>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h3 aria-label="product title" className="font-semibold text-lg sm:text-lg line-clamp-2">{item.title}</h3>
          {item.description && (
            <p aria-label="product description" className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 overflow-hidden flex-1" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {item.description}
            </p>
          )}
          {item.price !== undefined && item.price !== null && (
            <data value={item.price} aria-label="Precio del producto" className="text-base sm:text-lg font-semibold mt-2 sm:mt-3">
              {Number(item.price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits:2 })}
            </data>
          )}
        </div>
      </Card>
    </Link>
  )
} 
