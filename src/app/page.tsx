import Hero from '@/components/sections/Hero';
import Collection from '@/components/sections/Collection';
import Services from '@/components/sections/Services';
import Philosophy from '@/components/sections/Philosophy';
import Inquiry from '@/components/sections/Inquiry';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      
      <div className={styles.sectionSpacer} />
      <Collection />
      
      <div className={styles.sectionSpacer} />
      <Services />
      
      <div className={styles.sectionSpacer} />
      <Philosophy />
      
      <div className={styles.sectionSpacer} />
      <Inquiry />
      
      <div className={styles.sectionSpacer} />
      <Footer />
    </main>
  );
}
