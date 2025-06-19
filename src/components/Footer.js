import React from 'react';
import { Link } from 'react-router-dom'; // React Router Link gebruiken
import '../styles/Footer.css';

import facebookImg from '../assets/images/facebook-new.png';
import twitterImg from '../assets/images/twitter.png';
import instagramImg from '../assets/images/instagramwit.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <h4>Recepten</h4>
          <ul>
            <li><Link to="/overzicht/3">Soep recepten</Link></li>
            <li><Link to="/overzicht/2">Ontbijt recepten</Link></li>
            <li><Link to="/overzicht/1">Hoofdgerechten</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Over ons</h4>
          <ul>
            <li><Link to="/over-ons">Ons verhaal</Link></li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Contact</h4>
          <ul>
            <li><Link to="/contact">Neem contact op</Link></li>
          </ul>
        </div>
        <div className="footer__section footer__socials">
          <h4>Volg ons</h4>
          <div className="footer__icons">
            <a href="https://facebook.com" target="_blank" >
              <img src={facebookImg} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" >
              <img src={twitterImg} alt="Twitter" className="twitter-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" >
              <img src={instagramImg} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
