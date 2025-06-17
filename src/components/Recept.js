import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Recept.css';

const Recept = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('No recipe ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        const response = await fetch(`http://localhost:8000/api/recipes/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }
        
        const recipeData = await response.json();
        console.log('Fetched recipe data:', recipeData);
        console.log('Image URL:', recipeData.image); 
        setRecipe(recipeData);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

 
  useEffect(() => {
    if (recipe) {
      console.log('Recipe state updated:', recipe);
      console.log('Recipe image from state:', recipe.image);
    }
  }, [recipe]);

  if (loading) return <div className="loading">Recept laden..</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!recipe) return <div className="error">Recept niet gevonden..</div>;

  return (
    <article className='recipe-info'>
      {recipe.image && (
        <img className='image'
          src={recipe.image} 
          alt={recipe.recipe_name}
        />
      )}
      <h2 className='recipe-title'>
        {recipe.recipe_name}
      </h2>
    </article>
  );
};

export default Recept;