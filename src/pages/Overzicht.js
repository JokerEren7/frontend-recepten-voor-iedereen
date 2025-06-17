import React, { useState } from 'react';
import Zoekbalk from '../components/Zoekbalk';
import Recepten from '../components/Recepten';

const Overzicht = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [searchCategoryName, setSearchCategoryName] = useState('');

  const handleSearchResults = (results) => {
    setSearchResults(results);
    if (results.length > 0) {
      setSearchCategoryName('Zoekresultaten');
    } else {
      setSearchCategoryName('Geen resultaten gevonden');
    }
  };

  return (
    <>
      <Zoekbalk onSearchResults={handleSearchResults} />
      <Recepten searchResults={searchResults} overrideCategoryName={searchCategoryName} />
    </>
  );
};

export default Overzicht;
