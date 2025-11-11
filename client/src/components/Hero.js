import React from 'react';
import styles from './Hero.module.css';

const Hero = () => (
  <section className={styles.hero}>
    {/* Content */}
    <div className={styles.overlay}></div>
    <div className={styles.content}>
      <h2>Your Health, Our Priority</h2>
      <p>Compassionate care with advanced medical expertise.</p>
      <a href="login" className={styles.btn}>Book Appointment</a>
    </div>
  </section>
);

export default Hero;
