import { Card } from "@/components/ui/card"
import { urlFor } from "@/sanity/image"
import Image from "next/image"

// TODO Use item type from sanity?
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ItemCard({ item }: { item: any }) {
const imageUrl = urlFor(item.images[0]).url()
  return (
    <Card className="p-4">
      <div className="aspect-w-1 aspect-h-1 mb-2">
        {item.images?.length > 0 ? (
            // TODO: Use carrousel for images?
          <Image src={imageUrl} width={300} height={300} alt={item.title} className="object-cover w-full h-full rounded" />
        ) : (
          <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <h3 className="font-semibold">{item.title}</h3>
    </Card>
  )
} 