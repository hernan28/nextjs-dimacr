import Image from "next/image"
import { client } from "@/sanity/client"
import aboutUsQuery from "@/sanity/aboutUsQuery"
import { urlFor } from "@/sanity/image"

const AboutUs = async () => {
  const data = await client.fetch(aboutUsQuery)
  // FOLLOW THIS PATTERN FOR IMAGES:
  const imageUrl = urlFor(data.image).url()
  return (
    <section className="py-16 px-8">
      {/* TÍTULO FUERA DE LA GRID */}
      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-base text-gray-500">{data.aboutHeader}</p>
        <h2 className="text-5xl text-gray-900 mt-2">{data.aboutTitle}</h2>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-stretch">

        {/* IZQUIERDA: SOLO imagen */}
        <div className="h-[500px] relative w-full">
          <Image 
            src={imageUrl}
            alt="Imagen de la sección About Us"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* DERECHA: texto y botón */}
        <div className="bg-[#B89F6B] p-6 pt-30 rounded-xl text-white h-[500px] flex flex-col gap-y-2">
          <p className="text-sm">{data.trajectoryLabel}</p>

          <h3 className="text-[32px] leading-[36px] text-black font-medium">
            {data.description}
          </h3>

          <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-20 rounded-full w-auto text-sm tracking-wide self-start">
            {data.buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUs