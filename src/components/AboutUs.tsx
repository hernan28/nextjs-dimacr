import Image from "next/image"

const AboutUs = () => {
  return (
    <section className="py-16 px-8">
      {/* TÍTULO FUERA DE LA GRID */}
      <div className="max-w-7xl mx-auto mb-8">
        <p className="text-base text-gray-500">¿Quiénes somos?</p>
        <h2 className="text-5xl text-gray-900 mt-2">Conócenos</h2>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-stretch">


        {/* IZQUIERDA: SOLO imagen */}
        <div className="h-[500px] relative w-full">
            <Image 
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800" 
                alt="Man in an apron"
                fill
                className="rounded-xl object-cover"
            />
        </div>

        {/* DERECHA: texto y botón */}
        <div className="bg-[#B89F6B] p-6 pt-30 rounded-xl text-white h-[500px] flex flex-col gap-y-2">
            <p className="text-sm">Trayectoria</p>

            <h3 className="text-[32px] leading-[36px] text-black font-medium" >
                Contamos con más de 53 años de experiencia en el mercado
            </h3>

            <p className=" text-base font-normal leading-relaxed text-white">
                Dima es una pequeña empresa fundada en 1972. Desde ese momento, la empresa se ha dedicado a la importación, distribución y venta de equipos y suministros para la fotografía.
            </p>

            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-20 rounded-full w-auto text-sm tracking-wide self-start">
                LEER MÁS
            </button>
        </div>
      </div>
    </section>
  )
}

export default AboutUs