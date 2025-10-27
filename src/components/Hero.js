import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

const slides = [
  {
    image: slide1,
    title: "Ontdek de smaak van vandaag",
    subtitle: "Verse recepten voor elke gelegenheid",
    buttonText: "Bekijk recepten",
    route: "/recepten"
  },
  {
    image: slide2,
    title: "Ontbijt maaltijden",
    subtitle: "Voedzame ontbijt recepten",
    buttonText: "Ontdek ontbijt recepten",
    route: "/overzicht/2"
  },
  {
    image: slide3,
    title: "Snelle gerechten",
    subtitle: "Klaar in 15 minuten of minder",
    buttonText: "Snelle recepten",
route: "/recepten?snelle-recepten"  }
];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="hero-slideshow">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
        <Link to={slide.route} className="hero-button">
          {slide.buttonText}
        </Link>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-arrow nav-arrow-left" onClick={prevSlide}>
        &#8249;
      </button>
      <button className="nav-arrow nav-arrow-right" onClick={nextSlide}>
        &#8250;
      </button>

      <div className="nav-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;