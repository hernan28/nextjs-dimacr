import Image from 'next/image'
import type { Metadata } from 'next'
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Store,
  Wrench,
} from 'lucide-react'
import { client } from '@/sanity/client'
import authorizedPartnersQuery from '@/sanity/authorizedPartnersQuery'

export const metadata: Metadata = {
  title: 'Conócenos | Dima',
  description:
    'Conoce la historia de Dima y descubre las marcas que representamos.',
}

type PartnerCategory = 'distributor' | 'serviceCenter' | 'agent'

type AuthorizedPartner = {
  _id: string
  name: string
  description?: string
  category: PartnerCategory
  website: string
  logoUrl?: string
}

const partnerSections: {
  category: PartnerCategory
  title: string
  description: string
  Icon: typeof BadgeCheck
}[] = [
  {
    category: 'distributor',
    title: 'Distribuidor autorizado',
    description: 'Marcas que distribuimos oficialmente en Costa Rica.',
    Icon: BadgeCheck,
  },
  {
    category: 'serviceCenter',
    title: 'Centro de servicio autorizado',
    description: 'Soporte técnico respaldado por las marcas que representamos.',
    Icon: Wrench,
  },
  {
    category: 'agent',
    title: 'Agente autorizado',
    description: 'Representantes oficiales de marcas y soluciones especializadas.',
    Icon: Store,
  },
]

export default async function ConocenosPage() {
  const partners = await client.fetch<AuthorizedPartner[]>(authorizedPartnersQuery)

  return (
    <div className="mx-auto max-w-6xl space-y-16 py-6 sm:space-y-24 sm:py-10">
      <section aria-labelledby="partners-title">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Marcas que nos respaldan
          </p>
          <h2 id="partners-title" className="text-3xl font-semibold text-gray-950 sm:text-4xl">
            Nuestros aliados autorizados
          </h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            Conoce las marcas y servicios que forman parte de la familia Dima.
          </p>
        </div>

        <div className="space-y-10">
          {partnerSections.map(({ category, title, description, Icon }) => {
            const sectionPartners = partners.filter((partner) => partner.category === category)

            return (
              <section
                key={category}
                aria-labelledby={`partners-${category}`}
                className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8"
              >
                <div className="mb-6 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 id={`partners-${category}`} className="text-xl font-semibold text-gray-950">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
                  </div>
                </div>

                {sectionPartners.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sectionPartners.map((partner) => (
                      <a
                        key={partner._id}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-h-48 flex-col rounded-2xl border border-gray-200 bg-gray-50 p-5 transition hover:-translate-y-1 hover:border-red-200 hover:bg-white hover:shadow-lg"
                      >
                        <div className="mb-5 flex h-16 items-center">
                          {partner.logoUrl ? (
                            <Image
                              src={partner.logoUrl}
                              alt={`${partner.name} logo`}
                              width={180}
                              height={64}
                              className="h-16 w-auto max-w-44 object-contain object-left"
                            />
                          ) : (
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                              <Building2 aria-hidden="true" className="h-7 w-7" />
                            </span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 font-semibold text-gray-950">
                          {partner.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            className="h-4 w-4 text-red-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                        {partner.description && (
                          <span className="mt-2 text-sm leading-relaxed text-gray-600">
                            {partner.description}
                          </span>
                        )}
                        <span className="mt-auto pt-4 text-sm font-medium text-red-600">
                          Visitar sitio web
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl bg-gray-50 px-4 py-5 text-sm text-gray-500">
                    Estamos actualizando esta sección. Pronto encontrarás más información.
                  </p>
                )}
              </section>
            )
          })}
        </div>
      </section>

      <section
        aria-labelledby="history-title"
        className="rounded-3xl bg-[#efe9dd] px-6 py-10 sm:px-12 sm:py-14"
      >
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            Desde 1972
          </p>
          <h2 id="history-title" className="text-3xl font-semibold text-gray-950 sm:text-4xl">
            Una historia detrás de cada imagen
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-700 sm:text-lg">
            Dima es una pequeña empresa fundada en 1972. Desde ese momento, nos hemos dedicado a
            la importación, distribución y venta de equipos y suministros para la fotografía.
          </p>
        </div>
      </section>
    </div>
  )
}
