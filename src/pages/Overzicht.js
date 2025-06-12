import React from 'react';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Zoekbalk from '../components/Zoekbalk';
import Recepten from '../components/Recepten';


const Overzicht = () => {
  return (
    <>
      <Zoekbalk />
      <Recepten />
    </>
  );
};

export default Overzicht;