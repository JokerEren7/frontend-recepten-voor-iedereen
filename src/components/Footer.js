import React from 'react';
import '../styles/Footer.css'; 

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
            <i className="fa fa-facebook"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
