import React from 'react';
import '../styles/OverOns.css';
import img1 from '../assets/images/overons1.png';
import img2 from '../assets/images/overons2.jpg';
import img3 from '../assets/images/overons3.jpg';

const OverOns = () => {
  return (
    <main className="overons-wrapper">
      <h1>Over ons</h1>

      <div className="image-row">
        <img src={img1} alt="Koppel kookt samen" />
        <img src={img2} alt="Vrouw met salade" />
        <img src={img3} alt="Vrouw met pastagerecht" />
      </div>

      <section className="overons-content">
        <h2>Welkom bij Recepten voor Iedereen</h2>
        <p>
          De plek waar koken eenvoudig, leuk en vooral voor iedereen toegankelijk is!
          Ons doel is om jou te inspireren met heerlijke, haalbare recepten die passen bij elk niveau: 
          van beginnende thuiskoks tot doorgewinterde foodies.
        </p>
        <p>
          Of je nu op zoek bent naar een snelle doordeweekse maaltijd, een vegetarische verrassing of 
          een klassiek familierecept, je vindt het hier allemaal. Achter deze site zit een team van 
          gepassioneerde kookliefhebbers die geloven dat goed eten mensen verbindt. Met duidelijke 
          stap-voor-stap instructies, toegankelijke ingrediënten en een snufje liefde hopen we dat jij 
          net zo veel plezier beleeft aan het koken als wij.
        </p>
        <p>
          Heb je een favoriet recept dat je met de wereld wilt delen? Of een tip om een gerecht nóg lekkerder te maken? 
          Laat het ons weten – samen maken we van Recepten voor Iedereen een warme, culinaire community.
        </p>
        <p>
          Smakelijke groet,<br />
          Het team van Recepten voor Iedereen.
        </p>
      </section>
    </main>
  );
};

export default OverOns;
