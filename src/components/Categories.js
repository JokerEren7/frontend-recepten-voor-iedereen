import React from 'react';
import '../styles/Categories.css';
import { Link } from 'react-router-dom';

import hoofdgerechtenImg from '../assets/images/hoofgerechten1.webp';
import ontbijtImg from '../assets/images/ontbijt2.jpg';
import soepImg from '../assets/images/soep3.avif';

const Categories = () => {
  return (
    <section className="categories">
      <h2 className="categories__title">Populaire categorieën</h2>
      <div className="categories__grid">
        <div className="category-card">
          <div className="category-card__image" style={{backgroundImage: `url(${hoofdgerechtenImg})`}}>
            <Link to="/overzicht/1" >
                <button className="category-card__label">Hoofdgerechten</button>
            </Link>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image" style={{backgroundImage: `url(${ontbijtImg})`}}>
           <Link to="/overzicht/2" >
              <button className="category-card__label">Ontbijt</button>
            </Link> 
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image" style={{backgroundImage: `url(${soepImg})`}}>
            <Link to="/overzicht/3" >
            <button className="category-card__label">Soep recepten</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;