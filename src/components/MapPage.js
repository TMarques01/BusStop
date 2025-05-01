import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { collection, onSnapshot} from 'firebase/firestore';
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
      iconSize: [20, 40], 
      iconAnchor: [16, 48],
  });

  const [tempPin, setTempPin] = useState(null);
  // Obter localização do usuário
  useEffect(() => {
    // Obter localização atual
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

  // Carregar pins ativos do Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "pins"), (snapshot) => {
      const newPins = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Garante que temos sempre um timestamp válido para mostrar
          displayTime: data.timestamp?.seconds 
            ? new Date(data.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date(data.clientTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });
      setPins(newPins);
    });

    return () => unsubscribe();
  }, []);

  // Adicionar novo autocarro
  const handleAddBus = async () => {
    if (!busId.trim() || !tempPin) return;
    
    try {
      // Adiciona novo pin com isActive: true
      const newPinRef = await addDoc(collection(db, "pins"), {
        bus_name: busId,
        lat: tempPin.lat,
        lng: tempPin.lng,
        timestamp: serverTimestamp(),
        clientTimestamp: new Date().toISOString(),
        isActive: true
      });

      // Agenda a desativação após 30 segundos
      setTimeout(async () => {
        await updateDoc(doc(db, "pins", newPinRef.id), {
          isActive: false
        });
      }, 30000);

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
              Hora: {pin.displayTime}
            </Popup>
          </Marker>
        ))}
        {/* Mapa com Leaflet */}
        <MapContainer center={userLocation} zoom={20} style={{ height: "90vh", width: "100%" }}>
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

            {tempPin && (
            <Marker
                position={[tempPin.lat, tempPin.lng]}
                icon={customPinIcon}
                interactive={false}
            />
            )}

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