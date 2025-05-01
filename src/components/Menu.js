// components/MenuBar.js
import React from 'react';
import './MenuBar.css'; // Você pode criar este arquivo para estilizar o menu

function MenuBar() {
  return (
    <nav className="menu-bar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/map">Mapa</a></li>
        <li><a href="/about">Sobre</a></li>
      </ul>
    </nav>
  );
}

export default MenuBar;