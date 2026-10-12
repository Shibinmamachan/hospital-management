
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.topBarContent}>
          <span>✚ Your Health, Our Priority</span>
          <span className={styles.emergency}>
            Emergency: <a href="tel:112">112</a>
          </span>
        </div>
      </div>

      <div className={styles.container}>
        <a href="#home" className={styles.brand} onClick={closeMenu}>
          <img
            src="https://www.generalatlantic.com/wp-content/uploads/2018/06/kims-logo-transparent.png"
            alt="KIMS Hospital Logo"
            className={styles.logoImg}
          />
          <div className={styles.brandText}>
            <h1 className={styles.logo}>
              KIMS <span>Hospital</span>
            </h1>
            <p>Care Beyond Boundaries</p>
          </div>
        </a>

        <button
          type="button"
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`${styles.navigation} ${
            menuOpen ? styles.navigationOpen : ''
          }`}
        >
          <ul className={styles.nav}>
            <li><a href="#home" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMenu}>About Us</a></li>
            <li><a href="#services" onClick={closeMenu}>Services</a></li>
            <li><a href="#doctors" onClick={closeMenu}>Our Doctors</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>

          <a
            href="#appointment"
            className={styles.appointmentBtn}
            onClick={closeMenu}
          >
            <span>＋</span> Book Appointment
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;