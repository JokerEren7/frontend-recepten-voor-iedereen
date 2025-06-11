import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Recepten.css';

const Zoekbalk = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get category_id from URL parameters only
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!id) {
        setError('No category ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/recipes/categories/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [id]);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <article>
      <h2>Recipes for Category {id}</h2>
      {recipes.length === 0 ? (
        <p>No recipes found for this category.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default Zoekbalk;