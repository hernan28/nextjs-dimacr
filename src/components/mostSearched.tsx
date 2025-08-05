"use client";

import Link from 'next/link'

const categories = [
    { name: 'Cámaras', slug: 'camaras', count: 120 },
    { name: 'Objetivos', slug: 'objetivos', count: 95 },
    { name: 'Trípodes y Soportes', slug: 'tripodes-y-soportes', count: 80 },
    { name: 'Fotografía de Pelicula', slug: 'fotografia-de-pelicula', count: 60 },
    { name: 'Iluminación', slug: 'iluminacion', count: 50 },
    { name: 'Almacenamiento', slug: 'almacenamiento', count: 30 },
    { name: 'Binoculares Y Telescopios', slug: 'binoculares-y-telescopios', count: 25 },
    { name: 'Energía', slug: 'energia', count: 20 },
    { name: 'Estuches y Maletines', slug: 'estuches-y-maletines', count: 15 },
    { name: 'Impresoras y Escáneres', slug: 'impresoras-y-escaneres', count: 10 },
    { name: 'Proyección', slug: 'proyeccion', count: 5 },
]

export default function MostSearched() {
    // Sort categories by count descending and take top 5
    const topCategories = categories.sort((a, b) => b.count - a.count).slice(0, 4)

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
                    {topCategories.map((topCat) => (
                        <Link
                            key={topCat.slug}
                            href={`/${topCat.slug}`}
                            className="group relative flex min-h-[180px] sm:min-h-[220px] w-full flex-col justify-end overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                        >
                            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gray-200 text-lg sm:text-2xl text-gray-400">
                                {topCat.name}
                            </div>
                            <div className="relative z-10 bg-gradient-to-t from-black/70 to-transparent p-3 sm:p-4 flex items-center justify-between">
                                <span className="drop-shadow text-base sm:text-lg font-semibold text-white">
                                    {topCat.name}
                                </span>
                                <span className="ml-2 text-xs bg-white/80 text-gray-700 rounded px-2 py-1 font-mono">{topCat.count} búsquedas</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

