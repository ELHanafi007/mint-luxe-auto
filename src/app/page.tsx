import Hero from '@/components/sections/Hero';
import Collection from '@/components/sections/Collection';
import Services from '@/components/sections/Services';
import BrandsCarousel from '@/components/blocks/brands-carousel';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Collection />
      <Services />
      <div className="py-24">
        <BrandsCarousel />
      </div>
      <Footer />
    </main>
  );
}
