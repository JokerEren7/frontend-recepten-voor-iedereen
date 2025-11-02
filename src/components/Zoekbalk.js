import React, { useState } from 'react';
import '../styles/Zoekbalk.css';
import zoekknop from '../assets/images/zoekknop.png';
import API_URL from '../config/api';

const Zoekbalk = ({ onSearchResults }) => {
  const [searchData, setSearchData] = useState({
    recipe_name: '',
    category_id: '',
    preparation_time: '',
    difficulty: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const getCategoryId = (categoryName) => {
    const categoryMap = {
      'Hoofdgerechten': 1,
      'Ontbijt': 2,
      'Soepen': 3
    };
    return categoryMap[categoryName] || '';
  };

  const getDifficultyValue = (difficultyName) => {
    const difficultyMap = {
      'Makkelijk': 'makkelijk',
      'Gemiddeld': 'gemiddeld',
      'Moeilijk': 'moeilijk'
    };
    return difficultyMap[difficultyName] || '';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const searchParams = new URLSearchParams();
      
      if (searchData.recipe_name.trim()) {
        searchParams.append('recipe_name', searchData.recipe_name.trim());
      }

      const categoryId = getCategoryId(searchData.category_id);
      if (categoryId) {
        searchParams.append('category_id', categoryId);
      }

      if (searchData.preparation_time === 'very_short') {
        searchParams.append('max_preparation_time', 15);
      } else if (searchData.preparation_time === 'short') {
        searchParams.append('max_preparation_time', 29);
      } else if (searchData.preparation_time === 'long') {
        searchParams.append('min_preparation_time', 30);
      }

      const difficultyValue = getDifficultyValue(searchData.difficulty);
      if (difficultyValue) {
        searchParams.append('difficulty', difficultyValue);
      }

      console.log('Search parameters:', searchParams.toString());

      const response = await fetch(`${API_URL}/api/recipes/search?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      console.log('Fetch response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      console.log('Search results:', results);

      if (onSearchResults) {
        onSearchResults(results);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Er is een fout opgetreden bij het zoeken. Probeer het opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='zoekbalk'>
      <div className='zoek-input'>
        <input
          className='zoeken'
          name='recipe_name'
          value={searchData.recipe_name}
          onChange={handleInputChange}
          placeholder='Waar ben je naar op zoek?'
        />
      </div>

      <div className='filter'>
        <label htmlFor="category_id" className="visually-hidden">Categorie</label>
        <select
          id="category_id"
          className='categorie filter-input'
          name='category_id'
          value={searchData.category_id}
          onChange={handleInputChange}
        >
          <option value="">Categorie</option>
          <option value="Ontbijt">Ontbijt</option>
          <option value="Hoofdgerechten">Hoofdgerechten</option>
          <option value="Soepen">Soepen</option>
        </select>
      </div>

      <div className='filter'>
        <label htmlFor="preparation_time" className="visually-hidden">Bereidingstijd</label>
        <select
          id="preparation_time"
          className='preparation-time filter-input'
          name='preparation_time'
          value={searchData.preparation_time}
          onChange={handleInputChange}
        >
          <option value="">Bereidingstijd</option>
          <option value="very_short">15 min of korter</option>
          <option value="short">Korter dan 30 min</option>
          <option value="long">30 min of langer</option>
        </select>
      </div>

      <div className='filter'>
        <label htmlFor="difficulty" className="visually-hidden">Moeilijkheidsgraad</label>
        <select
          id="difficulty"
          className='difficulty filter-input'
          name='difficulty'
          value={searchData.difficulty}
          onChange={handleInputChange}
        >
          <option value="">Moeilijkheid</option>
          <option value='Makkelijk'>Makkelijk</option>
          <option value='Gemiddeld'>Gemiddeld</option>
          <option value='Moeilijk'>Moeilijk</option>
        </select>
      </div>

      <div className='zoekknop-container'>
        <button
          className='zoekknop'
          onClick={handleSearch}
          disabled={isLoading}
        >
          <img
            id='zoekknop-img'
            src={zoekknop}
            alt='zoeken'
            style={{ opacity: isLoading ? 0.5 : 1 }}
          />
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red' }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div className="loading-message" style={{ marginTop: '10px' }}>
          Zoeken...
        </div>
      )}
    </section>
  );
};

export default Zoekbalk;