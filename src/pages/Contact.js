import React from 'react';
import '../styles/Contact.css';
import bel from '../assets/images/bel.png';
import mail from '../assets/images/mail.png';


const Contact = () => {
  return (
    <main className="contact-wrapper">
      <h1>Contact</h1>
      <div className="contact-container">
        <form className="contact-form">
          <label htmlFor="naam">Naam</label>
          <input type="text" id="naam" name="naam" required />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"  required />

          <label htmlFor="telefoon">Telefoon</label>
          <input type="tel" id="telefoon" name="telefoon"  />

          <label htmlFor="bericht">Bericht</label>
          <textarea id="bericht" name="bericht" rows="4"  required></textarea>

          <button type="submit">Verstuur</button>
        </form>

        <div className="contact-info">
          <div className="contact-card ">
            <div className="icon"><img src={bel} alt="Bel" /></div>
            <h3>Bel ons</h3>
            <p>Wij zijn telefonisch beschikbaar van 9 tot 5 maandag t/m vrijdag.</p>
            <a href="tel:+31612345678">+31 6 12345678</a>
          </div>
          <div className="contact-card mail-card">
            <div className="icon"><img src={mail} alt="Mail" /></div>
            <h3>Stuur een mail</h3>
            <p>Als u een vraag wilt stellen kunt u via de mail contact opnemen</p>
            <a href="mailto:creastudio@gmail.com">Receptenvooridereen@gmail.com</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
