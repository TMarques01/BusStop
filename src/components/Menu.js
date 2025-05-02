import React, { useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {

	const [searchQuery, setSearchQuery] = useState('');
	const [searchResult, setSearchResult] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path) => {
		return location.pathname === path;
	  };

	const handleSearch = () => {
		console.log('Buscando: ', searchQuery);
		if (searchQuery.trim()) {
		  navigate(`/search?bus=${encodeURIComponent(searchQuery)}`);
		}
	  };

  return (
    <nav className="menu-bar">
      <div className="menu-items">
        <Link to="/map" className={`menu-item ${isActive('/map') ? 'active' : ''}`}>Mapa</Link>
        <Link to="/history" className={`menu-item ${isActive('/history') ? 'active' : ''}`}>Histórico</Link>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Pesquisar..." 
          className="search-input"
		  value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o estado enquanto digita
          onKeyDown={(e) => {
			if (e.key === 'Enter') {
			  handleSearch(); // Trigger search on Enter key
			}
		  }}
        />
       <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
    </nav>
  );
}

export default MenuBar;