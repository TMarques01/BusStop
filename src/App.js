import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage.js';
import Historic from './components/Historic.js';
import Search from'./components/Search.js';
import Menu from './components/Menu.js';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/history" element={<Historic />} />
		      <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;