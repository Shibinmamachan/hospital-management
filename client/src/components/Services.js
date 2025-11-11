import React from 'react';
import styles from './Section.module.css';

const Services = () => (
  <section id="services" className={styles.section}>
    <h2>Our Services</h2>
    <div className={styles.cardGrid}>
      <div className={styles.card}>
        <img src="https://kffhealthnews.org/wp-content/uploads/sites/2/2021/10/Sparrow_01_1350.jpg" alt="Emergency Care" />
        <h3>Emergency Care</h3>
        <p>24/7 emergency services with modern equipment and experienced doctors.</p>
      </div>
      <div className={styles.card}>
        <img src="https://tse4.mm.bing.net/th/id/OIP.s8AP8ruPNM9Wn-LlhRWsJAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Outpatient Clinic" />
        <h3>Outpatient Clinic</h3>
        <p>Routine checkups, consultations, and minor procedures.</p>
      </div>
      <div className={styles.card}>
        <img src="https://tse4.mm.bing.net/th/id/OIP.GcOrbWysOhPFoKcE6atTlgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Surgery" />
        <h3>Surgery</h3>
        <p>Advanced surgical procedures performed by top surgeons in fully equipped OTs.</p>
      </div>
    </div>
  </section>
);

export default Services;
