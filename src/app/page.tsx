import MostSearched from '../components/mostSearched';
import AboutUs from "@/components/AboutUs"
import OurProducts from '@/components/ourProducts'
import HomeBanner from '@/components/HomeBanner';
import PromoBanner from '@/components/PromoBanner';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <HomeBanner />

      {/* Categories Section */}
      <MostSearched />

      {/* Products Section */}
      <OurProducts />

      {/* Promotional Banner */}
      <PromoBanner />

      {/* About Us Section */}
      <AboutUs />

    </main>
  );
};
