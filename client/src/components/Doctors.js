import React, { useEffect } from 'react';

const doctors = [
  { name:'Dr. Anil Menon',     speciality:'Cardiology',       experience:'18 years', days:'Mon – Fri',     phone:'+91 98400 11001', email:'anil.menon@hospital.com',     photo:'https://i.pravatar.cc/150?img=11' },
  { name:'Dr. Priya Nair',     speciality:'Neurology',        experience:'14 years', days:'Mon – Sat',     phone:'+91 98400 11002', email:'priya.nair@hospital.com',     photo:'https://i.pravatar.cc/150?img=47' },
  { name:'Dr. Rahul Varma',    speciality:'Orthopedics',      experience:'12 years', days:'Tue – Sat',     phone:'+91 98400 11003', email:'rahul.varma@hospital.com',    photo:'https://i.pravatar.cc/150?img=12' },
  { name:'Dr. Meera Thomas',   speciality:'Pediatrics',       experience:'10 years', days:'Mon – Fri',     phone:'+91 98400 11004', email:'meera.thomas@hospital.com',   photo:'https://i.pravatar.cc/150?img=48' },
  { name:'Dr. Suresh Kumar',   speciality:'General Medicine', experience:'20 years', days:'Mon – Sat',     phone:'+91 98400 11005', email:'suresh.kumar@hospital.com',   photo:'https://i.pravatar.cc/150?img=15' },
  { name:'Dr. Fathima Rahman', speciality:'Radiology',        experience:'9 years',  days:'Mon – Fri',     phone:'+91 98400 11006', email:'fathima.rahman@hospital.com', photo:'https://i.pravatar.cc/150?img=49' },
  { name:'Dr. George Mathew',  speciality:'Emergency Care',   experience:'15 years', days:'Daily, 24 hrs', phone:'+91 98400 11007', email:'george.mathew@hospital.com',  photo:'https://i.pravatar.cc/150?img=17' },
  { name:'Dr. Lakshmi Pillai', speciality:'Laboratory',       experience:'11 years', days:'Mon – Sat',     phone:'+91 98400 11008', email:'lakshmi.pillai@hospital.com', photo:'https://i.pravatar.cc/150?img=45' },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .doc-page {
    background: #e6e8eb;
    color: #e8f0f8;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .doc-header {
    text-align: center;
    padding: 60px 24px 40px;
  }
  .doc-header h1 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 600;
    margin-bottom: 12px;
    color: #010306;
  }
  .doc-header p {
    color: #6b8aaa;
    font-size: 0.95rem;
    max-width: 42ch;
    margin: 0 auto;
    line-height: 1.6;
  }

  .doc-marquee {
    overflow: hidden;
    padding: 24px 0 60px;
    mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%);
  }
  .doc-marquee:has(.doc-card:hover) .doc-track {
    animation-play-state: paused;
  }

  .doc-track {
    display: flex;
    gap: 20px;
    width: max-content;
    animation: docScroll 40s linear infinite;
  }

  @keyframes docScroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(-300px * 8)); }
  }

  @media (prefers-reduced-motion: reduce) {
    .doc-track { animation: none; }
  }

  .doc-card {
    width: 280px;
    height: 340px;
    flex-shrink: 0;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #1e2f45;
    background: #162030;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .doc-card:hover {
    border-color: #4fa3e0;
    box-shadow: 0 0 0 1px #4fa3e0, 0 12px 40px rgba(79,163,224,0.2);
  }

  /* Front face */
  .doc-front {
    position: absolute;
    inset: 0;
    padding: 24px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
  }
  .doc-card:hover .doc-front {
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
  }

  /* Detail face */
  .doc-detail {
    position: absolute;
    inset: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    background: #0d2340;
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.42s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
  }
  .doc-card:hover .doc-detail {
    transform: translateY(0);
    opacity: 1;
  }

  .doc-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #1e2f45;
  }
  .doc-avatar-sm {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #4fa3e0;
  }

  .doc-card h3 {
    font-weight: 600;
    font-size: 1rem;
    color: #e8f0f8;
    line-height: 1.3;
    margin: 0;
  }

  .doc-tag {
    display: inline-block;
    background: #1a3a5c;
    color: #7ec8f4;
    font-size: 0.7rem;
    font-weight: 500;
    padding: 3px 10px;
    border-radius: 100px;
    width: fit-content;
  }

  .doc-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
    padding: 0;
  }
  .doc-meta > div {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .doc-meta dt {
    font-size: 0.72rem;
    color: #6b8aaa;
    font-weight: 300;
  }
  .doc-meta dd {
    font-size: 0.78rem;
    color: #e8f0f8;
    font-weight: 500;
    margin: 0;
  }

  .doc-detail-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    margin-top: 2px;
    padding: 0;
  }
  .doc-detail-meta > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .doc-detail-meta dt {
    font-size: 0.67rem;
    color: #6b8aaa;
  }
  .doc-detail-meta dd {
    font-size: 0.78rem;
    color: #e8f0f8;
    font-weight: 500;
    word-break: break-all;
    margin: 0;
  }

  .doc-hint {
    margin-top: auto;
    font-size: 0.67rem;
    color: #2e4a65;
    text-align: center;
  }

  .doc-book {
    display: block;
    margin-top: auto;
    text-align: center;
    background: #4fa3e0;
    color: #0e1520;
    font-size: 0.8rem;
    font-weight: 700;
    padding: 10px 0;
    border-radius: 8px;
    text-decoration: none;
    transition: background 0.15s;
  }
  .doc-book:hover { background: #a8d8f8; }
`;

const DoctorCard = ({ doctor, hidden }) => (
  <article className="doc-card" aria-hidden={hidden || undefined}>
    <div className="doc-front">
      <img className="doc-avatar" src={doctor.photo} alt={doctor.name} loading="lazy" />
      <h3>{doctor.name}</h3>
      <span className="doc-tag">{doctor.speciality}</span>
      <dl className="doc-meta">
        <div><dt>Experience</dt><dd>{doctor.experience}</dd></div>
        <div><dt>Available</dt><dd>{doctor.days}</dd></div>
      </dl>
      <p className="doc-hint">Hover for full details</p>
    </div>

    <div className="doc-detail">
      <img className="doc-avatar-sm" src={doctor.photo} alt={doctor.name} loading="lazy" />
      <h3>{doctor.name}</h3>
      <span className="doc-tag">{doctor.speciality}</span>
      <dl className="doc-detail-meta">
        <div><dt>🕐 Experience</dt><dd>{doctor.experience}</dd></div>
        <div><dt>📅 Available</dt><dd>{doctor.days}</dd></div>
        <div><dt>📞 Phone</dt><dd>{doctor.phone}</dd></div>
        <div><dt>✉️ Email</dt><dd>{doctor.email}</dd></div>
      </dl>
      <a
        href="/login"
        className="doc-book"
        tabIndex={hidden ? -1 : undefined}
        aria-label={`Book an appointment with ${doctor.name}`}
      >
        Book Appointment →
      </a>
    </div>
  </article>
);

const Doctors = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'doctors-styles';
    if (!document.getElementById('doctors-styles')) {
      style.textContent = css;
      document.head.appendChild(style);
    }
    return () => {
      const el = document.getElementById('doctors-styles');
      if (el) el.remove();
    };
  }, []);

  return (
    <main className="doc-page" id="doctors">
      <section className="doc-header">
        <h1>Meet Our Doctors</h1>
        <p>Experienced specialists who put your comfort and recovery first.</p>
      </section>
      <section className="doc-marquee" aria-label="Our doctors">
        <div className="doc-track">
          {doctors.map((d) => <DoctorCard doctor={d} key={d.name} />)}
          {doctors.map((d) => <DoctorCard doctor={d} key={`${d.name}-copy`} hidden />)}
        </div>
      </section>
    </main>
  );
};

export default Doctors;