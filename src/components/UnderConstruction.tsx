import { Construction } from 'lucide-react'

export default function UnderConstruction({ title }: { title: string }) {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white px-6 py-16 text-center">
      <Construction aria-hidden="true" className="mb-5 h-14 w-14 text-red-500" />
      <h1 className="text-2xl font-semibold text-gray-950 sm:text-3xl">{title}</h1>
      <p className="mt-3 text-gray-600">Sección en construcción</p>
    </section>
  )
}
