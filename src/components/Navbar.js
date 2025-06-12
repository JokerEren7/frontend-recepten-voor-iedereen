import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import zoekknop from '../assets/images/zoekpngknop.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close menu when screen gets wider than mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <button className="navbar__toggle" onClick={toggleMenu}>
            <span className="navbar__hamburger"></span>
            <span className="navbar__hamburger"></span>
            <span className="navbar__hamburger"></span>
          </button>

          <div className="navbar__logo">
            <img src={logo} alt="Recepten voor Iedereen" />
          </div>

          <nav className="navbar__nav navbar__nav--desktop">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recepten">Recepten</Link></li>
              <li><Link to="/over-ons">Over ons</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="navbar__search">
            <input type="text" placeholder="Zoeken" />
            <button type="submit">
              <img src={zoekknop} alt="Zoeken" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="navbar__overlay">
          <button className="navbar__close" onClick={closeMenu}>
            <span className="navbar__close-line"></span>
            <span className="navbar__close-line"></span>
          </button>
          
          <div className="navbar__overlay-content">
            <div className="navbar__overlay-logo">
              <img src={logo} alt="Recepten voor Iedereen" />
            </div>
            
            <nav className="navbar__nav navbar__nav--mobile">
              <ul>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/recepten" onClick={closeMenu}>Recepten</Link></li>
                <li><Link to="/over-ons" onClick={closeMenu}>Over ons</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;