import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Recepten.css';
import Zoekbalk from '../components/Zoekbalk';
import API_URL from '../config/api';

const ReceptenOverzicht = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();
  const prep = 15;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    if (location.state?.searchResults) {
      const { searchResults } = location.state;
      setRecipes(searchResults);
      setSearchActive(true);
      setHasMore(false);
      setLoading(false);
      return;
    }

    setSearchActive(false);
    if (location.search.includes("snelle-recepten")) {
      fetchFastData(1);
    } else {
      fetchRecipes(1);
    }
  }, [location.search, location.state]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (location.search.includes("snelle-recepten")) {
      fetchFastData(nextPage);
    } else {
      fetchRecipes(nextPage);
    }
  };

  const fetchRecipes = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/recipes?page=${pageNumber}&limit=9`);
      if (!response.ok) {
        throw new Error('Kon recepten niet ophalen.');
      }

      const data = await response.json();
      const newRecipes = data.data || data;
      setRecipes(prev => pageNumber === 1 ? newRecipes : [...prev, ...newRecipes]);
      setHasMore(data.current_page < data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFastData = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/recipes/search?max_preparation_time=${prep}&page=${pageNumber}&limit=9`);
      if (!response.ok) {
        throw new Error('Fout bij ophalen van snelle recepten');
      }

      const data = await response.json();
      const newRecipes = data.data || data;
      setRecipes(prev => pageNumber === 1 ? newRecipes : [...prev, ...newRecipes]);
      setHasMore(data.current_page < data.last_page);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    const recipesArray = results.data || results;
    if (Array.isArray(recipesArray)) {
      setRecipes(recipesArray);
    } else {
      setRecipes([]);
    }

    setSearchActive(true);
    setHasMore(false);
  };

  const clearSearch = () => {
    setSearchActive(false);
    window.history.replaceState(null, '', '/recepten');
    fetchRecipes();
  };

  if (loading && recipes.length === 0) return <div>Recepten laden...</div>;
  if (error) return <div>Foutmelding: {error}</div>;

  const getPageTitle = () => {
    if (searchActive && location.state?.searchSummary) {
      return `Zoekresultaten voor "${location.state.searchSummary.recipe_name}"`;
    }
    if (searchActive) {
      return "Zoekresultaten";
    }
    if (location.search.includes("snelle-recepten")) {
      return "Snelle recepten (15 minuten of minder)";
    }
    return "Recepten";
  };

  return (
    <section>
      <Zoekbalk onSearchResults={handleSearchResults} />
      <article className='recipe-list'>
        <div className="page-header">
          <h2 className='recipe-title'>{getPageTitle()}</h2>
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

          {location.state?.searchSummary?.error && (
            <div className="search-error">
              <p>{location.state.searchSummary.error}</p>
            </div>
          )}
        </div>

        <div className="recipes-grid">
          {Array.isArray(recipes) && recipes.map((recipe, index) => (
            <Link
              key={recipe.id || `recipe-${index}`}
              to={`/recept/${recipe.id}`}
              className="recipe-card-link"
            >
              <div className="recipe-card">
                {recipe.image && (
                  <div className="recipe-image-container">
                    <img
                      src={recipe.image && recipe.image.startsWith('http') ? recipe.image : `${API_URL}/${recipe.image}`}
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

        {hasMore && !searchActive && (
          <div className="load-more-container">
            <button className="load-more-btn" type="button" onClick={loadMore}>
              Meer recepten laden
            </button>
          </div>
        )}
      </article>
    </section>
  );
};

export default ReceptenOverzicht;