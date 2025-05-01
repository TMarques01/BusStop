import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function MapView() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    // Ligar à base de dados Firestore
    const unsubscribe = onSnapshot(collection(db, "pins"), (snapshot) => {
      const newPins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPins(newPins);
    });

    return () => unsubscribe();
  }, []);


return (
    <div style={{ position: "relative" }}>
        {/* Mapa com Leaflet */}
        <MapContainer center={[38.7169, -9.1399]} zoom={13} style={{ height: "90vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {pins.map((pin) => (
                <Marker key={pin.id} position={[pin.lat, pin.lng]}>
                    <Popup>
                        Autocarro: {pin.bus_name}<br />
                        Hora: {new Date(pin.timestamp?.seconds * 1000).toLocaleTimeString()}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    
        {/* Botão no canto inferior direito */}
        <button 
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                padding: "15px", // Ajusta o padding para manter o botão proporcional
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "50%", // Torna o botão redondo
                cursor: "pointer",
                width: "50px", // Define largura fixa
                height: "50px" // Define altura fixa
            }}
            onClick={() => alert('Botão clicado!')}
        >
        +
        </button>

    </div>
);
}

export default MapView;