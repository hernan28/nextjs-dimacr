import { Card } from "@/components/ui/card"
import { urlFor } from "@/sanity/image"
import Image from "next/image"
import Link from "next/link"
import { getItemDisplayName, hasValidDiscount } from "@/lib/utils"
import type { Item } from "../types"
export default function ItemCard({ item }: { item: Item }) {
  const imageUrl = item.catalogVariant?.image?.asset.url
    ?? (item.images?.[0] ? urlFor(item.images[0]).url() : undefined)
  const isDiscounted = !item.catalogVariant && hasValidDiscount(item)
  const displayName = getItemDisplayName(item)
  const variantLabel = item.catalogVariant?.color ?? item.catalogVariant?.mount
  const href = item.catalogVariant
    ? `/catalog/${item._id}?variant=${encodeURIComponent(item.catalogVariant._key)}`
    : `/catalog/${item._id}`
  const price = item.catalogVariant?.price ?? item.price
  return (
    <Link href={href}>
      <Card className="p-3 sm:p-4 hover:shadow-lg focus-within:border-red-500 transition-shadow duration-200 cursor-pointer h-full flex flex-col">
        <div className="h-40 relative flex-shrink-0">
          {imageUrl ? (
              // TODO: Use carrousel for images?
            <Image
              src={imageUrl} 
              fill
              quality={1}
              alt={displayName}
              className="object-contain rounded aspect-square"
            />
          ) : (
            <article className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400 rounded">No Image</article>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h3 aria-label="product title" className="font-semibold text-lg sm:text-lg line-clamp-2">
            {variantLabel ? `${displayName} - ${variantLabel}` : displayName}
          </h3>
          {item.description && (
            <p aria-label="product description" className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 overflow-hidden flex-1" style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical' 
            }}>
              {item.description}
            </p>
          )}
          {isDiscounted ? (
            <div aria-label="Precio con descuento" className="mt-2 sm:mt-3">
              <span className="text-sm text-gray-500 line-through">
                {item.price.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <p className="text-base sm:text-lg font-semibold text-red-600">
                {item.discountedPrice.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          ) : item.availabilityInquiry === true ? (
            <p className="text-base sm:text-lg font-semibold mt-2 sm:mt-3">Consultar disponibilidad</p>
          ) : typeof price === 'number' && Number.isFinite(price) ? (
                <p aria-label="Precio del producto" className="text-base sm:text-lg font-semibold mt-2 sm:mt-3">
                  {item.variantType === 'background' && 'Desde '}
                  {Number(price).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                ) : (
                <p className="text-base sm:text-lg font-semibold mt-2 sm:mt-3">Consultar disponibilidad</p>
          )}
        </div>
      </Card>
    </Link>
  )
} 
