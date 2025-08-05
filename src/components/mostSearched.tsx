"use client";

import Link from 'next/link'
import {useEffect, useState} from 'react'
import {createClient} from 'next-sanity'
import Image from 'next/image'

const client = createClient({
    projectId: '9mitn2oh',
    dataset: 'production',
    apiVersion: '2024-06-01',
    useCdn: true,
})

type Category = {
    _id: string
    title: string
    slug?: { current: string }
    image?: {
        asset: {
            _ref: string
            url?: string
        }
    }
    // ...mostSearched is not defined here, it comes from Sanity
}

function getSanityImageUrl(image: any) {
    if (!image?.asset?._ref) return null
    const [, id, dim, format] = image.asset._ref.split('-')
    return `https://cdn.sanity.io/images/9mitn2oh/production/${id}-${dim}.${format}`
}

export default function MostSearched() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        client.fetch(
            `*[_type == "category"]{
                _id,
                title,
                slug,
                mostSearched,
                image
            }`
        ).then((data: any[]) => {
            setCategories(data)
            setLoading(false)
        }).catch((err) => {
            console.error("Sanity fetch error:", err)
            setLoading(false)
        })
    }, [])

    // Only categories with mostSearched = true
    const topCategories = categories.filter(
        // @ts-ignore
        cat => cat.mostSearched === true
    )

    if (loading) {
        return <div>Cargando categorías...</div>
    }

    return (
        <section className="bg-gray-50 py-12 px-4 rounded-xl">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col gap-2">
                    <span className="text-gray-500 text-sm font-mono">A un click</span>
                    <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                        Más buscado por categoría
                    </h2>
                    <p className="text-gray-600 max-w-xl">
                        Ofrecemos gran variedad de equipos de fotografía en Costa Rica con envíos gratis en el GAM.
                    </p>
                    <button
                        className="mt-2 w-fit border border-red-500 text-red-500 hover:bg-red-50 rounded px-4 py-2 font-semibold transition"
                    >
                        VER TODOS
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {topCategories.map((cat) => {
                        const imageUrl = getSanityImageUrl(cat.image)
                        return (
                            <Link
                                key={cat._id}
                                href={`/${cat.slug?.current || ''}`}
                                className="group relative flex min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                            >
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={cat.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-200 text-2xl text-gray-400">
                                        {cat.title}
                                    </div>
                                )}
                                <div className="relative z-10 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
                                    <span className="drop-shadow text-lg font-semibold text-white">
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




