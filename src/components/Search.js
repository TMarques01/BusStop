import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
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

    const mockData = {
      '34': [
        { time: '11:40', streetName: 'Rua da Sofia, nº227' },
        { time: '09:15', streetName: 'Avenida Liberdade, nº100' }
      ],
      '22': [
        { time: '12:15', streetName: 'Avenida Central, nº45' },
        { time: '08:30', streetName: 'Praça do Comércio' }
      ]
    }

	const sortedStops = (mockData[bus] || []).sort((a, b) => {
		return b.time.localeCompare(a.time); // Ordem decrescente
	  });

    setBusStops(sortedStops);
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
                busNumber={busNumber}
                time={stop.time}
                streetName={stop.streetName}
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