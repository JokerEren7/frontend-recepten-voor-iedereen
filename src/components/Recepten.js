import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Recepten.css';

const Recepten = () => {
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError('No category ID provided');
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
          throw new Error('Failed to fetch data');
        }
        
        const recipesData = await recipesResponse.json();
        const categoriesData = await categoriesResponse.json();
        const category = categoriesData.find(cat => cat.id === id);
        
        setRecipes(recipesData);
        setCategoryName(category ? category.category_name : `Category ${id}`);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Recepten laden...</div>;
  if (error) return <div>foutmelding: {error}</div>;

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
                      src={recipe.image}
                      onLoad={() => console.log('Image loaded successfully:', recipe.image)}
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