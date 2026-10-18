'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import SearchForm from './SearchForm'
import { fetchSuggestedSearches } from '@/sanity/searchSettingsQuery'

const defaultSearches = ['Cámaras', 'Binoculares', 'Lentes', 'Maletín', 'Trípode']

export default function SearchOverlay({ mobile = false }: { mobile?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [suggestedSearches, setSuggestedSearches] = useState(defaultSearches)

  useEffect(() => {
    let active = true
    fetchSuggestedSearches()
      .then(terms => {
        const searches = terms?.filter(term => typeof term === 'string' && term.trim()).map(term => term.trim())
        if (active && searches?.length) setSuggestedSearches([...new Set(searches)].slice(0, 10))
      })
      .catch(error => console.error('No se pudieron cargar las búsquedas sugeridas:', error))
    return () => { active = false }
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Abrir búsqueda"
        aria-haspopup="dialog"
        onClick={() => {
          dialogRef.current?.showModal()
          dialogRef.current?.querySelector('input')?.focus()
        }}
        className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
      >
        {!mobile && <span className="font-medium">Buscar</span>}
        <Search className={mobile ? 'h-5 w-5' : 'h-4 w-4'} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Buscar productos"
        onClick={event => {
          if (event.target === event.currentTarget) dialogRef.current?.close()
        }}
        className="search-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 sm:p-8 text-black backdrop:bg-black/20 backdrop:backdrop-blur-md open:flex open:items-start open:justify-center"
      >
        <div className="search-panel relative w-full max-w-7xl max-h-full overflow-y-auto rounded-2xl bg-white px-6 pt-4 pb-12 sm:px-12 sm:pb-14">
          <div className="flex justify-center">
            <Image src="/Dima RGB 500.png" alt="Dima" width={135} height={41} />
          </div>
          <button
            type="button"
            aria-label="Cerrar búsqueda"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 motion-reduce:transition-none sm:right-5"
          >
            <X className="h-8 w-8" strokeWidth={1.5} />
          </button>
          <div className="mx-auto mt-10 sm:mt-14 max-w-xl">
            <SearchForm />
            <div className="mt-10 px-4 sm:px-12">
              <h2 className="font-medium mb-3">Búsquedas sugeridas</h2>
              <ul className="space-y-1 text-sm text-gray-600">
                {suggestedSearches.map(term => (
                  <li key={term}>
                    <Link href={`/search?q=${encodeURIComponent(term)}`} onClick={() => dialogRef.current?.close()} className="hover:text-red-500 transition-colors duration-200 motion-reduce:transition-none">
                      {term}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
