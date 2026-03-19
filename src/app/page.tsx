import Hero from '@/components/sections/Hero';
import Brands from '@/components/sections/Brands';
import Collection from '@/components/sections/Collection';
import Services from '@/components/sections/Services';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <Collection />
      <Services />
      <Footer />
    </main>
  );
}
