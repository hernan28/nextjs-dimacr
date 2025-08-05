import Image from "next/image"
import { client } from "@/sanity/client"
import aboutUsQuery from "@/sanity/aboutUsQuery"
import { urlFor } from "@/sanity/image"

const AboutUs = async () => {
  const data = await client.fetch(aboutUsQuery)
  // FOLLOW THIS PATTERN FOR IMAGES:
  const imageUrl = urlFor(data.image).url()
  return (
    <section className="py-8 sm:py-16 px-4 sm:px-8">
      {/* TÍTULO FUERA DE LA GRID */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-500">{data.aboutHeader}</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mt-2">{data.aboutTitle}</h2>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-stretch">

        {/* IZQUIERDA: SOLO imagen */}
        <div className="h-[300px] sm:h-[400px] lg:h-[500px] relative w-full">
          <Image 
            src={imageUrl}
            alt="Imagen de la sección About Us"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* DERECHA: texto y botón */}
        <div className="bg-[#B89F6B] p-4 sm:p-6 pt-20 sm:pt-30 rounded-xl text-white h-[300px] sm:h-[400px] lg:h-[500px] flex flex-col gap-y-2">
          <p className="text-xs sm:text-sm">{data.trajectoryLabel}</p>

          <h3 className="text-xl sm:text-2xl lg:text-[32px] leading-tight lg:leading-[36px] text-black font-medium">
            {data.description}
          </h3>

          <button className="mt-4 sm:mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-8 sm:px-20 rounded-full w-auto text-xs sm:text-sm tracking-wide self-start transition-colors">
            {data.buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUs