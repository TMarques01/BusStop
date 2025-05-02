import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MenuBar from './Menu';
import BusPin from './BusPin';
import './Search.css';

function SearchResultsPage() {
  const location = useLocation();
  const [busNumber, setBusNumber] = useState('');
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    const fetchBusStops = async () => {
      const searchParams = new URLSearchParams(location.search);
      const bus = searchParams.get('bus');
      setBusNumber(bus);

      if (!bus) return;

      try {
        // Query para buscar os dados na base de dados
        const q = query(collection(db, 'pins'), where('bus_name', '==', bus));
        const querySnapshot = await getDocs(q);

        const fetchedBusStops = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          time: new Date(doc.data().timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(doc.data().timestamp?.seconds * 1000).toLocaleDateString(),
          timestamp: doc.data().timestamp?.seconds || 0,
        }));

        // Ordenar os resultados por hora em ordem decrescente
        const sortedBusStops = fetchedBusStops.sort((a, b) => b.timestamp - a.timestamp);
        setBusStops(sortedBusStops);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchBusStops();
  }, [location.search]);

  return (
    <div className="search-results-page">
      <div className="results-content">
        <h1>Resultados do {busNumber}:</h1>
        
        {busStops.length > 0 ? (
          <div className="results-list">
            {busStops.map((stop, index) => (
              <BusPin
                key={index}
                busNumber={busNumber > 3 ? busNumber : busNumber.slice(0, 3)}
                time={`${stop.date} ${stop.time.slice(0, 5)}`}
              />
            ))}
          </div>
        ) : (
          <p className="no-results">Nenhum resultado encontrado para este autocarro.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;