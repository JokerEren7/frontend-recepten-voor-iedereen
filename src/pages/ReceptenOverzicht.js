import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recepten.css';
import Zoekbalk from '../components/Zoekbalk';

const ReceptenOverzicht = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/recipes');
        if (!response.ok) throw new Error('Kon recepten niet ophalen.');
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearchResults = (results) => setRecipes(results);

  const getImageUrl = (path) =>
    path.startsWith('http') ? path : `http://localhost:8000/${path}`;

  return (
    <main>
      <Zoekbalk onSearchResults={handleSearchResults} />

      <section className="recipe-list" aria-labelledby="recipe-title">
<h1 id="recipe-title" className="recipe-title">Recepten</h1>

        {loading && <p>Recepten laden...</p>}
        {error && <p role="alert">Foutmelding: {error}</p>}
        {!loading && recipes.length === 0 && <p>Geen recepten gevonden.</p>}

        <div className="recipes-grid">
          {recipes.map((recipe, index) => {
            const imageUrl = getImageUrl(recipe.image);
            return (
              <Link
                key={recipe.id}
                to={`/recept/${recipe.id}`}
                className="recipe-card-link"
                aria-label={`Bekijk recept voor ${recipe.recipe_name}`}
              >
                <article className="recipe-card">
                  <div className="recipe-image-container">
                    <img
                      src={imageUrl}
                      alt={`Foto van ${recipe.recipe_name}`}
                      title='Bekijk recept'
                      className="recipe-image"
                      width="300"
                      height="300"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                    />
                    <div className="recipe-name-overlay">
                      <h2>{recipe.recipe_name}</h2>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ReceptenOverzicht;
