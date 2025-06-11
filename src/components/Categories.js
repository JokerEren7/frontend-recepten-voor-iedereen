import React from 'react';
import '../styles/Categories.css'; 
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <section className="categories">
      <h2 className="categories__title">Populaire recepten</h2>
      <div className="categories__grid">
        <div className="category-card">
          <div className="category-card__image category-card__image--red">
            <Link to="/overzicht/1" className="category-card__label">
              Hoofdgerechten
            </Link>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image category-card__image--orange">
            <Link to="/overzicht/2" className="category-card__label">
              Ontbijt
            </Link>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image category-card__image--green">
            <Link to="/overzicht/3" className="category-card__label">
              Soep recepten
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Categories;