'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from 'framer-motion';
import styles from './brands-carousel.module.css';

const BRANDS = [
  { name: 'Rolls-Royce', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <rect x="25" y="10" width="50" height="80" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="45" textAnchor="middle" className={styles.logoTextInside} fontSize="18">R</text>
      <text x="50" y="65" textAnchor="middle" className={styles.logoTextInside} fontSize="18">R</text>
    </svg>
  )},
  { name: 'Bentley', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <path d="M10 50 Q30 30 50 50 Q70 70 90 50" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="55" textAnchor="middle" className={styles.logoTextInside} fontSize="14">B</text>
    </svg>
  )},
  { name: 'Lamborghini', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M40 40 Q50 60 60 40" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'Ferrari', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <path d="M40 80 Q50 20 60 40 L70 20 Q60 10 40 10" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'Bugatti', logo: (
    <svg viewBox="0 0 100 60" className={styles.svgLogo}>
      <ellipse cx="50" cy="30" rx="45" ry="25" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="38" textAnchor="middle" className={styles.logoTextInside} fontSize="12">BUGATTI</text>
    </svg>
  )},
  { name: 'McLaren', logo: (
    <svg viewBox="0 0 100 40" className={styles.svgLogo}>
      <text x="40" y="25" textAnchor="middle" className={styles.logoTextInside} fontSize="14" fontWeight="bold">McLAREN</text>
      <path d="M75 15 Q85 15 80 25" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'Mercedes-Benz', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50 10 L50 50 L15 70 M50 50 L85 70" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'BMW', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M50 10 L50 90 M10 50 L90 50" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'Audi', logo: (
    <svg viewBox="0 0 160 60" className={styles.svgLogo}>
      <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="60" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="90" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="120" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
  { name: 'Porsche', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <path d="M50 10 L80 30 L75 80 L50 95 L25 80 L20 30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="50" y="55" textAnchor="middle" className={styles.logoTextInside} fontSize="8">PORSCHE</text>
    </svg>
  )},
  { name: 'Aston Martin', logo: (
    <svg viewBox="0 0 120 40" className={styles.svgLogo}>
      <path d="M10 25 Q30 5 60 5 Q90 5 110 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 25 Q30 15 60 15 Q90 15 110 25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="60" y="30" textAnchor="middle" className={styles.logoTextInside} fontSize="10">ASTON MARTIN</text>
    </svg>
  )},
  { name: 'Maserati', logo: (
    <svg viewBox="0 0 100 100" className={styles.svgLogo}>
      <path d="M50 10 L50 90 M30 30 L70 30 M30 40 Q50 10 70 40" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )},
];

export default function BrandsCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoScroll({ playOnInit: true, speed: 0.6, stopOnInteraction: false })
  ]);

  return (
    <section className={styles.container}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <h2 className={styles.heading}>
            Featuring the World’s Most Prestigious Automotive Brands
          </h2>
        </motion.div>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.fadeLeft} />
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {/* Double the brands for seamless infinite scroll */}
            {[...BRANDS, ...BRANDS].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className={styles.emblaSlide}>
                <div className={styles.brandLogo}>
                  {brand.logo}
                  <span className={styles.logoName}>{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}
