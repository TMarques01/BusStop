// components/MenuBar.js
import React from 'react';
import './MenuBar.css'; // Você pode criar este arquivo para estilizar o menu

function MenuBar() {
  return (
    <nav className="menu-bar">
      <ul>
        <li><a href="/">Mapa</a></li>
        <li><a href="/history">Histórico</a></li>
      </ul>
    </nav>
  );
}

export default MenuBar;