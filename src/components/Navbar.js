import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import zoekknop from '../assets/images/zoekpngknop.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const searchParams = new URLSearchParams();
      searchParams.append('recipe_name', searchQuery.trim());

      const response = await fetch(`http://localhost:8000/api/recipes/search?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      console.log('Search results:', results);

      // Create search summary
      const searchSummary = {
        recipe_name: searchQuery,
        resultsCount: results.length || 0,
        timestamp: new Date().toISOString()
      };

      // Navigate to recepten page with search results
      navigate('/recepten', { 
        state: { 
          searchResults: results,
          searchSummary: searchSummary,
          searchType: 'navbar'
        }
      });

      // Clear search input
      setSearchQuery('');
      
      // Close mobile menu if open
      if (menuOpen) {
        closeMenu();
      }

    } catch (err) {
      console.error('Search error:', err);
      // Still navigate to recepten page but with empty results
      navigate('/recepten', { 
        state: { 
          searchResults: [],
          searchSummary: {
            recipe_name: searchQuery,
            resultsCount: 0,
            timestamp: new Date().toISOString(),
            error: 'Er is een fout opgetreden bij het zoeken.'
          },
          searchType: 'navbar'
        }
      });
      setSearchQuery('');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Close menu when screen gets wider than mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          <button className="navbar__toggle" onClick={toggleMenu}>
            <span className="navbar__hamburger"></span>
            <span className="navbar__hamburger"></span>
            <span className="navbar__hamburger"></span>
          </button>

          <div className="navbar__logo">
            <img src={logo} alt="Recepten voor Iedereen" />
          </div>

          <nav className="navbar__nav navbar__nav--desktop">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recepten">Recepten</Link></li>
              <li><Link to="/over-ons">Over ons</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="navbar__search">
            <input 
              type="text" 
              placeholder="Zoeken" 
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              type="button"
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
            >
              <img 
                src={zoekknop} 
                alt="Zoeken" 
                style={{ opacity: isLoading ? 0.5 : 1 }}
              />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="navbar__overlay">
          <button className="navbar__close" onClick={closeMenu}>
            <span className="navbar__close-line"></span>
            <span className="navbar__close-line"></span>
          </button>
          
          <div className="navbar__overlay-content">
            <div className="navbar__overlay-logo">
              <img src={logo} alt="Recepten voor Iedereen" />
            </div>
            
            <nav className="navbar__nav navbar__nav--mobile">
              <ul>
                <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/recepten" onClick={closeMenu}>Recepten</Link></li>
                <li><Link to="/over-ons" onClick={closeMenu}>Over ons</Link></li>
                <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
              </ul>
            </nav>

            {/* Mobile search */}
            <div className="navbar__mobile-search">
              <h4>Zoeken</h4>
              <div className="navbar__mobile-search-container">
                <input 
                  type="text" 
                  placeholder="Zoek recepten..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  className="mobile-search-btn"
                >
                  <img 
                    src={zoekknop} 
                    alt="Zoeken"
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                  />
                  {isLoading ? 'Zoeken...' : 'Zoeken'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;