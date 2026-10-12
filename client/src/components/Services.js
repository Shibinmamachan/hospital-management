
import React from 'react';
import styles from './services.module.css';

const services = [
  {
    icon: '🫀',
    title: 'Cardiology',
    description:
      'Comprehensive heart care, cardiac evaluations, and treatment for cardiovascular conditions.',
    tag: 'Heart Care'
  },
  {
    icon: '🧠',
    title: 'Neurology',
    description:
      'Expert evaluation and treatment for neurological disorders affecting the brain and nerves.',
    tag: 'Brain & Nerves'
  },
  {
    icon: '🦴',
    title: 'Orthopedics',
    description:
      'Care for bones, joints, sports injuries, fractures, and musculoskeletal conditions.',
    tag: 'Bone & Joint'
  },
  {
    icon: '👶',
    title: 'Pediatrics',
    description:
      'Dedicated healthcare focused on children’s growth, development, and wellbeing.',
    tag: 'Child Care'
  },
  {
    icon: '🩺',
    title: 'General Medicine',
    description:
      'Medical consultations, preventive healthcare, diagnosis, and ongoing treatment.',
    tag: 'General Care'
  },
  {
    icon: '🚑',
    title: 'Emergency Care',
    description:
      'Urgent medical assessment and emergency support for serious health conditions.',
    tag: 'Emergency'
  },
  {
    icon: '🔬',
    title: 'Laboratory',
    description:
      'Diagnostic testing and laboratory services to support medical evaluation.',
    tag: 'Diagnostics'
  },
  {
    icon: '🩻',
    title: 'Radiology',
    description:
      'Medical imaging services that help clinicians investigate and diagnose conditions.',
    tag: 'Medical Imaging'
  }
];

const Services = () => {
  return (
    <main className={styles.page} id="services">
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            ✚ OUR HEALTHCARE SERVICES
          </span>

          <h1>
            Complete Care for
            <br />
            <span>Every Stage of Life.</span>
          </h1>

          <p>
            Discover healthcare services designed around you,
            combining medical expertise with compassionate care.
          </p>

          <a href="#service-list" className={styles.heroButton}>
            Explore Our Services <span>↓</span>
          </a>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.circle}></div>
          <div className={styles.medicalIcon}>✚</div>

          <div className={styles.heroCard}>
            <span>♡</span>
            <div>
              <strong>Your Health Matters</strong>
              <p>Care with compassion</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection} id="service-list">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>OUR SPECIALITIES</span>
          <h2>Healthcare Services</h2>
          <p>
            Explore our range of medical services to find the care
            that suits your needs.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <article
              className={styles.card}
              key={service.title}
              style={{ '--delay': `${index * 80}ms` }}
            >
              <div className={styles.cardTop}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <span className={styles.arrow}>↗</span>
              </div>

              <span className={styles.tag}>{service.tag}</span>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <a
                href="/login"
                className={styles.learnMore}
                aria-label={`Book an appointment for ${service.title}`}
              >
                Book Appointment <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div>
          <span className={styles.ctaEyebrow}>WE'RE HERE FOR YOU</span>
          <h2>Your Health Deserves the Best Care.</h2>
          <p>
            Take the next step towards your wellbeing.
            Connect with our healthcare team.
          </p>
        </div>

        <a href="/login" className={styles.ctaButton}>
          Book an Appointment →
        </a>
      </section>
    </main>
  );
};

export default Services;