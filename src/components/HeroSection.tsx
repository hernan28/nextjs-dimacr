import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/OptimizelySmallDesktopWebP.webp" // or use a remote URL or Sanity image
        alt="Nikon Hero"
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Capture Life with Precision
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-6">
          Official Nikon Distributor — Discover the world through the lens of
          excellence.
        </p>
        <Link
          href="/shop"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
