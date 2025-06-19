import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Recepten.css';

const Recepten = ({ searchResults = null, overrideCategoryName = '' }) => {
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // For pagination example
  const [page, setPage] = useState(1);
  const recipesPerPage = 9; // or whatever fits your grid

  useEffect(() => {
    if (searchResults) {
      setRecipes(searchResults);
      setCategoryName(overrideCategoryName || 'Zoekresultaten');
      setLoading(false);
    } else {
      fetchData();
    }
  }, [id, searchResults, page]);

  const fetchData = async () => {
    if (!id) {
      setError('Geen categorie-ID opgegeven');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Example: fetch recipes with pagination parameters if API supports them
      const recipesResponse = await fetch(`http://localhost:8000/api/recipes/categories/${id}?page=${page}&limit=${recipesPerPage}`);
      const categoriesResponse = await fetch(`http://localhost:8000/api/categories`);

      if (!recipesResponse.ok || !categoriesResponse.ok) {
        throw new Error('Fout bij ophalen van data');
      }

      const recipesData = await recipesResponse.json();
      const categoriesData = await categoriesResponse.json();
      const category = categoriesData.find(cat => cat.id == id);

      setRecipes(recipesData);
      setCategoryName(category ? category.category_name : `Categorie ${id}`);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    // Here you should check if more pages exist. For demo, just increment.
    setPage(prev => prev + 1);
  };

  if (loading) return <div>Recepten laden...</div>;
  if (error) return <div>Foutmelding: {error}</div>;

  return (
    <article className='recipe-list'>
      <h2 className='recipe-title'>{categoryName} recepten</h2>
      {recipes.length === 0 ? (
        <p>Geen recepten gevonden.</p>
      ) : (
        <>
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
                        loading={recipe.image.includes('loaded-fries-pulled-chicken') ? 'eager' : 'lazy'}
                        alt={recipe.recipe_name}
                        className="recipe-image"
                      />
                      <div className="recipe-name-overlay">
                        <h2>{recipe.recipe_name}</h2>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination buttons with accessible labels */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <button 
              onClick={handlePrevious} 
              disabled={page === 1} 
              aria-label="Vorige pagina"
            >
              Vorige
            </button>
            <button 
              onClick={handleNext} 
              aria-label="Volgende pagina"
            >
              Volgende
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default Recepten;
