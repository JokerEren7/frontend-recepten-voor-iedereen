import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Recepten.css';

const Recepten = ({ searchResults = null, overrideCategoryName = '' }) => {
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (searchResults) {
      // Gebruik zoekresultaten i.p.v. API-oproep
      setRecipes(searchResults);
      setCategoryName(overrideCategoryName || 'Zoekresultaten');
      setLoading(false);
    } else {
      fetchData();
    }
  }, [id, searchResults]);

  const fetchData = async () => {
    if (!id) {
      setError('Geen categorie-ID opgegeven');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [recipesResponse, categoriesResponse] = await Promise.all([
        fetch(`http://localhost:8000/api/recipes/categories/${id}`),
        fetch(`http://localhost:8000/api/categories`)
      ]);

      if (!recipesResponse.ok || !categoriesResponse.ok) {
        throw new Error('Fout bij ophalen van data');
      }

      const recipesData = await recipesResponse.json();
      const categoriesData = await categoriesResponse.json();
      const category = categoriesData.find(cat => cat.id == id);

      setRecipes(recipesData);
      setCategoryName(category ? category.category_name : `Categorie ${id}`);
    } catch (err) {
      setError(err.message);
      console.error('Fout bij ophalen data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Recepten laden...</div>;
  if (error) return <div>Foutmelding: {error}</div>;

  return (
    <article className='recipe-list'>
      <h2 className='recipe-title'>{categoryName} recepten</h2>
      {recipes.length === 0 ? (
        <p>Geen recepten gevonden.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id || recipe.recipe_id || `recipe-${index}`}
              to={`/recept/${recipe.id || recipe.recipe_id || recipe.recipeId}`}
              className="recipe-card-link"
            >
              <div className="recipe-card">
                {recipe.image && (
                  <div className="recipe-image-container">
                    <img
                      src={
                        recipe.image.startsWith('http')
                          ? recipe.image
                          : `http://localhost:8000/${recipe.image}`
                      }
                      onLoad={() => console.log('Image loaded:', recipe.image)}
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
  );
};

export default Recepten;
