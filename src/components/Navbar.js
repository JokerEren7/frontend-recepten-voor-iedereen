import React from 'react';
import '../styles/Navbar.css'; 
import logo from '../assets/images/logo.png'; 
const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <img src={logo} alt="Recepten voor Iedereen" />
        </div>
        <nav className="navbar__nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Recepten</a></li>
            <li><a href="#">Over ons</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="navbar__search">
          <input type="text" placeholder="Zoeken" />
          <button type="submit">🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
