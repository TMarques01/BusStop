import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import L from 'leaflet';

function MapView() {
  const [pins, setPins] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [busId, setBusId] = useState('');
  
  const userPinIcon = L.icon({
    iconUrl: '/pinPessoa.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
  
  const busPinIcon = L.icon({
    iconUrl: '/pinBus.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  const [tempPin, setTempPin] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = [position.coords.latitude, position.coords.longitude];
        setUserLocation(latLng);
        setTempPin({ lat: latLng[0], lng: latLng[1] });
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        const fallback = [38.7169, -9.1399];
        setUserLocation(fallback);
        setTempPin({ lat: fallback[0], lng: fallback[1] });
      }
    );
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pins"), (snapshot) => {
      const newPins = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Garante que temos sempre um timestamp válido para mostrar
          displayTime: data.timestamp?.seconds 
            ? new Date(data.timestamp.seconds * 1000).toLocaleTimeString()
            : new Date(data.clientTimestamp).toLocaleTimeString()
        };
      });
      setPins(newPins);
    });

    return () => unsubscribe();
  }, []);

  const handleAddBus = async () => {
    if (!busId.trim() || !tempPin) return;
    
    try {
      await addDoc(collection(db, "pins"), {
        bus_name: busId,
        lat: tempPin.lat,
        lng: tempPin.lng,
        timestamp: serverTimestamp(),
        clientTimestamp: new Date().toISOString()
      });
      
      setBusId('');
      setShowPopup(false);
    } catch (error) {
      console.error("Erro ao adicionar autocarro:", error);
    }
  };

  if (!userLocation) return <p>A localizar utilizador...</p>;

  return (
    <div style={{ position: "relative" }}>
      <MapContainer center={userLocation} zoom={20} style={{ height: "90vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {pins.map((pin) => (
          <Marker key={pin.id} position={[pin.lat, pin.lng]} icon={busPinIcon}>
            <Popup>
              Autocarro: {pin.bus_name}<br />
              Hora: {pin.displayTime || 'A carregar...'}
            </Popup>
          </Marker>
        ))}

        {tempPin && (
          <Marker
            position={[tempPin.lat, tempPin.lng]}
            icon={userPinIcon}
            interactive={false}
          />
        )}
      </MapContainer>
    
      <button 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "15px",
          backgroundColor: "#7E57C2",
          color: "white",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          width: "50px",
          height: "50px",
          zIndex: 1000
        }}
        onClick={() => setShowPopup(true)}
      >
        +
      </button>

      {showPopup && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          zIndex: 1001
        }}>
          <h3>Inserir Autocarro</h3>
          <input
            type="text"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            placeholder="ID do Autocarro"
            style={{
              padding: "8px",
              margin: "10px 0",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              onClick={() => {
                setBusId('');
                setShowPopup(false);
              }}
              style={{
                padding: "8px 16px",
                marginRight: "8px",
                backgroundColor: "#f0f0f0",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Cancelar
            </button>
            <button 
              onClick={handleAddBus}
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapView;