import React from "react";
import './EmptyTickerTable.css';


// Temporary text for demo video
export default function EmptyTickerTable() {
	return (
		<div className="emptyTickerTable" style={{alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%', marginLeft: 40 }}>
			<div className="text-container">
				<h2 style={{ color: '#ffffff' }}> Loading Tickers... </h2>
				<p style={{ color: '#f0f0f0' }}> Please wait while we find tickers matching your criteria </p>
			</div>
		</div>
		)
}
