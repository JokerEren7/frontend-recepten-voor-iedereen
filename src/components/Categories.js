import React from 'react';
import '../styles/Categories.css'; 


const Categories = () => {
  const handleClick = () => {
    window.location.href = '/overzicht';
  };


  return (
    <section className="categories">
      <h2 className="categories__title">Populaire recepten</h2>
      <div className="categories__grid">
        <div className="category-card">
          <div className="category-card__image category-card__image--red">
            <button onClick={handleClick} className="category-card__label">Hoofdgerechten</button>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image category-card__image--orange">
            <span className="category-card__label">Ontbijt</span>
          </div>
        </div>
        <div className="category-card">
          <div className="category-card__image category-card__image--green">
            <span className="category-card__label">Soep recepten</span>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Categories;