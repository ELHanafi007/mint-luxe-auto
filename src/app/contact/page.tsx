import { Metadata } from 'next';
import { Section, Container, Grid } from '@/components/primitives/Layout';
import Inquiry from '@/components/sections/Inquiry';
import styles from './ContactPage.module.css';

export const metadata: Metadata = {
  title: 'Contact Us | Mint0lux',
  description: 'Connect with our global network of advisors for bespoke automotive acquisition and portfolio management.',
};

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      <Section className={styles.hero}>
        <Container>
          <span className={styles.metadata}>Connect</span>
          <h1 className={styles.title}>Global Presence.<br />Personal Touch.</h1>
        </Container>
      </Section>

      <Section className={styles.offices}>
        <Container>
          <Grid>
            <div className="col4">
              <div className={styles.officeCard}>
                <span className={styles.officeCity}>London</span>
                <p className={styles.officeDetails}>
                  12-14 Mayfair Square<br />
                  London, W1J 8AJ<br />
                  United Kingdom
                </p>
                <a href="tel:+442079460123" className={styles.contactLink}>+44 20 7946 0123</a>
              </div>
            </div>
            <div className="col4">
              <div className={styles.officeCard}>
                <span className={styles.officeCity}>Dubai</span>
                <p className={styles.officeDetails}>
                  Gate Village 5, DIFC<br />
                  Dubai, UAE<br />
                  PO Box 50650
                </p>
                <a href="tel:+97143214567" className={styles.contactLink}>+971 4 321 4567</a>
              </div>
            </div>
            <div className="col4">
              <div className={styles.officeCard}>
                <span className={styles.officeCity}>New York</span>
                <p className={styles.officeDetails}>
                  450 Park Avenue<br />
                  New York, NY 10022<br />
                  United States
                </p>
                <a href="tel:+12125550198" className={styles.contactLink}>+1 212 555 0198</a>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      <Inquiry />
    </main>
  );
}
