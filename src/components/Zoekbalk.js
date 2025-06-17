import React, { useState } from 'react';
import '../styles/Zoekbalk.css';
import zoekknop from '../assets/images/zoekknop.png';

const Zoekbalk = ({ onSearchResults }) => {
  const [searchData, setSearchData] = useState({
    recipe_name: '',
    category_id: '',
    ingredients: '',
    difficulty: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
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
      'Makkelijk': 'easy',
      'Gemiddeld': 'medium', 
      'Moeilijk': 'hard'
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

if (searchData.ingredients.trim()) {
  searchParams.append('ingredients', searchData.ingredients.trim());
}

const difficultyValue = getDifficultyValue(searchData.difficulty);
if (difficultyValue) {
  searchParams.append('difficulty', difficultyValue);
}


    console.log('Search parameters:', searchParams.toString());

    const response = await fetch(`http://localhost:8000/api/recipes/search?${searchParams.toString()}`, {
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
<select 
  className='categorie filter-input' 
  name='category_id'
  value={searchData.category_id}
  onChange={handleInputChange}
  type='combobox'
>
  <option value="">Categorie</option>
  <option value="Ontbijt">Ontbijt</option>
  <option value="Hoofdgerechten">Hoofdgerechten</option>
  <option value="Soepen">Soepen</option>
</select>
        </div>
        <div className='filter'>
            <input 
              className='ingredients filter-input' 
              name='ingredients'
              value={searchData.ingredients}
              onChange={handleInputChange}
              placeholder='Ingrediënten'
            />
        </div>
        <div className='filter'>
            <select 
              className='difficulty filter-input' 
              name='difficulty'
              value={searchData.difficulty}
              onChange={handleInputChange}
              type='combobox'
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