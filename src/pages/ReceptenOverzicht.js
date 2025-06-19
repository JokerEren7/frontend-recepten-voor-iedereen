import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Recepten.css';
import Zoekbalk from '../components/Zoekbalk';

const ReceptenOverzicht = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fastMeals, setFastMeals] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const prep = 15;
  
  console.log('Current URL search:', location.search);
  console.log('Location state:', location.state);

  // Alle recepten laden of snelle recepten bij specifieke URL, of zoekresultaten van Navbar
  useEffect(() => {
    // Check if we have search results from Navbar navigation
    if (location.state?.searchResults) {
      const { searchResults, searchSummary } = location.state;
      setRecipes(searchResults);
      setSearchActive(true);
      setLoading(false);
      return;
    }

    // Reset search state if no search results
    setSearchActive(false);

    if (location.search.includes("snelle_recepten")) {
      fetchFastData();
      return;
    }
    fetchRecipes();
  }, [location.search, location.state]);

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

  const fetchFastData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/recipes/search?preparation_time=${prep}`);
      
      if (!response.ok) {
        throw new Error('Fout bij ophalen van snelle recepten');
      }
      
      const data = await response.json();
      console.log('Fast meals data:', data);
      setFastMeals(data);
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching fast meals:', error);
      setError(error.message);
      setFastMeals([]);
    } finally {
      setLoading(false);
    }
  };

  // Functie om resultaten vanuit Zoekbalk te ontvangen
  const handleSearchResults = (results) => {
    setRecipes(results);
    setSearchActive(true);
  };

  // Functie om zoekresultaten te wissen
  const clearSearch = () => {
    setSearchActive(false);
    // Navigate to clean URL without state
    window.history.replaceState(null, '', '/recepten');
    fetchRecipes();
  };

  if (loading) return <div>Recepten laden...</div>;
  if (error) return <div>Foutmelding: {error}</div>;

  // Bepaal de titel op basis van de URL en search state
  const getPageTitle = () => {
    if (searchActive && location.state?.searchSummary) {
      return `Zoekresultaten voor "${location.state.searchSummary.recipe_name}"`;
    }
    if (searchActive) {
      return "Zoekresultaten";
    }
    if (location.search.includes("snelle_recepten")) {
      return "Snelle recepten (15 minuten of minder)";
    }
    return "Recepten";
  };

  return (
    <section>
      {/* Zoekbalk hier toegevoegd */}
      <Zoekbalk onSearchResults={handleSearchResults} />

      <article className='recipe-list'>
        <div className="page-header">
          <h2 className='recipe-title'>{getPageTitle()}</h2>
          
          {/* Show search summary and clear button if search is active */}
          {searchActive && (
            <div className="search-info">
              <p className="search-count">
                {recipes.length === 0 ? 'Geen recepten gevonden' : `${recipes.length} recepten gevonden`}
              </p>
              <button 
                onClick={clearSearch}
                className="clear-search-btn"
                type="button"
              >
                Alle recepten tonen
              </button>
            </div>
          )}

          {/* Show error message if search failed */}
          {location.state?.searchSummary?.error && (
            <div className="search-error">
              <p>{location.state.searchSummary.error}</p>
            </div>
          )}
        </div>

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
                        <h2>{recipe.recipe_name}</h2>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
      </article>
    </section>
  );
};

export default ReceptenOverzicht;