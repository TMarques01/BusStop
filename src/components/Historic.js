import React from 'react';
import './HistoricPage.css'; // Arquivo de estilos específico (opcional)
import BusPin from './BusPin';
import './HistoricPage.css';

function HistoryPage() {
	const busStops = [
		{ busNumber: '34T', time: '11:40', streetName: 'Rua da Sofia, nº227' },
		{ busNumber: '22', time: '12:15', streetName: 'Avenida Central, nº45' },
		{ busNumber: '12', time: '13:30', streetName: 'Praça do Município' },
	  ];

  return (
    <div className="history-page">
      <div className="history-content">
		<div className="history-header">
			<h1>Histórico</h1>
			{/* Adicione aqui o conteúdo do histórico */}
			<p>Os teus pins</p>
		<div className="bus-pins-container">
			{busStops.map((stop, index) => (
				<BusPin 
				key={index}
				busNumber={stop.busNumber}
				time={stop.time}
				streetName={stop.streetName}
				/>
			))}
			</div>
			</div>
		</div>
	</div>
  );
}

export default HistoryPage;