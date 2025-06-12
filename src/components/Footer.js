import React from 'react';
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
            <li>Soep recepten</li>
            <li>Ontbijt recepten</li>
            <li>Hoofdgerechten</li>
          </ul>
        </div>
        <div className="footer__section">
          <h4>Over ons</h4>
        </div>
        <div className="footer__section">
          <h4>Contact</h4>
        </div>
        <div className="footer__section footer__socials">
          <h4>Volg ons</h4>
          <div className="footer__icons">
            <img src={facebookImg} alt="Facebook" />
        <img src={twitterImg} alt="Twitter" className="twitter-icon" />
            <img src={instagramImg} alt="Instagram" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;