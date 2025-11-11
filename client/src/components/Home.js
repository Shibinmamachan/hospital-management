import React from 'react';
import styles from './App.module.css';
import Header from './Header'
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

function Home() {
  return (
    <div className={styles.app}>
      <Header />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
