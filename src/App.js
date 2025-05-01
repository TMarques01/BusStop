import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapPage from './components/MapPage';
import './App.css';
import Menu from './components/Menu'; 
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
		<Menu />
      <MapPage />
    </div>
  );
}

export default App;

