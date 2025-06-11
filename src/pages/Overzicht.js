import React from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Zoekbalk from '../components/Zoekbalk';
import Recepten from '../components/Recepten';


const Overzicht = () => {
  return (
    <>
      <Navbar />
      <Zoekbalk />
      <Recepten />
      <Footer />
    </>
  );
};

export default Overzicht;