import Image from 'next/image'
import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'

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
    <section className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-8 rounded-xl mx-4 sm:mx-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8 flex flex-col gap-2">
          <span className="text-gray-500 text-sm font-mono">A un click</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            Más buscado por categoría
          </h2>
          <p className="text-gray-600 max-w-xl text-sm sm:text-base">
            Ofrecemos gran variedad de equipos de fotografía en Costa Rica con envíos gratis en el GAM.
          </p>
          <button
            className="mt-2 w-fit border border-red-500 text-red-500 hover:bg-red-50 rounded px-4 py-2 font-semibold transition text-sm sm:text-base"
          >
            VER TODOS
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat: any, idx: number) => {
            const isLast = idx === categories.length - 1
            const isOdd = categories.length % 2 === 1
            // On large screens, if odd number and last, span 2 columns
            const colSpan =
              isLast && isOdd && categories.length > 1
                ? 'lg:col-span-2'
                : ''
            return (
              <div
                key={cat._id}
                className={`group relative flex min-h-[180px] sm:min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg ${colSpan}`}
              >
                {/* Image section */}
                <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-200">
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
                <div className="relative z-10 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 flex items-center justify-between">
                  <span className="drop-shadow text-base sm:text-lg font-semibold text-white">
                    {cat.title}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
