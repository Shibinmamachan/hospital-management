import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.brand}>
        <img
          src="https://www.generalatlantic.com/wp-content/uploads/2018/06/kims-logo-transparent.png"
          alt="Hospital Logo"
          className={styles.logoImg}
        />
        <h1 className={styles.logo}>kIMS Hospital</h1>
      </div>
      <nav>
        <ul className={styles.nav}>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
