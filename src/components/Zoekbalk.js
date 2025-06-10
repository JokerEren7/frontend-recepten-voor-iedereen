import React from 'react';
import '../styles/Zoekbalk.css';
import zoekknop from '../assets/images/zoekknop.png';

const Zoekbalk = () => {
  return (
    <section className='zoekbalk'>
        <div className='zoek-input'>
            <input className='zoeken' placeholder='Waar ben je naar op zoek?'></input>     
        </div>
        <div className='filter'>
            <select className='categorie filter-input' type='combobox'>
                <option>Ontbijt</option>
                <option>Hoofdgerechten</option>
                <option>Soepen</option>
            </select>
        </div>
        <div className='filter'>
            <input className='ingredients filter-input' placeholder='Ingrediënten'></input>
        </div>
        <div className='filter'>
            <select className='difficulty filter-input' type='combobox'>
                <option>Makkelijk</option>
                <option>Gemiddeld</option>
                <option>Moeilijk</option>
            </select>
        </div>
        <div>
            <button className='zoekknop'><img id='zoekknop-img' src={zoekknop} alt='zoeken'></img></button>
        </div>
    </section>
      );
};

export default Zoekbalk;