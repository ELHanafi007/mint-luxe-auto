'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Section, Container } from '@/components/primitives/Layout';
import { revealSubtle, MINT_EASE } from '@/lib/motion-primitives';
import styles from './Philosophy.module.css';

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Subliminal parallax

  return (
    <Section ref={containerRef} id="philosophy" className={styles.philosophy}>
      <Container>
        {/* Isolated Emotional Quote */}
        <div className={styles.quoteWrapper}>
          <motion.h2 
            className={styles.text}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealSubtle}
          >
            &ldquo;True luxury is found in the silence of perfection. At Mint, we don&apos;t just sell cars; we curate the extraordinary, ensuring every detail reflects the standard of &apos;Mint&apos; condition.&rdquo;
          </motion.h2>
          <motion.span 
            className={styles.author}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8, ease: MINT_EASE }}
          >
            The Founding Principle
          </motion.span>
        </div>

        {/* Editorial Asymmetrical Image */}
        <div className={styles.imageSection}>
          <motion.div 
            className={styles.imageFrame}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: MINT_EASE }}
          >
            <motion.div style={{ y }} className={styles.parallaxContainer}>
              <Image 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070" 
                alt="Luxury interior" 
                width={2070}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={styles.image}
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
