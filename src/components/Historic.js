import React, { useEffect, useState } from 'react';
import './HistoricPage.css';
import BusPin from './BusPin';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function HistoryPage() {
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pins'), (snapshot) => {
      const fetchedBusStops = snapshot.docs.map((doc) => ({
        id: doc.id,
        busNumber: doc.data().bus_name,
        time: new Date(doc.data().timestamp?.seconds * 1000).toLocaleTimeString(),
        date: new Date(doc.data().timestamp?.seconds * 1000).toLocaleDateString(),
        timestamp: doc.data().timestamp?.seconds || 0,
      }));

      const sortedBusStops = fetchedBusStops.sort((a, b) => b.timestamp - a.timestamp);

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
                        busNumber={stop.busNumber}
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