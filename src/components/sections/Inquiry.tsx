'use client';

import { useActionState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, Container, Grid } from '@/components/primitives/Layout';
import { revealSubtle, MINT_EASE } from '@/lib/motion-primitives';
import { submitInquiry } from '@/app/actions/inquiry';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Inquiry.module.css';

const initialState = {
  message: '',
  errors: {},
  success: false,
};

export default function Inquiry() {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

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
              {t.inquiry.consultation}
            </motion.span>
            <motion.h2 
              className={styles.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealSubtle}
              custom={2}
            >
              {t.inquiry.startAcquisition}
            </motion.h2>
            <motion.p 
              className={styles.description}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealSubtle}
              custom={4}
            >
              {t.inquiry.description}
            </motion.p>
          </div>

          <div className="col6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, ease: MINT_EASE }}
            >
              <AnimatePresence mode="wait">
                {state.success ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={styles.successMessage}
                  >
                    <h3 className={styles.successTitle}>{t.inquiry.successTitle}</h3>
                    <p>{state.message}</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className={styles.resetBtn}
                    >
                      {t.inquiry.newInquiry}
                    </button>
                  </motion.div>
                ) : (
                  <form 
                    ref={formRef}
                    action={formAction}
                    className={styles.form}
                  >
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>{t.inquiry.name}</label>
                      <input 
                        name="name" 
                        type="text" 
                        className={`${styles.input} ${state.errors?.name ? styles.inputError : ''}`} 
                        placeholder={t.inquiry.namePlaceholder} 
                        required 
                      />
                      {state.errors?.name && <span className={styles.errorText}>{state.errors.name[0]}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>{t.inquiry.email}</label>
                      <input 
                        name="email" 
                        type="email" 
                        className={`${styles.input} ${state.errors?.email ? styles.inputError : ''}`} 
                        placeholder={t.inquiry.emailPlaceholder} 
                        required 
                      />
                      {state.errors?.email && <span className={styles.errorText}>{state.errors.email[0]}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>{t.inquiry.interest}</label>
                      <select name="interest" className={styles.input} required>
                        <option value="Acquisition">{t.inquiry.acquisition}</option>
                        <option value="Consignment">{t.inquiry.consignment}</option>
                        <option value="Restoration">{t.inquiry.restoration}</option>
                        <option value="General Inquiry">{t.inquiry.generalInquiry}</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>{t.inquiry.message}</label>
                      <textarea 
                        name="message" 
                        className={`${styles.input} ${styles.textarea} ${state.errors?.message ? styles.inputError : ''}`} 
                        placeholder={t.inquiry.messagePlaceholder} 
                        required
                      ></textarea>
                      {state.errors?.message && <span className={styles.errorText}>{state.errors.message[0]}</span>}
                    </div>

                    <div className={styles.footer}>
                      {state.message && !state.success && <p className={styles.formError}>{state.message}</p>}
                      <button 
                        type="submit" 
                        className={styles.submit}
                        disabled={isPending}
                      >
                        {isPending ? t.inquiry.transmitting : t.inquiry.sendInquiry}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
