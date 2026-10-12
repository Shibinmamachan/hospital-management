
import React from 'react';
import styles from './Section.module.css';

const About = () => {
  const features = [
    {
      icon: '♡',
      title: 'Expert Doctors',
      description: 'Experienced professionals focused on your health.'
    },
    {
      icon: '✚',
      title: 'Modern Technology',
      description: 'Advanced facilities for quality healthcare.'
    },
    {
      icon: '✓',
      title: 'Patient First',
      description: 'Your comfort and wellbeing come first.'
    }
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutImage}>
        <img
          src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=85"
          alt="Modern hospital"
          loading="lazy"
        />
        <div className={styles.imageBadge}>
          <span>✓</span>
          <div>
            <strong>Care You Can Trust</strong>
            <p>Committed to your wellbeing</p>
          </div>
        </div>
      </div>

      <div className={styles.aboutContent}>
        <span className={styles.eyebrow}>ABOUT OUR HOSPITAL</span>
        <h2>
          Advanced Care,
          <br />
          <span>A Healthier Tomorrow.</span>
        </h2>

        <p className={styles.aboutDescription}>
          KIMS Hospital is dedicated to providing quality healthcare
          through compassionate service, skilled professionals, and a
          patient-centered approach.
        </p>

        <div className={styles.features}>
          {features.map((feature) => (
            <article className={styles.feature} key={feature.title}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;