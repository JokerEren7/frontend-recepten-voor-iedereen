import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recepten.css';
import Zoekbalk from '../components/Zoekbalk';

const ReceptenOverzicht = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //  alle recepten laden
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/recipes');

        if (!response.ok) {
          throw new Error('Kon recepten niet ophalen.');
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
        console.error('Fout bij ophalen recepten:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Functie om resultaten vanuit Zoekbalk te ontvangen
  const handleSearchResults = (results) => {
    setRecipes(results);
  };

  if (loading) return <div>Recepten laden...</div>;
  if (error) return <div>Foutmelding: {error}</div>;

  return (
    <section>
      {/* Zoekbalk hier toegevoegd */}
      <Zoekbalk onSearchResults={handleSearchResults} />

      <article className='recipe-list'>
        <h2 className='recipe-title'>Recepten</h2>
        {recipes.length === 0 ? (
          <p>Geen recepten gevonden.</p>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <Link
                key={recipe.id || `recipe-${index}`}
                to={`/recept/${recipe.id}`}
                className="recipe-card-link"
              >
                <div className="recipe-card">
                  {recipe.image && (
                    <div className="recipe-image-container">
                      <img
                        src={recipe.image && recipe.image.startsWith('http') ? recipe.image : `http://localhost:8000/${recipe.image}`}
                        alt={recipe.recipe_name}
                        className="recipe-image"
                      />
                      <div className="recipe-name-overlay">
                        <h3>{recipe.recipe_name}</h3>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </article>
    </section>
  );
};

export default ReceptenOverzicht;
