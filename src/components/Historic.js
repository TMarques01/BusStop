import React, { useEffect, useState } from 'react';
import './HistoricPage.css';
import BusPin from './BusPin';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function HistoryPage() {
  const [busStops, setBusStops] = useState([]);
 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pins'), async (snapshot) => {
      const fetchedBusStops = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const lat = doc.data().lat;
          const lng = doc.data().lng;

          return {
            id: doc.id,
            busNumber: doc.data().bus_name,
            time: new Date(doc.data().timestamp?.seconds * 1000).toLocaleTimeString(),
            date: new Date(doc.data().timestamp?.seconds * 1000).toLocaleDateString(),
            lat: lat || 'Lat não disponível',
            lng: lng || 'Lng não disponível',
            // streetName: streetName, // Adiciona o nome da rua
            timestamp: doc.data().timestamp?.seconds || 0,
          };
        })
      );

      fetchedBusStops.sort((a, b) => b.timestamp - a.timestamp);

      setBusStops(fetchedBusStops);
    });

    return () => unsubscribe(); // Cleanup para evitar vazamentos de memória
  }, []);

  return (
    <div className="history-page">
      <div className="history-content">
        <div className="history-header">
          <h1>Histórico</h1>
          <div className="bus-pins-container">
            {busStops.length > 0 ? (
              busStops.map((stop) => (
                <BusPin
                  key={stop.id}
                  busNumber={stop.busNumber > 3 ? stop.busNumber : stop.busNumber.slice(0, 3)}
                  time={`${stop.date} ${stop.time.slice(0, 5)}`}
                />
              ))
            ) : (
              <p>Nenhum registro encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;