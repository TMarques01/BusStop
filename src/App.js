import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapPage from './components/MapPage';
import './App.css';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <MapPage />
    </div>
  );
}

export default App;

