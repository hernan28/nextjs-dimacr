import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import aboutUsQuery from "@/sanity/aboutUsQuery"
import { urlFor } from "@/sanity/image"

const AboutUs = async () => {
  const data = await client.fetch(aboutUsQuery)
  // FOLLOW THIS PATTERN FOR IMAGES:
  const imageUrl = urlFor(data.image).url()
  return (
    <section className="w-full py-8 sm:py-16">
      {/* TÍTULO FUERA DE LA GRID */}
      <div className="mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-500">{data.aboutHeader}</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-2">{data.aboutTitle}</h2>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[2fr_3fr]">

        {/* IZQUIERDA: SOLO imagen */}
        <div className="relative h-[240px] w-full sm:h-[300px] lg:h-[340px]">
          <Image 
            src={imageUrl}
            alt="Imagen de la sección About Us"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* DERECHA: texto y botón */}
        <div className="flex min-h-[240px] flex-col items-start justify-center gap-y-2 rounded-xl bg-[#939598] p-6 text-left text-[#231F20] sm:min-h-[300px] sm:p-8 lg:min-h-[340px] lg:p-10">
          <p className="text-sm sm:text-base">{data.trajectoryLabel}</p>

          <h3 className="max-w-2xl whitespace-pre-line text-left text-lg font-medium leading-snug sm:text-xl lg:text-2xl">
            {data.description}
          </h3>

          <div className="mt-3 flex flex-wrap gap-3 sm:mt-4">
            <Link href="/conocenos" className="rounded-full bg-[#ED1C24] px-6 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#c81920] motion-reduce:transition-none sm:py-3 sm:text-sm">
            {data.buttonText}
            </Link>
            {data.mapsUrl && (
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#ED1C24] px-6 py-2 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[#c81920] motion-reduce:transition-none sm:py-3 sm:text-sm"
              >
                Obtener dirección
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
