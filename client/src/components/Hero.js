
import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>
            ✚ Welcome to KIMS Hospital
          </span>

          <h1>
            Your Health,
            <br />
            <span>Our Priority.</span>
          </h1>

          <p className={styles.description}>
            Compassionate care, experienced doctors, and advanced
            medical technology — because you deserve the very best.
          </p>

          <div className={styles.buttons}>
            <a href="/login" className={styles.primaryBtn}>
              ✚ Book Appointment <span>→</span>
            </a>

            <a href="#about" className={styles.secondaryBtn}>
              Discover Our Hospital ↗
            </a>
          </div>

          <div className={styles.trust}>
            <span className={styles.trustIcon}>✓</span>
            <div>
              <strong>Care That Puts You First</strong>
              <p>Your health matters to us.</p>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.decorCircle}></div>

          <div className={styles.imageFrame}>
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=85"
              alt="Doctor at KIMS Hospital"
            />
          </div>

          <div className={styles.floatingCard}>
            <span className={styles.cardIcon}>✚</span>
            <div>
              <strong>Expert Medical Care</strong>
              <p>Here for your wellbeing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}