import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'

interface Category {
  _id: string
  title: string
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
}

// Show all matching categories, not just 4
const mostSearchedCategoriesQuery = `
  *[_type == "category" && mostSearched == true] | order(_createdAt desc){
    _id,
    title,
    image
  }
`

export default async function MostSearched() {
  const categories = await client.fetch(mostSearchedCategoriesQuery)

  return (
    <section className="w-full rounded-xl bg-gray-50 px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8 flex flex-col gap-2">
          <span className="text-gray-500 text-sm">A un click</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Más buscado por categoría
          </h2>
          <p className="text-gray-600 max-w-xl text-sm sm:text-base">
            Ofrecemos gran variedad de equipos de fotografía en Costa Rica con envíos gratis en el GAM.
          </p>
          <Link
            href="/catalog"
            className="mt-2 w-fit border border-red-500 text-red-500 hover:bg-red-50 rounded px-4 py-2 font-semibold transition text-sm sm:text-base"
          >
            VER TODO
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat: Category, idx: number) => {
            const isLast = idx === categories.length - 1
            const isOdd = categories.length % 2 === 1
            // On large screens, if odd number and last, span 2 columns
            const colSpan =
              isLast && isOdd && categories.length > 1
                ? 'lg:col-span-2'
                : ''
            return (
              <Link
                href={`/catalog?category=${encodeURIComponent(cat._id)}`}
                aria-label={`Ver productos de ${cat.title}`}
                key={cat._id}
                className={`group flex min-h-[180px] w-full flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 sm:min-h-[220px] ${colSpan}`}
              >
                <div className="relative flex min-h-[180px] w-full flex-1 items-center justify-center bg-white sm:min-h-[220px]">
                  {cat.image ? (
                    <Image
                      src={urlFor(cat.image).width(400).height(400).url()}
                      alt={cat.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-lg sm:text-2xl text-gray-400">{cat.title}</span>
                  )}
                </div>
                <div className="flex min-h-12 items-center px-3 py-3 sm:px-4">
                  <span className="text-base font-semibold text-[#808080] sm:text-lg">
                    {cat.title}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
