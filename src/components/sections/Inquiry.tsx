'use client';

import { motion } from 'framer-motion';
import { Section, Container, Grid } from '@/components/primitives/Layout';
import { revealSubtle, MINT_EASE } from '@/lib/motion-primitives';
import styles from './Inquiry.module.css';

export default function Inquiry() {
  return (
    <Section id="inquiry" className={styles.inquiry}>
      <Container>
        <Grid>
          <div className="col6">
            <motion.span 
              className="label-metadata"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealSubtle}
            >
              Consultation
            </motion.span>
            <motion.h2 
              className={styles.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealSubtle}
              custom={2}
            >
              Begin Your<br />Acquisition.
            </motion.h2>
            <motion.p 
              className={styles.description}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealSubtle}
              custom={4}
            >
              Whether you are seeking a specific rarity or require discreet disposition of a significant collection, our advisors are at your service.
            </motion.p>
          </div>

          <div className="col6">
            <motion.form 
              className={styles.form}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: MINT_EASE }}
            >
              <div className={styles.inputGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" className={styles.input} placeholder="Your Full Name" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} placeholder="email@address.com" />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Interest</label>
                <select className={styles.input}>
                  <option>Acquisition</option>
                  <option>Consignment</option>
                  <option>Restoration</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Message</label>
                <textarea className={styles.textarea} placeholder="How may we assist you?"></textarea>
              </div>
              <button type="submit" className={styles.submit}>
                Submit Inquiry
              </button>
            </motion.form>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
