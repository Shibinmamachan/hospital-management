import React from 'react';
import styles from './Section.module.css';

const Contact = () => (
  <section id="contact" className={styles.section}>
    <h2>Contact Us</h2>
    <p>Call us: <strong>(123) 456-7890</strong></p>
    <p>Email: <strong>info@healthylife.com</strong></p>
    <a href="mailto:info@healthylife.com" className={styles.btn}>Send Email</a>
  </section>
);

export default Contact;
